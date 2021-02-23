const nodemailer = require('nodemailer');
const connection = require('../db.js');

const sendMail = (recipients, subject, subjectText, body) => {
  const transporter = nodemailer.createTransport({
    // host: 'https://outlook.office365.com/mapi/emsmdb/?MailboxId=0454cef0-29b7-45a6-897e-ce5e6e026c0f@manam.co.il',
    host: 'outlook.office365.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'onsite@manamapps.com', // generated ethereal user
      pass: 'Mnm1122334455', // generated ethereal password
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  // setup email data with unicode symbols
  const mailOptions = {
    from: '"Manam" <onsite@manamapps.com>', // sender address
    to: recipients, // list of receivers
    subject, // Subject line
    text: subjectText, // plain text body
    html: body, // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error', error);
      return error;
    }
    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    console.log(info);
    return info;

    // res.send('contact', {msg:'Email has been sent'});
  });
};

const createMessage = message =>
  new Promise((resolve, reject) => {
    // console.log("creating message", req.body);
    // const message = req.body
    const q = `INSERT INTO tbl_messages ( sender_user_id, receiver_user_id, subject, message, type, status, task_id, survey_id, bid, 
      createdAt, parent_message_id, location, element_id )
    VALUES
    ( ${message.sender_user_id}, ${message.receiver_user_id}, "${
      message.subject
    }", "${message.message}", "${message.type}", "${message.status}", ${
      message.task_id
    }, 
    ${message.survey_id},  ${message.bid}, now(), ${
      message.parent_message_id
    }, '${message.location}', ${message.element_id});`;
    // console.log(q)
    connection.query(q, function(error, results) {
      if (error) reject(error);

      resolve(results);
    });
  });
module.exports = {
  sendMail,
  createMessage,
};
