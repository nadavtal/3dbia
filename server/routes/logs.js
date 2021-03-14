const express = require('express');
const app = (module.exports = express());
const connection = require('../db.js');
const logsController = require('../controllers/logsController');
// MESSAGES ROUTES

app.get('/logs/:surveyId/:taskId/:status', function(req, res) {
  console.log('logs');

  const q = `select * from tbl_logs where survey_id = ${req.params.surveyId} 
             and task_id = ${req.params.taskId}
             and status = '${req.params.status}'
             `;
  console.log(q)
  connection.query(q, function(error, results) {
    if (error) throw error;
    // console.log(results)
    res.send(results);
  });
});

app.post('/logs', async function(req, res) {
  console.log('creating log', req.body);  
  try {
    const logResult = await logsController.createLog(req.body)
    res.send(logResult);
  } catch (err) {
    res.send(err);
  }
});
