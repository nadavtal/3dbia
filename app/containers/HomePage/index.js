/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React, { useEffect, memo, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import {
  makeSelectRoles,
  makeSelectLoading,
  makeSelectError,
  makeSelectCurrentUser
} from 'containers/App/selectors';

import {
  MDBContainer,
  MDBMask,
  MDBView,
  } from 'mdbreact';
import Login from '../RegistrationProcess/Login'
import reducer from './reducer';
import saga from './saga';
import './Register.css';

// import { makeSelectRoles } from '../RolesPage/selectors';
const key = 'home';

export function HomePage({
  loading,
  error,
  onSubmitForm,
  onLoginUser,
  onRegisterUser,
  onRegisterProvider,
  onRegisterOrg,
  currentUser,
  providerOrganizations,
  
  history = useHistory(),
}) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  useEffect(() => {
    // console.log(formModeState)
  }, []);
  const [formTypeState, setFormTypeState] = useState('loginUserForm');
  const [formModeState, setformModeState] = useState('login');
  const [provider, setprovider] = useState({});
  const reposListProps = {
    loading,
    error,
  };

  // localStorage.removeItem('currentUser')

  onSubmitForm = (data, event) => {
    // if (data !== undefined && event.preventDefault) event.preventDefault();
    if (event) {
      console.log('onSubmitForm fired', data, event);
      console.log(formTypeState);

      switch (formTypeState) {
        case 'loginUserForm':
          onLoginUser(data);
          break;
        case 'userForm':
          onRegisterUser(data);
          break;
        case 'providerForm':
          onRegisterProvider(data);
          break;
        case 'organizationForm':
          onRegisterOrg(data);
          break;
      }
    }
  };

  // const HoverableWrapper = (props) => {

  //   const Div = styled.div`
  //   // color: ${active ? 'white' : 'black'};
  //   transition: all .3s;
  //   opacity: ${props.opacity ? props.opacity : 1};     
  //   background-color: transparent;
  //   // border-bottom: ${active ? '2px solid black' : ''};
  //   &:hover {
  //       // color: ${active ? '' : '#6cc0e5'};
  //       background-color: ${props.bgColor ? props.bgColor : 'transparent'};
  //       opacity: 1;
  //   }
  //   `
  //   return <Div 
  //     className={props.className}
  //     style={props.style} 
  //     onClick={props.onClick}>{props.children}</Div>
  //     }; 
  

  return (
    <div id="register">
      <MDBView>
        <MDBMask className="d-flex justify-content-center" overlay="gradient">
          <MDBContainer className="h-100 d-flex justify-content-center">
            {/* <RegistrationProcess /> */}
            <Login />
          </MDBContainer>

        </MDBMask>
      </MDBView>
    </div>
  );
}

HomePage.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),

  onSubmitForm: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  currentUser: makeSelectCurrentUser(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
  roles: makeSelectRoles(),
  // providerOrganizations: makeSelectProviderOrganizations(),
  // roles: makeSelectRoles(),
});

export function mapDispatchToProps(dispatch) {
  return {
    // onLoginUser: userData => {
    //   dispatch(login(userData));
    // },
    // onRegisterUser: data => {
    //   dispatch(registerUser(data));
    // },
    // onRegisterProvider: data => {
    //   dispatch(registerProvider(data));
    // },
    // onRegisterOrg: data => {
    //   dispatch(registerOrg(data));
    // },
    
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(HomePage);
