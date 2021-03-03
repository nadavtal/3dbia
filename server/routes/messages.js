const express = require('express');
const app = (module.exports = express());
const connection = require('../db.js');
const messagesController = require('../controllers/messagesControler');
// MESSAGES ROUTES

app.post('/messages', async function(req, res) {
  console.log('creating message', req.body);
  try {
    const messageResult = messagesController.createMessage(req.body);
    res.send(messageResult);
  } catch (err) {
    res.send(err);
  }
});

app.get('/messages/survey/:surveyId', function(req, res) {
  console.log('getting survey messages');

  const q = `select * from tbl_messages where survey_id = ${
    req.params.surveyId
  }`;
  connection.query(q, function(error, results) {
    if (error) throw error;

    res.send(results);
  });
});
// other routes..
