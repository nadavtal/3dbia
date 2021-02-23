const connection = require('../db.js');

const createBridgeModel = async model =>
  new Promise((resolve, reject) => {
    const q = `INSERT INTO tbl_bridge_models
    (model_part, task_id, survey_id, bid, date_created, created_by, last_update, updated_by, status, name, url,
      type, remarks, calibration_data, ion_id, folder_id)
     VALUES (${model.model_part ? model.model_part : null}, ${model.task_id}, ${
      model.survey_id
    }, 
      ${model.bid}, now(), "${model.created_by}", now(),
     "${model.created_by}", "${model.status}", "${model.name}", "${
      model.url
    }", "${model.type}",
     "${model.remarks}", '${model.calibration_data}', ${
      model.ion_id ? model.ion_id : null
    }, ${model.folder_id})`;
    console.log(q);
    connection.query(q, function(error, result) {
      console.log(result);
      if (error) reject(error);
      else resolve(result);
    });
  });

module.exports = {
  createBridgeModel,
};
