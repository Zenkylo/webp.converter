const fs = require('fs')
const path = require('path');
const imagemin = require("imagemin");
const webp = require("imagemin-webp");

const source = 'source-images/*.{jpg,png}'
const destination = './webp-images'


/**
 * -> Remove all files from destination
 * -> Convert files
 * -> Place in empty destination
 */
fs.readdir(destination, (err, files) => {
  if (err) throw err;

  for (const file of files) {
    fs.unlink(path.join(destination, file), err => {
      if (err) throw err;

      imagemin([source], {
        destination,
        plugins: [
          webp({
            quality: 75
          })
        ]
      }).then(function(done) {
        console.log(`${done.length} images converted!");
      })
      .catch(err => {
        console.log('An error occurred')
        console.error(err)
      })


    });
  }
});
