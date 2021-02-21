
var express = require('express');
var app = module.exports = express();
const connection = require('../db.js');
const jwt = require('jsonwebtoken');
const config = require('../config.js')

app.get("/organization-providers", function(req, res){
  console.log('getting all organization-providers');

  var q = `SELECT * FROM tbl_organization_providers`;
  // console.log(q)
  connection.query(q, function (error, results) {
  if (error) res.send(error) ;
  
  res.send(results);
  });
 });
app.post("/organization-providers", function(req, res){
  console.log('creating organization-providers', req.body);
  const orgProvider = req.body
  var q = `INSERT INTO tbl_organization_providers ( organization_id, provider_id, remarks, date_created, status, provider_code)
  VALUES (${orgProvider.organization_id}, ${orgProvider.provider_id}, '${orgProvider.remarks}', now() , '${orgProvider.status}', '${orgProvider.provider_code}')`;
  // console.log(q)
  connection.query(q, function (error, results) {
  if (error) res.send(error) ;
  
  res.send(results);
  });
 });

 app.post("/organization-providers/confirmation", function(req, res){
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

 app.put("/organization-providers", function(req, res){
  console.log('updating organization-providers', req.body);
  const orgProv = req.body
  const token = jwt.sign({ 
    user_id: req.body.user_id, 
    organization_id: req.body.organization_id,
    role_id: req.body.role_id
  }, config.secret);
  var q = `UPDATE tbl_organization_providers
  SET organization_id = ${orgProv.organization_id},
  provider_id = ${orgProv.provider_id},
  remarks = '${orgProv.remarks}',
  status = '${orgProv.new_status}',
  confirmation_token = '${token}',
  provider_code = '${orgProv.provider_code}'
  where organization_id = ${orgProv.organization_id} and provider_id = ${orgProv.provider_id};`

  console.log(q)
  connection.query(q, function (error, results) {
  if (error) res.send(error) ;
  
  res.send({results, token});
  });
 });




