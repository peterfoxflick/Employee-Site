const fs = require('fs');

function removePic(filename) {
  const path = `./public${filename}`;
  fs.unlink(path, (err)=>{
    if(err) {
      console.log(err);
    }
  });
}

module.exports = removePic;