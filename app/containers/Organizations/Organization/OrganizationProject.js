
import React, { memo } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { makeSelectLoading, makeSelectError, makeSelectCurrentUser} from 'containers/App/selectors';
import { makeSelectOrganization, makeSelectOrganizationProjects, makeSelectOrganizationBridges,
  makeSelectOrganizationProcessesTemplates, makeSelectOrganizationProviders, makeSelectOrganizationProcessesTasks } from './selectors'
import { createStructuredSelector } from 'reselect';
import { processesCreated, createProcessesInDB, getProcessesByProjectId,
  createTasksInDB, updateTask } from './actions';
import { showNotification } from '../../App/actions'
import AccordionTable from '../../AccordionTable/AccordionTable';
import { MDBContainer, MDBRow, MDBCol, MDBStepper, MDBStep, MDBBtn, MDBIcon  } from "mdbreact";
import { convertToMySqlDateFormat } from 'utils/dateTimeUtils'

import TableFilters from '../../TableFilters/TableFilters'
import { updateProcessTask } from '../../Processes/actions';

// import './OrganizationProject.css';


class OrganizationProject extends React.Component {

  state = {
    formActivePanel1: localStorage.getItem('formActivePanel1') ? localStorage.getItem('formActivePanel1') : 1,
    formActivePanel1Changed: false,
    templates: {
      'Organization project':[
        {
          name: 'Bridges',
          description: 'Allocate bridges to this project',
          icon:'user',
          status: '',
          role: '',
          dataType: 'bridgesTable',
          actions: [
            {
              name: 'Add bridges to this project',
              icon: 'user',
              type: 'button',
              done: false,
              clickFunction: (items, dataType) => this.addItemsToProject(items, dataType)
            },

          ],
          data: this.props.bridges,


        },
        {
          name: 'Processes',
          description: 'Create processes',
          icon:'user',
          status: '',
          role: 'Cad technician',
          dataType: 'projectBridgesTable',
          actions: [
            {
              name: 'Allocate processes to selected bridges',
              icon: 'table',
              type: 'selectMultiple',
              done: false,
              options: this.props.processesTemapltes,
              clickFunction: (items, dataType) => this.addItemsToProject(items, dataType)
            },
            {
              name: 'Allocate providers to all processes',
              type: 'select',
              icon: 'user',
              done: false,
              options: this.props.providers,
              clickFunction: (provider_name) => this.setProviderToAllProjectProcesses(provider_name)
            },
            {
              name: 'Set start date to all processes',
              type: 'date',
              icon: 'calendar-plus',
              done: false,
              // options: this.props.providers,
              clickFunction: (date) => this.setStartDateToAllProjectProcesses(date)
            },
            {
              name: 'Set due date to all processes',
              type: 'date',
              icon: 'calendar-minus',
              done: false,
              // options: this.props.providers,
              clickFunction: (date) => this.setDueDateToAllProjectProcesses(date)
            },
            {
              name: 'Add remarks',
              type: 'textarea',
              icon: 'pencil-alt',
              done: false,
              // options: this.props.providers,
              clickFunction: (remarks) => this.setRemarksAllProjectProcesses(remarks)
            },


          ],
          data: this.props.processes
        },
        {
          name: 'Edit processes',
          description: 'Edit processes',
          icon:'user',
          status: '',
          role: '',
          dataType: 'projectProcessesTable',
          actions: [
            {
              name: 'Allocate providers',
              type: 'select',
              icon: 'user',
              done: false,
              options: this.props.providers,
              clickFunction: (provider_name) => this.setProviderToSelectedProcesses(provider_name)
            },
            {
              name: 'Start date',
              type: 'date',
              icon: 'calendar-plus',
              done: false,
              // options: this.props.providers,
              clickFunction: (date) => this.setStartDateToProcesses(date)
            },
            {
              name: 'Due date',
              type: 'date',
              icon: 'calendar-minus',
              done: false,
              // options: this.props.providers,
              clickFunction: (date) => this.setDueDateToProcesses(date)
            },
            {
              name: 'Add remarks',
              type: 'textarea',
              icon: 'pencil-alt',
              done: false,
              // options: this.props.providers,
              clickFunction: (remarks) => this.setRemarksToProcesses(remarks)
            },

          ],
          data: this.props.projectProcesses
        },
        {
          name: 'Status',
          description: '',
          icon:'user',
          status: '',
          dataType: 'statusTable',
          role: '',
          actions: [
            {
              name: 'Update status',
              type: 'user',
              icon: 'user',
              done: false,
              clickFunction: () => console.log('clicked')},

          ],

        },
      ],
    },
    // projectBridges: localStorage.getItem('projectBridges') ? JSON.parse(localStorage.getItem('projectBridges')) : [],
    // projectProcesses: localStorage.getItem('projectProcesses') ? JSON.parse(localStorage.getItem('projectProcesses')) : [],
    projectBridges: [],
    projectProcesses: [],
    projectTasks: [],
    selectedBridges:[],
    selectedProcesses:[],
    showFilter: false,
    filteredData: []

  }


  componentDidMount() {

    console.log(this.props);
    let bridges = []
    this.props.projectProcesses.map(process => {
      const bridge = this.props.bridges.filter(bridge => bridge.bid === process.bid)[0];

      bridges.push(bridge)
      // process.tasks = this.props.processesTasks
    })
    this.addItemsToProject(bridges, 'bridgesTable');


    this.setState({['projectProcesses']: this.props.projectProcesses})
    this.setState({['projectTasks']: this.props.projectTasks})

  }


  swapFormActive = (a) => (param) => (e) => {
    this.setState({
      ['formActivePanel' + a]: param,
      ['formActivePanel' + a + 'Changed']: true
    });
    localStorage.setItem('formActivePanel' + a, param)
  }

  handleNextPrevClick = (a) => (param) => (e) => {
    this.setState({
      ['formActivePanel' + a]: param,
      ['formActivePanel' + a + 'Changed']: true
    });
    console.log(this.state)
  }


  calculateAutofocus = (a) => {
    if (this.state['formActivePanel' + a + 'Changed']) {
      return true
    }
  }

  usersByRole = (role) => {

    const usersByRole = this.props.users.filter(user => user.role === role);
    return usersByRole
  }


  addBridgeToProcesses = (item) => {
    // console.log(this.state.projectBridges)
    this.props.processes.map(process => process.projectBridges ? process.projectBridges.push(item) : process.projectBridges = [item])
    console.log(this.props.processes)
  }
  addProcessToProjectProcesses = (item) => {
    console.log(item)
    // this.props.processes.map(process => process.projectBridges ? process.projectBridges.push(item) : process.projectBridges = [item])
    // console.log(this.props.processes)
  }
  removeBridgeFromProcesses = (item) => {

    this.props.processes.map(process => process.projectBridges = this.removeBridgeFromProcess(item, process))
    // console.log(this.props.processes)

  }

  removeBridgeFromProcess = (item, process) => {
    // console.log(process.projectBridges.filter(bridge => bridge.bid !== item.bid))
    return process.projectBridges.filter(bridge => bridge.bid !== item.bid)


  }
  isItemInArray = (item, dataType) => {
    switch (dataType) {
      case 'bridgesTable':
        return this.state.projectBridges.includes(item);
      case 'projectBridgesTable':
        return this.state.selectedBridges.includes(item);
      case 'projectProcessesTable':
        return this.state.selectedProcesses.includes(item);
      case 'processTemplatesTasks':
        return this.state.projectProcesses.includes(item);

      default:
        break;
    }

  }

  setStartDateToProcesses = (date) => {
    const d = new Date(date);
    console.log(d)
    let updatedProcesses = [...this.state.projectProcesses]
    this.state.selectedProcesses.map(process => {
      console.log(updatedProcesses.filter(proc => process == proc))
      updatedProcesses.filter(proc => process == proc)[0].start_date = d;

    })
    // console.log(updatedProcesses)
    this.setState({
      projectProcesses: updatedProcesses
    });
  }
  setDueDateToProcesses = (date) => {
    const d = new Date(date);
    let updatedProcesses = [...this.state.projectProcesses]
    this.state.selectedProcesses.map(process => {
      console.log(updatedProcesses.filter(proc => process == proc))
      updatedProcesses.filter(proc => process == proc)[0].due_date = d;

    })
    // console.log(updatedProcesses)
    this.setState({
      projectProcesses: updatedProcesses
    });
  }
  setRemarksToProcesses = (remarks) => {

    let updatedProcesses = [...this.state.projectProcesses]
    this.state.selectedProcesses.map(process => {

      updatedProcesses.filter(proc => process == proc)[0].remarks = remarks;

    })
    // console.log(updatedProcesses)
    this.setState({
      projectProcesses: updatedProcesses
    });
  }
  setProviderToSelectedProcesses = (provider_name) => {

    let updatedProjectProcesses = [...this.state.projectProcesses]
    this.state.selectedProcesses.map(process => {
      // console.log(updatedProcesses.filter(proc => process == proc))
      updatedProjectProcesses.filter(proc => process == proc)[0].provider_name = provider_name;

    })
    // console.log(updatedProjectProcesses)
    this.setState({
      projectProcesses: updatedProjectProcesses
    });
  }

  setProviderToAllProjectProcesses = (provider_name) => {
    let updatedProjectProcesses = [...this.state.projectProcesses]
    updatedProjectProcesses.map(process => {
      // console.log(updatedProcesses.filter(proc => process == proc))
      process.provider_name = provider_name

    })
    console.log(updatedProjectProcesses)
    this.setState({
      projectProcesses: updatedProjectProcesses
    });
    this.props.showNotification({
      message: `${provider_name} is allocated all project processes`,
      title: `${provider_name} allocated`,
      icon: 'bell',
      text: '',
      autohide: 3000

    })
  }

  setStartDateToAllProjectProcesses = (date) => {
    const d = new Date(date);
    let updatedProcesses = [...this.state.projectProcesses]
    updatedProcesses.map(process => {
      // console.log(updatedProcesses.filter(proc => process == proc))
      process.start_date = date

    })

    this.setState({
      projectProcesses: updatedProcesses
    });
    this.props.showNotification({
      message: `Start date ${date} set to all project processes`,
      title: 'Start date set',
      icon: 'bell',
      text: '',
      autohide: 3000

    })
  }

  setDueDateToAllProjectProcesses = (date) => {
    let updatedProjectProcesses = [...this.state.projectProcesses]
    updatedProjectProcesses.map(process => {
      // console.log(updatedProcesses.filter(proc => process == proc))
      process.due_date = date
    })
    // console.log(updatedProjectProcesses)
    this.setState({
      projectProcesses: updatedProjectProcesses
    });
    this.props.showNotification({
      message: `Due date ${date} set to all project processes`,
      title: 'Due date set',
      icon: 'bell',
      text: '',
      autohide: 3000

    })
  }
  setRemarksAllProjectProcesses = (remarks) => {
    let updatedProjectProcesses = [...this.state.projectProcesses]
    updatedProjectProcesses.map(process => {
      // console.log(updatedProcesses.filter(proc => process == proc))
      process.remarks = remarks
    })
    // console.log(updatedProjectProcesses)
    this.setState({
      projectProcesses: updatedProjectProcesses
    });
  }

  getTasksByProcessName = (processName) => {
    return this.props.processesTasks.filter(process => process.name === processName)

  }

  additemToProject = (item, dataType) => {
    switch (dataType) {
      case 'bridgesTable':
        console.log('Adding bridge: ', item)
        console.log('this.state.projectBridges: ', this.state.projectBridges)
        this.setState({
            projectBridges: [...this.state.projectBridges, item]
          });
        // this.addBridgeToProcesses(item)
        break;
      case 'projectBridgesTable':
        console.log(item, this.state.selectedBridges, dataType);
        this.setState({
          selectedBridges: [...this.state.selectedBridges, item]
        });
        // this.addBridgeToProcesses(item)
        break;
      case 'projectProcessesTable':
        // console.log(item, dataType);
        this.setState({
          selectedProcesses: [...this.state.selectedProcesses, item]
        });
        // this.addBridgeToProcesses(item)
        break;

      case 'processTemplatesTasks':
        console.log(this.state.projectProcesses)
        this.setState({
          projectProcesses: [...this.state.projectProcesses, item]
        });
        // this.addProcessToProjectProcesses(item)
        break;


      default:
        break;
    }


  }

  createProcesses = (newProjectProcesses) => {
    this.props.onCreateProcesses(newProjectProcesses);
    this.props.showNotification({
      message: `${newProjectProcesses.length} new processes created`,
      title: 'Processes created',
      icon: 'bell',
      text: '',
      autohide: 3000

    })
  }
  addItemsToProject = (items, dataType) => {
    console.log(items, dataType);
    // console.log(this.props.currentUser)
    if(items.length){
      switch (dataType) {
        case 'bridgesTable':

          const updatedProjectBridges = [...this.state.projectBridges, ...items]
          console.log(updatedProjectBridges)
          this.setState({
              projectBridges: updatedProjectBridges
            });
          localStorage.setItem('projectBridges', JSON.stringify(updatedProjectBridges))
          break;
        case 'projectBridgesTable':
          // console.log(this.state.projectProcesses);
          // let updatedProjectProcesses = [...this.state.projectProcesses];
          let newProjectProcesses = []
          items.map(item => {
            this.state.selectedBridges.map(bridge => {
              let newProcess = {
                name: bridge.name + '-' + item,
                bid: bridge.bid,
                provider_name: '',
                project_id: this.props.project.id,
                process_template_name: item,
                created_by: '',
                remarks: '',
                status: '',
                start_date: '',
                due_date: '',
                date_initialized: '',

              };
              // console.log(newProcess)
              newProjectProcesses.push(newProcess)
            })

          })

          // console.log(updatedProjectProcesses)
          // console.log(JSON.stringify(updatedProjectProcesses))
          // localStorage.setItem('projectProcesses', JSON.stringify(updatedProjectProcesses))
          this.setState({
            projectProcesses: [...this.state.projectProcesses, ...newProjectProcesses]
          });
          this.createProcesses(newProjectProcesses);

          break;

        case 'processTemplatesTasks':
          console.log(this.state.projectProcesses)
          // this.setState({
          //   projectProcesses: [...this.state.projectProcesses, item]
          // });
          // this.addProcessToProjectProcesses(item)
          break;


        default:
          break;
      }

    }


  }
  removeItemFromProject = (item, dataType) => {
    switch (dataType) {
      case 'bridgesTable':
        console.log(this.state.projectBridges.filter(bridge => bridge.bid !==item.bid))
        this.setState({
          projectBridges: this.state.projectBridges.filter(bridge => bridge.bid !==item.bid)
        });
        // this.removeBridgeFromProcesses(item)
        break;
      case 'projectBridgesTable':
          console.log(item, dataType);
          this.setState({
            selectedBridges: this.state.selectedBridges.filter(bridge => bridge.bid !==item.bid)
          });
          // this.addBridgeToProcesses(item)
          break;
      case 'projectProcessesTable':
          console.log(item, dataType);
          // let updatedSelectedProcesses = [...this.state.selectedProcesses]
          // updatedSelectedProcesses.filter(proc => proc !== item);
          // console.log(updatedSelectedProcesses)
          this.setState({
            selectedProcesses: this.state.selectedProcesses.filter(proc => proc !== item)
          });
          // this.addBridgeToProcesses(item)
          break;
      case 'processTemplatesTasks':
        console.log(this.state.projectProcesses)
        this.setState({
          projectProcesses: this.state.projectProcesses.filter(process => process.name !==item.name)
        });
        break;

      default:
        break;
    }

  }
  addRemoveItem = (item, itemType) => {
    // console.log(this.state.projectBridges)
    // console.log(itemType)
    // console.log(this.props.processes)
    if(!this.isItemInArray(item, itemType)) {
      this.additemToProject(item, itemType);

    } else {
      this.removeItemFromProject(item, itemType);

    }

  }

  handleResultsFromFilter = (results) => {
    console.log(results);
    this.setState({
      ...this.state,
      filteredData: results
    })
    // if (results.length > 0) setDisplayedData(results)
    // setDisplayedData(results)
  }

  createTasks = () => {


    let tasks = []
    //arrange processes for DB

    const finalProcesses = []

    this.state.projectProcesses.map(process => {
      const finalProcess = {
        name: process.name,
        bid: process.bid,
        provider_name: process.provider_name,
        organization_id: this.props.project.organization_id,
        project_id: process.project_id,
        process_template_name: process.process_template_name,
        date_created: convertToMySqlDateFormat(new Date),
        created_by: this.props.currentUser.firstName + ' ' + this.props.currentUser.lastName,
        remarks: process.remarks,
        last_update: convertToMySqlDateFormat(new Date),
        status: process.status,
        start_date: convertToMySqlDateFormat(process.start_date),
        due_date: convertToMySqlDateFormat(process.due_date)
      }

      finalProcesses.push(finalProcess)



      this.getTasksByProcessName(process.process_template_name).map(task => {
        // console.log(task);
        const newTask = {
          name: task.task_name,
          survey_type: '',
          description: task.task_description,
          project_id: this.props.project.id,
          user_id: null,
          role_type_name: task.role_type_name,
          bid: process.bid,
          process_id: process.id ? process.id : null,
          organization_id: finalProcess.organization_id,
          provider_name: finalProcess.provider_name,
          due_date: finalProcess.due_date,
          status: '',
          last_update: convertToMySqlDateFormat(new Date),
          date_created: convertToMySqlDateFormat(new Date),
          created_by: this.props.currentUser.firstName + ' ' + this.props.currentUser.lastName,
          remarks: '',
          pre_task_id: null,
          next_task_id: null,
          completed: 0

        }
        tasks.push(newTask)
      })

    })
    // console.log(tasks);
    // console.log(finalProcesses)
    this.props.createProcessesInDB(finalProcesses)
    this.props.createTasksInDB(tasks)
  }

  changeTaskPercentage = (task, value) => {
    // let updatedTask = this.state.projectTasks.filter(t => t.id == task.id)[0];
    // console.log(task)
    // console.log(updatedTask)
    task.completed = parseInt(value);
    task.due_date = convertToMySqlDateFormat(task.due_date);
    task.last_update = convertToMySqlDateFormat(new Date)
    // console.log(task.due_date)
    // console.log(convertToMySqlDateFormat(task.due_date))
    // updateTask.due_date = convertToMySqlDateFormat(updateTask.due_date)
    // updateTask.last_update = convertToMySqlDateFormat(new Date)

    console.log(task);
    this.props.updateTask(task)

  }
  changeTaskDate = (task, value) => {

    task.completed = parseInt(value);
    task.due_date = convertToMySqlDateFormat(value);
    task.last_update = convertToMySqlDateFormat(new Date)

    console.log(task);
    this.props.updateTask(task)

  }

  process = this.state.templates[this.props.processName]

  render() {
    // console.log('[OrganizationProject]:', this.state, this.props);
    // console.log(localStorage)
    const steps = this.process.map((task, index) => {
      return (
        <MDBStep
          far= {this.state.formActivePanel1 == index+1}
          active= {this.state.formActivePanel1 == index+1}
          key={index}
          icon={task.icon}
          stepName={task.name}
          iconClass={this.state.formActivePanel1 == index+1 ? 'active' : ''}
          onClick={this.swapFormActive(1)(index+1)}
          >
        </MDBStep>
        )
    });

    const StepContent = (step) => {
      // console.log(task)
      return (
        <>
        <h5 className="font-weight-bold pl-0 my-2"><strong>{step.task.description}</strong></h5>
          <br></br>
          <TableFilters
            dataType={step.task.dataType}
            data={this.state.filteredData.length? this.state.filteredData : step.data}
            checkBoxFunction={(item) => this.addRemoveItem(item, step.task.dataType)}
            isChecked={(item) => this.isItemInArray(item, step.task.dataType)}
            providers={this.props.providers}
            tableName={step.task.name}
            onRowClick={(id) => props.onRowClick(id)}
            actions={step.task.actions}
          />
        </>
      )
    }

    const stepsContent = this.process.map((task, index) => {
      // console.log(task)
      //First step
      if (index == 0) {
        return <div key={task.name} className="fullWidth">
          {this.state.formActivePanel1 == index+1 &&
            (<MDBCol md="12">
              <StepContent task={task} data={task.data}/>
              <MDBBtn color="success" rounded className="float-right" onClick={this.handleNextPrevClick(1)(index+2)}>next</MDBBtn>
            </MDBCol>)}

         </div>
      }
      //Last step
      else if (index == this.process.length-1) {
          return <div key={task.name} className="fullWidth">
                  {this.state.formActivePanel1 == index+1 &&
                    (<MDBCol md="12">
                      <AccordionTable
                        data={this.state.projectProcesses}
                        rows={this.state.projectTasks}
                        dataType="processes"
                        bridges={this.state.projectBridges}
                        changePercentage={(task, value) => this.changeTaskPercentage(task, value)}
                        changeDate={(task, value) => this.changeTaskDate(task, value)}
                        />
                      {/* <StepContent task={task} data={task.data}/> */}
                      <MDBBtn color="mdb-color" rounded className="float-left" onClick={this.handleNextPrevClick(1)(index)}>previous</MDBBtn>

                    </MDBCol>)}

                </div>
      }
      else if (task.name == 'Edit processes') {
          return <div key={task.name} className="fullWidth">
                  {this.state.formActivePanel1 == index+1 &&
                    (<MDBCol md="12">
                      <StepContent task={task} data={this.state.projectProcesses}/>
                      <MDBBtn color="mdb-color" rounded className="float-left" onClick={this.handleNextPrevClick(1)(index)}>previous</MDBBtn>
                      <MDBBtn color="success" rounded className="float-right" onClick={this.handleNextPrevClick(1)(index+2)}>next</MDBBtn>
                      <MDBBtn outline color="success" className="float-right"
                        onClick={() => this.createTasks()}>
                        <MDBIcon icon="magic" className="mr-1" />
                        Create Processes
                      </MDBBtn>

                    </MDBCol>)}

                </div>
      }
      else {
        return <div key={task.name} className="fullWidth">
          {this.state.formActivePanel1 == index+1 &&
            (<MDBCol md="12" className="fullWidth">
              <StepContent task={task} data={this.state.projectBridges}/>
              <MDBBtn color="mdb-color" rounded className="float-left" onClick={this.handleNextPrevClick(1)(index)}>previous</MDBBtn>
              <MDBBtn color="success" rounded className="float-right" onClick={this.handleNextPrevClick(1)(index+2)}>next</MDBBtn>
            </MDBCol>)}
        </div>

      }


    })

    return (
      <div className="organziationProject">
        <h2 className="text-center font-weight-bold mb-4"><strong>{this.props.project.name}</strong></h2>
        <MDBStepper icon>
          {steps}
        </MDBStepper>
        <MDBRow className="fullWidth">
          {stepsContent}
        </MDBRow>

      </div>
      );
    };
  }

const mapStateToProps = createStructuredSelector({
  currentUser: makeSelectCurrentUser(),
  projects: makeSelectOrganizationProjects(),
  organization: makeSelectOrganization(),
  bridges: makeSelectOrganizationBridges(),
  processesTemapltes: makeSelectOrganizationProcessesTemplates(),
  processesTasks: makeSelectOrganizationProcessesTasks(),
  providers: makeSelectOrganizationProviders(),
  // projectProcesses: makeSelectOrganizationProviders(),

});

const mapDispatchToProps = (dispatch) => {
  return {
    onCreateProcesses: (processes) => dispatch(processesCreated(processes)),
    showNotification: (data) => dispatch(showNotification(data)),
    createProcessesInDB: (processes) => dispatch(createProcessesInDB(processes)),
    createTasksInDB: (tasks) => dispatch(createTasksInDB(tasks)),
    getProcesses: (id) => dispatch(getProcessesByProjectId(id)),
    updateTask: (task) => dispatch(updateTask(task)),

  };
}
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(OrganizationProject);

