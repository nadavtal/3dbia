const express = require('express');
const app = (module.exports = express());
const connection = require('../db.js');
const logsController = require('../controllers/logsController');
// MESSAGES ROUTES

app.get('/logs/:surveyId/:taskId', function(req, res) {
  console.log('logs');

  const q = `select * from tbl_logs where survey_id = ${
    req.params.surveyId
  }  and task_id = ${req.params.taskId}`;
  console.log(q)
  connection.query(q, function(error, results) {
    if (error) throw error;
    // console.log(results)
    res.send(results);
  });
});
// app.get('/logs/:surveyId/:taskId/:subTaskName', function(req, res) {
//   console.log('logs');

//   const q = `select * from tbl_logs where survey_id = ${
//     req.params.surveyId
//   } 
//   and task_id = ${req.params.taskId}
//   and sub_task_name = '${req.params.subTaskName}'`;
//   connection.query(q, function(error, results) {
//     if (error) throw error;
//     // console.log(results)
//     res.send(results);
//   });
// });
// other routes..
