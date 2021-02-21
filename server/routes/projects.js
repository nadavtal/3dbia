
var express = require('express');
var app = module.exports = express();
const connection = require('../db.js');

 //PROJECT ROUTES
 app.get("/projects/:id", function(req, res){
  //  console.log(req.params)
  console.log('getting project')
  var q = 'SELECT * FROM tbl_projects WHERE id = ' + req.params.id;
  console.log(q)
  connection.query(q, function (error, results) {
  if (error) res.send(error);
  console.log(results)
  res.send(results);
  });
 });
 app.get("/projects/:id/processes", function(req, res){
  //  console.log(req.params)
  console.log('getting processes')
  var q = 'SELECT * FROM tbl_processes WHERE project_id = ' + req.params.id;
  console.log(q)
  connection.query(q, function (error, results) {
  if (error) res.send(error);
  console.log(results)
  res.send(results);
  });
 });

app.get("/projects", function(req, res){
  console.log('getting projects')
  var q = 'SELECT * FROM tbl_projects';
  // console.log(q)
  connection.query(q, function (error, results) {
  if (error) res.send(error);
  // console.log(results)
  res.send(results);
  });
 });

app.post("/projects", function(req, res){
  console.log('creating new project', req.body);
  const project = req.body
  // const values = createProjectsArray([project])[0]
  // console.log(values)
  var q = `INSERT INTO tbl_projects
          (name, organization_id, description, date_created, project_manager_id, due_date)
           VALUES ( '${project.name}', ${project.organization_id}, '${project.description}', '${project.date_created}',
           null,  '${project.due_date}')`;
           console.log(q)
  connection.query(q, function (error, result) {

    if (error) res.send(error);
    if (result && result.insertId) res.send({result, newProjectId: result.insertId});
    });
 });

