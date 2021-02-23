const express = require('express');
const app = (module.exports = express());
const fs = require('fs');
const sharp = require('sharp');
const Busboy = require('busboy');
const unzipper = require('unzipper');
const StreamZip = require('node-stream-zip');
const request = require('request');
const connection = require('../db.js');

const upload = require('../middlewares/upload');
const uploadController = require('../controllers/upload');
const { storage } = require('../utils/storage');
const { uploadFile } = require('../utils/storage');
const { deleteFile } = require('../utils/storage');
// const { resize } = require('../utils/files');
const { getFileExtension } = require('../utils/files');
const modelsController = require('../controllers/modelsController');
const messagesController = require('../controllers/messagesControler');
const uploadPath = './resources/static/assets/tmp';
const unzipPath = './resources/static/assets/unzipped';
const path = require('path');
const imageFileExtensions = ['jpg', 'jpeg', 'pin'];
// const isFolder = filePath => fs.lstatSync(filePath).isDirectory();

function uploadFiles(files, bucketName, filePath, parentFolderName) {
  console.log(parentFolderName);
  return new Promise(async (resolve, reject) => {
    console.log('files.length', files.length);
    let { length } = files;
    for (const file of files) {
      const fileExtentension = getFileExtension(file);
      // console.log(fileExtentension)
      if (imageFileExtensions.includes(fileExtentension.toLowerCase())) {
        sharp(`${unzipPath}//${file}`)
          .resize(200)
          .toBuffer(async function(err, buffer) {
            if (err) {
              throw err;
            }
            const smallFile = {
              fieldname: 'file',
              originalname: file,
              encoding: '7bit',
              mimetype: 'image/jpeg',
              buffer,
            };
            let smallFileName = `${file.split('.')[0]}_small_image.${
              file.split('.')[1]
            }`;
            smallFileName = smallFileName.split('\\').join('/');
            if (parentFolderName)
              smallFileName = `${parentFolderName}/${smallFileName}`;
            await uploadFile(
              smallFile,
              bucketName,
              `${filePath}/${smallFileName}`,
            );
          });
      }
      await uploadFileFromLocalDiskToBucket(
        file,
        bucketName,
        filePath,
        parentFolderName,
      );
      length--;
    }
    console.log(length);
    if (length == 0) {
      resolve(true);

      // console.log('Over', length);
      // sendMail(
      //   ['nadavtalalmagor@gmail.com'],
      //   '3d tiles uploaded',
      //   'Upload successfull',
      //   `<h3>HEADER</h3>`,
      // );
    } else {
      reject(false);
    }
  });
}
const uploadFileFromLocalDiskToBucket = (
  file,
  bucketName,
  filePath,
  parentFolderName,
) => {
  // console.log(file)
  // const newFile = file.replace('\\', '/')
  const newFile = file.split('\\').join('/');
  // if (parentFolderName) newFile = parentFolderName + '/' + newFile
  // console.log(newFile)
  return new Promise((resolve, reject) => {
    const options = {
      destination: parentFolderName
        ? `${filePath}/${parentFolderName}/${newFile}`
        : `${filePath}/${newFile}`,
      resumable: false,
    };
    console.log(`Uploading '${newFile}' to bucket`);
    storage
      .bucket(bucketName)
      .upload(`${unzipPath}//${newFile}`, options)
      .then(result => {
        fs.unlink(`${unzipPath}//${file}`, err => {
          if (err) {
            console.error(err);
            reject(err);
            return;
          }

          resolve('File uploaded and Removed');
        });
        resolve('File uploaded and Removed');
      })
      .catch(error => {
        console.log(error);
        reject(error);
      });
  });
};
const getAllFiles = function(dirPath, arrayOfFiles) {
  files = fs.readdirSync(dirPath);

  arrayOfFiles = arrayOfFiles || [];

  files.forEach(function(file) {
    const filePath = `${dirPath}/${file}`;
    if (fs.statSync(filePath).isDirectory()) {
      arrayOfFiles = getAllFiles(`${dirPath}/${file}`, arrayOfFiles);
    } else {
      arrayOfFiles.push(
        path
          .join(filePath)
          .replace('resources\\static\\assets\\unzipped\\', ''),
      );
      // arrayOfFiles.push(path.join(dirPath, "/", file))
    }
  });

  return arrayOfFiles;
};

// const filesPaths = getAllFiles(unzipPath)
// console.log(filesPaths)
// uploadFiles(filesPaths)

app.post('/uploads', upload.single('profileImg'), uploadController.uploadFiles);
app.post(
  '/profile_images',
  upload.single('profileImg'),
  uploadController.uploadFiles,
);
app.post(
  '/profile_images/:type/:id',
  upload.single('profileImg'),
  uploadController.uploadFiles,
);
app.put(
  '/profile_images/:type/:id',
  upload.single('profileImg'),
  uploadController.updateFiles,
);
app.get('/profile_images/:type/:id', function(req, res) {
  console.log(`getting profile image by provider: ${req.params.id}`);
  const q = `SELECT * FROM tbl_profile_images where ${req.params.type}_id = ${
    req.params.id
  };`;
  connection.query(q, function(error, results) {
    if (error) res.send(error);
    console.log(results);
    if (results[0] && results[0].data) {
      const buf = Buffer.from(results[0].data);
      // const buf = Buffer.from(results[0].data, "binary").toString('base64');
      fs.writeFileSync(`./resources/static/assets/tmp/${results[0].name}`, buf);
    }
    res.send(results);
  });
});

app.post('/cloud-upload', upload.single('file'), async (req, res) => {
  // const imageUrls = await createFileWithCopy(req.file, req.body)
  console.log(req.file);
  console.log(req.body);
  let smallImageUrl;

  if (req.file.size > 1024000 && req.file.mimetype == 'image/jpeg') {
    console.log('file large');
    // const smallFile = await resize(req.file, req.body.fileName);
    // console.log('smallFile', smallFile)

    sharp(req.file.buffer)
      .resize(200)
      .toBuffer(async function(err, buf) {
        if (err) console.log('err', err);
        else {
          console.log('buf', buf);
          const smallFile = { ...req.file, buffer: buf };
          console.log(smallFile);
          try {
            smallImageUrl = await uploadFile(
              smallFile,
              req.body.bucketName,
              req.body.smallFileName,
            );
            console.log('smallImageUrl', smallImageUrl);
          } catch (error) {}
        }
      });
  }
  try {
    // const signedUrl = await gcsSignedUrl(req.body.bucketName, req.body.fileName, 60);
    // console.log(signedUrl)
    const fileUrl = await uploadFile(
      req.file,
      req.body.bucketName,
      req.body.fileName,
    );
    console.log('fileUrl', fileUrl);
    res.status(200).json({
      message: 'Upload was successful',
      fileUrl,
      smallImageUrl,
      // data: imageUrl
    });
  } catch (error) {
    res.send(error);
  }
});
app.post('/cloud-upload/zip', async (req, res) => {
  let bucketName;
  let filePath;
  let createdBy;
  let taskId;
  let newFolderName;
  let surveyId;
  let bid;
  let userId;
  let emails;
  let msg;
  const busboy = new Busboy({ headers: req.headers });
  busboy.on('field', function(fieldname, val, valTruncated, keyTruncated) {
    console.log(fieldname, val, valTruncated, keyTruncated);
    if (fieldname == 'bucketName') bucketName = val;
    if (fieldname == 'filePath') filePath = val;
    if (fieldname == 'created_by') createdBy = val;
    if (fieldname == 'taskId') taskId = val;
    if (fieldname == 'newFolderName') newFolderName = val;
    if (fieldname == 'surveyId') surveyId = val;
    if (fieldname == 'bid') bid = val;
    if (fieldname == 'userId') userId = val;
    if (fieldname == 'emails') emails = val;
    if (fieldname == 'msg') msg = val;
  });
  console.log('newFolderName', newFolderName);
  busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
    // console.log('file', file)
    // console.log('File [' + fieldname + ']: filename: ' + filename);
    // Create a write stream of the new file
    const fstream = fs.createWriteStream(path.join(uploadPath, filename));
    // Pipe it trough
    file.pipe(fstream);

    // On finish of the upload
    fstream.on('close', async () => {
      console.log(`Upload of '${filename}' finished`);
      res.send('ok');
      // decompress(uploadPath+"//"+filename, unzipPath).then(files => {
      //   console.log('done files.length!', files.length);
      //  });
      const zip = new StreamZip.async({ file: `${uploadPath}//${filename}` });
      // console.log(zip)
      await zip.extract(`${uploadPath}//${filename}`, unzipPath);

      // zip.on('ready', () => {
      //   console.log('Entries read: ' + zip.entriesCount);
      //   for (const entry of Object.values(zip.entries())) {
      //       const desc = entry.isDirectory ? 'directory' : `${entry.size} bytes`;
      //       console.log(`Entry ${entry.name}: ${desc}`);
      //   }
      //   // Do not forget to close the file once you're done
      //   zip.close();
      // });
      const strzip = fs.createReadStream(`${uploadPath}//${filename}`);
      strzip
        .pipe(unzipper.Extract({ path: unzipPath }))
        .on('close', async () => {
          console.log('zip file unZipped');
          const filesPaths = getAllFiles(unzipPath);

          console.log(filesPaths);
          const filesUploaded = await uploadFiles(
            filesPaths,
            bucketName,
            filePath,
            newFolderName,
          );
          console.log('filesUploaded', filesUploaded);
          if (filesUploaded) {
            fs.unlink(`${uploadPath}//${filename}`, err => {
              if (err) {
                console.error(err);
                return;
              }
              console.log('Zip removed');
            });
            const bucket = storage.bucket(bucketName);
            bucket.getFiles(
              {
                prefix: `${filePath}/${newFolderName}`,
              },
              async function(err, files) {
                if (err) console.log(err);
                // console.log(files)

                try {
                  if (msg == 'New Tileset uploaded') {
                    const firstJsonFile = files.find(
                      file =>
                        file.name.includes('.json') &&
                        !file.name.includes('data') &&
                        !file.name.includes('Data'),
                    );
                    console.log('firstJsonFile', firstJsonFile);
                    if (firstJsonFile) {
                      const model = {
                        name: `${
                          firstJsonFile.name.split('/')[
                            firstJsonFile.name.split('/').length - 1
                          ]
                        }`,
                        task_id: taskId,
                        survey_id: surveyId,
                        bid,
                        created_by: createdBy,
                        updated_by: createdBy,
                        url: `https://storage.googleapis.com/${
                          firstJsonFile.bucket.name
                        }/${firstJsonFile.name}`,
                        type: 'model',
                        newFolderName,
                      };
                      const newModelResult = await modelsController.createBridgeModel(
                        model,
                      );

                    }

                  }
                  console.log('msg', msg)
                  // if (newModelResult.insertId) {
                    messagesController.sendMail(
                      emails,
                      msg,
                      'Upload successfull',
                      `<h3>HEADER</h3>
                    `,
                    );
                    const message = {
                      sender_user_id: userId,
                      receiver_user_id: null,
                      subject: '',
                      message: msg,
                      createdAt: Date.now(),
                      type: 'System',
                      status: 'Sent',
                      task_id: taskId,
                      survey_id: surveyId,
                      bid,
                      parent_message_id: null,
                      location: '',
                      element_id: null,
                    };
                    messagesController.createMessage(message);
                  // }
                } catch (err) {
                  console.log(err);
                }
              },
            );
          }
          // fs.readdir(unzipPath, async function (err, files) {
          //   console.log('files read from disk')
          //     // handling error
          //   if (err) {
          //       return console.log('Unable to scan directory: ' + err);
          //   }
          // console.log(files)
          // uploadFiles(files, bucketName, filePath)

          //   })
        });
      // fs.createReadStream(path.join(uploadPath, filename))
      // .pipe(unzipper.Parse())
      // .on('entry', async function (entry) {
      //   // console.log('entry', entry)
      //   const fileName = entry.path;
      //   const type = entry.type; // 'Directory' or 'File'
      //   const size = entry.vars.uncompressedSize; // There is also compressedSize;
      //   console.log(fileName, type, size)
      //   const content = await entry.buffer();
      //   // console.log('content', content)
      //   // const fileUrl = await uploadFile(req.file, req.body.bucketName, req.body.fileName)
      //   // sharp(content).resize(200)
      //   // .toBuffer(async function(err, buf) {

      //   //   if (err) console.log('err', err)
      //   //   else {
      //   //     // console.log('buf', buf)
      //   //     const smallFile = {...entry, buffer: buf}
      //   //     // console.log(smallFile);
      //   //     try {
      //   //       smallImageUrl = await uploadFile(smallFile, '3dbia_organization_169', `bid_1200/survey_559/Images/Bearings/${entry.path}`)
      //   //       // console.log('smallImageUrl', smallImageUrl)
      //   //     } catch (error) {

      //   //     }
      //   //   }
      //   // })
      //   // const file = await uploadFile({entry, buffer: content}, '3dbia_organization_169', `bid_1200/survey_559/Images/Bearings/${fileName}`)
      //   // entry.autodrain();
      //   // if (fileName === "this IS the file I'm looking for") {
      //   //   entry.pipe(fs.createWriteStream('output/path'));
      //   // } else {
      //   //   entry.autodrain();
      //   // }
      // });
    });
  });
  // busboy.on('field', function(fieldname, val, fieldnameTruncated, valTruncated) {
  //   console.log('Field [' + fieldname + ']: value: ' + inspect(val));
  // });
  // busboy.on('finish', function() {
  //   console.log('Done parsing form!');
  //   res.writeHead(303, { Connection: 'close', Location: '/' });
  //   res.end();
  // });
  req.pipe(busboy);
  // './resources/static/assets/tmp/'
  // try {

  // } catch (error) {
  //   res.send(error)
  // }
});

app.put('/cloud-upload', upload.single('file'), async (req, res) => {
  // const file = myBucket.file(req.body.fileName);
  // deleteFile(req.body.bucketName, req.body.fileName).catch(console.error);
  try {
    const deletedFile = await deleteFile(
      req.body.bucketName,
      req.body.fileName,
    );
    console.log('deletedFile', deletedFile);
    try {
      // const signedUrl = await gcsSignedUrl(req.body.bucketName, req.body.fileName, 60);
      // console.log(signedUrl)

      const imageUrl = await uploadFile(
        req.file,
        req.body.bucketName,
        req.body.fileName,
      );
      res.status(200).json({
        // message: "Upload was successful",
        imageUrl,
        // data: imageUrl
      });
    } catch (error) {
      res.send(error);
    }
  } catch (error) {
    res.send(error);
  }
});

const createFileWithCopy = async (file, bucketName, newFileName) => {};
app.post('/get_signed_url', upload.single('file'), async (req, res) => {
  const { file } = req;
  try {
    const signedUrl = await gcsSignedUrl(
      req.body.bucketName,
      req.body.fileName,
      60,
    );
    console.log(signedUrl);
    const options = {
      url: signedUrl,
      // json: true,
      // body: JSON.stringify(req.file)
    };
    const writeStream = request.put(options);
    writeStream.end('New data');

    writeStream.on('complete', function(resp) {
      console.log('complete');
      res.status(200).json({
        // message: "Upload was successful",
        resp,
        // data: imageUrl
      });
      // Confirm the new content was saved.
      // file.download(function(err, fileContents) {
      //   console.log('Contents:', fileContents.toString());
      //   // Contents: New data
      //   res
      //     .status(200)
      //     .json({
      //       // message: "Upload was successful",
      //       fileContents
      //       // data: imageUrl
      //     })
      // });
    });
  } catch (error) {
    res.send(error);
  }
});
async function gcsSignedUrl(bucketName, filename, minutesToExpiration) {
  const options = {
    action: 'write',
    expires: Date.now() + minutesToExpiration * 60 * 1000,
  };
  const [url] = await storage
    .bucket(bucketName)
    .file(filename)
    .getSignedUrl(options);
  return url;
}

app.post('/cloud-download', (req, res) => {
  console.log(req.body);
  downloadFile(req.body.bucketName, req.body.fileName).catch(console.error);
});

async function downloadFile(bucketName, fileName) {
  const options = {
    // The path to which the file should be downloaded, e.g. "./file.txt"
    // destination: 'C:\Projects\manam-master',
  };

  // Downloads the file
  const download = await storage
    .bucket(bucketName)
    .file(fileName)
    .download(options);
  console.log('download', download);
  console.log(`gs://${bucketName}/${fileName} downloaded .`);
}
