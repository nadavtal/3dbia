
var express = require("express");
var app = module.exports = express();
const connection = require("../db.js");
const config = require("../config.js")
const jwt = require("jsonwebtoken");
const generator = require("generate-password");
const upload = require("../middlewares/upload");
const storage = require("../utils/storage").storage
const uploadImage = require("../utils/storage").uploadImage
const request = require("request");
const organizationsController = require("../controllers/organizationsController")

app.get("/organizations", function(req, res){
  
  console.log("getting organizations");
  var q = "SELECT * FROM tbl_organizations";
  connection.query(q, function (error, results) {
  if (error) res.send(error);

  res.send(results);
  });
});
app.post("/organizations", async function(req, res){
  console.log("creating organization", req.body);
  const organization = req.body
  const results = await createOrganizationAndBucket(organization);
 
  // console.log(results)
  res.send(results);
  // var q = `INSERT INTO tbl_organizations ( name, date_created, remarks, created_by, unit_system, engineering_schema, 
  // website, contact_name, phone, address, general_status )
  // VALUES
  // ( "${organization.name}", now(), "${organization.remarks}", "${organization.created_by}", "${organization.unit_system}", "${organization.engineering_schema}",
  // "${organization.website}", "${organization.contact_name}" , "${organization.phone}", "${organization.address}", 
  // "${organization.general_status ? organization.general_status : "Awaiting confirmation"}");`
  // console.log(q)
  // connection.query(q, function (error, results) {
  // if (error) res.send(error);
  // else {
  //   const bucket = await createBucket(`3dbia_organization_${results.insertId}`)
  //   res.send({results, bucket});
  // }
  // });
});
async function createOrganizationAndBucket(organization) {
  const results = await createOrganization(organization)
  // console.log(results);
  const bucketName = `3dbia_organization_${results.insertId}`
  const bucket = await createBucket(bucketName);
  const file = bucket.file("org_files/images/");
  // console.log("file", file)
  const folder = await storage.bucket(bucketName).upload("base_folder_file.txt", {
    destination: "org_files/base_folder_file.txt"
  });
  const tables = await createOrgTables(results.insertId)
  // sendCreateFolderTrigger()
  // console.log(folder)
  return {
    results,
    bucket,
    folder,
    tables
  }
}
function sendCreateFolderTrigger(){
  var clientServerOptions = {
      uri: "https://us-central1-web-3dbia-283508.cloudfunctions.net/create_folder",
      body: "{}",
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      }
  }
  request(clientServerOptions, function (error, response) {
      console.log(error);
      console.log("response", response);
      return;
  });
}
const createOrganization = (organization) => {
  return new Promise((resolve,reject) => {
    const q = `INSERT INTO tbl_organizations ( name, remarks, created_by, engineering_schema, 
      website, contact_name, phone, address, general_status, date_created )
      VALUES
      ( "${organization.name}", "${organization.remarks}", "${organization.created_by}", "${organization.engineering_schema}",
      "${organization.website}", "${organization.contact_name}" , "${organization.phone}", "${organization.address}", 
      "${organization.general_status ? organization.general_status : "Awaiting confirmation"}",  now());`
      // console.log(q)
      connection.query(q, function (error, results) {
        if (error) reject(error);
        resolve(results) 
      })

  })
}
app.get("/organizations/:id", function(req, res){
  console.log("getting organization");

  
  configureBucketCors(`3dbia_organization_${req.params.id}`)
  var q = "SELECT * FROM tbl_organizations where id = "+req.params.id;
  connection.query(q, function (error, results) {
  if (error) res.send(error);

  res.send(results);
  });
});

async function configureBucketCors(bucketName) {
  await storage.bucket(bucketName).setCorsConfiguration([
    {
      maxAgeSeconds: 3600,
      method: ["PUT", "POST", "HEAD", "GET"],
      origin: ["*"],
      responseHeader: ["Authorization", "Content-Range", "Accept", "Content-Type", "Origin", "Range"],
    },
  ]);

  // console.log(`Bucket ${bucketName} was updated with a CORS config
  //     to allow ${method} requests from ${origin} sharing 
  //     ${responseHeader} responses across origins`);
  console.log(`Bucket was updated with a CORS config`)
      
}
async function createBucket(bucketName) {
  // Creates a new bucket in the Asia region with the coldline default storage
  // class. Leave the second argument blank for default settings.
  //
  // For default values see: https://cloud.google.com/storage/docs/locations and
  // https://cloud.google.com/storage/docs/storage-classes

  const [bucket] = await storage.createBucket(bucketName, {
    location: "US-CENTRAL1",
    storageClass: "Standard",
  });
  const opts = {
    includeFiles: true
  };
  configureBucketCors(bucket.name)
  bucket.makePublic(opts, function(err) {
    
    if (err) return err
    // console.log(`Bucket ${bucket.name} created.`);
  });
  return bucket
}
async function createOrgTables(orgId) {
  const tables = await createAutoTables(orgId)
  return tables
  // console.log('tables', tables)
}

const createAutoTables = (orgId) => {
  const tables = [
    'tbl_bridge_type_code',
    'tbl_elements_groups',
    'tbl_elements_types',
    'tbl_structure_type',
    'tbl_bridge_type'
  ]
  return Promise.all(tables.map(table => getNullAndCreateNew(table, orgId)))
}

async function getNullAndCreateNew(tableName, orgId){
  try {
    const newData = await CreateNewData(tableName, orgId)
    console.log('newData', newData)
    const insertNewData = await insertNewRows(tableName, newData)
    console.log('insertNewData', insertNewData)
    return insertNewData
  } catch (err) {
    throw err
  }
  
}

const CreateNewData = (tableName, orgId) => {
  return new Promise((resolve, reject) => {
    var q = `select * from ${tableName} where organization_id IS NULL`;
    connection.query(q, function (error, results) {
      if (error) reject(error);
      let newRows = [...results]
      newRows.forEach(row => {
        row.organization_id = orgId
        delete row.id
      })

      resolve(newRows);
      });
  }) 
}

// return new Promise((resolve, reject) => {
//   try {
    
//     var q = `INSERT INTO tbl_bridge_elements (bid, object_id, name, updated_by_user_id, last_updated) VALUES ?`;
//     // console.log(q)
//     const values = convertObjArrayToArray(elements)
//     console.log('values', values)
//     connection.query(q, [values], function(err, result) {
//         console.log(result)
//         resolve(result) ;
//     });
//   } catch (err) {
//     reject(err) 
//   }

    
// })
function convertObjArrayToArray(array) {
  let finalArr = [];
  array.map(obj => finalArr.push(Object.values(obj)))
  return finalArr
}
const insertNewRows = (tableName, data) => {
  return new Promise((resolve, reject) => {
    const fields = Object.keys(data[0]).map(key => key !== 'id')
    const values = convertObjArrayToArray(data)
    var q = `INSERT INTO ${tableName} (${Object.keys(data[0])}) VALUES ?`;

    connection.query(q, [values], function (error, results) {
      if (error) reject(error);
      
      resolve(results);
      });
  }) 
}
app.put("/organizations/:id", function(req, res){
  const org = req.body
  console.log("updating organization");
  var q = `UPDATE tbl_organizations
  SET name = "${org.name}",
      remarks = "${org.remarks}",
      unit_system = "${org.unit_system}",
      engineering_schema = "${org.engineering_schema}",
      website = "${org.website}",
      email = "${org.email}",
      contact_name = "${org.contact_name}",
      phone = "${org.phone}",
      address = "${org.address}",
      general_status = "${org.general_status}",
      profile_image = "${org.profile_image}"
  WHERE id = ${req.params.id};`

  console.log(q)
  connection.query(q, function (error, results) {
  if (error) res.send(error);

  res.send(results);
  });
});

function updateOrganization(organization, res) {
  var q = `UPDATE tbl_bridge_list
  SET name = "${bridge.name}",
      bridge_type = "${bridge.bridge_type}",
      bridge_type_code = "${bridge.bridge_type_code}",
      structure_name = "${bridge.structure_name}",
      road = "${bridge.road}",
      road_station = ${bridge.road_station},
      inspection_classification = "${bridge.inspection_classification}",
      description = "${bridge.description}",
      year_built = ${bridge.year_built},
      region = "${bridge.region}",
      general_length = ${bridge.general_length},
      max_span_length = ${bridge.max_span_length},
      spans = ${bridge.spans},
      max_width = ${bridge.max_width},
      foundations = "${bridge.foundations}",
      lat = ${bridge.lat},
      lon = ${bridge.lon},
      x = ${bridge.x},
      y = ${bridge.y},
      status = "${bridge.status}",
      image_url = "${bridge.image_url}",
  WHERE bid = ${bridgeId};`

  console.log(q)
  connection.query(q, function(err, result) {
    if (err) throw(err);

    res.send(result);
  });
}

app.get("/organizations/:id/bridges", function(req, res){
  console.log("getting bridges by orgnization: "+ req.params.id);
  var q = "SELECT * FROM tbl_bridge_list where organization_id = "+req.params.id;
  connection.query(q, function (error, results) {
  if (error) res.send(error);

  res.send(results);
  });
});
app.get("/organizations/:id/providers", function(req, res){
  console.log("getting providers by orgnization: "+ req.params.id);
  var q = `SELECT * FROM tbl_providers p
  INNER JOIN tbl_organization_providers op
  ON op.provider_id = p.id
  AND op.organization_id = ${req.params.id}`;
  connection.query(q, function (error, results) {
  if (error) res.send(error);

  res.send(results);
  });
});

app.get("/organizations/:id/projects", function(req, res){
  console.log("getting projects by orgnization: "+ req.params.id);
  var q = "SELECT * FROM tbl_projects where organization_id = "+req.params.id;
  connection.query(q, function (error, results) {
  if (error) res.send(error);

  res.send(results);
  });
});
app.get("/organizations/:id/tasks", function(req, res){
  console.log("getting tasks by orgnization: "+ req.params.id);
  // var q = `SELECT * FROM tbl_tasks t 
  // INNER JOIN tbl_roles_types rt
  // ON t.role_type_id = rt.id 
  // where organization_id = ${req.params.id}`;
  var q = `SELECT * FROM tbl_tasks where organization_id = ${req.params.id}`;
  console.log(q)
  connection.query(q, function (error, results) {
  if (error) res.send(error);

  res.send(results);
  });
});
app.get("/organizations/:id/roles", function(req, res){
  console.log("getting roles by orgnization: "+ req.params.id);
  var q = `SELECT * FROM tbl_roles where organization_id = ${req.params.id}`;
  console.log(q)
  connection.query(q, function (error, results) {
  if (error) res.send(error);

  res.send(results);
  });
});
app.get("/organizations/:id/bridgeTypes", function(req, res){
  console.log("getting roles by orgnization: "+ req.params.id);
  var q = "SELECT * FROM tbl_bridge_type where organization_id = "+ req.params.id;
  console.log(q)
  connection.query(q, function (error, results) {
  if (error) res.send(error);

  res.send(results);
  });
});

app.get("/organizations/:id/project-processes", function(req, res){
  console.log("getting projects processes by orgnization: "+ req.params.id);
  var q = "SELECT * FROM tbl_processes where organization_id = "+req.params.id;
  connection.query(q, function (error, results) {
  if (error) res.send(error);

  res.send(results);
  });
});
app.get("/organizations/:id/process-templates", function(req, res){
  // console.log(req.params)
  console.log("getting process templates by organization: "+ req.params.id);
  // var q = "SELECT * FROM tbl_projects where organization_id = "+req.params.id;
  // var q = `SELECT DISTINCT name, id, description FROM tbl_process_template 
  var q = `select * from tbl_process_template 
  where organization_id=${req.params.id} or organization_id IS NULL group by name`;
  // console.log(q)
  connection.query(q, function (error, results) {
  if (error) res.send(error);

  res.send(results);
  });
});
app.get("/organizations/:id/surveys", function(req, res){
  // console.log(req.params)
  console.log("getting surveys by organization: "+ req.params.name);
  // var q = "SELECT * FROM tbl_projects where organization_id = "+req.params.id;
  var q = `SELECT s.*, p.name as provider_name, b.name as bridge_name FROM tbl_survey s
  INNER JOIN tbl_providers p
  ON s.provider_id = p.id 
  INNER JOIN tbl_bridge_list b
  ON s.bid = b.bid 
  where s.organization_id= ${req.params.id};`;
  console.log(q)
  connection.query(q, function (error, results) {
  if (error) res.send(error);

  res.send(results);
  });
});
app.get("/organizations/:id/processes-tasks", function(req, res){
  // console.log(req.params)
  console.log("getting template tasks by organization: "+ req.params.id);
 var q = `SELECT * FROM tbl_process_template where organization_id = ${req.params.id} or organization_id IS NULL`;
  // console.log(q)
  connection.query(q, function (error, results) {
  if (error) res.send(error);

  res.send(results);
  });
});
app.get("/organizations/:id/custom-fields-templates/:tableName", function(req, res){
  // console.log(req.params)
  console.log("getting custom-fields-templates by organization: "+ req.params.id, req.params.tableName);
 var q = `SELECT * FROM tbl_custom_fields_templates where organization_id = ${req.params.id} and parent_table_name = "${req.params.tableName}"`;
  // console.log(q)
  connection.query(q, function (error, results) {
  if (error) res.send(error);

  res.send(results);
  });
});
app.get("/organizations/email/:email", function(req, res){
  console.log("getting organizations by mail", req.params.email)
  // var q = `SELECT * FROM tbl_users u
  // INNER JOIN tbl_users_roletypes ur
  //   ON ur.userId = u.id where user_name = "${req.params.email}" and password = "${req.params.password}"`
  var q = `SELECT * FROM tbl_organizations where email = "${req.params.email}"`

  connection.query(q, function (error, results) {
  if (error) throw error;
  
  res.send(results);
  });
 });
app.get("/organizations/name/:name", function(req, res){
  console.log("getting organizations by name", req.params.name)
  // var q = `SELECT * FROM tbl_users u
  // INNER JOIN tbl_users_roletypes ur
  //   ON ur.userId = u.id where user_name = "${req.params.email}" and password = "${req.params.password}"`
  var q = `SELECT * FROM tbl_organizations where name = "${req.params.name}"`

  connection.query(q, function (error, results) {
  if (error) throw error;
  
  res.send(results);
  });
 });

 app.get("/organizations/:id/tech-info", organizationsController.getOrgTechInfo)



//other routes..

