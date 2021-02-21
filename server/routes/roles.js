
var express = require('express');
var app = module.exports = express();
const connection = require('../db.js');



//ROLES ROUTES
app.get("/roles", function(req, res){
  // console.log('getting roles', req.query.visibility)
  // console.log('getting roles', req.query.fields.organization_id)
  let q = ''
  if (req.query.visibility && req.query.visibility === 'public'
    && req.query.fields && req.query.fields.organization_id) {
    q = `select * from tbl_roles
    WHERE organization_id IN (${req.query.fields.organization_id})
    and visibility = 'public'`;
  } else if (req.query.fields && req.query.fields.organization_id) {
    q = `select * from tbl_roles
    WHERE organization_id IN (${req.query.fields.organization_id})`;
    // q = `select * from tbl_roles r
    // INNER JOIN tbl_organizations o
    // ON r.organization_id = o.id
    // WHERE r.organization_id IN (${req.query.fields.organization_id})`;
     
  } else if (req.query.fields && req.query.fields.provider_id) {
    q = `select * from tbl_roles
    WHERE provider_id IN (${req.query.fields.provider_id})`;
    // q = `select * from tbl_roles r
    // INNER JOIN tbl_organizations o
    // ON r.organization_id = o.id
    // WHERE r.organization_id IN (${req.query.fields.organization_id})`;
     
  }
  else {
    q = `select * from tbl_roles`
  }
  
  console.log(q)
  connection.query(q, function (error, results) {
  if (error) throw error;

  res.send(results);
  });
});
app.get("/roles/:id", function(req, res){
  // console.log('getting roles', req)
  
  const q = `select * from tbl_roles
    where id = ${req.params.id}`;
  console.log(q)
  connection.query(q, function (error, results) {
  if (error) throw error;

  res.send(results);
  });
});
app.get("/roles/provider/:providerId/:roleType", function(req, res){
  console.log('getting roles', req.params)
  
  const q = `select * from tbl_roles
    where provider_id = ${req.params.providerId} 
    and type = '${req.params.roleType}'`;
  console.log(q)
  connection.query(q, function (error, results) {
  if (error) throw error;

  res.send(results);
  });
});
app.post("/roles", function(req, res){
  console.log('create role', req.body);
  const role = req.body
  const q = `INSERT INTO tbl_roles ( name, description, organization_id, provider_id, type, role_type_id, visibility)
  VALUES
  ( '${role.name}','${role.description}', ${role.organization_id ? role.organization_id : null},
  ${role.provider_id ? role.provider_id : null}, '${role.type}', ${role.role_type_id}, '${role.visibility}');`
  console.log(q)
  connection.query(q, function (error, results) {
  if (error) throw error;

  res.send(results);
  });
});

app.put("/roles/:id", function(req, res){
  const role = req.body
  console.log('updating role');
  var q = `UPDATE tbl_roles
  SET name = '${role.name}',
      description = '${role.description}',
      organization_id = ${role.organization_id},
      provider_id = ${role.provider_id},
      type = '${role.type}',
      visibility = '${role.visibility}'
  WHERE id = ${req.params.id};`

  console.log(q)
  connection.query(q, function (error, results) {
  if (error) res.send(error);

  res.send(results);
  });
});


