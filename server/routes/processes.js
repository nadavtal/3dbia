
var express = require('express');
var app = module.exports = express();
const connection = require('../db.js');


//PROCESS TEMAPLATE TASKS ROUTES

//Get all template tasks
app.get("/processes/", function(req, res){
  console.log('getting all processes');

  var q = `select * from tbl_processes`;
  connection.query(q, function (error, results) {
  if (error) res.send(error);

  res.send(results);
  });
});

//Get processes by project id
app.get("/processes/", function(req, res){
  console.log('getting process-template-tasks', req.params);

  var q = `select * from tbl_process_template`;
  connection.query(q, function (error, results) {
  if (error) res.send(error);

  res.send(results);
  });
});


function updateProcessTask(task, taskId, res) {
  var q = `UPDATE tbl_process_template
  SET name = '${task.name}',
      description = '${task.description}',
      task_name = '${task.task_name}',
      task_description = '${task.task_description}',
      task_order = ${task.task_order},
      role_type_name = '${task.role_type_name}',
      task_def_status = '${task.task_def_status}',
      organization = '${task.organization}'
  WHERE id = ${taskId};`

  console.log(q)
  connection.query(q, function(err, result) {
    if (err) throw(err);

    res.send(result);
  });
}
//Upadte task
app.put("/process-template-tasks/:id", function(req, res){
  console.log('updating new process-template-task', req.body, req.params.id);
  const task = req.body;
  updateProcessTask(task, req.params.id, res)


});
// Delete task
app.delete("/process-template-tasks/:id", function(req, res){
  console.log('deleting process-template-task', req.params.id);
  var q = `DELETE FROM tbl_process_template WHERE id=${req.params.id}`
  connection.query(q, function(err, result) {
    if (err) res.send(err);

    res.send({result, deletedTaskId: req.params.id});
  });

});
//creating new process-template-task

app.post("/processes", function(req, res){
  console.log('creating new processes', req.body);
  const processes = req.body;

  var q = `INSERT INTO tbl_processes (name, bid, provider_name, organization_id, project_id, process_template_name, date_created,
          created_by, remarks, last_update, status, start_date, due_date) VALUES ?`;
  // var data = createProjectUsersArray(project.id, projectUsers);
  // console.log(processes)
  // console.log(convertObjArrayToArray(processes))
  const values = convertObjArrayToArray(processes)
  connection.query(q, [values], function(err, result) {
    if (err) res.send(err);

    res.send(result);
  });

});

function convertObjArrayToArray(array) {
  let finalArr = [];
  array.map(obj => finalArr.push(Object.values(obj)))
  return finalArr
}
// app.post("/processes", function(req, res){
//   console.log('creating new process', req.body);
//   const process = req.body;

//   // var q = `INSERT INTO tbl_process_template (name, description, task_order, task_name, task_description, role_type_name, task_def_status, organization)
//   // VALUES ('${task.name}', '${task.description}', ${task.task_order}, '${task.task_name}', '${task.task_description}', '${task.role_type_name}',
//   //  '${task.task_def_status}','${task.organization}')`;
//   // console.log(q)
//   // connection.query(q, function(err, result) {
//   //   if (err) res.send(err);

//   //   res.send({result, newProcessTaskId: result.insertId});
//   // });

// });

//Upadte tasks
app.put("/process-template-tasks", function(req, res){
  console.log('updating new process-template-task', req.body);
  const tasks = req.body;
  tasks.forEach(task => {
    updateProcessTask(task, req, res)
  });
  // var q = `INSERT INTO tbl_process_template (name, description, task_order, task_name, task_description, role_type_name, task_def_status, organization)
  // VALUES ('${task.name}', '${task.description}', ${task.task_order}, '${task.task_name}', '${task.task_description}', '${task.role_type_name}',
  //  '${task.task_def_status}', null)`;
  // console.log(q)
  // connection.query(q, function(err, result) {
  //   if (err) res.send(err);

  //   res.send(result);
  // });

});

