
var express = require('express');
var app = module.exports = express();
const connection = require('../db.js');

//PROJECT SURVEY ROUTES
app.post("/project-surveys", function(req, res){
  console.log('creating new project surveys', req.body);
  const survey = req.body;

  var q = `INSERT INTO projects_surveys (projectId, surveyId) VALUES (${survey.BID}, ${survey.id})`;

  connection.query(q, function(err, result) {
    if (err) throw err;

    res.send(result);
  });

});
app.get("/project-surveys/:id", function(req, res){

  console.log('Getting project surveys', req.params);
  const id = req.params.id
  var q = `SELECT p.id as projectId, name , s.id as surveyId, survey_type, company, Survey_date
  FROM tbl_projects p
  INNER JOIN projects_surveys ps
  ON ps.projectId = p.id
  INNER JOIN surveys s
  ON s.id = ps.surveyId
  WHERE p.id = ${id};`;
  console.log(q)
  // connection.query(q, function (error, results) {
  // if (error) throw error;

  // res.send(results);
  // });
});

