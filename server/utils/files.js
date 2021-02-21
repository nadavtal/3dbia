const sharp = require('sharp');

const resize = (file, newFileName) => {
    // console.log(file)
    // console.log(newFileName)
    // sharp(file.buffer)
    // .resize(200)
    // .toFile(newFileName, (err, info) => {
        
    //     if (err) return err
    //     return info
    // });

    sharp(file).resize(200, 200).toBuffer(function(err, buf) {
        console.log('akjshkajshkjahksjh')
        if (err) return err
        console.log(buf)
        // Do whatever you want with `buf`
      })
    // sharp(file)
    // .resize(200)
    // .toFile(newFileName, (err, info) => {
    //     console.log(info)
    //     if (err) return err
    //     return info
    // });
}

const getFileExtension = (filename) => {
  // return (/[.]/.exec(filename)) ? /[^.]+$/.exec(filename) : undefined;
  return filename.split('.').pop();

}
module.exports = {
  resize,
  getFileExtension
}  