const { Item } = require('../models')
const commaArray = require('../helpers/comma-array')
const _ = require('lodash')

exports.index = async (req, res) => {
    // Extract page from request url
    const { page } = req.query

    // Paginate by 50
    const limit = 50

    // Calculate offset
    const offset = (page - 1 || 0) * limit

    // Order by date created
    const order = [['createdAt', 'DESC']]

    // If logged in we need unpublished posts too
    const where = req.user ? {} : { published: true }

    // Fetch the items
    const items = await Item.findAndCountAll({
        limit,
        offset,
        order,
        where,
        attributes: ['id', 'source', 'tags', 'published'],
    })

    // Does another page exist?
    const pages = Math.ceil(items.count / limit)

    // Send back data
    res.send({ items: items.rows, pages })
}

exports.show = async (req, res) => {
    // Extract id from request url
    const { id } = req.params

    // If user allow unpublished
    const where = req.user ? { id } : { id, published: true }

    // Fetch the item
    const item = await Item.findOne({ where })

    // Send back item
    res.send({ item })
}

exports.create = async (req, res) => {
    // Extract attributes
    const { tags, published, iid } = req.body

    // Extract UserId
    const UserId = req.user.id

    // Extract images
    const uploads = req.files
    const hasUploads = !_.isEmpty(uploads)

    // Process source
    const source = hasUploads ? `/uploads/items/${uploads.source[0].filename}` : null

    // Create the Item
    const item = await Item.create({
        tags: commaArray(tags),
        UserId,
        published,
        source,
        iid,
    })

    // Send back newly created item
    res.send({ item })
}

exports.edit = async (req, res) => {
    // Extract attributes
    const { tags, published } = req.body

    // Extract ids
    const { id } = req.params
    const UserId = req.user.id

    // Find the Item
    const item = await Item.find({ where: { UserId, id } })
    let updates = { tags: commaArray(tags), published }

    if (!_.isEmpty(req.files)) {
        // Update url incase extension changed
        updates.source = `/uploads/items/${req.files.source[0].filename}`
    }

    // Update it
    const updated = await item.update(updates)

    // Send it back
    res.send({ item: updated })
}

exports.delete = async (req, res) => {
    // Extract id from url
    const { id } = req.params

    // Extract UserId from body
    const UserId = req.user.id

    // Destroy Item
    await Item.destroy({ where: { UserId, id } })

    // Send back sucess
    res.send({ success: 'Item successfully deleted.' })
}
