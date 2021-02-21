
var express = require('express');
var app = module.exports = express();
const connection = require('../db.js');

//FOLDER STRUCTURE ROUTES

app.get("/folder_structure/:id", function(req, res){

  console.log('Getting folder_structure', req.params);
  const id = req.params.id
  let q
  if (id || id !== 'undefined' || id !== null) {
    q = `SELECT * from tbl_folder_structure where organization_id = ${id}`;
  } else {
    q = `SELECT * from tbl_folder_structure where organization_id IS NULL`;
  }
   
  console.log(q)
  connection.query(q, function (error, results) {
  if (error) throw error;

  res.send(results);
  });
});

