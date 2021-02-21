
var express = require('express');
var app = module.exports = express();
const connection = require('../db.js');

//PROJECTUSERS ROUTES
app.get("/project-users/:id", function(req, res){
  console.log(req.params);
  const id = req.params.id
  console.log('getting project-users')
  // var q = `SELECT p.id, name , u.id, first_name, last_name, role
  // FROM tbl_projects p
  // INNER JOIN tbl_projects_users pu
  // ON pu.projectId = p.id
  // INNER JOIN users u
  // ON u.id = pu.userId
  // WHERE p.id = ${id};`;
  // connection.query(q, function (error, results) {
  // if (error) throw error;

  // res.send(results);
  // });
});

app.post("/project-users", function(req, res){
  console.log('creating new project users', req.body);
  const project = req.body;
  const projectUsers = project.uavOperators
  var q = 'INSERT INTO tbl_projects_users (projectId, userId) VALUES ?';
  var data = createProjectUsersArray(project.id, projectUsers);
  console.log(data)
  connection.query(q, [data], function(err, result) {
    if (err) throw err;

    res.send(result);
  });

});

