const aws = require('aws-sdk')
const multer = require('multer')
const multerS3 = require('multer-s3')
const s3 = new aws.S3()

module.exports = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'robbykapps',
        acl: 'public-read',
        metadata: function(req, file, cb) {
            cb(null, { fieldName: file.fieldname })
        },
        key: function(req, file, cb) {
            var originalname = file.originalname
            var extension = originalname.split('.')

            if (extension[extension.length - 1] = 'blob') extension[extension.length - 1] = 'jpg'
    
            filename = "rfunny/items/" + req.body.iid + '.' + extension[extension.length - 1]

            cb(null, filename)
        },
        
    }),
})
