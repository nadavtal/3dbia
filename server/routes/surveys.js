
const express = require("express");

const app = module.exports = express();
const connection = require("../db.js");
const mySqlUtils = require("../utils/mysqlUtils") 
const convertObjArrayToArray = mySqlUtils.convertObjArrayToArray
const convertToMySqlDateFormat = mySqlUtils.convertToMySqlDateFormat;
const storage = require("../utils/storage").storage
// const {google} = require("googleapis");
// const credentials = require("../credentials.json");

// // If modifying these scopes, delete token.json.
// const scopes = ["https://www.googleapis.com/auth/drive"];
// const auth = new google.auth.JWT(
//   credentials.client_email, null,
//   credentials.private_key, scopes
// );
// const drive = google.drive({ version: "v3", auth });
//SURVEY ROUTES
app.post("/surveys", function(req, res){
  console.log("creating new surveys");
  let surveys = req.body.surveys;  
  let survey = req.body.survey;  
  let templateTasks = req.body.templateTasks;


  //create many surveys
  // createSurveysTasksAndFolders()
  // .catch(err => res.send(err))

  //create one Survey
  createSurveyTasksAndFoldersInGoogleCloud(survey, templateTasks, res)
  // console.log("results", results)
  // res.send(results)
 });

 
app.put("/surveys/:id/status/:status", function(req, res){
  // console.log(req.body)
  var q = `UPDATE tbl_survey
  SET status = "${req.params.status}" WHERE id = ${req.params.id};`
  console.log(q)
  connection.query(q, function (error, results) {
  if (error) res.send(error);

  res.send(results);
 });
})

 
 app.get("/surveys/:id", function(req, res){
  //  console.log(req.params)
  console.log("getting survey")
  var q = "SELECT * FROM tbl_survey WHERE id = " + req.params.id;
  connection.query(q, function (error, results) {
  if (error) throw error;
  // console.log(results)
  res.send(results);
  });
 });
 app.get("/surveys/:id/models", function(req, res){
  //  console.log(req.params)
  console.log("getting survey models")
  var q = "SELECT * FROM tbl_bridge_models WHERE survey_id = " + req.params.id;
  connection.query(q, function (error, results) {
  if (error) throw error;
  // console.log(results)
  res.send(results);
  });
 });
 app.get("/surveys/:id/org/:org_id/bid/:bid/files", function(req, res){
  console.log("getting survey files", req.params)
  const bucket = storage.bucket(`3dbia_organization_${req.params.org_id}`);
  try {
    bucket.getFiles({
      prefix: `bid_${req.params.bid}/survey_${req.params.id}/`
    }, async function(err, files) {
      if (err) {
        throw err
        // res.send(err) 
        // files is an array of File objects.
      }
      const folderFiles = files.filter(file => file.name.includes("base_folder_file.txt"))
      //remove basic text files
      files = files.filter(file => !file.name.includes("base_folder_file.txt"))
      const smallImages = files.filter(file => file.name.includes("Images") && file.name.includes("_small_image"))
      const fullImages = files.filter(file => file.name.includes("Images") && !file.name.includes("_small_image"))
      
      const glbModels = files.filter(file => file.name.includes("Glb"))
      const tiles = files.filter(file => file.name.includes("3d tiles") && file.name.includes(".json") && !file.name.includes("Data"))
      // console.log(tiles)
      // const tilesMedialLinks = tiles.map(tile => tile.metadata.mediaLink)
      const publicUrls = tiles.map(tile => `https://storage.googleapis.com/${tile.bucket.name}/${tile.name}`)
      await checkIfTilesExistAndAddIfNot(publicUrls, req.params.bid, req.params.id)
      res.send({
        smallImages,
        fullImages,
        glbModels,
        tiles,
        folderFiles
      });
  

    });
  } catch (err) {
    throw err
  }
});

const getTiles = (publicUrls) => {
  // console.log(publicUrls)
  // return new Promise((resolve, reject) => {
  //   const q = `SELECT * FROM tbl_bridge_models Where url in (${publicUrls})`;
  //   // const q = "SELECT * FROM card WHERE name LIKE CONCAT('%', ?,  '%')", tileName;
  //   connection.query(q, function (error, results) {
  //     if (error) reject(error);

  //     resolve(results);
  //   })
  // })
  return Promise.all(publicUrls.map(url => {
    console.log(url)
    // console.log(tileNameString)
    return new Promise((resolve, reject) => {
      const q = `SELECT * FROM tbl_bridge_models Where url = '${url}'`;
      // const q = "SELECT * FROM card WHERE name LIKE CONCAT('%', ?,  '%')", tileName;
      connection.query(q, function (error, results) {
        if (error) reject(error);
        if (results.length) resolve(results[0]);
        else resolve(null)
        
      })
    })

  }))
}

const createTiles = (urls) => {
  return Promise.all(urls.map(url => {
    return new Promise((resolve, reject) => {
  
      var q = `INSERT INTO tbl_bridge_models
      (survey_id, bid, date_created, url, type)
       VALUES (${model.survey_id}, ${model.bid}, now(),"${url}", model)`;
       console.log(q)
      connection.query(q, function (error, result) {
      console.log(result)
      if (error) reject(error);
      resolve(result);
      });
    })

  }))
}

const checkIfTileExistAndAddIfNot = async (url, bid, surveyId) => {
  return new Promise((resolve, reject) => {
    let q = `SELECT * FROM tbl_bridge_models Where url = '${url}'`;
    // const q = "SELECT * FROM card WHERE name LIKE CONCAT('%', ?,  '%')", tileName;
    connection.query(q, function (error, results) {
      if (error) reject(error);
      if (results.length) {
        resolve(null)
      }
      else {
        q = `INSERT INTO tbl_bridge_models
        (name, survey_id, bid, date_created, url, type)
        VALUES ("${url.split('/')[url.split('/').length - 1]}", ${surveyId}, ${bid}, now(),"${url}", "model")`;
        console.log(q)
        connection.query(q, function (error, result) {
        console.log(result)
        if (error) reject(error);
        resolve(url);
        });
        }
      
    })
  }) 
}

const checkIfTilesExistAndAddIfNot = async (publicUrls, bid, surveyId) => {
  return Promise.all(publicUrls.map(url => checkIfTileExistAndAddIfNot(url, bid, surveyId)))
  // const tiles = await getTiles(publicUrls)
  // console.log('tiles', tiles)
  // if (!tiles.length) {
  //   const newTiles = await createTiles(publicUrls, bid, surveyId)
  //   return newTiles
  // } else {
  //   return null
  // }
}

async function createSurveyTasksAndFoldersInGoogleCloud(survey, templateTasks, res) {

  const surveyResult = await createSurvey(survey)
  console.log("surveyResult", surveyResult)
  if (surveyResult.insertId) {
    survey.id = surveyResult.insertId;
    const bucketName = "3dbia_organization_"+survey.organization_id

      //create tasks
    const newTasksResult = await createTasks(survey, templateTasks)
    // console.log("newTasksResult", newTasksResult)
    //create folders
    const newCloudFolderResult = await createGoogleCloudFolders(survey);
    console.log("newCloudFolderResult", newCloudFolderResult)
    // const subFolders = newDriveFolderResult.subFolders.map(folder => folder.subFoldersResult.map(subFolder => subFolder.data.id))
    // console.log(subFolders)
    res.send({
        surveyResult,
        newTasksResult,
        newCloudFolderResult
      })
    // return {
    //       surveyResult,
    //       newTasksResult,
    //       newDriveFolderResult
    //     }
  }
}

async function createSurveyTasksAndFoldersInGoogleDrive(survey) {
  let destinationBridgeFolder = await drive.files.list({
    q: `name = "bid_${survey.bid}"`,
    // q: `mimeType = "application/vnd.google-apps.folder" and "bid_${survey.bid}" in parents`,
    pageSize: 1,
    fields: "files(name, webViewLink, id, webContentLink)",
    // orderBy: "createdTime desc"
  });
  // console.log("destinationBridgeFolder", destinationBridgeFolder.data)
  const testinationBridgeFolderId = destinationBridgeFolder.data.files[0].id
  let bridgeFolderChildren = await drive.files.list({
    // q: `name = "bid_${survey.bid}"`,
    q: `mimeType = "application/vnd.google-apps.folder" and "${testinationBridgeFolderId}" in parents and name ="Surveys"`,
    pageSize: 50,
    fields: "files(name, webViewLink, id, webContentLink)",
    // orderBy: "createdTime desc"
  });
  // console.log("bridgeFolderChildren", bridgeFolderChildren.data)
  const testinationSurveysFolderId = bridgeFolderChildren.data.files[0].id
  // create surveys
  const surveyResult = await createSurvey(survey)
  // console.log("surveyResult", surveyResult)
  if (surveyResult.insertId) {
    survey.id = surveyResult.insertId
      //create tasks
    const newTasksResult = await createTasks(survey, templateTasks)
    // console.log("newTasksResult", newTasksResult)
    //create folders
    const newDriveFolderResult = await createGoogleDriveFolders(survey, testinationSurveysFolderId);
    // console.log("newDriveFolderResult", newDriveFolderResult)
    // const subFolders = newDriveFolderResult.subFolders.map(folder => folder.subFoldersResult.map(subFolder => subFolder.data.id))
    // console.log(subFolders)
    res.send({
        surveyResult,
        newTasksResult,
        newDriveFolderResult
      })
    // return {
    //       surveyResult,
    //       newTasksResult,
    //       newDriveFolderResult
    //     }
  }
}

async function createSurveysTasksAndFolders() {

  const results = await Promise.all(
    surveys.map(survey => createSurveyTasksAndFoldersInGoogleDrive(survey))
  )
  console.log("RESULTS", results)
  res.send(results)
}
 const createSurvey = (survey) => {
  return new Promise((resolve, reject) => {
    const q = `INSERT INTO tbl_survey (
      name,
      bid,
      provider_id,
      organization_id,
      process_template_name,
      survey_year,
      survey_purpose,
      entire_structure,
      createdAt,
      created_by,
      remarks,
      updatedAt,
      status,
      start_date,
      due_date)
      VALUES 
      (
      "${survey.name}",
      ${survey.bid},
      ${survey.provider_id},
      ${survey.organization_id},
      "${survey.process_template_name}",
      ${survey.survey_year},
      "${survey.survey_purpose}",
      "${survey.entire_structure}",
      "${survey.date_created}",
      "${survey.created_by}",
      "${survey.remarks}",
      "${survey.last_update}",
      "${survey.status}",
      "${survey.start_date}",
      "${survey.due_date}");
      `;
  
    // console.log(q)
    connection.query(q, function (error, result) {
    if (error) reject(error);
    
    resolve(result);
    });
  })
  
  }
 const createTasks = (survey, templateTasks) => {
  let newTasks = []
  // console.log(action.templateTasks)
  templateTasks.forEach(task => {
    const newTask = {
      name: task.task_name,
      survey_type: "",
      description: task.task_description,
      task_inputs: task.task_inputs,
      task_outputs: task.task_outputs,
      bid: survey.bid,
      survey_id: survey.id,
      user_id: null,
      organization_id: survey.organization_id,
      provider_id: survey.provider_id,
      role_type_id: task.role_type_id,
      status: "Unallocated",
      created_by: survey.created_by,
      remarks: "",
      due_date: survey.due_date,
      pre_task_id: null,
      next_task_id: null,
      task_order: task.task_order,
      completed: 0,
      createdAt: convertToMySqlDateFormat(new Date),
      updatedAt: convertToMySqlDateFormat(new Date),
      sub_tasks_names: task.sub_tasks_names,
      sub_tasks_dates: task.sub_tasks_dates,
      sub_tasks_remarks: task.sub_tasks_remarks,
      sub_tasks_file_types: task.sub_tasks_file_types

    }
    newTasks.push(newTask)
    

  });
  
  return new Promise((resolve, reject) => {
    const q = `INSERT INTO tbl_tasks (name, survey_type, description, task_inputs, task_outputs, bid, survey_id,
      user_id, organization_id, provider_id, role_type_id, status, created_by, remarks,
      due_date, pre_task_id, next_task_id, task_order, completed, createdAt, 
      updatedAt, sub_tasks_names, sub_tasks_dates, sub_tasks_remarks, sub_tasks_file_types) VALUES ?`;
    const values = convertObjArrayToArray(newTasks)
    connection.query(q, [values], function(err, result) {
      if (err) reject(err);

      resolve(result);
      });
    })
  
  }
  const createGoogleDriveFolders = async (survey, destibationFolderId) => {
    // return new Promise((resolve, reject) => {
      // const publicFolderId = destibationFolderId;
      const surveyFolderName = "survey_"+survey.id
      const mainSubFolders = ["Images", "Lidar", "Models", "Other"]
      const folderTree = [
        {
          name: "Images",
          subFolders: ["Circles", "Facades", "Below", "Bearings", "Columns", "Parallel", "360", "General", "Metadata"]  
        },
        {
          name: "Lidar",
          subFolders: ["E57", "Las/ply"]  
        },
        {
          name: "Models",
          subFolders: ["Osgb", "3d tiles", "Skp", "Osg", "Glb"]  
        },
        {
          name: "Other",
          subFolders: ["General"]  
        },
      ]
      // create main survey folder
      const mainSurveyFolderResult = await createFolder(surveyFolderName, destibationFolderId);
      
      if (mainSurveyFolderResult.status == 200 && mainSurveyFolderResult.data.id) {
        //Create sub folders
        try {
          const subFolders = await Promise.all(folderTree.map(
              folder => createFolderAndSubFolders(folder.name, folder.subFolders, mainSurveyFolderResult.data.id)
              ))
          const foldersToDb = []
            console.log("subFolders", subFolders)
          subFolders.forEach(subFolderGroup => subFolderGroup.subFoldersResult.forEach(subFolder => foldersToDb.push({
            bid: survey.bid,
            survey_id: survey.id,
            folder_id: subFolder.data.id
          })))
          // console.log("foldersToDb", foldersToDb)
          const dbFolders = await addFoldersToDb(foldersToDb)
          // console.log(dbFolders)
          return {
            mainSurveyFolderResult,
            subFolders
          }
  
        } catch (err) {
            return err
        }
  
        // await Promise.all(folderTree.map(
        //   folder => createFolderAndSubFolders(folder.name, folder.subFolders, mainSurveyFolderResult.data.id)
        //   )).then(subFoldersResult => {
        //     console.log("subFoldersResult", subFoldersResult)
        //     return({
        //       mainSurveyFolderResult,
        //       subFoldersResult
        //     })
  
        //   })
      } else {
        console.log("error creating mainSurveyFolderResult", mainSurveyFolderResult)
      }
    }
 const createGoogleCloudFolders = async (survey) => {
  // return new Promise((resolve, reject) => {
    // const publicFolderId = destibationFolderId;
    const surveyFolderName = "survey_"+survey.id
    const mainSubFolders = ["Images", "Lidar", "Models", "Other"]
    const folderTree = [
      {
        name: "Images",
        subFolders: ["Circles", "Facades", "Below", "Bearings", "Columns", "parallel", "360", "General", "Metadata"]  
      },
      {
        name: "Lidar",
        subFolders: ["E57", "Las/ply"]  
      },
      {
        name: "Models",
        subFolders: ["Osgb", "3d tiles", "Skp", "Osg", "Glb"]  
      },
      {
        name: "Other",
        subFolders: ["General"]  
      },
    ]
    // create main survey folder    
    const bucketName = "3dbia_organization_"+survey.organization_id;
    const newFileDirPath = `bid_${survey.bid}/${surveyFolderName}/`
    const mainSurveyFolderResult = await storage.bucket(bucketName).upload("base_folder_file.txt", {
      destination: newFileDirPath+"base_folder_file.txt"
    });
    console.log("mainSurveyFolderResult", mainSurveyFolderResult)
    const subFolders = await Promise.all(
      folderTree.map(folder =>
        createFolderAndSubFoldersInGCS(
          bucketName,
          newFileDirPath+folder.name,
          folder.subFolders,
        ),
      ),
    );
    console.log(subFolders)
    return {
      mainSurveyFolderResult,
      subFolders
    }
    // if (mainSurveyFolderResult.status == 200 && mainSurveyFolderResult.data.id) {
    //   //Create sub folders
    //   try {
    //     const subFolders = await Promise.all(folderTree.map(
    //         folder => createFolderAndSubFolders(folder.name, folder.subFolders, mainSurveyFolderResult.data.id)
    //         ))
    //     const foldersToDb = []
    //       console.log("subFolders", subFolders)
    //     subFolders.forEach(subFolderGroup => subFolderGroup.subFoldersResult.forEach(subFolder => foldersToDb.push({
    //       bid: survey.bid,
    //       survey_id: survey.id,
    //       folder_id: subFolder.data.id
    //     })))
    //     // console.log("foldersToDb", foldersToDb)
    //     const dbFolders = await addFoldersToDb(foldersToDb)
    //     // console.log(dbFolders)
    //     return {
    //       mainSurveyFolderResult,
    //       subFolders
    //     }

    //   } catch (err) {
    //       return err
    //   }

    //   // await Promise.all(folderTree.map(
    //   //   folder => createFolderAndSubFolders(folder.name, folder.subFolders, mainSurveyFolderResult.data.id)
    //   //   )).then(subFoldersResult => {
    //   //     console.log("subFoldersResult", subFoldersResult)
    //   //     return({
    //   //       mainSurveyFolderResult,
    //   //       subFoldersResult
    //   //     })

    //   //   })
    // } else {
    //   console.log("error creating mainSurveyFolderResult", mainSurveyFolderResult)
    // }
  }
  const createFolderAndSubFoldersInGCS = async (bucketName, mainFolder, subFolders) => {
    try {
      
      const mainSurveyFolderResult = await storage.bucket(bucketName).upload("base_folder_file.txt", {
        destination: `${mainFolder}/base_folder_file.txt`
      });
      console.log("mainSurveyFolderResult", mainSurveyFolderResult)
      try {
        const subFoldersResult = await Promise.all(subFolders.map(subFolder => {
          return storage.bucket(bucketName).upload("base_folder_file.txt", {
            destination: `${mainFolder}/${subFolder}/base_folder_file.txt`
          });
        }))
   
        // console.log("subFoldersResult", subFoldersResult)
        return({
          mainSurveyFolderResult,
          subFoldersResult
          })
        } catch (err) {
          return("error creating subFolders", err)
        }

      } catch (err) {
         return("error creating mainSurveyFolderResult", err)
      }
    }
  const createFolderAndSubFolders = async (mainFolder, subFolders, parentId) => {
    try {
      const mainFolderResult = await createFolder(mainFolder, parentId);

      try {
        const subFoldersResult = await createFolders(subFolders, mainFolderResult.data.id)
        // console.log("subFoldersResult", subFoldersResult)
        return({
            mainFolderResult,
            subFoldersResult
          })
        } catch (err) {
          return("error creating subFolders", err)
        }

      } catch (err) {
         return("error creating mainSurveyFolderResult", err)
      }
    }

  const createFolders = (folderNames, parentId) => {
    return Promise.all(folderNames.map(async (folderName) => {
      const result = await createFolder(folderName, parentId);
      return result
      // console.log(result)
      })
    )
  }

  const createFolder = (folderName, parentId) => {
    return new Promise((resolve, reject) => {
      const fileMetadata = {
        "name": folderName,
        "mimeType": "application/vnd.google-apps.folder",
        "parents" : [parentId],
      };
      drive.files.create({
        resource: fileMetadata,
        fields: "id"
      }, function (err, file) {
        if (err) {
          
          // Handle error
          reject(err);
        } else {

          resolve(file);
        }
      });

    })
  }

  const addFoldersToDb = (folders) => {
    return new Promise((resolve, reject) => {
      const q = `INSERT INTO tbl_survey_data (
        bid,
        survey_id,
        folder_id
        )
        VALUES 
        ?`;
        
        const values = convertObjArrayToArray(folders)
        connection.query(q, [values], function(err, result) {
        if (err) reject(err);
        
        resolve(result);
      });
    })
  }
  const addFolderToDb = (survey_id, bid, task_id, data_type, folder_url, folder_id) => {
    return new Promise((resolve, reject) => {
      const q = `INSERT INTO tbl_survey_data (
        bid,
        task_id,
        survey_id,
        data_type,
        folder_url,
        folder_id
        )
        VALUES 
        (
        ${bid},
        ${task_id},
        ${survey_id},
        "${data_type}",
        "${folder_url}",
        "${folder_id}");
        `
      
      connection.query(q, function (error, result) {
        if (error) reject(error);
        
        resolve(result);
      });
    })
  }

  async function getSurevyData(bucketName, bid, survey_id) {
    const bucket = storage.bucket(bucketName);

    bucket.getFiles(function(err, files) {
      if (!err) {
        return err
        // files is an array of File objects.
      }
      return files;
    });
    // const options = {
    //   version: "v4",
    //   action: "write",
    //   expires: Date.now() + minutesToExpiration * 60 * 1000,
    // };
    // const [url] = await storage
    //   .bucket(bucketName)
    //   .file(filename)
    //   .getSignedUrl(options);
    
  }
