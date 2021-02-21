import React, { memo, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import * as selectors from './selectors';
import Tasks from 'containers/Tasks';

const SurveyTasksManager = ({
    tasks,
    surveys,
    organizationUsers,
    bridges,
    // providerUsers
}) => {

    const mergeBridgeInfo = array => {
        array.forEach(item => {
            const bridge = bridges.find(bridge => bridge.bid == item.bid)
            // console.log(item)
            // console.log(bridge)
            Object.keys(bridge).map(key => {
            if (item.hasOwnProperty(key)) {
                item['bridge_'+key] = bridge[key]
            } else {
                item[key] = bridge[key]
            }
            })
        })
        return array
    }   
  const createFullTasksTable = () => {
    console.log(surveys)
    let finalTable = bridges.length ? mergeBridgeInfo(tasks) : tasks;
    finalTable.forEach(task => {
      console.log(task)
      const user = organizationUsers.find(user => user.user_id == task.user_id);
      const userFullName = user ? user.first_name + ' ' + user.last_name : 'Unallocated'
      task['user'] = userFullName
      task['survey_name'] = surveys.find(survey => survey.id == task.survey_id).process_template_name,
      task['survey_status'] = surveys.find(survey => survey.id == task.survey_id).status
      // task['provider_name'] = task.provider_id ? provider.name : 'No provider'
    })
    
    return finalTable
  }
  return <Tasks tasks={createFullTasksTable()}
    readOnly={true}
    surveys={surveys}
    users={organizationUsers}
    bridges={bridges}/>;
};

const mapStateToProps = createStructuredSelector({
  tasks: selectors.makeSelectOrganizationTasks(),
  bridges: selectors.makeSelectOrganizationBridges(),
  surveys: selectors.makeSelectOrganizationSurveys(),
  organizationUsers: selectors.makeSelectOrganizationUsers(),  
  // providerUsers: selectors.makeSelectProviderUsers(),
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
