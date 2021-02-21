const fs = require("fs");
const config = require('../config.js')
const db = require("../models");
const connection = require('../db.js');
const Image = db.images;
const ProfileImage = db.profile_images;

const uploadFiles = async (req, res) => {
    // console.log('uploadFiles')
    // console.log('req.body', req.body)
    // console.log('req.params', req.params)
    const file = req.file
    console.log('FILEEEEEE', file)

  try {
    

    if (file == undefined) {
      console.log('req.file is undefined')
      return res.send(`You must select a file.`);
    }
    const data = fs.readFileSync(
        './resources/static/assets/uploads/' + file.filename,
      )
    ProfileImage.create({
      type: file.mimetype,
      name: file.originalname,
      data: data,
      user_id: req.params.type === 'user' ? req.params.id : null,
      organization_id: req.params.type === 'organization' ? req.params.id : null,
      provider_id: req.params.type === 'provider' ? req.params.id : null,
      bridge_id: req.params.type === 'bridge' ? req.params.id : null
    }).then(image => {
      console.log('IMAGE', image);
      fs.writeFileSync(
        './resources/static/assets/tmp/' + image.name,
        image.data,
      );
    //   var q = `UPDATE tbl_${req.params.type}s
    //     SET profile_image = '${image.name}'
    //     WHERE id = ${req.params.id};`
    //     console.log(q)
    //     connection.query(q, function(error, results) {
    //         if (error) res.send(error);

    //         console.log('results', results)
    //         return res.send({results, image});
    //     });
        return res.send(image);
    });
  } catch (error) {
    console.log(error);
    return res.send(`Error when trying upload images: ${error}`);
  }
};
const updateFiles = async (req, res) => {

    const file = req.file
    console.log('FILEEEEEE', file)
    const whereFunction = (type) => {
        let whereObj = {}
        switch (type) {
            case 'user':
                whereObj['user_id'] = req.params.id
                return whereObj;
            case 'organization':
                whereObj['organization_id'] = req.params.id
                return whereObj;
            case 'provider':
                whereObj['provider_id'] = req.params.id
                return whereObj;
        
            default:
                break;
        }
    }

  try {
    

    if (file == undefined) {
      console.log('req.file is undefined')
      return res.send(`You must select a file.`);
    }

    const data = fs.readFileSync(
        './resources/static/assets/uploads/' + file.filename,
      )
    const updatedData = {
        type: file.mimetype,
        name: file.originalname,
        data: data,
        user_id: req.params.type === 'user' ? req.params.id : null,
        organization_id: req.params.type === 'organization' ? req.params.id : null,
        provider_id: req.params.type === 'provider' ? req.params.id : null
      }
    const options = {where: whereFunction(req.params.type)}
    ProfileImage.update(updatedData,options).then(results => {
      console.log('update resulsts', results);
      console.log('file.originalname', file.originalname);
      
      fs.writeFileSync(
        './resources/static/assets/tmp/' + file.originalname,
        data,
      );
    //   var q = `UPDATE tbl_${req.params.type}s
    //   SET profile_image = '${file.originalname}'
    //   WHERE id = ${req.params.id};`
    //   console.log(q)
    //   connection.query(q, function(error, results) {
    //       if (error) res.send(error);

    //       console.log('results', results)
    //       return res.send({results, updatedData});
    //   });
      return res.send(updatedData);
      
    });
  } catch (error) {
    console.log(error);
    return res.send(`Error when trying upload images: ${error}`);
  }
};

module.exports = {
  uploadFiles,
  updateFiles
};