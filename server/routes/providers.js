var express = require("express");
var app = module.exports = express();
const connection = require("../db.js");
const fs = require("fs");
const multer = require("multer");
const upload = require("../middlewares/upload");
const DIR = "./resources/static/assets/uploads/";
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, DIR);
//     },
//     filename: (req, file, cb) => {
//         const fileName = file.originalname.toLowerCase().split(" ").join("-");
//         cb(null, Date.now() + "-" + fileName)
//     }
// });
// const upload = multer({
//     storage: storage,
//     fileFilter: (req, file, cb) => {
//         if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
//             cb(null, true);
//         } else {
//             cb(null, false);
//             return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
//         }
//     }
// });
//PROVIDERS ROUTES
app.get("/providers", function(req, res){
  console.log("getting providers")
  var q = "SELECT * FROM tbl_providers";
  connection.query(q, function (error, results) {
  if (error) throw error;

  res.send(results);
  });
 });

app.post("/providers", function(req, res){
  console.log("creating provider", req.body);
  const provider = req.body
  var q = `INSERT INTO tbl_providers ( name, date_created, remarks, created_by, contact_name, phone, address, region, general_status, website, about_team )
  VALUES
  ( "${provider.name}", now(), "${provider.remarks}", "${provider.created_by}", "${provider.contact_name}", "${provider.phone}",  "${provider.address}",
  "${provider.region}", "${provider.general_status ? provider.general_status : "Awaiting confirmation"}", "${provider.website}", "${provider.about_team}");`
  console.log(q)
  connection.query(q, function (error, results) {
  if (error) res.send(error);

  res.send(results);
  });
 });
app.post("/provider-bridges", function(req, res){
  console.log("getting provider bridges", req.body);
  const ids = req.body
  var q = `SELECT * FROM tbl_bridge_list where bid in (${ids})`
  console.log(q)
  connection.query(q, function (error, results) {
  if (error) res.send(error);

  res.send(results);
  });
 });

app.get("/providers/:id", function(req, res){
  console.log("getting provider " + req.params.id)
  var q = "SELECT * FROM tbl_providers WHERE id = " + req.params.id;
  connection.query(q, function (error, results) {
  if (error) throw error;
  // console.log("results", results)
  
  // const provider = results[0]
  // console.log(provider)
  // console.log(JSON.parse(provider.profile_image))
  
  // // const buf = new Buffer(JSON.parse(provider.profile_image), "binary").toString("base64");
  // const buff2 = Buffer.from(provider.profile_image, "binary").toString("base64")
  // // console.log("buff2", buff2)
  // const fileName = provider.name + "-profile_image" + ".jpg"
  // console.log("fileName", fileName)
  // fs.writeFileSync(
  //   "./resources/static/assets/tmp/" + fileName,
  //   JSON.parse(provider.profile_image),
  // );
  res.send(results);
  });
 });
 app.get("/providers/email/:email", function(req, res){
  console.log("getting providers by mail", req.params.email)
  // var q = `SELECT * FROM tbl_users u
  // INNER JOIN tbl_users_roletypes ur
  //   ON ur.userId = u.id where user_name = "${req.params.email}" and password = "${req.params.password}"`
  var q = `SELECT * FROM tbl_providers where email = "${req.params.email}"`

  connection.query(q, function (error, results) {
  if (error) throw error;
  
  res.send(results);
  });
 });
 app.get("/providers/name/:name", function(req, res){
  console.log("getting providers by mail", req.params.name)
  // var q = `SELECT * FROM tbl_users u
  // INNER JOIN tbl_users_roletypes ur
  //   ON ur.userId = u.id where user_name = "${req.params.name}" and password = "${req.params.password}"`
  var q = `SELECT * FROM tbl_providers where name = "${req.params.name}"`

  connection.query(q, function (error, results) {
  if (error) throw error;
  
  res.send(results);
  });
 });
app.put("/providers/:id", function(req, res){
  const provider = req.body
  console.log("updating provider");
  var q = `UPDATE tbl_providers
  SET name = "${provider.name}",
      remarks = "${provider.remarks}",
      contact_name = "${provider.contact_name}",
      region = "${provider.region}",
      website = "${provider.website}",
      email = "${provider.email}",
      address = "${provider.address}",
      phone = "${provider.phone}",
      general_status = "${provider.general_status}",
      profile_image = "${provider.profile_image}"
  WHERE id = ${req.params.id};`

  console.log(q)
  connection.query(q, function (error, results) {
  if (error) res.send(error);

  res.send(results);
  });
});
app.get("/providers/:id/organizations", function(req, res){
  console.log("GETTING organizations by provider: "+ req.params.id);
  var q = `SELECT * FROM tbl_organizations o
  INNER JOIN tbl_organization_providers op
  ON op.organization_id = o.id
  AND op.provider_id = ${req.params.id}`;
  connection.query(q, function (error, results) {
  if (error) res.send(error);

  res.send(results);
  });
});
app.get("/providers/:id/roles", function(req, res){
  console.log("getting roles by provider: "+ req.params.id);
  var q = `SELECT * FROM tbl_roles where provider_id = ${req.params.id};`;
  connection.query(q, function (error, results) {
  if (error) res.send(error);

  res.send(results);
  });
});
app.get("/providers/:id/users", function(req, res){
  console.log("getting users by provider: "+ req.params.id);
  var q = `SELECT u.id, first_name , last_name, user_image, phone, email, address, u.remarks, pu.status, ur.roletypeId, rt.name
  FROM tbl_users u
  LEFT JOIN tbl_users_roletypes ur
  ON ur.userId = u.id
  LEFT JOIN tbl_roles_types rt
  ON rt.id = ur.roletypeId
  INNER JOIN tbl_provider_users pu
  ON pu.user_id = u.id
  AND pu.provider_id = ${req.params.id}`;
  connection.query(q, function (error, results) {
  if (error) res.send(error);

  res.send(results);
  });
});
app.put("/providers/:id/profile_image", upload.single("profileImg"), (req, res, next) => {
  //   const url = req.protocol + "://" + req.get("host")
  //   console.log("req.body", url)
  //   console.log("req.body", req.body)
    console.log("req.file", req.file)
  //   const blob =  JSON.stringify(fs.readFileSync(
  //     "./public/" + req.file.filename
  //   ))
    const data = fs.readFileSync(
      "./resources/static/assets/uploads/" + req.file.filename,
    )

    var q = `UPDATE tbl_providers SET profile_image = "${JSON.stringify(data)}"
    WHERE id = ${req.params.id};`

    // console.log(q)
    connection.query(q, function (error, results) {
    if (error) res.send(error);

    res.send(results);
    })
  // connection.query(`INSERT INTO tbl_profile_images(data) VALUES(BINARY("${data}"))`, { data }, function(err, res) 
  // connection.query(`INSERT INTO tbl_profile_images(data) VALUES(BINARY("${JSON.stringify(data)}"))`, function(err, res) 
  // {
  //   if (err) throw err;
  //   console.log("BLOB data inserted!", res);
  //   // Check to read it from DB:
  //   connection.query("select * from `tbl_profile_images`", function(err, res) {
  //     if (err) throw err;
  //     const row = res[0];
  //     // Got BLOB data:
  //     const data = row.data;
  //     console.log("BLOB data read!");
  //     // Converted to Buffer:
  //     const buf = Buffer.from(data, "binary").toString("base64");
  //     // const buf2 = Buffer.allocUnsafe(data, "binary");
  //     // const buf3 = Buffer.alloc(data, "binary");
  //     // Write new file out:
      

  //     fs.writeFileSync("./tmp/" + req.file.filename , buf);
  //     console.log("New file output:", req.file.filename);
  //   });
  // });
});

function readImageFile(file) {
  // read binary data from a file:
  const bitmap = fs.readFileSync(file);
  const buf = Buffer.from(bitmap);
  return buf;
}

app.get("/providers/:id/tasks", function(req, res){
  console.log("getting tasks by provider: "+ req.params.name);
  // var q = `SELECT t.id, t.name as taskName, t.survey_type, t.description, t.remarks, t.status, t.role_type_id, t.user_id,
  // t.due_date, b.bid, b.name as bridge_name, s.name as surveyName, t.survey_id, 
  // u.first_name, u.last_name, rt.name as roleType,
  // t.completed, t.updatedAt, t.createdAt, t.task_order, t.provider_id 
  // FROM tbl_tasks t
  // LEFT JOIN tbl_bridge_list b
  // ON t.bid = b.bid
  // LEFT JOIN tbl_survey s
  // ON s.id = t.survey_id
  // LEFT JOIN tbl_users u
  // ON u.id = t.user_id
  // LEFT JOIN tbl_roles_types rt
  // ON rt.id = t.role_type_id
  // where t.provider_id = ${req.params.id}`;
  var q = `SELECT * FROM tbl_tasks where provider_id = ${req.params.id}`;
  console.log(q)
  connection.query(q, function (error, results) {
  if (error) res.send(error);

  res.send(results);
  });
});

app.get("/providers/:id/surveys", function(req, res){
  // console.log(req.params)
  console.log("getting surveys by organization: "+ req.params.name);
  // var q = "SELECT * FROM tbl_projects where organization_id = "+req.params.id;
  var q = `SELECT s.*, p.name as provider_name, b.name as bridge_name FROM tbl_survey s
  INNER JOIN tbl_providers p
  ON s.provider_id = p.id 
  INNER JOIN tbl_bridge_list b
  ON s.bid = b.bid 
  where s.provider_id= ${req.params.id};`;
  console.log(q)
  connection.query(q, function (error, results) {
  if (error) res.send(error);

  res.send(results);
  });
});
app.get("/providers/:name/project-processes", function(req, res){
  console.log("getting projects processes by provider: "+ req.params.name);
  var q = `SELECT * FROM tbl_processes where provider_name = "${req.params.name}"`;
  connection.query(q, function (error, results) {
  if (error) res.send(error);

  res.send(results);
  });
});
app.get("/providers/:name/processes", function(req, res){
  // console.log(req.params)
  console.log("getting processes by provider: "+ req.params.name);
  // var q = "SELECT * FROM tbl_projects where organization_id = "+req.params.id;
  var q = `SELECT DISTINCT name, description, organization FROM tbl_process_template
            where provider="${req.params.name}"`;
  console.log(q)
  connection.query(q, function (error, results) {
  if (error) res.send(error);

  res.send(results);
  });
});
app.get("/providers/:name/processes-tasks", function(req, res){
  // console.log(req.params)
  console.log("getting processes and tasks by organization: "+ req.params.name);
  // var q = "SELECT * FROM tbl_projects where organization_id = "+req.params.id;
  var q = `SELECT name, description, task_name, task_description, role_type_name, task_def_status
            FROM tbl_process_template where provider="${req.params.name}"`;
  console.log(q)
  connection.query(q, function (error, results) {
  if (error) res.send(error);

  res.send(results);
  });

});

// app.get("/providers/:id/bridges", function(req, res){
//   console.log("getting bridges by provider: "+ req.params.id);
//   var q = "SELECT * FROM tbl_bridge_list where organization_id = "+req.params.id;
//   connection.query(q, function (error, results) {
//   if (error) res.send(error);

//   res.send(results);
//   });
// });
// app.get("/providers/:id/organizations", function(req, res){
//   console.log("getting providers by orgnization: "+ req.params.id);
//   var q = `SELECT name , contact_name, phone, email, address
//   FROM tbl_providers p
//   INNER JOIN tbl_organization_providers op
//   ON op.provider_id = p.id
//   AND op.organization_id = ${req.params.id}`;
//   connection.query(q, function (error, results) {
//   if (error) res.send(error);

//   res.send(results);
//   });
// });

// app.get("/organizations/:id/projects", function(req, res){
//   console.log("getting projects by orgnization: "+ req.params.id);
//   var q = "SELECT * FROM tbl_projects where organization_id = "+req.params.id;
//   connection.query(q, function (error, results) {
//   if (error) res.send(error);

//   res.send(results);
//   });
// });



//other routes..

