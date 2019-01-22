const { Item } = require('../models')

exports.index = async (req, res) => {
    // Extract page from request url
    const { page } = req.params

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
    const { id } = req.params

    console.log(id)

    // Fetch the item
    const item = await Item.findOne({ where: { id } })

    // Send back item
    res.send({ item })
}

exports.create = async (req, res) => {
    // Extract attributes from body
    const { tags } = req.body

    // Extract UserId from body
    const UserId = req.user.id

    // Create the Item
    const item = await Item.create({ tags, UserId })

    // Send back newly created item
    res.send({ item })
}

exports.delete = async (req, res) => {
    // Extract id from url
    const { id } = req.params

    // Extract UserId from body
    const UserId = req.user.id

    // Destroy Item
    await Item.destroy({ where: {UserId, id} })

    // Send back sucess
    res.send({ success: "Item successfully deleted." })
}
