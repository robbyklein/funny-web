const multer = require('multer')

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './server/public/uploads/items')
    },

    filename: function(req, file, cb) {
        var originalname = file.originalname
        var extension = originalname.split('.')

        filename = req.body.iid + '.' + extension[extension.length - 1]
        cb(null, filename)
    },
})
var upload = multer({ storage })

module.exports = upload.fields([
    {
        name: 'source',
        maxCount: 1,
        storage,
    },
])
