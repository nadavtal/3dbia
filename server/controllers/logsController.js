const nodemailer = require('nodemailer');
const connection = require('../db.js');

const createLog = (log) => new Promise((resolve, reject) => {
    // console.log("creating message", req.body);
    // const message = req.body
    const q = `INSERT INTO tbl_logs ( bid, type, organization_id, survey_id, task_id, 
        sub_task_name, user_id, started, finished, status, name, path, size )
    VALUES
    ( ${log.bid}, '${log.type}', ${log.organization_id}, ${log.survey_id}, ${log.task_id},
    '${log.sub_task_name}', ${log.user_id}, now(), NULL, '${log.status}',
    '${log.name}', '${log.path}', ${log.size});`;
    console.log(q)
    connection.query(q, function(error, results) {
      if (error) reject(error);

      resolve(results);
    });
  });

const updateLog = (log) => new Promise((resolve, reject) => {
    // console.log("creating message", req.body);
    // const message = req.body
    const q = `UPDATE tbl_logs 
        SET finished = ${log.finished && 'now()'}, 
            status = '${log.status}'  
            where id = ${log.id};`
    console.log(q)
    connection.query(q, function(error, results) {
      if (error) reject(error);

      resolve(results);
    });
  });
module.exports = {
    createLog,
    updateLog,
};
