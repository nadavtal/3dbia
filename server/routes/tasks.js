
var express = require("express");
var app = module.exports = express();
const connection = require("../db.js");
const convertObjArrayToArray = require("../utils/mysqlUtils") 

//PROCESS TEMAPLATE TASKS ROUTES

//Get all template tasks
app.get("/process-template-tasks/", function(req, res){
  console.log("getting process-template-tasks", req.params);

  var q = `select * from tbl_process_template`;
  connection.query(q, function (error, results) {
  if (error) res.send(error);

  res.send(results);
  });
});

//Get all template tasks by organization name & process name
// app.get("/process-template-tasks/", function(req, res){
//   console.log("getting process-template-tasks", req.params);

//   var q = `select * from tbl_process_template`;
//   connection.query(q, function (error, results) {
//   if (error) res.send(error);

//   res.send(results);
//   });
// });


function updateProcessTask(task, taskId, res) {
  var q = `UPDATE tbl_process_template
  SET name = "${task.name}",
      description = "${task.description}",
      task_name = "${task.task_name}",
      task_description = "${task.task_description}",
      task_inputs = "${task.task_inputs}",
      task_outputs = "${task.task_outputs}",
      task_order = ${task.task_order},
      role_type_name = "${task.role_type_name}",
      task_def_status = "${task.task_def_status}",
      organization = "${task.organization}"
  WHERE id = ${taskId};`

  console.log(q)
  connection.query(q, function(err, result) {
    if (err) throw(err);

    res.send(result);
  });
}
//Upadte task
app.put("/process-template-tasks/:id", function(req, res){
  console.log("updating new process-template-task", req.body, req.params.id);
  const task = req.body;
  updateProcessTask(task, req.params.id, res)


});
// Delete task
app.delete("/process-template-tasks/:id", function(req, res){
  console.log("deleting process-template-task", req.params.id);
  var q = `DELETE FROM tbl_process_template WHERE id=${req.params.id}`
  connection.query(q, function(err, result) {
    if (err) res.send(err);

    res.send({result, deletedTaskId: req.params.id});
  });

});
//get all tasks
app.get("/tasks/", function(req, res){
  console.log("getting all", req.params);

  var q = `select * from tbl_tasks`;
  connection.query(q, function (error, results) {
  if (error) res.send(error);

  res.send(results);
  });
});
//creating tasks
app.post("/tasks", function(req, res){
  console.log("creating new tasks", req.body);
  const tasks = req.body;

  var q = `INSERT INTO tbl_tasks (name, survey_type, description, task_inputs, task_outputs, bid, survey_id,
    user_id, organization_id, provider_id, role_type_id, status, created_by, remarks,
    due_date, pre_task_id, next_task_id, task_order, completed, createdAt, 
    updatedAt, sub_tasks_names, sub_tasks_dates, sub_tasks_remarks, sub_tasks_file_types) VALUES ?`;
  const values = convertObjArrayToArray(tasks)
  connection.query(q, [values], function(err, result) {
  if (err) res.send(err);

  res.send(result);
  });

});

//creating tasks
app.put("/tasks", function(req, res){
  console.log("updating tasks");
  const tasks = req.body;
  // const values = convertObjArrayToArray(tasks)
  // console.log(values)
  // const taskIds = tasks.map(task => task.id)
  updateTasks(tasks, res)
  // console.log("result", result)
  // res.send(result);
  // });

});

//Upadte task
app.put("/tasks/:id", function(req, res){
  console.log("updating task", req.body);
  const task = req.body;
  const q = `UPDATE tbl_tasks
  SET name = "${task.name}",
      survey_type = "${task.survey_type}",
      description = "${task.description}",
      task_inputs = "${task.task_inputs}",
      task_outputs = "${task.task_outputs}",
      user_id = ${task.user_id},
      bid = ${task.bid},
      organization_id = ${task.organization_id},
      provider_id = ${task.provider_id},
      role_type_id = ${task.role_type_id},
      due_date = "${task.due_date}",
      status = "${task.status}",
      updatedAt = now(),
      remarks = "${task.remarks}",
      completed = ${task.completed},
      sub_tasks_names = "${task.sub_tasks_names}",
      sub_tasks_dates = "${task.sub_tasks_dates}",
      sub_tasks_remarks = "${task.sub_tasks_remarks}",
      sub_tasks_file_types = "${task.sub_tasks_file_types}"
  WHERE id = ${task.id};`

  console.log(q)
  connection.query(q, function(err, result) {
    if (err) res.send(err);

    res.send(result);
  });
});
const updateTasks = async (tasks, res) => {

  const results =  await Promise.all(tasks.map(async (task) => {
      const result = await updateTask(task);
      return result
      // console.log(result)
    })
  )
  res.send(results)
  // console.log("updatedTasks", updatedTasks)
  // return updatedTasks
}
function updateTask(task, res) {
  return new Promise((resolve, reject) => {
    const q = `UPDATE tbl_tasks
    SET name = "${task.name}",
        survey_type = "${task.survey_type}",
        description = "${task.description}",
        task_inputs = "${task.task_inputs}",
        task_outputs = "${task.task_outputs}",
        user_id = ${task.user_id},
        bid = ${task.bid},
        organization_id = ${task.organization_id},
        provider_id = ${task.provider_id},
        role_type_id = ${task.role_type_id},
        due_date = "${task.due_date}",
        status = "${task.status}",
        updatedAt = now(),
        remarks = "${task.remarks}",
        completed = ${task.completed}
    WHERE id = ${task.id};`

    // console.log(q)
    connection.query(q, function(err, result) {
      if (err) reject(err);

      resolve(result);
    });
  })
  
}
