const { replace } = require('lodash');
const sharp = require('sharp');
const { storage } = require('./storage');
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
       
        if (err) return err
        // console.log(buf)
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

const readFile = (bucketName, fileName) => {

  return new Promise((resolve, reject) => {
    const bucket = storage.bucket(bucketName)
    const remoteFile = bucket.file(fileName);
    // console.log('remoteFile', remoteFile)
    remoteFile.download(function(err, contents) {
      if (err) reject(err);
      // console.log('contents', contents);
      // console.log(contents.toString().split(/(?:\r\n|\r|\n)/g))
      resolve(contents.toString().replace(/\t/g, "").split(/(?:\r\n|\r|\n)/g));
    });
    // remoteFile.createReadStream()
    // .on('error', function(err) {
    //   console.log('error', error)
    //   // reject(err)
    // })
    // .on('response', function(response) {
    //   // Server connected and responded with the specified status and headers.
    //   console.log('response', response)
    //   // resolve(response)
    //  })
    // .on('end', function() {
    //   // The file is fully downloaded.
    // })
  });
};


module.exports = {
  resize,
  getFileExtension,
  readFile
}  