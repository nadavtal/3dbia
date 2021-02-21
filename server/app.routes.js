var express = require('express');
var router = express.Router();

var config = require('./config.js');
var ENV = process.env.NODE_ENV || 'developement';
// console.log(ENV);
// var DB_URI = config.db[ENV].url;
// console.log(DB_URI);
const path = require('path');

// const mysql = require('mysql');
String.prototype.splice = function(idx, rem, str) {
  return this.slice(0, idx) + str + this.slice(idx + Math.abs(rem));
};
router.use(function (req, res, next) {
  if (req.method == 'PUT' || req.method == 'POST') {
    Object.keys(req.body).map(key => {
    if (typeof req.body[key]  == 'string') {
      
        if (checkForEscapedCharecters(req.body[key])) {
          let newStr = req.body[key]
          console.log('newStr', newStr)
          let indices = [];
          for(var i=0; i<newStr.length ;i++) {
              if (newStr[i] === "'") indices.push(i);
          }
          console.log(indices)
          indices.forEach(index => {
            newStr.splice(index, 0, "'\'")
          })
            // req.body[key] = "Welcome to \'infinesoft\' tutorials"
            // const newStr 
            // 

        }
      }
    });
  }
//   console.log('router Time:', Date.now())
  next()
})
const checkForEscapedCharecters = (str) => {
   const escapedCharecters = [ "'", "/"]
   if (str.includes("'")) return true
   else return false
}
const connection = require('./db.js');

router.get("/", function(req, res){

 res.send("HELLO FROM OUR WEB APP!");
});

module.exports = router;




