const express = require('express');
const app = (module.exports = express());
const fs = require('fs');
const sharp = require('sharp');
const Busboy = require('busboy');
const unzipper = require('unzipper');
const StreamZip = require('node-stream-zip');
const request = require('request');
const connection = require('../db.js');
const useServerSentEventsMiddleware = require('../middlewares/serverSideEvents')
const upload = require('../middlewares/upload');
const uploadController = require('../controllers/upload');
const { storage } = require('../utils/storage');
const { uploadFile, deleteFile, getFiles } = require('../utils/storage');
const convertToMySqlDateFormat = require('../utils/mysqlUtils').convertToMySqlDateFormat;
// const { resize } = require('../utils/files');
const { getFileExtension, moveFile } = require('../utils/files');
const modelsController = require('../controllers/modelsController');
const messagesController = require('../controllers/messagesControler');
const logsController = require('../controllers/logsController');
const path = require('path');

const uploadPath = './resources/static/assets/tmp';
const unzipPath = './resources/static/assets/unzipped';
const imageFileExtensions = ['jpg', 'jpeg', 'pin'];
// const isFolder = filePath => fs.lstatSync(filePath).isDirectory();

function uploadFiles(files, bucketName, filePath, parentFolderName) {
  // console.log(parentFolderName);
  return new Promise(async (resolve, reject) => {
    
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
            smallFileName = smallFileName.split('\\').splice(1).join('/');
            // if (parentFolderName) smallFileName = `${parentFolderName}/${smallFileName}`;
            await uploadFile(
              smallFile,
              bucketName,
              `${filePath}${smallFileName}`,
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
  const fileExtentension = getFileExtension(file);
  const newFile = file.split('\\').join('/');
  const finalPath = imageFileExtensions.includes(fileExtentension.toLowerCase()) 
  ? `${filePath}${newFile.split('/').splice(1).join('/')}`
  : `${filePath}${newFile}`

  return new Promise((resolve, reject) => {
    const options = {
      destination: finalPath,
      resumable: false,
    };
    console.log(`Uploading '${finalPath}' to bucket`);
    storage
      .bucket(bucketName)
      .upload(`${unzipPath}//${newFile}`, options)
      .then(result => {
        //delete file from disk
        // fs.unlink(`${unzipPath}//${file}`, err => {
        //   if (err) {
        //     console.error(err);
        //     reject(err);
        //     return;
        //   }

        //   resolve('File uploaded and Removed');
        // });
        resolve(result);
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
    if (req.file.originalname == 'folder_structure.csv') {
      const bucket = storage.bucket(req.body.bucketName);
      const file = bucket.file(`bid_${req.body.bid}/${req.file.originalname}`);
      await uploadFile(
        req.file,
        req.body.bucketName,
        `bid_${req.body.bid}/${req.file.originalname}`,
      );
      // file.exists(async function(err, exists) {
      //   console.log('exists', exists)
      //   if (exists) {
      //     // const movedFile = await moveFile(req.body.bucketName, `bid_${req.body.bid}/${req.file.originalname}`, `bid_${req.body.bid}/general_files/${req.file.originalname}`)
      //     // console.log('movedFile', movedFile)
      //     // const deletedFile = await deleteFile(
      //     //   req.body.bucketName,
      //     //   `bid_${req.body.bid}/${req.file.originalname}`,
      //     // );
      //     // console.log('deletedFile', deletedFile)
      //   }
        
      //   await uploadFile(
      //     req.file,
      //     req.body.bucketName,
      //     `bid_${req.body.bid}/${req.file.originalname}`,
      //   );
      // });

    }
    // console.log('fileUrl', fileUrl);
    const fileExtentension = getFileExtension(req.body.fileName);
    console.log(fileExtentension)
    if (fileExtentension === 'glb') {
      const message = {
        sender_user_id: req.body.userId,
        receiver_user_id: null,
        subject: '',
        message: 'New Glb model uploaded',
        createdAt: Date.now(),
        type: 'System',
        status: 'Sent',
        task_id: req.body.taskId,
        survey_id: req.body.surveyId,
        bid: req.body.bid,
        parent_message_id: null,
        location: '',
        element_id: null,
      };
      messagesController.createMessage(message);
    }
    if (fileExtentension === 'csv') {
      const message = {
        sender_user_id: req.body.userId,
        receiver_user_id: null,
        subject: '',
        message: 'New folder structure csv uploaded',
        createdAt: Date.now(),
        type: 'System',
        status: 'Sent',
        task_id: req.body.taskId,
        survey_id: req.body.surveyId,
        bid: req.body.bid,
        parent_message_id: null,
        location: '',
        element_id: null,
      };
      messagesController.createMessage(message);
    }
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
app.post('/cloud-upload/zip/:logId/:folderId', async (req, res) => {
  
  let bucketName;
  let filePath;
  let createdBy;
  let emails;
  let msg;
  let folder_id = req.params.folderId;
  let logId = req.params.logId;
  let surveyId;
  let bid;
  let taskId;
  let userId;
  let organization_id
  let sub_task_name
  const busboy = new Busboy({ headers: req.headers });
  busboy.on('field', function(fieldname, val, valTruncated, keyTruncated) {
    
    if (fieldname == 'bucketName') bucketName = val;
    if (fieldname == 'filePath') filePath = val;
    if (fieldname == 'created_by') createdBy = val;
    if (fieldname == 'taskId') taskId = val;
    // if (fieldname == 'folder_id') folder_id = val;
    if (fieldname == 'surveyId') surveyId = val;
    if (fieldname == 'bid') bid = val;
    if (fieldname == 'userId') userId = val;
    if (fieldname == 'emails') emails = val;
    if (fieldname == 'msg') msg = val;
    // if (fieldname == 'organization_id') organization_id = val;
    if (fieldname == 'sub_task_name') sub_task_name = val;
  });
  busboy.on('file', async function(fieldname, file, filename, encoding, mimetype) {

    res.send({status: 200});
    const tmpDir = uploadPath + "//" + folder_id
    try {
      // first check if directory already exists
        if (!fs.existsSync(tmpDir)) {
            fs.mkdirSync(tmpDir);
            console.log("Directory is created.");
        } else {
            console.log("Directory already exists.");
        }
    } catch (err) {
        console.log(err);
    }
    const fstream = fs.createWriteStream(path.join(tmpDir, filename));
    // Pipe it trough
    file.pipe(fstream);

    // On finish of the upload
    fstream.on('close', async () => {
      console.log(`Upload of '${filename}' finished`);
     
      let log = {
        id: logId,
        status: 'Unzipping',
        finished: null
      }
      await logsController.updateLog(log)
      // const zip = new StreamZip.async({ file: `${uploadPath}//${filename}` });
      // console.log(zip)
      // await zip.extract(`${uploadPath}//${filename}`, `${unzipPath}/${folder_id}`);
      const strzip = fs.createReadStream(`${tmpDir}//${filename}`);
      strzip
        .pipe(unzipper.Extract({ path: `${unzipPath}/${folder_id}` }))
        .on('close', async () => {
          console.log('zip file unZipped');

          log = {
            id: logId,
            status: 'Processing',
            finished: null
          }
          await logsController.updateLog(log)
          const filesPaths = getAllFiles(`${unzipPath}/${folder_id}`);
          const filesUploaded = await uploadFiles(
            filesPaths,
            bucketName,
            filePath,
            folder_id,
          );
          console.log('filesUploaded', filesUploaded);
          if (filesUploaded) {
            log = {
              id: logId,
              // finished: convertToMySqlDateFormat(Date.now()),
              finished: true,
              status: 'Complete',
            }
            await logsController.updateLog(log)
            // fs.unlink(`${tmpDir}//${filename}`, err => {
            //   if (err) {
            //     console.error(err);
            //     return;
            //   }
            //   console.log('Zip removed');
            // });
            // delete directory recursively
            try {
              fs.rmdirSync(`${unzipPath}/${folder_id}`, { recursive: true });
              fs.rmdirSync(tmpDir, { recursive: true });

              console.log(`${unzipPath}/${folder_id} is deleted!`);
              console.log(`${tmpDir} is deleted!`);
            } catch (err) {
              console.error(`Error while deleting ${unzipPath}/${folder_id} or ${tmpDir}.`);
            }
            if (msg == 'New Tileset uploaded') {
              const tileSetFiles = await getFiles(bucketName, `${filePath}/${folder_id}`)
              // console.log('tileSetFiles', tileSetFiles)
              try {
                if (msg == 'New Tileset uploaded') {
                  const firstJsonFile = tileSetFiles.find(
                    file =>
                      file.name.includes('.json') &&
                      !file.name.includes('data') &&
                      !file.name.includes('Data'),
                  );
                  // console.log('firstJsonFile', firstJsonFile);
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
                      folder_id,
                    };
                    const newModelResult = await modelsController.createBridgeModel(
                      model,
                    );

                  }

                }
                
  
              } catch (err) {
                console.log(err);
              }
            }
            // if (newModelResult.insertId) {
              messagesController.sendMail(
                emails,
                msg,
                'Upload successfull',
                `<div><p>Folder Id: ${folder_id}</p></div>
                 <div><p>File name: ${filename}</p></div>
                <div><p>Path: ${filePath}</p></div>
                <div><p>Task: ${sub_task_name}</p></div>
                <div><p>Finished: ${convertToMySqlDateFormat(Date.now())}</p></div>
              `,
              );
              if (msg !== 'Upload images') {
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

              }
            
          }
        });
 
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
