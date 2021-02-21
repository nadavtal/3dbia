import React, { memo, useState, useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import { toggleAlert, toggleModal } from 'containers/App/actions';
import { updateTasks, updateTask } from 'containers/AppData/actions';
import CustomSelect from 'components/CustomSelect';
import { convertToMySqlDateFormat } from 'utils/dateTimeUtils';
import MyWijmoCheckBoxTable from 'containers/MyTables/MyWijmoCheckBoxTable';
import {
  makeSelectRoleTypes,
  makeSelectCurrentUser,
  makeSelectCurrentUserRole,
  makeSelectTaskStatuses,
  makeSelectSurveyStatuses
} from 'containers/App/selectors';
import {
  makeSelectBridgeIds,
  makeSelectCurrentTaskOrder,
} from './selectors';
import TableHeader from 'components/TableHeader';
import { ExportService } from 'containers/Wijmo/export';
import { MDBInput, MDBBtn, MDBIcon, MDBDatePicker, MDBListGroup, MDBListGroupItem } from 'mdbreact';
import Layout from 'containers/Management/Layout';
import Overlay from 'components/Overlay';
import { searchAll, sortBy, onlyUnique, searchByField, getUniqueValuesFromColumn,
  getUniqueUsers } from 'utils/dataUtils';
import reducer from './reducer';
import saga from './saga';
import './Tasks.css'
import Stepper from '../../components/Stepper/Stepper';
import Form from '../Forms/Form';
import IconButtonToolTip from 'components/IconButtonToolTip/IconButtonToolTip';
const key = 'tasks';


const Tasks = ({
  tasks,
  surveys,
  currentUser,
  currentUserRole,
  bridges,
  users,
  roleTypes,
  onToggleModal,
  onToggleAlert,
  onUpdateTasks,
  bridgeIds, 
  onUpdateTask,
  currentTaskOrder,
  taskStatuses,
  surveyStatuses,
  readOnly
}) => {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });


  const getUniqueRoleTypes = array => {
    const roleTypeIds = array.map(item => item.role_type_id);
    const uniqueRoleTypesIds = roleTypeIds.filter(onlyUnique);
    const uniqueRoleTypes = roleTypes.filter(type =>
      uniqueRoleTypesIds.includes(type.id),
    );
    return uniqueRoleTypes;
  };
  const getUniqueRoleTypesNames = array => {
    const roleTypeNames = tasks.map(item => item.roleType);
    const uniqueRoleTypeNames = roleTypeNames.filter(onlyUnique);
    
    return uniqueRoleTypeNames;
  };
  const getUniqueTasksByName = (array, selectAll) => {
    
    const taskNames = array.map(item => item.name);
    const uniqueTaskNames = taskNames.filter(onlyUnique);
    let uniqueTasks = uniqueTaskNames.filter(name =>
      uniqueTaskNames.includes(name),
    );
    // console.log(uniqueTasks)
    uniqueTasks = uniqueTasks.map((element, index) => {
      const name = { id: index + 2, name: element, task_order: array.find(item => item.name == element).task_order };

      return name;
    });
    if (selectAll) {
      uniqueTasks = [{ id: 1, name: 'Select all' }, ...uniqueTasks];
      // console.log(uniqueTasks)

    }
    return uniqueTasks;
  };
  // const getUniqueUsers = array => {
    
  //   const userIds = array.map(item => item.user_id);
  //   const uniqueIds = userIds.filter(onlyUnique);
  //   let uniqueUsers = uniqueIds.map(id => array.find(item => item.user_id == id));
  //   return uniqueUsers;
  // };
  const getUniqueSurveyNames = (tasks, forSelect) => {
    
    const surveyNames = tasks.map(item => item.survey_name);
    
    let uniqueSurveyNames = surveyNames.filter(onlyUnique);
    if (forSelect) {
      uniqueSurveyNames = uniqueSurveyNames.map((element, index) => {
        const surveyName = { id: index + 2, name: element};
  
        return surveyName;
      });

    }
    return uniqueSurveyNames;
  };
  const getUniqueTasksNamesBySurveyName = (surveyName) => {
    const tasksBySurveyName = tasks.filter(task => task.survey_name == surveyName)
    const taskNames = tasksBySurveyName.map(item => item.name);
    const uniqueTaskNames = taskNames.filter(onlyUnique);
    
    return uniqueTaskNames
  }
  const getUniqueTasksBySurveyName = (surveyName) => {
    const tasksBySurveyName = tasks.filter(task => task.survey_name == surveyName)
    const taskNames = tasksBySurveyName.map(item => item.name);
    let uniqueTaskNames = taskNames.filter(onlyUnique);
    uniqueTaskNames = uniqueTaskNames.map(name => {
      const task = tasksBySurveyName.find(task => task.name == name)
      return task
    
    });
    return uniqueTaskNames
  }
  const arrangeUniqueTasksBySurveyName = (tasks) => {
    // console.log(selectedTask)
    const surveyNames = getUniqueSurveyNames(tasks)
    
    // console.log(surveyNames)
    let arranged = []
    surveyNames.forEach(surveyName => {
      arranged = arranged.concat([
        {
        disabled: true,
        text: surveyName
      },
        ...getUniqueTasksNamesBySurveyName(surveyName).map(task => {
          const checked = selectedTask ? selectedTask.name == task : false;
          // console.log(checked)
          return {
            text: task,
            value: task,
            checked: checked
          }
        })
      ]) 
    })
    return arranged
  }
  // const mergeBridgeInfo = array => {
  //   array.forEach(item => {
  //     const bridge = bridges.find(bridge => bridge.bid == item.bid)
  //     // console.log(item)
  //     // console.log(bridge)
  //     Object.keys(bridge).map(key => {
  //       if (item.hasOwnProperty(key)) {
  //         item['bridge_'+key] = bridge[key]
  //       } else {
  //         item[key] = bridge[key]
  //       }
  //     })
  //   })
  //   return array
  // }
  // const createFullTasksTable = () => {
  //   console.log(surveys)
  //   let finalTable = mergeBridgeInfo(tasks);
  //   finalTable.forEach(task => {
  //     const user = users.find(user => user.user_id == task.user_id);
  //     const userFullName = user ? user.first_name + ' ' + user.last_name : 'Unallocated'
  //     task['user'] = userFullName
  //     task['surveyName'] = surveys.find(survey => survey.id == task.survey_id).name
  //     task['provider_name'] = task.provider_id ? 
  //   })
  //   return finalTable
  // }


  let uniqueRoleTypes = getUniqueRoleTypes(tasks);
  let uniqueRoleTypeNames = getUniqueRoleTypesNames(tasks);
  let uniqueTasks = getUniqueTasksByName(tasks, false);
  let uniqueTasksWithSelectAll = getUniqueTasksByName(tasks, true);
  let uniqueTasksBySurvey = arrangeUniqueTasksBySurveyName(tasks);
  let uniqueUsers = getUniqueUsers(users);
  let uniqueSurveyNames = getUniqueSurveyNames(tasks)

  const [status, setStatus] = useState('All');
  const [filteredTasks, setFilteredTasks] = useState();
  const [activeStep, setActiveStep] = useState(0);
  const [selection, setSelection] = useState([]);
  const [showCheckBox, setShowCheckBox] = useState(false);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedSurvey, setSelectedSurvey] = useState();
  const [selectedTask, setSelectedTask] = useState();
  const [selectedTaskStatuses, setSelectedTaskStatuses] = useState([]);
  const [selectedSurveyStatuses, setSelectedSurveyStatuses] = useState([]);
  const [wizardMode, setWizardMode] = useState(false);
  const [msg, setMsg] = useState('');
  // const [fullTasksTable, setFullTasksTable] = useState();
  // const selectedBridges = []

  
  useEffect(() => {

    uniqueRoleTypes = getUniqueRoleTypes(tasks);
    uniqueTasks = getUniqueTasksByName(tasks);
    // setSelectedTaskStatuses(taskStatuses['Unallocated'])
    
    setFilteredTasks(tasks);
    

    return () => {
      setStatus('All');
    };
  }, [tasks]);

useEffect(() => {
  // console.log('selectedTaskStatuses', selectedTaskStatuses)
  // console.log('selectedSurveyStatuses', selectedSurveyStatuses)
  let results
  if (selectedSurveyStatuses.length && selectedTaskStatuses.length) {
    results = tasks.filter(task => selectedTaskStatuses.includes(task.status) && selectedSurveyStatuses.includes(task.survey_status))

  } 
  else if (selectedSurveyStatuses.length && !selectedTaskStatuses.length) {
    results = tasks.filter(task => selectedSurveyStatuses.includes(task.survey_status))
  }
  else if (!selectedSurveyStatuses.length && selectedTaskStatuses.length) {
    results = tasks.filter(task => selectedTaskStatuses.includes(task.status))
  }
  else if (!selectedSurveyStatuses.length && !selectedTaskStatuses.length) {
    results = tasks
  }
  // console.log('results', results)
  setFilteredTasks(results)
  return () => {
    // setSelectedTaskStatuses()
  }
}, [selectedTaskStatuses, selectedSurveyStatuses])
// useEffect(() => {
//   console.log(selectedSurveyStatuses)
//   // selectedSurveyStatuses && setFilteredTasks(tasks.filter(task => task.survey_status == selectedSurveyStatuses))
//   const results = tasks.filter(task => selectedTaskStatuses.includes(task.status) && selectedSurveyStatuses.includes(task.survey_status))
//   selectedSurveyStatuses && setFilteredTasks(tasks.filter(task => selectedSurveyStatuses.includes(task.survey_status)))
//   return () => {
//     // setSelectedTaskStatuses()
//   }
// }, [selectedSurveyStatuses])

// useEffect(() => {
//     console.log('currentTaskOrder', currentTaskOrder)
//     const nextTask = tasks.find(task => task.task_order == currentTaskOrder+1 && task.survey_name == selectedSurvey)
//     console.log('nextTask', nextTask)
//     if (currentTaskOrder && nextTask) {
//       users.filter(
//         user => user.role_type_id == nextTask.role_type_id,
//       );
//       const usersByRoletypeId = getUsersByRoleTypeId(selection[0].role_type_id);
//       if (!usersByRoletypeId.length) {
//         onToggleAlert({
//           title: `You dont have any users with this role type`,
//           text: `Do you want to allocate other users to these tasks?`,
//           confirmButton: 'Yes',
//           cancelButton: 'Cancel',

//           confirmFunction: () => {
//             onToggleModal({
//               title: 'Allocate tasks',
//               // text: 'Choose user ',
//               // confirmButton: 'Create',
//               cancelButton: 'Cancel',
//               data: {
//                 editMode: 'Allocate',
//                 users: uniqueUsers,
//               },
//               colWidth: 12,
//               formType: 'taskAllocationForm',
//               confirmFunction: data => {
//                 console.log(data);
//                 data = prepareTasksUpdate(data, selection)
//                 onUpdateTasks(data);
//                 // console.log(selectedTask)
//               },
//             });
//           },
//         });
//       } else {
//       onToggleModal({
//         title: 'Allocate next task',
//         text: `Next task is ${nextTask.name}, Do you want to allocate this task for the same bridges? `,
//         // confirmButton: 'Create',
//         cancelButton: 'Cancel',
//         data: {
//           editMode: 'Allocate',
//           users: usersByRoletypeId,
//         },
//         colWidth: 12,
//         formType: 'taskAllocationForm',
//         confirmFunction: data => {
//           console.log(data);
//           const nextSelectedTask = uniqueTasks.find(task => task.name == nextTask.name);
//           setSelectedTask(nextSelectedTask);
//           console.log('nextSelectedTask', nextSelectedTask)
//           setFilteredTasks(tasks.filter(task => task.name == nextSelectedTask.name));
//           const newSelection = tasks.filter(task => task.name == nextSelectedTask.name && bridgeIds.includes(task.bid))
//           setSelection(newSelection)
//           data = prepareTasksUpdate(data, newSelection)
//           onUpdateTasks(data);
//           // setFilteredTasks(tasks.filter(task => task.name == selected.name));
//           // setSelectedTask(selected);
//           // setShowCheckBox(true);
//           // setSelection([])
//         }
        
//       })
//     }
//   } 

//   }, [currentTaskOrder])
  
  const selectSurveys = getUniqueSurveyNames(tasks, true)



  const handleRadioClick = status => {
    setStatus(status);
    if (status == 'All') setFilteredTasks(tasks);
    else setFilteredTasks(tasks.filter(task => task.status == status));
  };

  const handleCheckboxClick = selectedItems => {
    console.log(selectedItems)
    setSelection(selectedItems)
  };
 
  const scrollContainerStyle = {
    width: "100%", 
   //  maxHeight: `calc(100vh)-${theme.layout.topBarSize}`, 
    maxHeight: `35vh`, 
    overFlowY: 'auto',
    overFlowX: 'hidden'
   }; 

  const SurveyTasksAllocation  = ({surveyName}) => {

    let allTasksToUpdate = []
    const handleInputs = (e, field, tasksToUpdate) => {
      // console.log(e)

      // console.log(tasksToUpdate)
      tasksToUpdate.forEach(task => {
        allTasksToUpdate.find(t => t.id == task.id)[field] = e
        
      })
      
    }
    let tasksBySurveyName = sortBy('task_order', getUniqueTasksBySurveyName(surveyName), false);

    return (
      <div className="surveyTasksAllocation">
        <TableHeader className="row">
          <div className="col-3">Task name</div>
          <div className="col-3">User</div>
          <div className="col-3">Due date</div>
          <div className="col-3">Remarks</div>
        </TableHeader>
        <div
          className="scrollbar scrollbar-primary"
          style={scrollContainerStyle}>
          {tasksBySurveyName.map(task => {
            const usersByRoletypeId = getUsersByRoleTypeId(task.role_type_id);
            const bridgeIds = selection.map(task => task.bid);
            const tasksToUpdate = tasks.filter(
              t => t.name == task.name && bridgeIds.includes(t.bid),
            )
            allTasksToUpdate = [...allTasksToUpdate, ...tasksToUpdate]
            return (
              <div
                className="row no-gutters align-items-center border-bottom"
                key={task.name}
              >
                <div className="col-3">{task.name}</div>
                <div className="col-3">
                  {console.log('usersByRoletypeId', usersByRoletypeId)}
                  <CustomSelect
                    options={
                      usersByRoletypeId.length
                        ? usersByRoletypeId
                        : uniqueUsers
                    }
                    label="Choose user"
                    // value={selectedTask && selectedTask.id}
                    onChange={e => handleInputs(+e[0], 'user_id', tasksToUpdate)}
                  />
                </div>
                <div className="col-3">
                  {/* <span>{props.label}</span> */}
                  <MDBDatePicker
                    getValue={e => handleInputs(e, 'due_date', tasksToUpdate)}
                    value={task.due_date}
                  />
                </div>
                <div className="col-3">
                  <MDBInput
                    className=""
                    label={'Remarks'}
                    onChange={e => handleInputs(e.target.value, 'remarks', tasksToUpdate)}
                  />
                </div>
              </div>
            );
          })}

        </div>
        <MDBBtn
          className="bgPrimary modalFormBtn"
          rounded
          onClick={() => {
            allTasksToUpdate.forEach(task => {
              task.due_date = convertToMySqlDateFormat(task.due_date);
              task.status = 'Allocated'
            })
            console.log(allTasksToUpdate)
            onUpdateTasks(allTasksToUpdate)
          }
          }
        >
          {`Allocate tasks`}
          <MDBIcon icon="tasks" className="ml-1 " />
        </MDBBtn>
      </div>
    );
  }

  // const addFilter = (selectedFilter) => {
  //   console.log(selectedFilter);
  //   const filter = taskFilters.find(filter => filter.name == selectedFilter)
  //   if (selectedFilter) setSelectedFilters([...selectedFilters, {...filter, value: ''}])

  // }
  const getUsersByRoleTypeId  = (id) => {
    return users.filter(
      user => user.role_type_id == id,
    )
  }
  const prepareTasksUpdate = (data, tasks) => {
    console.log(tasks)
    const taskIds = tasks.map(task => task.id);
    const bridgeIds = tasks.map(task => task.bid)
    const currentTaskOrder = tasks[0].task_order
    data.taskIds = taskIds;
    data.bridgeIds = bridgeIds;
    data.status = 'Allocated';
    data.currentTaskOrder = currentTaskOrder
    return data
  }
  const handleAction = (actionName, task) => {
    console.log(actionName);
    let usersByRoletypeId;
    switch (actionName) {

      case 'Allocate tasks wizard':
        // console.log(selection);
        onToggleModal({
          title: 'Allocate tasks (step 3 of 3)',
          // text: 'Choose user ',
          // confirmButton: 'Allocate',
          // cancelButton: 'Cancel',
          data: {
            editMode: 'Allocate',
            users: usersByRoletypeId,
          },
          body: <div>
            <SurveyTasksAllocation surveyName={selectedSurvey}/>
          </div>,
          colWidth: 12,
          // formType: 'taskAllocationForm',
          confirmFunction: data => {
            setSelection([])
            // console.log(data);
            // let tasksToUpdate = selection;
            // const taskIds = tasksToUpdate.map(task => task.id);
            // const bridgeIds = tasksToUpdate.map(task => task.bid)
            // const currentTaskOrder = tasksToUpdate[0].task_order
            // data.taskIds = taskIds;
            // data.bridgeIds = bridgeIds;
            // data.status = 'Allocated';
            // data.currentTaskOrder = currentTaskOrder
            // onUpdateTasks(data);
          },
        });
        // usersByRoletypeId = getUsersByRoleTypeId(selection[0].role_type_id);
        // if (!usersByRoletypeId.length) {
        //   onToggleAlert({
        //     title: `You dont have any users with this role type`,
        //     text: `Do you want to allocate other users to these tasks?`,
        //     confirmButton: 'Yes',
        //     cancelButton: 'Cancel',

        //     confirmFunction: () => {
        //       onToggleModal({
        //         title: 'Allocate tasks',
        //         // text: 'Choose user ',
        //         // confirmButton: 'Create',
        //         cancelButton: 'Cancel',
        //         data: {
        //           editMode: 'Allocate',
        //           users: uniqueUsers,
        //         },
        //         colWidth: 12,
        //         formType: 'taskAllocationForm',
        //         confirmFunction: data => {
        //           console.log(data);
        //           data = prepareTasksUpdate(data, selection)
        //           onUpdateTasks(data);
        //           // console.log(selectedTask)
        //         },
        //       });
        //     },
        //   });
        // } else {
        //   onToggleModal({
        //     title: 'Allocate tasks (step 3 of 3)',
        //     // text: 'Choose user ',
        //     // confirmButton: 'Allocate',
        //     // cancelButton: 'Cancel',
        //     data: {
        //       editMode: 'Allocate',
        //       users: usersByRoletypeId,
        //     },
        //     body: <div>
        //       <SurveyTasksAllocation surveyName={selectedSurvey}/>
        //     </div>,
        //     colWidth: 12,
        //     // formType: 'taskAllocationForm',
        //     confirmFunction: data => {
        //       // console.log(data);
        //       // let tasksToUpdate = selection;
        //       // const taskIds = tasksToUpdate.map(task => task.id);
        //       // const bridgeIds = tasksToUpdate.map(task => task.bid)
        //       // const currentTaskOrder = tasksToUpdate[0].task_order
        //       // data.taskIds = taskIds;
        //       // data.bridgeIds = bridgeIds;
        //       // data.status = 'Allocated';
        //       // data.currentTaskOrder = currentTaskOrder
        //       // onUpdateTasks(data);
        //     },
        //   });
        // }
        break;
      case 'Allocate task':
        console.log(users)
        usersByRoletypeId = users.filter(
          user => user.role_type_id == selection[0].role_type_id,
        );
        console.log(usersByRoletypeId)
        if (!usersByRoletypeId.length) {
          onToggleAlert({
            title: `You dont have any users with this role type`,
            text: `Do you want to allocate other users to these tasks?`,
            confirmButton: 'Yes',
            cancelButton: 'Cancel',

            confirmFunction: () => {
              onToggleModal({
                title: `Allocate ${selection[0].name}`,
                text: `Choose user `,
                // confirmButton: 'Create',
                cancelButton: 'Cancel',
                data: {
                  editMode: 'Allocate',
                  users: uniqueUsers,
                },
                colWidth: 12,
                formType: 'taskAllocationForm',
                confirmFunction: data => {
                  console.log(data);
                  console.log(selection[0]);
                  let updatedTask = { ...selection[0] };
                  updatedTask.user_id = data.user_id;
                  updatedTask.remarks = data.remarks;
                  updatedTask.status = 'Allocated'
                  console.log(updatedTask);
                  onUpdateTask(updatedTask);
                  setSelection([])
                },
              });
            },
          });
        } else {
          onToggleModal({
            title: `Allocate ${selection[0].name}`,
            text: `Choose user `,
            // confirmButton: 'Create',
            cancelButton: 'Cancel',
            data: {
              editMode: 'Allocate',
              users: usersByRoletypeId,
            },
            colWidth: 12,
            formType: 'taskAllocationForm',
            confirmFunction: data => {
              console.log(data);
              console.log(selection[0]);
              let updatedTask = { ...selection[0] };
              updatedTask.user_id = data.user_id;
              updatedTask.remarks = data.remarks;
              updatedTask.status = 'Allocated';
              console.log(updatedTask);
              onUpdateTask(updatedTask);
              setSelection([])
            },
          });
        }
        break;
      case 'Reset all filters':
        setSelectedTask();
        setFilteredTasks(tasks)
        setSelection([])
        setShowCheckBox(false)
        setWizardMode(false)
        setShowFilter(false)
        setSelectedSurvey()
        setMsg('')
        setActiveStep(0)
        break
      case 'Start allocation':
        setMsg('Select survey (step 1 of 3)')
        setWizardMode(true)
        break;

      default:
        break;
    }
  };
  const handleFilter = (status, type) => {
    switch (type) {
      case 'task':
        if (status) {
          if (selectedTaskStatuses.includes(status)) setSelectedTaskStatuses(selectedTaskStatuses.filter(stat => stat !== status))
          else setSelectedTaskStatuses([...selectedTaskStatuses, status])
        }
        else {
          setSelectedTaskStatuses([])
        }
      
        break;
      case 'survey':
        if (status) {
          if (selectedSurveyStatuses.includes(status)) setSelectedSurveyStatuses(selectedSurveyStatuses.filter(stat => stat !== status))
          else setSelectedSurveyStatuses([...selectedSurveyStatuses, status])
        }
        else {
          setSelectedSurveyStatuses([])
        }
        break;
    
      default:
        break;
    }
  }

  const handleFiletrChange = (filter, value) => {
    console.log(filter, value)
  }

  const table = useMemo(
    () => (
      <MyWijmoCheckBoxTable
        // style={scrollContainerStyle}
        className="maxHeight55vh"
        data={filteredTasks}
        // dataService={new DataService()}
        exportService={new ExportService()}
        handleCheckboxClick={selectedItems =>
          handleCheckboxClick(selectedItems)
        }
        multiSelectionMode={false}
        // selected={selection}
        // selectedItems={selection}
        tableConfig={{
          exludesFields: [
            'id',
            'user_id',
            'provider_id',
            'organization_id',
            'role_id',
            'image_url',
            'confirmation_token',
            'role_type_id',
            'primary_model_id',
            'sub_tasks_names',
            'sub_tasks_dates',
            'sub_tasks_file_types',
            'next_task_id',
            'pre_task_id',
            'bridge_primary_model_id',
            'bridge_organization_id',
            // 'bridge_lon',
            // 'bridge_lat',
            // 'bridge_x',
            // 'bridge_y',
            'bridge_image_url',
          ],

          editableFields: [],
          longFields: ['remarks', 'description', 'full_name', 'name', 'bridge_name'],
          dateFields: ['date_created', 'due_date', 'createdAt', 'updatedAt'],
          // fixedColumns: 3,
          wholeNumberFields: ['bid', 'survey_id', 'completed', 'task_order', ],
          decimelNumberFields: ['lon', 'lat', 'x', 'y'],
          groups: ['bridge_name', 'survey_name', 'survey_id'],
          frozenColumns: 1,
          groupHeaderFormat: `<b>{value}</b> ({count:n0} tasks)`,
          hideGroupPanel: false,
        }}
      />
    ),
    [filteredTasks],
  );
 
  const Component = () => {

    return (
      <>
        {console.log(filteredTasks)}
        {filteredTasks && filteredTasks.length ? (
          <MyWijmoCheckBoxTable
            // style={scrollContainerStyle}
            className="maxHeight65vh"
            data={filteredTasks}
            // dataService={new DataService()}
            exportService={new ExportService()}
            handleCheckboxClick={selectedItems =>
              handleCheckboxClick(selectedItems)
            }
            multiSelectionMode={true}
            selected={selection}
            // selectedItems={selection}
            tableConfig={{
              exludesFields: [
                'id',
                'user_id',
                'provider_id',
                'role_id',
                'profile_image',
                'confirmation_token',
                'role_type_id',
              ],

              editableFields: [],
              longFields: ['remarks', 'description', 'full_name'],
              dateFields: ['date_created'],
              // fixedColumns: 3,
              wholeNumberFields: [],
              decimelNumberFields: [],
              groups: ['bridge_name', 'survey_name'],
              frozenColumns: 1,
              groupHeaderFormat: `<b>{value}</b> ({count:n0} tasks)`,
              hideGroupPanel: false,
            }}
          />
        ) : (
          // <MyWijmoCheckBoxTable
          //   data={filteredTasks}
          //   // dataService={new DataService()}
          //   exportService={new ExportService()}
          //   handleCheckboxClick={selectedItems =>
          //     handleCheckboxClick(selectedItems)
          //   }
          //   multiSelectionMode={true}
          //   // selectedItems={selection}
          //   tableConfig={{
          //     exludesFields: [],
          //     editableFields: [],
          //     longFields: [],
          //     dateFields: [],
          //     fixedColumns: [],
          //     wholeNumberFields: [],
          //     decimelNumberFields: [],
          //     groups: ['bridge_name', 'survey_name'],
          //     frozenColumns: 2,
          //     groupHeaderFormat: "{name}: <b>{value}</b> ({count:n0} tasks)",
          //     hideGroupPanel: false,
          //     allowDragging: true
          //   }}
          // />
          'You dont have any tasks'
        )}
      </>
    );

  }

  const Header = () => {

    return !readOnly ? (
      <div className="row mr-3 align-items-center pl-3">
        <div className="col-4">
          <h5>{msg}</h5>
          <div className={`${wizardMode && 'disabled'}`} />
        </div>
        <div className="col-4 text-center">
          <h5>{selectedSurvey}</h5>
        </div>

        <div className="col-4 d-flex topBottons">
       
          <MDBBtn
            className={`${(!selection.length || wizardMode) && 'disabled'}`}
            size="sm"
            onClick={() =>
              handleAction(
                wizardMode ? 'Allocate tasks wizard' : 'Allocate task',
              )
            }
          >
            {/* {`Allocate tasks (${selection ? selection.length : 0})`} */}
            Allocate task
            <MDBIcon icon="tasks" className="ml-1" />
          </MDBBtn>
          <MDBBtn
            size="sm"
            className={`surveyAllocationButton ${
              wizardMode ? 'bgDanger' : 'bgSecondary'
            }`}
            onClick={() =>
              wizardMode
                ? handleAction('Reset all filters')
                : handleAction('Start allocation')
            }
          >
            {wizardMode
              ? 'Stop allocation wizard'
              : 'Start allocation wizard'}
            <MDBIcon
              icon={wizardMode ? 'stop' : 'play '}
              className="ml-1"
            />
          </MDBBtn>
        </div>
      </div>
    ) : (
      <div className="row mr-3 align-items-center pl-3">
        <div className="col-4">
         
        </div>
        <div className="col-4 text-center">
           Surveys & Tasks
        </div>

        <div className="col-4 d-flex topBottons">

        </div>
      </div>
    );
  }


  const handleSelectSurvey = (data) => {
    // console.log(data)
    // console.log(uniqueTasks)
    // console.log(uniqueSurveyNames)
    const surveyName = selectSurveys.find(survey => survey.id == data.survey_id).name
    console.log(surveyName)

    const firstTask = tasks.find(task => task.survey_name == surveyName && task.task_order == 1)
    console.log(firstTask)
    const selectedTask = uniqueTasks.find(task => task.name == firstTask.name)
    // const selectedTask = uniqueTasks.find(task => task.id == data.name);
    console.log(selectedTask)
    
    setSelectedTask(selectedTask);
    setSelectedSurvey(surveyName)
    setMsg('Choose bridges (step 2 of 3)')
    const filtasks = tasks.filter(task => task.name == selectedTask.name && task.survey_name == surveyName);
    console.log(filtasks)
    setFilteredTasks(filtasks);
    setActiveStep(1)
  }





  const AllocationWizard = ({
    
  }) => {
    const [selectedBridges, setSelectedBridges] = useState([]);
    // console.log(selectedBridges)
    const steps = [
      { name: 'Select survey', icon: 'sign-in-alt' },
      { name: 'Select Bridge', icon: 'building' },
      { name: 'Allocate tasks', icon: 'user-plus' },
      // { name: 'Select Bridge', icon: 'building' },
    ];
    const handleSelectSelectedBridges = () => {
      console.log(selectedBridges)
      setActiveStep(2)
      setMsg('Allocate tasks (step 3 of 3)')
    }
    const handleSelectedBridges = (bridges) => {

      setSelectedBridges(bridges)
    }
    const bridgesTable = useMemo(
      () => (
        <MyWijmoCheckBoxTable
          // style={scrollContainerStyle}
          className="maxHeight35vh pb-3"
          data={filteredTasks}
          // dataService={new DataService()}
          exportService={new ExportService()}
          handleCheckboxClick={selectedItems =>
            handleSelectedBridges(selectedItems)
          }
          multiSelectionMode={true}
          selected={selectedBridges}
          // selectedItems={selection}
          tableConfig={{
            exludesFields: [
              'id',
              'user_id',
              'provider_id',
              'organization_id',
              'role_id',
              'image_url',
              'confirmation_token',
              'role_type_id',
              'primary_model_id',
              'sub_tasks_names',
              'sub_tasks_dates',
              'sub_tasks_file_types',
              'next_task_id',
              'pre_task_id',
              'bridge_primary_model_id',
              'bridge_organization_id',
              'bridge_lon',
              'bridge_lat',
              'bridge_x',
              'bridge_y',
              'bridge_image_url',
            ],

            editableFields: [],
            longFields: ['remarks', 'description', 'full_name'],
            dateFields: [
              'date_created',
              'due_date',
              'createdAt',
              'updatedAt',
            ],
            // fixedColumns: 3,
            wholeNumberFields: [
              'bid',
              'survey_id',
              'completed',
              'taske_order',
            ],
            decimelNumberFields: ['lon', 'lat', 'x', 'y'],
            groups: [],
            frozenColumns: 1,
            groupHeaderFormat: `<b>{value}</b> ({count:n0} tasks)`,
            hideGroupPanel: false,
          }}
        />
      ),
      [],
    );

    return (
      <Stepper
        steps={steps}
        vertical={false}
        activeStep={activeStep}
        activateButtonClick={false}
        onStepClick={index => setActiveStep(index)}
      >
        <Form
          formType="taskFilterForm"
          editMode="Select"
          colWidth={12}
          surveys={selectSurveys}
          taskNames={uniqueTasks}
          editFunction={(data, event) => handleSelectSurvey(data)}
        />
        <>
          {bridgesTable}
          <MDBBtn
            className="bgPrimary modalFormBtn"
            disabled={!selectedBridges.length}
            rounded 
            onClick={() => handleSelectSelectedBridges()}
          >
            Select ({selectedBridges.length})
          </MDBBtn>
        </>
        <SurveyTasksAllocation surveyName={selectedSurvey} />
      </Stepper>
    );

  }


  const SideBar = () => {

    return (
      <>
        <div className="flex justify-content-between">
          <h6 className="bold">Surveys statuses</h6>

          <IconButtonToolTip
            className=""
            iconName="eraser"
            toolTipType="info"
            toolTipPosition="left"
            toolTipEffect="float"
            toolTipText="Clear"
            onClickFunction={() => handleFilter(null, 'survey')}
          />
        </div>
        <MDBListGroup>
          {surveyStatuses.map(item => {
            const active = selectedSurveyStatuses.includes(item.name);
            return (
              <MDBListGroupItem
                key={item.name}
                className={`cursor-pointer transitioned ${active &&
                  'bgPrimaryFaded1'}`}
                onClick={() => handleFilter(item.name, 'survey')}
              >
                <MDBIcon icon={item.icon} className="mr-2 colorSecondary" />
                {item.name}
                {active && (
                  <MDBIcon
                    icon="check"
                    className="float-right mt-1 colorSecondary"
                  />
                )}
              </MDBListGroupItem>
            );
          })}
        </MDBListGroup>
        <br />
        <div className="flex justify-content-between">
          <h6 className="bold">Tasks statuses</h6>

          <IconButtonToolTip
            className=""
            iconName="eraser"
          toolTipType="info"
            toolTipPosition="left"
            toolTipEffect="float"
            toolTipText="Clear"
            onClickFunction={() => handleFilter(null, 'task')}
          />
        </div>
        <MDBListGroup>
          {taskStatuses.map(item => {
            const active = selectedTaskStatuses.includes(item.name);
            return (
              <MDBListGroupItem
                key={item.name}
                className={`cursor-pointer transitioned ${active &&
                  'bgPrimaryFaded1'}`}
                onClick={() => handleFilter(item.name, 'task')}
              >
                <MDBIcon
                  icon={item.icon}
                  className="mr-2 colorSecondary"
                />
                {item.name}
                {active && (
                  <MDBIcon
                    icon="check"
                    className="float-right mt-1 colorSecondary"
                  />
                )}
              </MDBListGroupItem>
            );
          }
        )}
        </MDBListGroup>
        {/* <Menu
      menu={taskStatuses}
      handleClick={status => handleFilter(status, 'task')}
      selected={selectedTaskStatuses}
    /> */}
      </>
    );
  }
  // console.log(selectedSurveyStatuses)
  return (
    <div className="manageTasks">
      <Layout
        bodyTitle={'All surveys'}
        menuTitle="Menu"
        menu={<SideBar />}
        headerComponent={<Header />}
        component={
          <>
            {filteredTasks && filteredTasks.length ? (
              table
            ) : (
              <div>No tasks found</div>
            )}
            <Overlay
              overlayOpen={wizardMode}
              animationType="overlayAnimation"
              toggleOverlay={() => handleAction('Reset all filters')}
            >
              <div className="p-5">
                <AllocationWizard
                // selectedBridges={selectedBridges}
                />
              </div>
            </Overlay>
          </>
        }
        // component={filteredTasks && filteredTasks.length && table}
      />
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: makeSelectCurrentUser(),
  currentUserRole: makeSelectCurrentUserRole(),
  roleTypes: makeSelectRoleTypes(),
  bridgeIds: makeSelectBridgeIds(),
  currentTaskOrder: makeSelectCurrentTaskOrder(),
  taskStatuses: makeSelectTaskStatuses(),
  surveyStatuses: makeSelectSurveyStatuses(),
});

const mapDispatchToProps = dispatch => {
  return {
    onToggleAlert: alertData => dispatch(toggleAlert(alertData)),
    onToggleModal: modalData => dispatch(toggleModal(modalData)),
    onUpdateTasks: data => dispatch(updateTasks(data)),
    onUpdateTask: task => dispatch(updateTask(task)),
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
)(Tasks);
