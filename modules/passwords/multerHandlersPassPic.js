let multer = require('multer'),
    mime = require('mime'),
    crypto = require('crypto');

let storage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null, './public/images/passwords/')
    },
    filename: (req, file, cb) => {
        crypto.pseudoRandomBytes(16, (err, raw)=> {
            cb(null, raw.toString('hex')+ Date.now() + '.' + mime.getExtension(file.mimetype));
        });
    }
});

let uploadPassPic = multer({storage: storage});

module.exports = uploadPassPic;