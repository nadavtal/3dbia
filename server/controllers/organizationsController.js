
const config = require('../config.js')
const db = require("../models");
const connection = require('../db.js');
const mySqlUtils = require('../utils/mysqlUtils') 
const convertObjArrayToArray = mySqlUtils.convertObjArrayToArray
const convertToMySqlDateFormat = mySqlUtils.convertToMySqlDateFormat;
const getOrgTechInfo = async (req, res) => {
  console.log('getting org TECH INFO');

      try {
        const info = await getOrgTechInfoFunction(req.params.id)
        // console.log('FINAL TECH INFO', (info))
        res.send(info)
      } catch (err) {
        res.send(err) 
      }
  
        

}
const getOrgTechInfoFunction = async (orgId) => {
  try {
    const elementsGroups = await getElementsGroups(orgId)
    // console.log('elementsGroups', elementsGroups)
    const elementsTypes = await getElementsTypes(orgId)
    const bridgeTypes = await getBridgeTypes(orgId)
    // console.log('elementsTypes', elementsTypes)
    // console.log('bridgeTypes', bridgeTypes)
    const structureTypes = await getStructureTypes(orgId)
    // console.log('structureTypes', structureTypes)
    const folderStructure = await getFolderStructure(orgId)
    // console.log('folderStructure', folderStructure)
    return {
      elementsGroups,
      elementsTypes,
      bridgeTypes,
      structureTypes,
      folderStructure,
    };
  } catch (err) {
    throw err
  }
}
const getElementsGroups = async (orgId) => {
  return new Promise((resolve, reject) => {
    try {
      console.log('getting elements groups by orgnization: '+ orgId);
      var q = 'SELECT * FROM tbl_elements_groups where organization_id = '+ orgId;
      connection.query(q, function (error, result) {
        resolve(result) ;
    });
    } catch (err) {
      reject(err) 
    }
    
  })
}
const getElementsTypes = async (orgId) => {
  return new Promise((resolve, reject) => {
    try {
      console.log('getting elements types by orgnization: '+ orgId);
      var q = 'SELECT * FROM tbl_elements_types where organization_id = '+ orgId;
      connection.query(q, function (error, result) {
        resolve(result) ;
    });
    } catch (err) {
      reject(err) 
    }
    
  })
}
const getBridgeTypes = async (orgId) => {
  console.log('GETTING BRIDGE TYPES')
  return new Promise((resolve, reject) => {
    try {
      console.log('getting bridge types by orgnization: '+ orgId);
      var q = 'SELECT * FROM tbl_bridge_type where organization_id = '+ orgId;
      connection.query(q, function (error, result) {
        resolve(result) ;
    });
    } catch (err) {
      reject(err) 
    }
    
  })
}

const getStructureTypes = async (orgId) => {
  return new Promise((resolve, reject) => {
    try {
      console.log('getting bridge structure types by orgnization: '+ orgId);
      var q = 'SELECT * FROM tbl_structure_type where organization_id = '+ orgId;
  
  
      connection.query(q, function (error, result) {
        resolve(result) ;
    });
    } catch (err) {
      reject(err) 
    }
    
  })
}
const getFolderStructure = async (orgId) => {
  return new Promise((resolve, reject) => {
    try {
 
      var q = `SELECT * from tbl_folder_structure where organization_id = ${orgId}`;
      
  
      connection.query(q, function (error, result) {
        // console.log('FOLDERSTRUCTURE RESULT', result.length)
        if (result.length) resolve(result);
        else {
          try {
 
            var q = `SELECT * from tbl_folder_structure where organization_id is NULL`;
            
        
            connection.query(q, function (error, result) {
              
              resolve(result);
          });
          } catch (err) {
            reject(err) 
          }
        }
    });
    } catch (err) {
      reject(err) 
    }
    
  })
}




module.exports = {
  getOrgTechInfo
};