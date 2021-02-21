
var express = require("express");
var app = module.exports = express();
const connection = require("../db.js");
const jwt = require("jsonwebtoken");
const config = require("../config.js")

app.post("/users-connections", function(req, res){
  console.log("creating user-connection", req.body);
  const newOrgUser = req.body
  const token = jwt.sign({ 
    user_id: req.body.user_id, 
    organization_id: req.body.organization_id,
    role_id: req.body.role_id
  }, config.secret);
  var q = `INSERT INTO tbl_user_connections ( user_id, organization_id, provider_id, role_id, 
    remarks, date_created, status, confirmation_token)
  VALUES (${newOrgUser.user_id}, ${newOrgUser.organization_id},  ${newOrgUser.provider_id},
     ${newOrgUser.role_id}, "${newOrgUser.remarks}", now(), "${newOrgUser.status}", "${token}")`;
  console.log(q)
  connection.query(q, function (error, results) {
  if (error) res.send(error) ;
  
  res.send({results, token});
  });
 });
app.put("/users-connections", function(req, res){
  console.log("updating user-connection", req.body);
  let q
  if (req.body.length == 1) {
    
    q = `UPDATE tbl_user_connections
    SET role_id = ${req.body[0].role_id},
        status = "${req.body[0].status}",
        remarks = "${req.body[0].remarks}"
        WHERE id = ${req.body[0].id};`;
  } else {
    const ids = req.body.map(userRole => userRole.id)
    q = `UPDATE tbl_user_connections
    SET status = "${req.body[0].status}",
        remarks = "${req.body[0].remarks}"
        WHERE id in (${ids});`;
  }
  
  console.log(q)
  connection.query(q, function (error, results) {
  if (error) res.send(error) ;
  
  res.send(results);
  });
 });
app.get("/users-connections/:id", function(req, res){
  console.log("getting user roles", req.params.id);

  // var q = `SELECT * FROM tbl_provider_users where user_id = ${req.params.id}`;
  var q = `SELECT uc.*, p.name as provider_name, o.name as org_name, r.name as role_name, 
  r.role_type_id FROM tbl_user_connections uc
  LEFT JOIN tbl_providers p
  ON uc.provider_id = p.id
  AND uc.user_id = ${req.params.id}  
  LEFT JOIN tbl_organizations o
  ON uc.organization_id = o.id
  AND uc.user_id = ${req.params.id}
  LEFT JOIN tbl_roles r
  ON uc.role_id = r.id
  WHERE uc.user_id = ${req.params.id};`;
  console.log(q)
  connection.query(q, function (error, results) {
  if (error) throw error;

  res.send(results);
  });
 });




