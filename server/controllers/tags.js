const { Item, Tag, Tagging } = require('../models')
const Sequelize = require('sequelize')
const Op = Sequelize.Op
const _ = require('lodash')

exports.index = async (req, res) => {
    const { id, page } = req.params

    // Find the tag
    let tag = await Tag.findOne({ where: { id } })
    if (!tag) return res.send({ error: 'Tag not found ' })

    // Paginate by 50
    const limit = 50

    // Calculate offset
    const offset = (page - 1 || 0) * limit

    // Order by date created
    const order = [['createdAt', 'DESC']]

    // Get all items
    const itemsRaw = await tag.getItems({
        offset,
        limit,
        order,
        attributes: ['id', 'source', 'published'],
        include: [],
    })

    // Remove the Tagging key
    const items = _.map(itemsRaw, ({ id, source, published }) => {
        return { id, source, published }
    })

    // Get page count
    const total = await Tagging.count({ where: { TagId: tag.id } })

    // How many pages are there?
    const pages = Math.ceil(total / limit)

    // Send back data
    res.send({ items, pages })
}
