
import React, { useEffect, memo } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { makeSelectLoading, makeSelectError,makeSelectUsers} from 'containers/App/selectors';
import { createStructuredSelector } from 'reselect';
import { MDBContainer, MDBRow, MDBCol, MDBStepper, MDBStep, MDBBtn, MDBIcon, MDBFileInput, MDBDropdownToggle,
  MDBDropdownItem, MDBDropdownMenu, MDBDropdown } from "mdbreact";
import Action from './Action'
import MultiSelectRadios from '../../components/multiSelectRadios/multiSelectRadios'
import classnames from 'classnames';
import Form from '../Forms/Form';

import './Process.css';


class Process extends React.Component {

  state = {
    formActivePanel1: 1,
    formActivePanel1Changed: false,
    processes: {
      'Initial survey UAV':[
        {
          name: 'Fields survey',
          description: '',
          icon:'user',
          status: '',
          role: 'Uav operator',
          actions: [
            {name: 'Upload images', type: 'upload', done: false},
            {name: 'Upload flight plan', type: 'upload', done: false},
          ],

        },
        {
          name: '3D Modeling',
          description: '',
          icon:'user',
          status: '',
          role: 'Cad technician',
          actions: [
            {name: 'Download images', type: 'download', done: false},
            {name: 'Upload tiles model', type: 'upload', done: false},
            {name: 'Upload 3D model', type: 'upload', done: false},
            {name: 'Download calibration data', type: 'download', done: false},
            {name: 'Download OSGB', type: 'download', done: false},
            {name: 'Download dae', type: 'download', done: false},
          ],

        },
        {
          name: 'Bridge elements id',
          description: '',
          icon:'user',
          status: '',
          role: 'Bridge analyzer',
          actions: [
            {name: 'Download images', type: 'download', done: false},
            {name: 'Upload Bridge elements metadata', done: false},

          ],

        },
        {
          name: 'Bridge QC',
          description: '',
          icon:'user',
          status: '',
          role: 'Bridge eng qc',
          actions: [
            {name: 'Download images', type: 'download', done: false},
            {name: 'Upadate status and remarks', type: 'update', done: false},

          ],

        },
      ],
      'Bridge survey UAV':[
        {
          name: 'Field survey',
          description: '',
          icon:'user',
          status: '',
          role: 'Uav operator',
          actions: [

            {name: 'Download flight plan', type: 'upload', done: false},
            {name: 'Upload images', type: 'upload', done: false},
            {name: 'Upload flight plan', type: 'upload', done: false},
          ],

        },
        {
          name: '3D Modeling',
          description: '',
          icon:'user',
          status: '',
          role: 'Cad technician',
          actions: [
            {name: 'Download images', type: 'download', done: false},
            {name: 'Upload tiles model', type: 'upload', done: false},
            {name: 'Upload 3D model', type: 'upload', done: false},
            {name: 'Download calibration data', type: 'download', done: false},
            {name: 'Download OSGB', type: 'download', done: false},
            {name: 'Download dae', type: 'download', done: false},
          ],

        },
        {
          name: 'Bridge analysis',
          description: '',
          icon:'user',
          status: '',
          role: 'Bridge analyzer',
          actions: [
            {name: 'Download images', type: 'download', done: false},
            {name: 'Download calibration data', type: 'download', done: false},
            {name: 'Download OSGB', type: 'download', done: false},
            {name: 'Download dae', type: 'download', done: false},
            {name: 'Upload Bridge defects metadata', type: 'upload', done: false},
            {name: 'Upload images', type: 'upload', done: false},

          ],

        },
        {
          name: 'Bridge analysis QC',
          description: '',
          icon:'user',
          status: '',
          role: 'Bridge eng qc',
          actions: [
            {name: 'Download images', type: 'download', done: false},
            {name: 'Download calibration data', type: 'download', done: false},
            {name: 'Download OSGB', type: 'download', done: false},
            {name: 'Download dae', type: 'download', done: false},
            {name: 'Upadate status and remarks', type: 'update', done: false},

          ],

        },
      ],
      'Organization project':[
        {
          name: 'Bridges',
          description: '',
          icon:'user',
          status: '',
          role: '',
          actions: [
            {name: 'Add bridges', type: '', done: false},

          ],

        },
        {
          name: 'Processes',
          description: '',
          icon:'user',
          status: '',
          role: 'Cad technician',
          actions: [
            {name: 'Allocate processes to bridges', type: '', done: false},


          ],

        },
        {
          name: 'Providers',
          description: '',
          icon:'user',
          status: '',
          role: '',
          actions: [
            {name: 'Allocate processes to providers', type: '', done: false},

          ],

        },
        {
          name: 'Files',
          description: '',
          icon:'user',
          status: '',
          role: 'Bridge eng qc',
          actions: [
            {name: 'Upload project files', type: 'upload', done: false},


          ],

        },
      ],
    }
  }

  swapFormActive = (a) => (param) => (e) => {
    this.setState({
      ['formActivePanel' + a]: param,
      ['formActivePanel' + a + 'Changed']: true
    });
  }

  handleNextPrevClick = (a) => (param) => (e) => {
    this.setState({
      ['formActivePanel' + a]: param,
      ['formActivePanel' + a + 'Changed']: true
    });
  }

  handleSubmission = () => {
    alert('Form submitted!');
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

  process = this.state.processes[this.props.processName]

  render() {
    console.log('[Process.props]:', this.process);
    const steps = this.process.map((task, index) => {
      return (
        <MDBStep
          far= {this.state.formActivePanel1 == index+1}
          key={index}
          icon={task.icon}
          stepName={task.name}
          // iconClass={this.state.formActivePanel1 == index+1 ? 'active' : ''}
          onClick={this.swapFormActive(1)(index+1)}
          >
        </MDBStep>
        )
    });

    const stepsContent = this.process.map((task, index) => {
      console.log(this.process.length)
      if (index == 0) {
        return <div key={task.name} className="fullWidth">
          {this.state.formActivePanel1 == index+1 &&
            (<MDBCol md="12">
            <h4 className="font-weight-bold pl-0 my-4"><strong>{task.name}</strong></h4>
            <MDBStepper vertical>
                {this.process[index].actions.map((action, index) => {
                  return (
                    <MDBStep className={action.done? "completed" : 'warning'}>
                      <a href="#!">
                        <span className="circle">
                          {/* <MDBIcon icon="exclamation-triangle" /> */}
                          {index+1}
                        </span>
                        {action.description ?
                        <p>
                          {action.description}
                        </p> : ''
                        }
                        <span className="label">
                          <Action
                            action={action}
                          />
                          {/* {action.done? <MDBIcon icon="check" /> : ''} */}
                        </span>


                      </a>

                    </MDBStep>

                  )
                })}
              </MDBStepper>

              <MDBBtn color="success" rounded className="float-right" onClick={this.handleNextPrevClick(1)(index+2)}>next</MDBBtn>
            </MDBCol>)}

         </div>
      } else if (index == this.process.length-1) {
          return <div key={task.name} className="">
                  {this.state.formActivePanel1 == index+1 &&
                    (<MDBCol md="12">
                    <h4 className="font-weight-bold pl-0 my-4"><strong>{task.name}</strong></h4>
                    <MDBStepper vertical>
                      {this.process[index].actions.map((action, index) => {
                        return (
                          <MDBStep className={action.done? "completed" : 'warning'}>
                              <a href="#!">
                                <span className="circle">
                                  {/* <MDBIcon icon="exclamation-triangle" /> */}
                                  {index+1}
                                </span>
                                {action.description ?
                                <p>
                                  {action.description}
                                </p> : ''
                                }
                                <span className="label">
                                  <Action
                                    action={action}
                                  />
                                  {/* {action.done? <MDBIcon icon="check" /> : ''} */}
                                </span>


                              </a>

                            </MDBStep>

                      )
                    })}
                  </MDBStepper>

                      <MDBBtn color="mdb-color" rounded className="float-left" onClick={this.handleNextPrevClick(1)(index)}>previous</MDBBtn>

                    </MDBCol>)}

                </div>
      } else {
        return <div key={task.name} className="fullWidth">
          {this.state.formActivePanel1 == index+1 &&
            (<MDBCol md="12" className="fullWidth">
            <h4 className="font-weight-bold pl-0 my-4"><strong>{task.name}</strong></h4>
            <MDBStepper vertical>
               {this.process[index].actions.map((action, index) => {
                return (
                  <MDBStep className={action.done? "completed" : 'warning'}>
                    <a href="#!">
                      <span className="circle">
                        {/* <MDBIcon icon="exclamation-triangle" /> */}
                        {index+1}
                      </span>
                      {action.description ?
                      <p>
                        {action.description}
                      </p> : ''
                      }
                      <span className="label">
                        <Action
                          action={action}
                        />
                        {/* {action.done? <MDBIcon icon="check" /> : ''} */}
                      </span>
                    </a>
                  </MDBStep>
                )
              })}
            </MDBStepper>
              <MDBBtn color="mdb-color" rounded className="float-left" onClick={this.handleNextPrevClick(1)(index)}>previous</MDBBtn>
              <MDBBtn color="success" rounded className="float-right" onClick={this.handleNextPrevClick(1)(index+2)}>next</MDBBtn>
            </MDBCol>)}
        </div>

      }


    })

    return (
      <MDBContainer className="fullHeight">
        <br></br>

        <h2 className="text-center font-weight-bold mb-4"><strong>{this.props.processName}</strong></h2>
        <MDBStepper icon>
          {steps}
        </MDBStepper>
        <MDBRow className="fullHeight fullWidth taskRow">
          {stepsContent}
        </MDBRow>

      </MDBContainer>
      );
    };
  }

const mapStateToProps = createStructuredSelector({

  users: makeSelectUsers(),
  loading: makeSelectLoading(),
  error: makeSelectError(),

});

const mapDispatchToProps = (dispatch) => {
  return {
    // onCreateUser: (user) => dispatch(registerUser(user)),
    // onDeleteUser: (user) => dispatch(actionCreators.deletUser(user)),
    // onUpdateUser: (user) => dispatch(actionCreators.editUser(user)),
    // getUsers: () => dispatch(actionCreators.getUsers())

  };
}
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Process);

