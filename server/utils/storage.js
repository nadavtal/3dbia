const { Storage } = require('@google-cloud/storage');
const storage = new Storage({
  keyFilename: 'credentials.json',
  projectId: 'web-3dbia-283508',
});

const uploadFile = (file, bucketName, fileName) =>
  new Promise((resolve, reject) => {
    const { buffer } = file;
    // const { originalname, buffer } = file;
    const bucket = storage.bucket(bucketName); // should be your bucket name
    // const blob = bucket.file(originalname.replace(/ /g, "_"))
    const blob = bucket.file(fileName);
    const blobStream = blob.createWriteStream({
      resumable: true,
    });
    // console.log('blob', blob)
    // console.log('blobStream', blobStream)
    blobStream
      .on('finish', () => {
        const publicUrl = `https://storage.googleapis.com/${bucket.name}/${
          blob.name
        }`;

        resolve(publicUrl);
      })
      .on('error', err => {
        reject(err);
      })
      .end(buffer);
  });
async function deleteFile(bucketName, filename) {
  // Deletes the file from the bucket
  await storage
    .bucket(bucketName)
    .file(filename)
    .delete();

  return `gs://${bucketName}/${filename} deleted.`;
}

module.exports = {
  storage,
  uploadFile,
  deleteFile,
};
