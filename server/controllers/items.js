const { Item } = require('../models')

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
    const items = await Item.findAndCountAll({ limit, offset, order, where })

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
    // Extract attributes from body
    const { tags, published } = req.body

    // Extract UserId from body
    const UserId = req.user.id

    // Create the Item
    const item = await Item.create({ tags, UserId, published })

    // Send back newly created item
    res.send({ item })
}

exports.edit = async (req, res) => {
    // Extract attributes from body
    const { tags, published } = req.body
    const { id } = req.params

    // Extract UserId from body
    const UserId = req.user.id

    // Find the Item
    const item = await Item.find({ where: { UserId, id } })
    
    // Update it
    await item.update({ tags, published })

    // Send it back
    res.send({ item })
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
