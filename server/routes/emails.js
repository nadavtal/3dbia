
var express = require('express');
var app = module.exports = express();
const connection = require('../db.js');


//PROCESS TEMAPLATE TASKS ROUTES

//Get all template tasks
app.post("/email/send", function(req, res){
  console.log('sending emeil', req.body);
  let body = req.body;
  const output = `
  
  <h3>${body.header}</h3>
  
  <a href="${req.body.link}">
  <p>${req.body.message}</p>
  </a>
`;
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    // host: 'https://outlook.office365.com/mapi/emsmdb/?MailboxId=0454cef0-29b7-45a6-897e-ce5e6e026c0f@manam.co.il',
    host: 'outlook.office365.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: 'onsite@manamapps.com', // generated ethereal user
        pass: 'Mana1122334455'  // generated ethereal password
    },
    tls:{
      rejectUnauthorized:false
    }
  });

  // setup email data with unicode symbols
  let mailOptions = {
      from: '"Manam" <onsite@manamapps.com>', // sender address
      to: [req.body.recipientEmail], // list of receivers
      subject: req.body.subject, // Subject line
      text: req.body.subjectText, // plain text body
      html: output // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          return res.send(error);
      }
      console.log('Message sent: %s', info.messageId);   
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
      res.status(200).send({msg:'Email has been sent'})
      // res.send('contact', {msg:'Email has been sent'});
  });
});


// module.exports = {
//   sendMail
// }
// sendMail(['nadavtalalmagor@gmail.com', 'amielr@manam.co.il', 'gilads@manam.co.il'], 'שבת שלום', 'שבת שלום מהמערכת', `<h3>HEADER</h3>`)
