let multer = require('multer');
let storage = multer.diskStorage({
  destination: (req, file, callback)=> {
    callback(null, '../../public/images/employeePics');
  }
});

let upload = multer({storage: storage}).single('myfile');

module.exports = upload;