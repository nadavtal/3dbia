
const config = require('../config.js')
const db = require("../models");
const connection = require('../db.js');
const mySqlUtils = require('../utils/mysqlUtils') 
const convertObjArrayToArray = mySqlUtils.convertObjArrayToArray
const convertToMySqlDateFormat = mySqlUtils.convertToMySqlDateFormat;
const createElements = async (elements) => {
  console.log('creating new bridge elements');
  return new Promise((resolve, reject) => {
      try {
        
        var q = `INSERT INTO tbl_bridge_elements (bid, object_id, name, updated_by_user_id, last_updated) VALUES ?`;
        // console.log(q)
        const values = convertObjArrayToArray(elements)
        console.log('values', values)
        connection.query(q, [values], function(err, result) {
            console.log(result)
            resolve(result) ;
        });
      } catch (err) {
        reject(err) 
      }
  
        
  })
}
const deleteElements = async (ids) => {
  return new Promise((resolve, reject) => {
    try {
      
      var q = `DELETE FROM tbl_bridge_elements WHERE id in (${ids})`;
      console.log(q)
      connection.query(q, function (error, result) {
        console.log(result)
        resolve(result) ;
    });
  } catch (err) {
    reject(err) 
  }
    
  })
}
const resetElements = async (ids, userId) => {
  return new Promise((resolve, reject) => {
    console.log('resetElements', ids)
    try {
      const q = `UPDATE tbl_bridge_elements
      SET span_id = ${null},
          element_group_id = ${null},
          element_type_id = ${null},
          element_order = ${null},
          element_type_name = ${null},
          importance = ${null},
          primary_unit = ${null},
          primary_quantity = ${null},
          secondary_unit = ${null},
          secondary_quantity = ${null},
          detailed_evaluation_required = ${null},
          view_position = ${null},
          last_updated = now(),
          updated_by_user_id = ${userId},
          default_view_data = ${null}
      WHERE id in (${ids})`;
      // console.log(q)
      connection.query(q, function (error, result) {
        console.log(result)
        resolve(result) ;
    });
  } catch (err) {
    reject(err) 
  }
    
  })
}

module.exports = {
  deleteElements,
  resetElements,
  createElements
  
};