const nodemailer = require('nodemailer');

const sendMail = (recipients, subject, subjectText, body) => {
    let transporter = nodemailer.createTransport({
      // host: 'https://outlook.office365.com/mapi/emsmdb/?MailboxId=0454cef0-29b7-45a6-897e-ce5e6e026c0f@manam.co.il',
      host: 'outlook.office365.com',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
          user: 'onsite@manamapps.com', // generated ethereal user
          pass: 'Mnm1122334455'  // generated ethereal password
      },
      tls:{
        rejectUnauthorized:false
      }
    });
  
    // setup email data with unicode symbols
    let mailOptions = {
        from: '"Manam" <onsite@manamapps.com>', // sender address
        to: recipients, // list of receivers
        subject: subject, // Subject line
        text: subjectText, // plain text body
        html: body // html body
    };
  
    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log('Error', error)
            return error;
        }
        console.log('Message sent: %s', info.messageId);   
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        console.log(info)
        return info
        
        // res.send('contact', {msg:'Email has been sent'});
    });
  }

module.exports = {
    sendMail
};