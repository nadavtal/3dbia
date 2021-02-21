
var express = require('express');
var app = module.exports = express();
const connection = require('../db.js');
const jwt = require('jsonwebtoken');
const config = require('../config.js')

app.get("/organization-users/provider/:id", function(req, res){
  console.log('getting all organization-users by provider ', req.params.id);
  // var q = `SELECT * FROM tbl_organizations_users ou
  // INNER JOIN tbl_users u
  // ON ou.user_id = u.id
  // where ou.from_provider_id = ${req.params.id}`;
  const q = `SELECT ou.user_id, ou.organization_id, ou.role_id, ou.remarks, ou.status, ou.date_created, ou.from_provider_id,
  u.first_name, u.last_name, u.email, r.name as roleName, r.role_type_id, r.description, r.provider_id FROM tbl_organizations_users ou
  INNER JOIN tbl_users u
  ON ou.user_id = u.id
  INNER JOIN tbl_roles r
  on ou.role_id = r.id
  where ou.from_provider_id = ${req.params.id}`;
  console.log(q)
  connection.query(q, function (error, results) {
  if (error) res.send(error) ;
  
  res.send(results);
  });
 });
app.get("/organization-users", function(req, res){
  console.log('getting all organization-users');
  var q = `SELECT u.first_name, u.last_name, r.name as roleName, r.description, u.email, u.profile_image, uc.*,    
  r.role_type_id FROM tbl_user_connections uc
  INNER JOIN tbl_users u
  ON uc.user_id = u.id
  INNER JOIN tbl_roles r
  on uc.role_id = r.id
  WHERE uc.organization_id IS NOT NULL;`
  connection.query(q, function (error, results) {
  if (error) res.send(error) ;
  
  res.send(results);
  });
 });
app.get("/organization-users/:id", function(req, res){
  console.log('getting all organization-users by ', req.params.id);
  // SELECT CONCAT("SQL ", "Tutorial ", "is ", "fun!") AS ConcatenatedString;

  var q = `SELECT u.first_name, u.last_name, r.name as roleName, r.description, u.email, u.profile_image, uc.*,    
  r.role_type_id FROM tbl_user_connections uc
  INNER JOIN tbl_users u
  ON uc.user_id = u.id
  INNER JOIN tbl_roles r
  on uc.role_id = r.id
  WHERE uc.organization_id = ${req.params.id};`
  connection.query(q, function (error, results) {
  if (error) res.send(error) ;
  
  res.send(results);
  });
 });

app.post("/organization-users", function(req, res){
  console.log('creating organization-users', req.body);
  const newOrgUser = req.body
  const token = jwt.sign({ 
    user_id: req.body.user_id, 
    organization_id: req.body.organization_id,
    role_id: req.body.role_id
  }, config.secret);
  var q = `INSERT INTO tbl_organizations_users ( user_id, organization_id, role_id, 
    remarks, date_created, status, confirmation_token, from_provider_id)
  VALUES (${newOrgUser.user_id}, ${newOrgUser.organization_id}, ${newOrgUser.role_id}, 
    '${newOrgUser.remarks}', now(), '${newOrgUser.status}', '${token}', ${newOrgUser.from_provider_id})`;
  console.log(q)
  connection.query(q, function (error, results) {
  if (error) res.send(error) ;
  
  res.send({results, token});
  });
 });
app.put("/organization-users", function(req, res){
  console.log('updating organization-users', req.body);
  const orgUser = req.body
  const token = jwt.sign({ 
    user_id: req.body.user_id, 
    organization_id: req.body.organization_id,
    role_id: req.body.role_id
  }, config.secret);
  var q = `UPDATE tbl_organizations_users
  SET user_id = ${orgUser.user_id},
  organization_id = ${orgUser.organization_id},
  role_id = ${orgUser.new_role_id},
  remarks = '${orgUser.remarks}',
  status = '${orgUser.new_status}',
  confirmation_token = '${token}',
  from_provider_id = ${orgUser.from_provider_id}
  where user_id = ${orgUser.user_id} and organization_id = ${orgUser.organization_id} and role_id = ${orgUser.old_role_id};`

  console.log(q)
  connection.query(q, function (error, results) {
  if (error) res.send(error) ;
  
  res.send({results, token});
  });
 });

 app.post("/organization-users/confirmation", function(req, res){
  console.log('confirming organization user', req.body)
  const decoded = jwt.verify(req.body.token, config.secret)
  console.log(decoded)
  var q = `UPDATE tbl_organizations_users
  SET confirmation_token = '',
      status = 'confirmed'
  WHERE confirmation_token = '${decoded.email}';`

  // connection.query(q, function (error, results) {
  // if (error) throw error;
  
  // res.send(results);
  // });
 });




