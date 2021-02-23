
var express = require("express");
var app = module.exports = express();
var multer = require("multer");
const fs = require('fs');
const upload = require("../middlewares/upload");
const connection = require("../db.js");
const { reject } = require("lodash");
const elementsController = require("../controllers/bridgeElementsController")
const modelsController = require("../controllers/modelsController")
const storage = require("../utils/storage").storage


// // If modifying these scopes, delete token.json.
// const scopes = ["https://www.googleapis.com/auth/drive"];
// const auth = new google.auth.JWT(
//   credentials.client_email, null,
//   credentials.private_key, scopes
// );
// const drive = google.drive({ version: "v3", auth });

// let storage = multer.diskStorage({
//   destination: function (req, file, callback) {
//     callback(null, DIR);
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
//   }
// });

// let upload = multer({storage: storage});
//BRIDGES ROUTES
app.get("/bridges", function(req, res){
  console.log("getting bridges")
  var q = "SELECT * FROM tbl_bridges";
  connection.query(q, function (error, results) {
  if (error) res.send(error);

  res.send(results);
  });
 });
app.post("/bridges", upload.single("file"), function(req, res){
  console.log("creating new bridge", req.body);

  const bridge = req.body;
  const bridgesFolderId = "1CCyEtBXApcV1hBVb5LPVRqTu1Cyg6iwM"
  createBridgeAndFolder(bridge, bridgesFolderId, ["Surveys", "General"])
  .then(results => res.send(results))
 }); 

const createBridgeAndFolder = async (bridge, parentId, subFolders) => {
  try {
    const bridgeResult = await createNewBridge(bridge)
    console.log("bridgeResulttttttt", bridgeResult)
    // const bridgeFolder = await createFolderInGoogleDrive("bid_"+bridgeResult.insertId, parentId);
    // console.log("bridgeFolder", bridgeFolder)
    const bucketName = "3dbia_organization_"+bridge.organization_id
    const folder = await storage.bucket(bucketName).upload("base_folder_file.txt", {
      destination: `bid_${bridgeResult.insertId}/`+"base_folder_file.txt"
    });
    console.log("folder", folder)
    const subFolder = await storage.bucket(bucketName).upload("base_folder_file.txt", {
      destination: `bid_${bridgeResult.insertId}/`+"general_files/base_folder_file.txt"
    });
    console.log("subFolder", subFolder)
    return ({
      bridgeResult,
      folder,
      subFolder
    })
  } catch (err) {
    return err
  }


}
const createNewBridge = (bridge) => {
  return new Promise((resolve, reject) => {
    const q = `INSERT INTO tbl_bridge_list
          (name, bridge_type, bridge_type_code, structure_name, description, organization_id, lon, lat, x, y, bridge_status, main_road, location, spans)
           VALUES ( "${bridge.name}", "${bridge.bridge_type}", "${bridge.bridge_type_code}", "${bridge.structure_name}", "${bridge.description}",
           ${bridge.organization_id}, ${bridge.lon}, ${bridge.lat}, ${bridge.x}, ${bridge.y}, "${bridge.bridge_status}", "${bridge.main_road}", "${bridge.location}", ${bridge.spans})`;
          //  console.log(q)
  connection.query(q, function (error, result) {
    console.log(result)
    if (error) reject(error);
    else {

      resolve(result)

      }
    });
  })
}

const createFolderInGoogleCloud = async (folderName, bucketName) => {
  const folder = await storage.bucket(bucketName).upload("base_folder_file.txt", {
    destination: folderName+"base_folder_file.txt"
  });
  return folder
}
const createFolderInGoogleDrive = (folderName, parentId) => {
  return new Promise((resolve, reject) => {
    //google drive api
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

const createFolders = (folderNames, parentId) => {
  return Promise.all(folderNames.map(async (folderName) => {
    const result = await createFolderInGoogleDrive(folderName, parentId);
    return result
    // console.log(result)
    })
  )
}

const createBridgeFolders = (parentId, folders) => {
  return new Promise((resolve, reject) => {

  })
}
app.get("/bridges/:id", async function(req, res){
  console.log('getting bridgeeeeeeee')
  const id = req.params.id
  try {
    const basicBridgeInfo = await getBridgeBasicInfo(id)
    console.log('basicBridgeInfo', basicBridgeInfo)
    const bucketName = `3dbia_organization_${basicBridgeInfo[0].organization_id}`;
    const fileName = `bid_${id}/folder_structure.csv`
    // const fileName = `folder_structure.csv`
    const folderStructureFile = await getFile(bucketName, fileName);
    let folderFile = null
    // console.log('folderStructureFile', folderStructureFile)
    if (folderStructureFile.length) {
      folderFile = await readFile(bucketName, fileName);

    }
    console.log('folderFile', folderFile)
    // console.log("basicBridgeInfo", basicBridgeInfo)
    // const bridgeDetails = await getBridgeDetails(id)
    // const model = await getBridgeMainGlbModel(basicBridgeInfo.primary_model_id)
    // console.log("model". model)
    res.send({basicBridgeInfo, folderFile});

  } catch (err) {
    res.send(err)
  }
});
const getBridgeBasicInfo = (bridgeId) => {

  return new Promise((resolve, reject) => {
    var q = "SELECT * FROM tbl_bridge_list WHERE bid = " + bridgeId;
  
    connection.query(q, function (error, results) {
      if (error) {
        // console.log(error)
        reject(error)
      } else {
        // console.log(results)
        resolve(results)

      }
    })
  });
  
}
const getFile = (bucketName, filePrefix) => {
  console.log(bucketName, filePrefix)
  return new Promise((resolve, reject) => {
    const bucket = storage.bucket(bucketName);
    bucket.getFiles({
      prefix: filePrefix
    }, function(err, file) {
      if (err) {
        reject(err)        
      } else {
        resolve(file)
      }

    })
  })
}
const readFile = (bucketName, fileName) => {
  console.log(bucketName, fileName)
  return new Promise((resolve, reject) => {
    const bucket = storage.bucket(bucketName);
    const remoteFile = bucket.file(fileName);
    // console.log('remoteFile', remoteFile)
    remoteFile.download(function(err, contents) {
      if (err) reject (err)
      console.log('contents', contents)
      // console.log(contents.toString())
      resolve(contents.toString())
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
  })
}


app.get("/bridges/:id/model/:modelId", async function(req, res){
  console.log("getting bridge GLB model")
  const modelId = req.params.modelId
  try {
    
    const model = await getBridgeMainGlbModel(modelId)
    console.log(model)
    res.send(model);

  } catch (err) {
    res.send(err)
  }
});
app.put("/bridges/:id/model/:modelId", function(req, res){
  console.log("updating bridge GLB model")
  const modelId = req.params.modelId
  var q = `UPDATE tbl_bridge_list
    SET primary_model_id = ${modelId}       
    WHERE bid = ${req.params.id};`;
    connection.query(q, function(err, result) {
      if (err) throw err;

      res.send(result);
    });
});

app.get("/bridges/:id/details", async function(req, res){
  console.log("getting bridge details")
  const id = req.params.id
  try {
    
    const bridgeDetails = await getBridgeDetails(id)
    console.log(bridgeDetails)
    res.send(bridgeDetails);

  } catch (err) {
    res.send(err)
  }
});

const getBridgeMainGlbModel = (modelId) => {
  console.log("getting model")
  return new Promise((reject, resolve) => {
    var q = "SELECT * FROM tbl_bridge_models WHERE id = " + modelId;
    // console.log(q)
    connection.query(q, function (error, results) {
      if (error) {
        reject(error)
      } else {
        resolve(results)

      }
    })
  });
  
}
const getBridgeDetails = (bridgeId) => {

  return new Promise((reject, resolve) => {
    var q = "SELECT * FROM tbl_custom_fields WHERE parent_id = " + bridgeId;
    console.log(q)
    connection.query(q, function (error, results) {
      if (error) {
        reject(error)
      } else {
        resolve(results)

      }
    })
  });
  
}
app.put("/bridges/:id", async function(req, res){
  if (req.body.col_order) {
    updateBridgeField(req.body, req.params.id, res )

  } else {
    updateBridge(req.body, req.params.id, res)

  }

});
app.put("/bridges/:id/defaultView", async function(req, res){
  console.log('updateBridgeDefaultView')
  console.log(req.body)
  var q = `UPDATE tbl_bridge_list
          SET default_view_data = '${JSON.stringify(req.body)}'
          WHERE bid = ${req.params.id};`
  connection.query(q, function(err, result) {
    if (err) throw(err);

    res.send(result);
  });

});

function updateBridge(bridge, bridgeId, res) {
  console.log(bridgeId)
  var q = `UPDATE tbl_bridge_list
  SET name = "${bridge.name}",
      bridge_type = "${bridge.bridge_type}",
      bridge_type_code = "${bridge.bridge_type_code}",
      structure_name = "${bridge.structure_name}",
      description = "${bridge.description}",
      lat = ${bridge.lat},
      lon = ${bridge.lon},
      x = ${bridge.x},
      y = ${bridge.y},
      bridge_status = "${bridge.bridge_status}",
      image_url = "${bridge.image_url}",
      primary_model_id = ${bridge.primary_model_id}
  WHERE bid = ${bridgeId};`

  // console.log(q)
  connection.query(q, function(err, result) {
    if (err) throw(err);

    res.send(result);
  });
}
function updateBridgeField(field, bridgeId, res) {
  console.log(bridgeId)
  var q = `UPDATE tbl_custom_fields
  SET col${field.col_order} = "${field.value}"      
  WHERE parent_id = ${bridgeId};`

  console.log(q)
  connection.query(q, function(err, result) {
    if (err) throw(err);

    res.send(result);
  });
}
app.get("/bridges/:id/processes", function(req, res){
  console.log(req.params);
  const id = req.params.id
  console.log("getting bridge processes")
  var q = "SELECT * FROM tbl_processes WHERE bid = " + req.params.id;
  connection.query(q, function (error, results) {
  if (error) throw error;

  res.send(results);
  });
});
app.get("/bridges/:id/folders", function(req, res){
  console.log(req.params);
  const id = req.params.id
  console.log("getting bridge processes")
  var q = "SELECT * FROM tbl_processes WHERE bid = " + req.params.id;
  connection.query(q, function (error, results) {
  if (error) throw error;

  res.send(results);
  });
});
app.get("/bridges/:id/tasks", function(req, res){
  console.log(req.params);
  const id = req.params.id
  console.log("getting bridge processes")
  var q = "SELECT * FROM tbl_tasks WHERE bid = " + req.params.id;
  connection.query(q, function (error, results) {
  if (error) throw error;

  res.send(results);
  });
});


app.get("/bridges/:id/spans", function(req, res){
  console.log("getting bridge spans", req.params)
  console.log(req.params);
  const id = req.params.id
  var q = "SELECT * FROM tbl_bridge_spans WHERE bid = " + req.params.id;
  console.log(q)
  connection.query(q, function (error, results) {
    if (error) throw error;

    res.send(results);
  });
});
app.get("/bridges/:id/surveys", function(req, res){
  console.log("getting bridge surveys", req.params)
  console.log(req.params);
  const id = req.params.id
  var q = "SELECT * FROM tbl_survey WHERE bid = " + req.params.id;
  console.log(q)
  connection.query(q, function (error, results) {
    if (error) throw error;

    res.send(results);
  });
});
app.post("/bridges/:id/spans", async function(req, res){
  console.log("saving bridge spans", req.body);
  const spans = req.body;
  let spansToCreate = [];
  let spansToUpdate = []
  spans.forEach((span, index) => {
     
      span.span_order = index + 1
      if (span.id) spansToUpdate.push(span)
      else spansToCreate.push(span)
  })
  let created = []
  let updated
  if (spansToCreate.length) {
    created = await createSpans(spansToCreate)
    console.log("created", created)
  }
  if (spansToUpdate.length) {
    updated = await updateSpans(spansToUpdate)
  }
  // res.send({created: spansToCreate, updated: spansToUpdate})
  res.send([...created, ...spansToUpdate])
});


app.delete("/spans/:spanId/:userId", async function(req, res){
  console.log("deleting bridge span", req.body);

  const resetElementQ = `UPDATE tbl_bridge_elements
  SET span_id = ${null},
      element_group_id = ${null},
      element_type_id = ${null},
      element_order = ${null},
      element_type_name = ${null},
      importance = ${null},
      primary_unit = ${null},
      primary_quantity = ${null},
      secondary_unit = ${null},
      secondary_quantity = ${null},
      detailed_evaluation_required = ${null},
      view_position = ${null},
      last_updated = now(),
      updated_by_user_id = ${req.params.userId},
      default_view_data = ${null}
  WHERE span_id = ${req.params.spanId};`

  connection.query(resetElementQ, function(err, result) {
    if (err) throw(err);
    const updatedElements = result
    console.log("updatedElements", updatedElements)
    // return(result);
    var q = "DELETE FROM tbl_bridge_spans WHERE id = " + req.params.spanId;
    console.log(q)
    connection.query(q, function (error, results) {
      if (error) throw error;
      const deletedSpan = results

      res.send({updatedElements, deletedSpan});
    });

  // res.send({created: spansToCreate, updated: spansToUpdate})
  });
});



// const createSpans = async (spans) => {
//   console.log("createSpans", spans )
//   return new Promise((resolve, reject) => {
//     var q = `INSERT INTO tbl_bridge_spans (bid, structure_type_id, name, description, span_order, span_area, status) VALUES ?`;
//     const values = convertObjArrayToArray(spans)
//     connection.query(q, [values], function(err, result) {
//       if (err) reject(err) ;
//       // if (err) res.send(err);
//       console.log("result", result)
//       resolve(spans) ;
//       // res.send(result);
//     });

//   })
// } 

const createSpans = async (spans) => {
  return Promise.all(spans.map(span => createSpan(span)))
}

const createSpan = (span) => {
  return new Promise((resolve, reject) => {
    var q = `INSERT INTO tbl_bridge_spans (bid, structure_type_id, name, description, span_order, span_area, status) 
    VALUES (${span.bid}, ${span.structure_type_id}, "${span.name}", "${span.description}", ${span.span_order},  ${span.span_area}, "${span.status}")`;
    connection.query(q, function(err, result) {
      if (err) reject(err) ;
      // if (err) res.send(err);
      const createdSpan = {...span, id: result.insertId}
      // console.log("result", createdSpan)
      resolve(createdSpan) ;
      // res.send(result);
    });
  })
}

const updateSpans = async (spans) => {
  return Promise.all(spans.map(span => updateSpan(span)))
}

const updateSpan = (span) => {
  return new Promise((resolve, reject) => {
    var q = `UPDATE tbl_bridge_spans
    SET name = "${span.name}",
        structure_type_id = ${span.structure_type_id ? span.structure_type_id: null},
        description = "${span.description}",
        span_order = ${span.span_order},
        span_area = ${span.span_area ? span.span_area: null},
        status = "${span.status}"
    WHERE id = ${span.id};`

  console.log(q)
  connection.query(q, function(err, result) {
    if (err) reject(err) ;

    resolve(result);
  });
  })
}
app.get("/bridges/:id/elements", function(req, res){
  // console.log(req.params);
  const id = req.params.id
  console.log("getting bridge spans")
  // var q = "SELECT * FROM tbl_bridge_elements WHERE bid = " + req.params.id;
  var q = `SELECT be.*, u.first_name as updatedBy FROM tbl_bridge_elements be
  INNER JOIN tbl_users u
  ON be.updated_by_user_id = u.id 
  where bid = ${req.params.id};`;
  connection.query(q, function (error, results) {
  if (error) throw error;

  res.send(results);
  });
});
app.post("/bridges/:id/elements", function(req, res){
  console.log("creating new bridge elements");
  const elemets = req.body;
  
  var q = `INSERT INTO tbl_bridge_elements (bid, span_id, bridge_model_id, object_id, name, updated_by_user_id, last_updated) VALUES ?`;
  const values = convertObjArrayToArray(elemets)
  // console.log(values)
  connection.query(q, [values], function(err, result) {
    if (err) res.send(err);

    res.send(result);
  });

});

const updateElementQuery = (element) => {
  
  element.primary_quantity = +element.primary_quantity
  const q = `UPDATE tbl_bridge_elements
  SET span_id = ${element.span_id},
      name = "${element.name}",
      element_group_id = ${element.element_group_id},
      element_type_id = ${element.element_type_id},
      element_order = ${element.element_order},
      element_type_name = "${element.element_type_name}",
      importance = "${element.importance}",
      primary_unit = "${element.primary_unit}",
      primary_quantity = ${element.primary_quantity},
      secondary_unit = "${element.secondary_unit}",
      secondary_quantity = ${element.secondary_quantity ? element.secondary_quantity: null},
      detailed_evaluation_required = "${element.detailed_evaluation_required}",
      remarks = "${element.remarks}",
      view_position = "${element.view_position}",
      last_updated = now(),
      updated_by_user_id = ${element.updated_by_user_id},
      default_view_data = '${element.default_view_data}'
  WHERE object_id = "${element.object_id}";`
  console.log(q)
  return q
}
app.put("/bridges-elements/:id", function(req, res){
  console.log("updating element", req.body);
  const element = req.body;
  const q = updateElementQuery(element, req.params.id)
  connection.query(q, function(err, result) {
    if (err) res.send(err);

    res.send(result);
  });


});
app.put("/bridges-elements", async function(req, res){
  console.log("updating elements");
  // console.log(req.params)
  const elements = req.body; 
  let queries = "";
  elements.forEach(function (element) {
    queries += updateElementQuery(element)
  });
  connection.query(queries, function(err, result) {
    if (err) throw(err);

    res.send(result);
  });


});


app.post("/bridges-elements/createUpdateDelete/:userId", async function(req, res){
  console.log("createUpdateDelete elements", req.body);
  // let deletedElements = []
  // let newElements = []
  // let resetedElements = []
  try {
    const deletedElements = req.body.deleteElementsIds? await elementsController.deleteElements(req.body.deleteElementsIds) : []
    const newElements = req.body.newElements ? await elementsController.createElements(req.body.newElements) : []
    const resetedElements = req.body.resetElemetsIds ? await elementsController.resetElements(req.body.resetElemetsIds, req.params.userId) : []
    console.log("deletedElements", deletedElements)
    console.log("newElements", newElements)
    console.log("resetedElements", resetedElements)
    res.send({deletedElements, resetedElements, newElements})

  } catch (error) {
    res.send(error)
  }
  // connection.query(queries, function(err, result) {
  //   if (err) throw(err);

  //   res.send(result);
  // });


});

app.put("/bridges-spans/:id", function(req, res){
  console.log("updating span", req.body);
  const span = req.body;
  var q = `UPDATE tbl_bridge_spans
  SET name = "${span.name}",
      structure_type_id = ${span.structure_type_id ? span.structure_type_id: null},
      description = "${span.description}",
      span_order = ${span.span_order},
      span_area = ${span.span_area ? span.span_area: null},
      status = "${span.status}"
  WHERE id = ${req.params.id};`

  connection.query(q, function(err, result) {
    if (err) throw(err);

    res.send(result);
  });


});


app.get("/bridges-models/:id", function(req, res){
  console.log(req.params);
  const id = req.params.id
  console.log("getting bridge models")
  var q = "SELECT * FROM tbl_bridge_models WHERE bid = " + req.params.id;
  connection.query(q, function (error, results) {
  if (error) throw error;

  res.send(results);
  });
});
app.post("/bridges-models", function(req, res){
  console.log("creating new bridge model", req.body);
  const model = req.body
  // const values = createProjectsArray([bridge])[0]
  // console.log(values)
  const result = modelsController.createBridgeModel(model)
  res.send(result)
  // var q = `INSERT INTO tbl_bridge_models
  //         (model_part, task_id, survey_id, bid, date_created, created_by, last_update, updated_by, status, name, url,
  //           type, remarks, calibration_data, ion_id)
  //          VALUES (${model.model_part ? model.model_part : null}, ${model.task_id}, ${model.survey_id}, 
  //           ${model.bid}, now(), "${model.created_by}", now(),
  //          "${model.created_by}", "${model.status}", "${model.name}", "${model.url}", "${model.type}",
  //          "${model.remarks}", '${model.calibration_data}', ${model.ion_id ? model.ion_id : null})`;
  //          console.log(q)
  // connection.query(q, function (error, result) {
  //   console.log(result)
  //   if (error) res.send(error);
  //   else res.send(result);
  //   });
 });

app.put("/bridges-models/:id", function(req, res){
  console.log("updating model", req.body);
  const model = req.body;
  var q = `UPDATE tbl_bridge_models
  SET model_part = ${model.model_part},
      last_update = now(),
      updated_by = "${model.updated_by}",
      status = "${model.status}",
      name = "${model.name}",
      url = "${model.url}",
      type = "${model.type}",
      remarks = "${model.remarks}",
      calibration_data = '${model.calibration_data}',
      ion_id = ${model.ion_id}
  WHERE id = ${model.id};`

  console.log(q)
  connection.query(q, function(err, result) {
    if (err) throw(err);

    res.send(result);
  });


});
app.post("/bridges-models/delete/:id", async function(req, res){
  console.log("deleting model", req.body);
  var q = `DELETE FROM tbl_bridge_models WHERE id=${req.params.id}`

  connection.query(q, function(err, result) {
    if (err) {
      res.send(err);
      // return
    }
    // res.send(result)
    storage.bucket(req.body.bucketName).deleteFiles({
      prefix: req.body.prefix
    }, function(err) {
      if (!err) {
        res.send({status: 200})
        // All files in the `images` directory have been deleted.
      } else {
        res.send(err)
      }
    });
    
    // res.send(result);
  });


});
// const bucket = storage.bucket('organization_169')
// console.log(bucket)
// bucket.getFiles(function(err, files) {
//   console.log(err)
//   if (!err) {
//     // files is an array of File objects.
//     console.log(files)
//   }
// });
// storage.bucket('3dbia_organization_169').deleteFiles({
//   prefix: 'bid_1200/survey_559/Models/3d tiles/1614073539016/'
// }, function(err) {
//   if (!err) {
//     console.log('Files Deleted')
//     // All files in the `images` directory have been deleted.
//   } else {
//     console.log(err)
//   }
// });



function convertObjArrayToArray(array) {
  let finalArr = [];
  array.map(obj => finalArr.push(Object.values(obj)))
  return finalArr
}
function convertObjArrayToValues(array) {
  let final = ""
  array.map(obj => {
    let item = JSON.stringify(Object.values(obj))
    item = item.substring(1, item.length-1);
    // console.log(item)
    // console.log(item2)
    const str = `(${item})`
    // console.log(str)

  })
  return final
}

