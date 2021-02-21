import React, { memo, useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import TableRowWrapper from "../TableRow";
import IconButtonToolTip from "../IconButtonToolTip/IconButtonToolTip";
import Actions from 'components/Actions';
import { MDBInput, MDBBtn, MDBSimpleChart } from "mdbreact";
import  useOutsideAlerter  from 'utils/customHooks/useOutSideClick';
import { updateTask } from 'containers/AppData/actions';
import DateField from 'components/DateField/DateField';
import { isDueDatePassed } from 'utils/dateTimeUtils';
import { toggleAlert, toggleModal } from 'containers/App/actions';
import {
  makeSelectRoleTypes,
  makeSelectCurrentUser,
  makeSelectCurrentUserRole
} from 'containers/App/selectors';
const TaskRow = ({ 
  task, 
  onUpdateTask, 
  roleTypes, 
  users,
  checked,
  handleChecked,
  onToggleModal
 }) => {
  const [editMode, setEditMode] = useState(false);
  const [taskName, setTaskName] = useState(task.taskName);
  const [taskDescription, setTaskDescription] = useState(task.description);
  const isPast = isDueDatePassed(task.due_date);
  const wrapperRef = useRef(null);
  const clickedOutSide = useOutsideAlerter(wrapperRef);
  if (editMode && clickedOutSide) {
    console.log('clickedOutSide', clickedOutSide);
    setEditMode(false);
  }
  useEffect(() => {
    setTaskName(task.taskName);
  }, [task]);
  const actions = [
    { name: `Allocate task`, icon: 'user-tag', type: 'info' },
    { name: `Edit task`, icon: 'edit', type: 'info' },
    { name: `Send message`, icon: 'envelope', type: 'info' },
    // { name: `Send message`, icon: 'envelope', type: 'error', confirmationMessageType: 'danger', confirmationMessage: 'Are you sure you want to delete '},
  ];
  const findUserById = (id) => {
    return users.find(user => user.user_id == id)
  }
  const getUserFullName = (userId) => {
    const user = users.find(user => user.user_id == userId)
    return `${user.first_name} ${user.last_name}`
  }
  const handleAction = (actionName, val) => {
    console.log(actionName, val);
    switch (actionName) {
      case 'Edit task':
        if (editMode) {
          console.log(taskName);
          task.name = taskName;
          task.description = taskDescription;
          onUpdateTask(task);
          setEditMode(!editMode);
        } else {
          setEditMode(!editMode);
        }
        break;
      case 'Allocate task':
        console.log(users)
        const usersByRoletypeId = users.filter(user => user.role_type_id == task.role_type_id)
        onToggleModal({
          title: `Allocate ${val.name}`,
          text: `Choose user `,
          // confirmButton: 'Create',
          cancelButton: 'Cancel',
          data: {
            editMode: 'Allocate',
            users: usersByRoletypeId
          },
          colWidth: 12,
          formType:'taskAllocationForm',
          confirmFunction: (data) => {
            console.log(data)
            console.log(task)
            let updatedTask = {...task}
            updatedTask.user_id = data.user_id
            updatedTask.remarks = data.remarks;
            console.log(updatedTask)
            onUpdateTask(updatedTask)
           }
          })
        break;
        

      default:
        break;
    }
  };
  return (
    <TableRowWrapper
      className={`row text-center py-1 tableRow ${editMode && 'active'}`}
      ref={wrapperRef}
    >
      <div className="col-2 text-left">
        {editMode ? (
          <MDBInput
            value={taskName}
            onChange={val => setTaskName(val.target.value)}
            // onBlur={val => handleAction('editTask', val)}
          />
        ) : (
          handleChecked ? 
          <MDBInput
            label={taskName}
            filled
            type="checkbox"
            id={`checkbox${task.id}`}
            containerClass=""
            checked={checked}
            onChange={() => handleChecked(task)}
          />
          :
          <span className="pl-3">{taskName}</span>
        )}
      </div>
      <div className="col-2">
        {editMode ? (
          <MDBInput
            value={taskDescription}
            onChange={val => setTaskDescription(val.target.value)}
            // onBlur={val => handleAction('editTask', val)}
          />
        ) : (
          taskDescription
        )}
      </div>
      <div className="col-2">{task.remarks}</div>
      <div className="col-1">
        <DateField date={task.due_date} />
      </div>
      <div className="col-1">
        {roleTypes.find(role => role.id == task.role_type_id).name}
      </div>
      <div className="col-1">
        {task.user_id ? getUserFullName(task.user_id) : 'UnAllocated'}
      </div>
      <div className="col-2">
        <span className="mr-2">{task.status}</span>
        <MDBSimpleChart
          strokeColor={task.completed == 100 ? 'green' : 'red'}
          strokeWidth={3}
          width={30}
          height={30}
          percent={task.completed}
          labelFontWeight="normal"
          labelFontSize="13"
          labelColor={
            task.completed !== 100 && isPast ? 'red' : 'green'
          }
          // railColor={'blue'}
        />
      </div>
      <div className="col-1">
        <Actions
          actions={actions}
          handleAction={actionName => handleAction(actionName, task)}
        />
      </div>
    </TableRowWrapper>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: makeSelectCurrentUser(),
  currentUserRole: makeSelectCurrentUserRole(),
  roleTypes: makeSelectRoleTypes(),
});

const mapDispatchToProps = dispatch => {
  return {
    onToggleAlert: alertData => dispatch(toggleAlert(alertData)),
    onToggleModal: modalData => dispatch(toggleModal(modalData)),
    onUpdateTask: (task) => dispatch(updateTask(task)),
    
  };
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(TaskRow);
