
var express = require('express');
var app = module.exports = express();
const connection = require('../db.js');
const jwt = require('jsonwebtoken');
const config = require('../config.js')


//PROVIDER-USERS ROUTES
app.get("/provider-users/:id/:roleId", function(req, res){
  console.log('getting provider-users by id and role', req.params);

  // var q = `SELECT * FROM tbl_provider_users pu 
  // INNER JOIN tbl_users u
  // ON pu.user_id = u.id
  // where provider_id = ${req.params.id}`;
  var q = `SELECT pu.user_id, pu.provider_id, pu.role_id, pu.remarks, pu.status, pu.date_created,
  u.first_name, u.last_name, u.email, r.name as roleName, r.description, r.provider_id FROM tbl_provider_users pu
  INNER JOIN tbl_users u
  ON pu.user_id = u.id
  INNER JOIN tbl_roles r
  on pu.role_id = r.id
  where pu.provider_id = ${req.params.id} and pu.role_id = ${req.params.roleId}`;
  // console.log(q)
  connection.query(q, function (error, results) {
  if (error) res.send(error) ;
  
  res.send(results);
  });
 });
app.get("/provider-users/:id", function(req, res){
  console.log('getting all provider-users by provider id');
  var q = `SELECT u.id, u.first_name, u.last_name, r.name as roleName, r.description, u.email, u.profile_image, uc.*,    
  r.role_type_id FROM tbl_user_connections uc
  INNER JOIN tbl_users u
  ON uc.user_id = u.id
  INNER JOIN tbl_roles r
  on uc.role_id = r.id
  WHERE uc.provider_id = ${req.params.id};`
  // var q = `SELECT CONCAT(u.id,'-', u.first_name,' ', u.last_name) AS full_name, r.name as roleName, r.description, u.email, u.profile_image, uc.*,    
  // r.role_type_id FROM tbl_user_connections uc
  // INNER JOIN tbl_users u
  // ON uc.user_id = u.id
  // INNER JOIN tbl_roles r
  // on uc.role_id = r.id
  // WHERE uc.provider_id = ${req.params.id};`
  // console.log(q)
  connection.query(q, function (error, results) {
  if (error) res.send(error) ;
  
  res.send(results);
  });
 });
app.get("/provider-users", function(req, res){
  console.log('getting all provider-users');

  var q = `SELECT * FROM tbl_provider_users pu
  INNER JOIN tbl_users u
  ON pu.user_id = u.id`;
  // console.log(q)
  connection.query(q, function (error, results) {
  if (error) res.send(error) ;
  
  res.send(results);
  });
 });
app.post("/provider-users", function(req, res){
  console.log('creating new provider user', req.body);
  const providerUser = req.body;
  const token = jwt.sign({ 
    user_id: req.body.user_id, 
    provider_id: req.body.provider_id,
    role_id: req.body.role_id
  }, config.secret);
  var q = `INSERT INTO tbl_provider_users (user_id, provider_id, role_id, remarks, date_created, status) VALUES (
    ${providerUser.user_id}, ${providerUser.provider_id}, ${providerUser.role_id}, '${providerUser.remarks}', now(), '${providerUser.status}')`;
  console.log(q)
  connection.query(q, function(err, results) {
    if (err) res.send(err);

    res.send({results, token});
  });

});

app.put("/provider-users", function(req, res){
  console.log('updating provider-users', req.body);
  const providerUser = req.body
  const token = jwt.sign({ 
    user_id: req.body.user_id, 
    provider_id: req.body.provider_id,
    role_id: req.body.role_id
  }, config.secret);
  var q = `UPDATE tbl_provider_users
  SET user_id = ${providerUser.user_id},
  provider_id = ${providerUser.provider_id},
  role_id = ${providerUser.new_role_id},
  remarks = '${providerUser.remarks}',
  status = '${providerUser.new_status}',
  confirmation_token = '${token}'
  where user_id = ${providerUser.user_id} and provider_id = ${providerUser.provider_id} and role_id = ${providerUser.old_role_id};`

  console.log(q)
  connection.query(q, function (error, results) {
  if (error) res.send(error) ;
  
  res.send({results, token});
  });
 });




