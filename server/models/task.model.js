module.exports = (sequelize, DataTypes) => {
    const Task = sequelize.define("tbl_tasks", {
      name: {
        type: DataTypes.STRING,
      },
      survey_type: {
        type: DataTypes.STRING,
      },
      description: {
        type: DataTypes.STRING,
      },
      bid: {
        type: DataTypes.INTEGER,
      },
      survey_id: {
        type: DataTypes.INTEGER,
      },
      bid: {
        type: DataTypes.INTEGER,
      },
      user_id: {
        type: DataTypes.INTEGER,
      },
      organization_id: {
        type: DataTypes.INTEGER,
      },
      provider_id: {
        type: DataTypes.INTEGER,
      },
      role_type_id: {
        type: DataTypes.INTEGER,
      },
      status: {
        type: DataTypes.STRING,
      },
      created_by: {
        type: DataTypes.STRING,
      },
      remarks: {
        type: DataTypes.STRING,
      },
      due_date: {
        type: DataTypes.DATE,
      },
      pre_task_id: {
        type: DataTypes.INTEGER,
      },
      next_task_id: {
        type: DataTypes.INTEGER,
      },
      completed: {
        type: DataTypes.INTEGER,
      },
    
    });
  
    return Task;
  };