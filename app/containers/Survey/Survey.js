
import React, { useEffect, memo } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { makeSelectUsers } from '../App/selectors';
import { makeSelectLoading, makeSelectError,} from 'containers/App/selectors';
import { createStructuredSelector } from 'reselect';
import { MDBContainer, MDBRow, MDBCol, MDBStepper, MDBStep, MDBBtn, MDBInput } from "mdbreact";
import MultiSelectRadios from '../../components/multiSelectRadios/multiSelectRadios'
import classnames from 'classnames';
import Form from '../Forms/Form';

import './Survey.css';


class Survey extends React.Component {

  state = {
    formActivePanel1: 1,
    formActivePanel1Changed: false,
    surveyStages: [
      {
        name: 'General info',
        role: 'Survey manager',
        icon: 'folder-open'
      },
      {
        name: 'Allocate UAV',
        role: 'Survey manager',
        icon: 'user-check'
      },
      {
        name: 'Flight plan',
        role: 'UAV operator',
        icon: 'receipt'
      },
      {
        name: 'Allocate CAD',
        role: 'Survey manager',
        icon: 'tasks'
      },
      {
        name: 'Decode',
        role: 'QC enginner',
        icon: 'check'
      },
    ]
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

  // convertUsersToSelect = (users) => {
  //   let usersArray = [];
  //   for(let user of users) {
  //     // console.log(role)
  //     usersArray.push({valueId: user.ID, value: user.firstName, displayValue: user.firstName})
  //   }
  //   return usersArray
  // }

  render() {
    console.log('[Surevy.props]:', this.props);
    const steps = this.state.surveyStages.map((stage, index) => {
      if (index == 0) {
        return (
          <MDBStep far
            key={index}
            icon={stage.icon}
            stepName={stage.name}
            onClick={this.swapFormActive(1)(index+1)}
            >
          </MDBStep>
        )
      } else {
        return (
          <MDBStep
            key={index}
            icon={stage.icon}
            stepName={stage.name}
            onClick={this.swapFormActive(1)(index+1)}
            >
          </MDBStep>
        )
      }

    });
    return (
      <MDBContainer className="fullHeight">
        <br></br>
        {/* <h2 className="text-center font-weight-bold pt-4 pb-5 mb-2"><strong>General info</strong></h2> */}
        <MDBStepper icon>
          {steps}
          {/* <MDBStep far icon="folder-open" stepName="Basic Information" onClick={this.swapFormActive(1)(1)}></MDBStep>
          <MDBStep icon="pencil-alt" stepName="Personal Data" onClick={this.swapFormActive(1)(2)}></MDBStep>
          <MDBStep icon="photo" stepName="Terms and Conditions" onClick={this.swapFormActive(1)(3)}></MDBStep>
          <MDBStep icon="check" stepName="Finish" onClick={this.swapFormActive(1)(4)}></MDBStep> */}
        </MDBStepper>

        {/* <form role="form" action="" method="post"> */}
          <MDBRow className="fullHeight">
            {this.state.formActivePanel1 == 1 &&
            (<MDBCol md="12" className="fullHeight">
              {/* <h5 className="font-weight-bold pl-0 my-4">
                <strong>Basic Information</strong></h5> */}
              <Form
                formType="BridgeInspectionForm"
                editMode={this.props.editMode}
                item={this.props.survey}>

                </Form>
              {/* <MDBInput label="Email" className="mt-4" autoFocus={this.calculateAutofocus(1)} />
              <MDBInput label="Username" className="mt-4" />
              <MDBInput label="Password" className="mt-4" />
              <MDBInput label="Repeat Password" className="mt-4" /> */}
              <MDBBtn color="success" rounded className="float-right" onClick={this.handleNextPrevClick(1)(2)}>next</MDBBtn>
            </MDBCol>)}

            {this.state.formActivePanel1 == 2 &&
              (<MDBCol md="12">
                <h4 className="font-weight-bold pl-0 my-4"><strong>Choose UAV operators</strong></h4>
                {/* <MDBInput label="I agreee to the terms and conditions" type="checkbox" id="checkbox" autoFocus={this.calculateAutofocus(1)} />
                <MDBInput label="I want to receive newsletter" type="checkbox" id="checkbox2" /> */}
                <MultiSelectRadios
                  options={this.usersByRole('UAV operator')}
                  selectedOptions={this.props.projectUsers}></MultiSelectRadios>
                <MDBInput label="Add message to email" type="textarea" rows="2" />
                <MDBBtn color="mdb-color" rounded className="float-left" onClick={this.handleNextPrevClick(1)(2)}>previous</MDBBtn>
                <MDBBtn color="success" rounded className="float-right" onClick={this.handleNextPrevClick(1)(4)}>next</MDBBtn>
              </MDBCol>)}


            {this.state.formActivePanel1 == 3 &&
              (<MDBCol md="12" >
              <h3 className="font-weight-bold pl-0 my-4"><strong>Personal Data</strong></h3>
                <MDBInput label="First Name" className="mt-3" autoFocus={this.calculateAutofocus(1)} />
                <MDBInput label="Second Name" className="mt-3" />
                <MDBInput label="Surname" className="mt-3" />
                <MDBInput label="Address" type="textarea" rows="2" />
                <MDBBtn color="mdb-color" rounded className="float-left" onClick={this.handleNextPrevClick(1)(1)}>previous</MDBBtn>
                <MDBBtn color="success" rounded className="float-right" onClick={this.handleNextPrevClick(1)(3)}>next</MDBBtn>
              </MDBCol>)}

            {this.state.formActivePanel1 == 4 &&
            (<MDBCol md="12">
              <h4 className="font-weight-bold pl-0 my-4"><strong>Choose CAD technicians</strong></h4>
              <MultiSelectRadios
                  options={this.usersByRole('CAD technician')}
                  selectedOptions={this.props.projectUsers}
              >
              </MultiSelectRadios>
              <MDBBtn color="mdb-color" rounded className="float-left" onClick={this.handleNextPrevClick(1)(3)}>previous</MDBBtn>
              <MDBBtn color="success" rounded className="float-right" onClick={this.handleSubmission}>submit</MDBBtn>
            </MDBCol>)}
          </MDBRow>
        {/* </form> */}
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
)(Survey);
