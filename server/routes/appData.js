
var express = require('express');
var app = module.exports = express();
const connection = require('../db.js');


app.get("/appData", async function(req, res){
  try {
    const roleTypes = await getRoleTypes();
    const statuses = await getStatuses();
    res.send({roleTypes, statuses})
  } catch (err) {
    throw (err) 
  }
});

const getRoleTypes = async () => {
  return new Promise((resolve, reject) => {
    try {
      
      var q = `select * from tbl_roles_types`;
      connection.query(q, function (error, result) {
        resolve(result) ;
    });
    } catch (err) {
      reject(err) 
    }
    
  })
}
const getStatuses = async () => {
  return new Promise((resolve, reject) => {
    try {
      
      var q = `select * from tbl_statuses`;
      connection.query(q, function (error, result) {
        resolve(result) ;
    });
    } catch (err) {
      reject(err) 
    }
    
  })
}
app.get("/roleTypes", function(req, res){
  console.log('getting rolesTypes')
  var q = `select * from tbl_roles_types`;
  // console.log(q)
  connection.query(q, function (error, results) {
  if (error) throw error;

  res.send(results);
  });
});
app.post("/roleTypes", function(req, res){
  const role = req.body
  console.log('getting rolesTypes')
  const q = `INSERT INTO tbl_roles_types ( name )
  VALUES
  ( '${role.name}');`
  connection.query(q, function (error, results) {
  if (error) throw error;

  res.send(results);
  });
});
app.post("/database/:tableName/:orgId", function(req, res){

  const q = `INSERT INTO ${req.params.tableName} (organization_id) VALUES(${req.params.orgId});`
  connection.query(q, function (error, results) {
  if (error) throw error;

  res.send(results);
  });
});
app.post("/delete/database/:tableName", function(req, res){
  console.log(req.body)
  const ids = req.body.ids

  var q = `DELETE FROM ${req.params.tableName} WHERE id in (${ids})`
  console.log(q)
  connection.query(q, function (error, results) {
  if (error) res.send(error);

  res.send(results);
  });
 });
// app.post("/database/:tableName/:orgId", function(req, res){
//   console.log(req.body)
//   const q = `INSERT INTO ${req.params.tableName} (organization_id, ${req.body.key}) VALUES(${req.params.orgId}, '${req.body.value}');`
//   console.log(q)
//   connection.query(q, function (error, results) {
//   if (error) res.send(error);

//   res.send(results);
//   });
// });
app.put("/database/:tableName", function(req, res){
  console.log(req.body)
  // console.log('getting rolesTypes')
  var q = `UPDATE ${req.params.tableName}
  SET ${req.body.key} = '${req.body.value}'
  where id = ${req.body.id};`
  console.log(q)
  connection.query(q, function (error, results) {
  if (error) throw error;

  res.send(results);
  });
});

app.get("/database/:tableName/:orgId", function(req, res){
  
  var q = `select * from ${req.params.tableName} where organization_id = ${req.params.orgId}`;
  // console.log(q)
  connection.query(q, function (error, results) {
  if (error) throw error;

  res.send(results);
  });
});
