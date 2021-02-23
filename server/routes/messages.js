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

  // const message = req.body
  // var q = `INSERT INTO tbl_messages ( sender_user_id, receiver_user_id, subject, message, type, status, task_id, survey_id, bid,
  //   createdAt, parent_message_id, location, element_id )
  // VALUES
  // ( ${message.sender_user_id}, ${message.receiver_user_id}, "${message.subject}", "${message.message}", "${message.type}", "${message.status}", ${message.task_id},
  // ${message.survey_id},  ${message.bid}, now(), ${message.parent_message_id}, "${message.location}", ${message.element_id});`
  // console.log(q)
  // connection.query(q, function (error, results) {
  // if (error) throw error;

  // res.send(results);
  // });
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
