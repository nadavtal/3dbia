import React, { useEffect, memo, useState } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import IconButtonToolTip from '../../components/IconButtonToolTip/IconButtonToolTip';
import { useHistory , Link } from 'react-router-dom';
import { makeSelectLoading, makeSelectError, makeSelectprocessTemplatesTasks, makeSelectRoleTypes} from 'containers/App/selectors';
import { makeSelectOrganizationProcessesTemplates } from '../Organizations/Organization/selectors'
import {getprocessTemplatesTasks } from 'containers/AppData/actions'
import { toggleModal } from '../App/actions';
import styled from 'styled-components';
import * as actions from './actions'
import { useInjectSaga } from 'utils/injectSaga';
import DndTable from '../DndTable/DndTable'
import saga from './saga';
import ToolBar from '../../components/ToolBar/ToolBar';
import Form from '../Forms/Form';
import Process from '../Process/Process'
import Input from '../../components/Input/Input'
import { MDBBtn, MDBIcon } from 'mdbreact'
import DataTable from '../../components/DataTable/DataTable';
const key = 'Proccesses';



export function Processes({
  history = useHistory(),
  linkToProcessPage,
  createNewProcess,
  createProcess,
  editProcess,
  updateProcessTask,
  onCreateProcessTask,
  onUpdateTasks,
  updateTasks,
  onUpdateProcessTask,
  getprocessTemplatesTasks,
  organization,
  provider,
  processTemplatesTasks,
  organizationProcesses,
  showTasksByProcessName,
  onDeleteProcessTask,
  roleTypes,
  updateQuotes,
  toggleModal,
  createTask,
  onToggleModal
}) {
  // useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const [tasks, setTasks] = useState([]);
  const [showFormState, setShowFormState] = useState(false);
  const [formModeState, setformModeState] = useState('create');
  const [process, setProcess] = useState({});
  const [processes, setProcesses] = useState([])
  useEffect(() => {
    // console.log(processes)

  }, [process, tasks, processes, organization, provider]);

  useEffect(() => {
    getprocessTemplatesTasks()
  }, []);

  useEffect(() => {
    // console.log('processTemplatesTasks useEffect', process.name);
    if (process.name) {

      showTasksByProcessName(process.name)
    } else {
      setProcess({name: '', description: ''});
    }
    setProcesses(arrangeByProcessName(organizationProcesses));
  }, [processTemplatesTasks, organizationProcesses]);

  linkToProcessPage = (processName) => {
    history.push("/processes/"+processName);
  }

  showTasksByProcessName = (processName) => {
    console.log(processName)
    console.log(processTemplatesTasks)
    let tasks = [];
    tasks = processTemplatesTasks.filter(task => task.name === processName);
    // console.log(tasks);
    setTasks(tasks)
    organization ?
    setProcess({
      name: tasks[0].name,
      description: tasks[0].description,
      organization: tasks[0].organization
    })
    :
    setProcess({
      name: tasks[0].name,
      description: tasks[0].description,
      provider: tasks[0].provider
    });
    setformModeState('edit');
    setShowFormState(true);
    // let tasksArr = [];
    // for (let i=0; i<tasks.length; i++) {
    //   tasksArr.push({
    //     id: tasks[i].id,
    //     task_name: tasks[i].task_name,
    //     task_order: i,
    //     task_description: tasks[i].task_description,
    //     role_type_name: tasks[i].role_type_name,
    //     task_def_status: tasks[i].task_def_status,
    //     organization: null})
    // }

  }

  // const taskOrderChanged = (ta)

  const arrangeByProcessName = (tasks) => {
    let proccesesArr = [];
    let processes = []
    for (let i = 0; i < tasks.length; i++) {
      // console.log(proccesesArr.includes(tasks[i].name))
      if (proccesesArr.includes(tasks[i].name) == false){
        proccesesArr.push(tasks[i].name)
        organization ?
        processes.push({name: tasks[i].name, description: tasks[i].description, organization: tasks[i].organization})
        :
        processes.push({name: tasks[i].name, description: tasks[i].description, provider: tasks[i].provider})
      }
    }

    return processes
  }

  createNewProcess = () => {
    // console.log('alsjkdalksjdlksjd')
    setProcess({name: 'New process name', description: 'New process description'});
    setTasks([])
    setShowFormState(true)


  }

  createProcess = (data, event) => {
    console.log(data)
    setProcess(data);
    setformModeState('edit');
    let tasksArr = [];

    for (let i=0; i<data.initial_num_tasks; i++) {
      organization ?
      tasksArr.push({
        task_name: '',
        task_order: i,
        task_description: '',
        role_type_name: '',
        task_def_status: 'active',
        organization: organization.name})
      :
      tasksArr.push({
        task_name: '',
        task_order: i,
        task_description: '',
        role_type_name: '',
        task_def_status: 'active',
        provider: provider.name})
    }
    setTasks(tasksArr)
  }

  editProcess = (data, event) => {
    console.log(data, tasks);
    organization ?
    setProcess({
      name: data.name,
      description: data.description,
      // organization: tasks[0].organization
    })
    :
    setProcess({
      name: data.name,
      description: data.description,
      // provider: tasks[0].provider
    });
    tasks.forEach(task => {
      task.name = data.name;
      task.description = data.description
    });
    updateTasks(tasks)
  }

  createTask = (task) => {
    const newTask = {
      ...process,
      ...task,
      task_order: tasks.length,
      organization: organization.name,
      provider: 'General'
    }

    console.log(newTask)
    onCreateProcessTask(newTask)
  }

  updateProcessTask = (data, task, index) => {
    console.log(data, task, index)
    task.task_name = data.task_name;
    task.role_type_name = data.role_type_name;
    task.task_def_status = data.task_def_status;
    task.task_description = data.task_description;
    let newProcessTask = {}
    // organization ?
    //   newProcessTask = {
    //     name: process.name,
    //     description: process.description,
    //     // task_order: index,
    //     ...data,
    //     organization: organization? organization.name : 'General'
    //   }
    // :
    //   newProcessTask = {
    //     name: process.name,
    //     description: process.description,
    //     // task_order: index,
    //     ...data,
    //     provider: provider? provider.name : 'General'
    //   }
    console.log(task);
    onUpdateProcessTask(task)
    //check if task exists then update task or create
    // if(task.id) onUpdateProcessTask(newProcessTask, task.id);
    // else onCreateProcessTask(newProcessTask)



  }

  updateTasks = (tasks) => {
    // onUpdateTasks(tasks)
    tasks.forEach(task => {
      onUpdateProcessTask(task)
    });
  }
  toggleModal = (modalType, item) => {

    switch (modalType) {
      case 'addTask':
        onToggleModal({
          title: `Add task`,
          text: '',
          // confirmButton: 'Create',
          cancelButton: 'Cancel',
          formType: 'processTemaplateTaskForm',
          data: {
            roleTypes: roleTypes,
            editMode: 'Create',
          },
          // options: {
          //   buttonText: 'Add users',
          //   options: [],
          // },
          confirmFunction: (data, event) => createTask(data)
        });
        break
      case 'editTask':
        onToggleModal({
          title: `Edit task`,
          text: '',
          // confirmButton: 'Create',
          cancelButton: 'Cancel',
          formType: 'processTemaplateTaskForm',
          data: {
            roleTypes: roleTypes,
            item: item,
            editMode: 'edit'
          },
          // options: {
          //   buttonText: 'Add users',
          //   options: [],
          // },
          confirmFunction: (data, event) => updateProcessTask(data, item)
        });
        break

    }

  }
  return (
    <div className="Processes">

      <div className='text-center mt-3 mb-5 d-flex justify-content-between'>
        <h4>
          <strong>{organization ? organization.name : provider.name} processes templates</strong>
        </h4>
        <MDBBtn
          color='info'
          rounded
          className='ml-3'
          onClick={() => createNewProcess()}
        >
          Create new process <MDBIcon icon='image' className='ml-1' />
        </MDBBtn>

      </div>
      <div className="pl-3">
        {processes.length && !showFormState?
          <DataTable

          dataType="processTemplatesTasks"
          displayEntries={false}
          paging={false}
          data={processes}
          onRowClick={(processName) => showTasksByProcessName(processName)} >

          </DataTable>: ''}
        {showFormState?
          <>
            <IconButtonToolTip
            className="leftTopCorner m-2"
            size="lg"
            iconName="chevron-left"
            toolTipType="info"
            toolTipPosition="right"
            toolTipEffect="float"
            toolTipText="Show all processes"
            onClickFunction={() => setShowFormState(false)}
            />
            <Form
                formType="createProcessTemaplateForm"
                editMode={formModeState}
                item={process}
                createFunction={(data) => createProcess(data, event)}
                editFunction={(data) => editProcess(data, event)}
                btnColor="success"
                /></> : ''
          }
        <br></br><br></br>
        {process.name && showFormState?
          <div>
            {/* <h2>{process.name}</h2> */}
            <DndTable
              quotes={tasks}
              deleteQuote={(taskId) => onDeleteProcessTask(taskId)}
              updateQuote={(data, index, task) => updateProcessTask(data, index, task)}
              updateQuotes={quotes => updateTasks(quotes)}
              toggleModal={(modalType, objectId) => toggleModal(modalType, objectId)}/>
            </div> : ''}


      </div>

    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  processTemplatesTasks: makeSelectprocessTemplatesTasks(),
  organizationProcesses: makeSelectOrganizationProcessesTemplates(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
  roleTypes: makeSelectRoleTypes(),

});

const mapDispatchToProps = (dispatch) => {
  return {
    onCreateProcessTask: (data) => {dispatch(actions.createProcessTask(data))},
    onUpdateProcessTask: (task) => {dispatch(actions.updateProcessTask(task))},
    onDeleteProcessTask: (taskId) => {dispatch(actions.deleteProcessTask(taskId))},
    // onUpdateTasks: (tasks) => {dispatch(actions.updateProcessTasks(tasks))},
    getprocessTemplatesTasks: () => {dispatch(getprocessTemplatesTasks())},
    onEditProcess: (processName, newProcessData) => {dispatch(updateProcessByProcessName(processName, newProcessData))},
    onToggleModal: (modalData) => dispatch(toggleModal(modalData)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Processes);
