import React, { memo, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { reArrangeObject } from 'utils/dataUtils'
import * as selectors from './selectors';
import Tasks from 'containers/Tasks';

const SurveyTasksManager = ({
    tasks,
    surveys,
    organizationUsers,
    bridges,
    providerUsers
}) => {

  const [fullTasksTable, setFullTasksTable] = useState([])
  useEffect(() => {
    setFullTasksTable(createFullTasksTable())
    return () => {
      
    }
  }, [])
  const mergeBridgeInfo = array => {
    let updatedArray = [...array]
      updatedArray.forEach(item => {
          const bridge = bridges.find(bridge => bridge.bid == item.bid)

          Object.keys(bridge).map(key => {
            item['bridge_'+key] = bridge[key]
            // if (item.hasOwnProperty(key)) {
            //     item['bridge_'+key] = bridge[key]
            // } else {
            //     item[key] = bridge[key]
            // }
          })
      }) 
      return updatedArray
  }   
  const createFullTasksTable = () => {
    console.log(tasks)
    console.log(surveys)
    console.log(bridges)
    let finalTable = []
    let tasksWithBridges =  bridges.length ? mergeBridgeInfo([...tasks]) : tasks;
    console.log('tasksWithBridges', tasksWithBridges)
    finalTable = tasksWithBridges.map(task => {
      const user = providerUsers.find(user => user.user_id == task.user_id);
      const userFullName = user ? user.first_name + ' ' + user.last_name : 'Unallocated'
      task['user'] = userFullName
      task['survey_name'] = surveys.find(survey => survey.id == task.survey_id).process_template_name
      task['survey_status'] = surveys.find(survey => survey.id == task.survey_id).status
      // task['provider_name'] = task.provider_id ? provider.name : 'No provider'
      return reArrangeObject(task, ['bridge_name', 'name', 'status', 'bid', 'survey_id', 'remarks', 'due_date', 'completed', 'user'])

    })
    console.log('finalTable', finalTable)
    return finalTable
    // return tasks
  }
  console.log(fullTasksTable)
  return <Tasks 
    readOnly={false}
    tasks={fullTasksTable}
    surveys={surveys}
    users={providerUsers}
    bridges={bridges}/>;
};

const mapStateToProps = createStructuredSelector({
  tasks: selectors.makeSelectProviderTasks(),
  bridges: selectors.makeSelectProviderBridges(),
  surveys: selectors.makeSelectProviderSurveys(),
  // organizationUsers: selectors.makeSelectOrganizationUsers(),  
  providerUsers: selectors.makeSelectProviderUsers(),
});

const mapDispatchToProps = dispatch => {
  return {
    //   onUpdateTask: (task) => dispatch(updateTask(task)),
  };
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(SurveyTasksManager);
