const { Item } = require('../models')

exports.index = async (req, res) => {
    // Extract page from request url
    const { page } = req.query

    // Paginate by 50
    const limit = 50

    // Calculate offset
    const offset = (page - 1 || 0) * limit

    // Order by date created
    let order = [['createdAt', 'DESC']]

    // Fetch the items
    const items = await Item.findAndCountAll({ limit, offset, order })

    // Does another page exist?
    const hasNext = items.count - (offset + limit) > 0 ? true : false

    // Send back data
    res.send({ items: items.rows, hasNext })
}

exports.show = async (req, res) => {
    // Extract id from request url
    const { id } = req.query

    // Fetch the item
    const item = await Item.findOne({ where: { id } })

    // Send back item
    res.send({ item })
}
