const nodemailer = require('nodemailer');
const connection = require('../db.js');

const getSurveys = (bid) => {

  return new Promise((resolve, reject) => {

    let q = 'SELECT * FROM tbl_survey WHERE bid = ' + bid;
    connection.query(q, function(error, results) {
      if (error) reject(error);
      resolve(results);
    });

  })

}

module.exports = {
  getSurveys,
};
