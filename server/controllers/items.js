const { Item, Tag, Tagging, User } = require('../models')
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

    let attributes = ['id', 'source', 'published']

    // Include tags if admin area
    const include = req.user ? [User] : []

    // Fetch the items
    const items = await Item.findAndCountAll({
        subQuery: false,
        limit,
        offset,
        order,
        where,
        attributes,
        include
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

    // Include tags if admin area
    const include = req.user ? [Tag] : []

    // Fetch the item
    const item = await Item.findOne({ where, include })

    // Send back item
    res.send({ item })
}

exports.create = async (req, res) => {
    // Extract attributes
    const { tags, published, iid } = req.body

    // Create Tags
    const tagsArray = _.uniq(commaArray(tags))
    let tagPromises = []

    _.forEach(tagsArray, tag => {
        tagPromises.push(Tag.findOrCreate({ where: { title: tag } }))
    })

    let createdTags = await Promise.all(tagPromises)
    let tagIds = createdTags.map(tag => tag[0].id)

    // Extract UserId/Admin status
    const UserId = req.user.id
    const { admin } = req.user

    // Extract images
    const uploads = req.files
    const hasUploads = !_.isEmpty(uploads)

    // Process source
    const source = hasUploads ? uploads[0].location : null

    // Create the Item
    const item = await Item.create({
        UserId,
        published: admin ? published : false, // only admin can publish
        source,
        iid,
    })

    // Add tags to items
    item.addTags(tagIds)

    // Send back newly created item
    res.send({ item })
}

exports.edit = async (req, res) => {
    // Extract attributes
    const { published, tags } = req.body

    // Extract ids
    const { id } = req.params

    // Find the Item
    const item = await Item.find({ where: { id } })

    // Update Attributes
    let updates = {}
    if (req.user.admin) updates.published = published

    if (!_.isEmpty(req.files)) {
        // Update url incase extension changed
        updates.source = req.files[0].location
    }

    // Update item, delete taggings
    let [updated] = await Promise.all([
        item.update(updates),
        Tagging.destroy({ where: { ItemId: id } }),
    ])

    // Create/Find Tags
    const tagsArray = _.uniq(commaArray(tags))
    let tagPromises = []

    _.forEach(tagsArray, tag => {
        tagPromises.push(Tag.findOrCreate({ where: { title: tag } }))
    })

    let createdTags = await Promise.all(tagPromises)
    let tagIds = createdTags.map(tag => tag[0].id)

    // Add new taggings
    item.addTags(tagIds)

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
