
var express = require('express');
var app = module.exports = express();
const connection = require('../db.js');
const config = require('../config.js')

app.get("/search/:entity/:email", function(req, res){
  console.log('getting organizations by mail', req.params.email)
  // var q = `SELECT * FROM tbl_users u
  // INNER JOIN tbl_users_roletypes ur
  //   ON ur.userId = u.id where user_name = '${req.params.email}' and password = '${req.params.password}'`
  var q = `SELECT * FROM tbl_organizations where email = '${req.params.email}'`

  connection.query(q, function (error, results) {
  if (error) throw error;
  
  res.send(results);
  });
 });


//other routes..

