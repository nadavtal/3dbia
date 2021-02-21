import React, { useState, memo, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBStepper,
  MDBStep,
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBInput,
} from 'mdbreact';
import { connect } from 'react-redux';
import { compose } from 'redux';
import reducer from './reducer';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import HoverableWrapper from '../../components/Hoverable/Hoverable';
import CustomSelect from '../../components/CustomSelect';
import Overlay from '../../components/Overlay';
import {
  makeSelectProviderOrganizations,
  makeSelectMessage,
} from './selectors';
import PageHeader from 'components/PageHeader/PageHeader';
import {
  makeSelectLoading,
  makeSelectError,
  makeSelectCurrentUser,
  makeSelectCurrentUserRole
} from 'containers/App/selectors';
import * as actions from './actions';
import Form from '../Forms/Form';
import {
  getProviderOrganizations,
  // registerUser,
  registerProvider,
  registerOrg,
  login,
  
} from '../AppData/actions';
import { roleSelected } from '../App/actions';
import './RegistrationProcess.css';
const key = 'registrationProcess';

const RegistrationProcess = ({
  currentUser,
  onLoginUser,
  onAuth,
  onRoleSelected,
  onRegisterUser,
  providerOrganizations,
  getProviderOrganizations,
  msg,
  history = useHistory(),
}) => {
  useInjectReducer({ key, reducer });
  const [active, setActive] = useState({
    formActivePanel3: currentUser ? 2 : 1,
    formActivePanel1Changed: false,
  });
  const [hasAccount, sethasAccount] = useState(false);
  const [formModeState, setformModeState] = useState('login');
  const [formTypeState, setFormTypeState] = useState('loginUserForm');
  const [pageTitle, setPageTitle] = useState('Please log in to continue');
  const [provider, setprovider] = useState({});
  const [organization, setOrganization] = useState();
  const [showOverlay, setShowOverlay] = useState(false);
  useEffect(() => {
    if (currentUser) {
      
      handleCurrentUser()
 
    }
    return;
  }, [currentUser]);
  let steps;
  if (formModeState == 'register') {
    steps = [
      { name: 'Registration', icon: 'sign-in-alt' },
      // {name: 'Choose account type',  icon: 'user-cog'},
      // {name: 'Basic info',  icon: 'info'},
      // {name: 'Registration complete',  icon: 'check-circle'},
    ];
  } else {
    steps = [
      { name: 'Login', icon: 'sign-in-alt' },
      { name: 'Choose Work space', icon: 'building' },
      // {name: 'Choose organization',  icon: 'building'},
      // {name: 'Building your work space',  icon: 'check-circle'},
    ];
  }
  const accoutTypes = [
    { name: 'User', formType: 'userForm' },
    { name: 'Provider', formType: 'providerForm' },
    { name: 'Organization', formType: 'organizationForm' },
  ];
  const handleCurrentUser = () => {
    console.log(currentUser)
    console.log('userSystemRoles', currentUser.userSystemRoles);
    console.log('userOrganiztionRoles', currentUser.userOrganiztionRoles);
    console.log('userProviderRoles', currentUser.userProviderRoles);
    console.log('providerOrganizations', providerOrganizations);
    // If User has system roles, redirect to admin
   if (currentUser.userSystemRoles && currentUser.userSystemRoles.length) {
      history.push('./admin');
      onRoleSelected(currentUser.userSystemRoles[0])
    } 
    else {
      //If user has one organization role and no provider roles
      if (
        currentUser.userOrganiztionRoles.length == 1 &&
        currentUser.userProviderRoles.length == 0
      ) {        
        history.push(
          './organizations/' + currentUser.userOrganiztionRoles[0].org_id,
        );
        onRoleSelected(currentUser.userOrganiztionRoles[0])
      }

      //If user has no organization roles and one provider roles
      else if (
        !currentUser.userOrganiztionRoles.length &&
        currentUser.userProviderRoles.length == 1
      ) {
        console.log('//If user has no organization roles and one provider roles')
        history.push(
          './providers/' + currentUser.userProviderRoles[0].provider_id,
        );
        onRoleSelected(currentUser.userProviderRoles[0])
      }

      // If user has 1 organization role and 1 provider role
      else if (
        currentUser.userProviderRoles.length == 1 &&
        currentUser.userOrganiztionRoles.length == 1
      ) {
        //If org and provider are connected
        if (
          currentUser.userProviderRoles[0].provider_id == currentUser.userOrganiztionRoles[0].provider_id
        ) {
          console.log('// If user has 1 organization role and 1 provider role and are connected')
          const orgName = currentUser.userOrganiztionRoles[0].org_name
          history.push({
            pathname:
              './providers/' + currentUser.userProviderRoles[0].provider_id + '/' + orgName,
            // search: '?query=abc',
            state: { org_id: currentUser.userOrganiztionRoles[0].org_id },
          });
          onRoleSelected(currentUser.userOrganiztionRoles[0])
        }
        // setprovider(currentUser.userProviderRoles[0])
        // getProviderOrganizations(currentUser.userProviderRoles[0].provider_id)
      } else {
        setPageTitle(
          `Welcome 
          ${currentUser.userInfo.first_name ? currentUser.userInfo.first_name : ''}  
          ${currentUser.userInfo.last_name ? currentUser.userInfo.last_name : ''  }`,
        );
        handleNextPrevClick2(3, 2);
      }

    }
  }
  const swapFormActive = a => param => e => {
    setActive({
      ['formActivePanel' + a]: param,
      ['formActivePanel' + a + 'Changed']: true,
    });
  };

  const handleNextPrevClick = a => param => e => {
    console.log(a, param);
    setActive({
      ['formActivePanel' + a]: param,
      ['formActivePanel' + a + 'Changed']: true,
    });
  };
  const handleNextPrevClick2 = (a, param) => {
    // console.log(a, param)
    setActive({
      ['formActivePanel' + a]: param,
      ['formActivePanel' + a + 'Changed']: true,
    });
  };

  const handleSelectProvider = () => {};
  const handleSelectAccountType = account => {
    console.log(account);
    handleNextPrevClick2(3, 3);
    setFormTypeState(account.formType);
  };

  const handleSubmission = () => {
    alert('Form submitted!');
  };

  const calculateAutofocus = a => {
    if (active['formActivePanel' + a + 'Changed']) {
      return true;
    }
  };
  const Header = ({ text }) => {
    return (
      <h3 className="font-weight-bold pl-0 my-4">
        <strong>{text}</strong>
      </h3>
    );
  };

  const handleOrgClick = orgName => {
    console.log(orgName)
    const orgRoles = currentUser.userOrganiztionRoles.filter(
      role => role.org_name == orgName,
    );
    console.log(orgRoles)
    //If there is only on org-role by this orgName
    if (orgRoles.length == 1) {
      //If this org-role has no provider id
      if (!orgRoles[0].provider_id) {
        history.push({
          pathname: './organizations/' + orgRoles[0].org_id,
          role: orgRoles[0].role_name
        });
        onRoleSelected(orgRoles[0])
      } else {
        //Check for user provider with selected organization
        const orgProviders = currentUser.userProviderRoles.filter(
          role => role.provider_id == orgRoles[0].provider_id,
        );
        console.log(orgProviders);
        //If there is only one provider role
        if (orgProviders && orgProviders.length == 1) {
          history.push({
            pathname: './providers/' + orgProviders[0].provider_id,
            search: '?query=abc',
            state: { 
              org_id: orgRoles[0].org_id,
              role: orgRoles[0].role_name
            },
          });
          onRoleSelected(orgRoles[0])
        }
        else {
          setOrganization(orgName);
          // setShowOverlay(true)
        }
      }
    } else {
      setOrganization(orgName);
      // setShowOverlay(true)
    }
    // if (!org.provider_id) {
    //     history.push({
    //     pathname: './organizations/' + org.org_id,

    //     })
    // } else {
    //   //Check for user provider with selected organization
    //   const orgProviders = currentUser.userProviderRoles.filter(role => role.provider_id == org.provider_id);
    //   console.log(orgProviders)
    //   //If there is only one provider role
    //   if (orgProviders && orgProviders.length == 1) {
    //     history.push({
    //       pathname:
    //         './providers/' + orgProviders[0].provider_id,
    //       search: '?query=abc',
    //       state: { org_id: org.org_id },
    //     });
    //   }
    // }
  };
  const handleOrgRoleClick = role => {

    console.log(role)
    if (role.provider_id) {
      history.push({
        pathname: './providers/' + role.provider_id,
        search: '?query=abc',
        state: { 
          org_id: role.org_id,
          role: role.role_name
        },
      });
    } else {
      history.push({
      pathname: './organizations/' + role.org_id,
      role: role.role_name
    });
    }
    onRoleSelected(role)
  };

  const handleProviderClick = provider => {
    console.log(provider)
    // const orgId = currentUser.userOrganiztionRoles.find(orgRole => orgRole.org_name == organization).org_id
    // console.log(orgId);
    onRoleSelected(provider)
    history.push({
      pathname:
        './providers/' + provider.provider_id,
      search: '?query=abc',
      state: { 
        // org_id: orgId,
        role: provider.role_name
      },
    });
  };

  const getIndependantProviderRoles = () => {
    const organizationRolesIds = currentUser.userOrganiztionRoles.map(orgRole => orgRole.role_id);
    // console.log(organizationRolesIds);
    const inHouseProviderRoles = currentUser.userProviderRoles.filter(provRole => {

      return !organizationRolesIds.includes(provRole.role_id)
    })
    return inHouseProviderRoles
  }
  const OrgNames = ({ user }) => {
    // if (user.userOrganiztionRoles && user.userOrganiztionRoles.length){
    // console.log(user.userOrganiztionRoles)
    let orgNames = [];
    user.userOrganiztionRoles.forEach(role => {
      if (!orgNames.includes(role.org_name)) orgNames.push(role.org_name);
    });
    if (orgNames.length == 1) handleOrgClick(orgNames[0])
    // orgNames = orgNames.map((org, index) => { return {id: index+1, name: org}})
    // console.log(orgNames);
    return (
      <>
        <CustomSelect
          label="Choose organization"
          options={orgNames}
          onChange={orgName => handleOrgClick(orgName)
          }
        />
      </>
    );

  };

  const UserOrgRoles = ({ user }) => {
    // console.log(user)
    console.log(user.userOrganiztionRoles)
    const orgRoles = user.userOrganiztionRoles.filter(role => role.org_name == organization)
    const inHouseRoles = orgRoles.filter(orgRole => !orgRole.provider_id)
    const providerRoles = orgRoles.filter(orgRole => orgRole.provider_id)
    console.log(orgRoles);
    const orgRolesSelect = orgRoles.map(role => {
      return {id: role.role_id, name: role.role_name}
    })
    return (
      <>

        <h5 className="text-center">Found {orgRoles.length} roles by {organization}</h5>
        <p className="text-center">Please choose a role</p>
        <CustomSelect options={orgRolesSelect}
          onChange={roleId => handleOrgRoleClick(orgRoles.find(role => role.role_id == roleId))}/>
        {/* {orgRoles.map((role, index) => (
          <HoverableWrapper
            key={index}
            bgColor="hsla(10, 100%, 48%, 0.343)"
            className="text-left p-3"
            style={{ height: '3.4rem' }}
            color="rgba(255, 140, 0, 1)"
            hoverColor="black"
            afterBgColor={'rgba(255, 140, 0, 0.335)'}
            useAfter={true}
            hoverEffect="backGroundEnterLeft"
            onClick={() => {
              handleOrgRoleClick(role);
            }}
          >
            <h5>{`${role.role_name}`}</h5>
          </HoverableWrapper>
        ))} */}
      </>
    );
    // }
  };
  const UserProviderRoles = ({ user }) => {
    // if (user.userProviderRoles && user.userProviderRoles.length){
    // console.log(currentUser.userOrganiztionRoles)
    // console.log(currentUser.userProviderRoles);
    const inHouseProviderRoles = getIndependantProviderRoles()
    
    console.log(inHouseProviderRoles)
    //Get organization Roles by org name
    // const orgRolesByOrgName = currentUser.userOrganiztionRoles.filter(role => role.org_name == organization)
    // console.log(orgRolesByOrgName)

    // let providersByOrgRoles = [];
    // //Get user roles by providers working with selected org
    // orgRolesByOrgName.map(
    //   orgRole => {
    //     const provRole = currentUser.userProviderRoles.find(provRole => provRole.provider_id == orgRole.provider_id)
    //     if (provRole) providersByOrgRoles.push(provRole);
    //   }
    // )
    // console.log(providersByOrgRoles)
    if (inHouseProviderRoles.length) 
      return <>   
        <h5 className="mt-3">{`Providers`}</h5>
        {inHouseProviderRoles.map((prov, index) => (
          <>
            <HoverableWrapper
              key={index}
              bgColor="hsla(10, 100%, 48%, 0.343)"
              className="text-left p-3"
              style={{ height: '3.4rem' }}
              color="rgba(255, 140, 0, 1)"
              hoverColor="black"
              afterBgColor={'hsla(222, 23%, 45%, 0.397)'}
              useAfter={true}
              hoverEffect="backGroundEnterLeft"
              onClick={() => {
                handleProviderClick(prov)
              }}
            >
              <h5>
                {prov.provider_name} - {prov.role_name}
              </h5>
            </HoverableWrapper>
            {/* {providerOrganizations.length && provider.name == prov.name ? 
                            
                providerOrganizations.map(org => <HoverableWrapper
                    key={org.id}
                    bgColor="hsla(10, 100%, 48%, 0.343)"                      
                    className="text-left p-2 ml-4"
                    style={{'height': '2.7rem', 'font-size': '1rem'}}
                    color="hsla(222, 23%, 45%, 1)"
                    hoverColor="black"
                    afterBgColor={"rgba(255, 140, 0, 0.335)"}
                    useAfter={true}
                    hoverEffect="backGroundEnterLeft"
                    onClick={() => {
                        history.push({
                            pathname: './providers/' + provider.provider_id,
                            search: '?query=abc',
                            state: { org_id: org.id }
                            })
                        
                    }}
                    ><div>
                    {org.name}
                    </div>
                    </HoverableWrapper>
                    ) 
                    : ''} */}
          </> 
       ))}
      </>
    else return ''
    // }
  };

  return (
    <div className="registrationProcess ">
      <MDBCard className="background-white">
        <div className="background-orange text-white text-center py-2">
          {pageTitle}
        </div>

        <MDBRow className="justify-content-center no-gutters bg-white m-2">
          {/* <MDBCol md="2" className="text-center pl-md-0 pb-5"> */}
          {/* <MDBStepper icon vertical>
                    {steps.map((step, index) => <MDBStep
                        key={index}
                        className={active.formActivePanel3 == index + 1 ? 'active' : ''}
                        iconClass={'fadedasdsadsd'}
                        icon={step.icon}
                        stepName={step.name}
                        onClick={swapFormActive(3)(index+1)}
                        vertical
                    />)}
                </MDBStepper> */}
          {/* </MDBCol> */}

          <MDBCol md="12">
            {active.formActivePanel3 === 1 && (
              <MDBCol md="12" className="login">
                {formModeState == 'register' ? (
                  <Form
                    formType={'registerUserForm'}
                    editMode={formModeState}
                    colWidth={12}
                    editFunction={(data, event) => {
                      // onAuth(data)
                      onRegisterUser(data);
                    }}
                  />
                ) : (
                  <Form
                    formType={'loginUserForm'}
                    editMode={formModeState}
                    colWidth={12}
                    editFunction={(data, event) => {
                      onLoginUser(data);
                      // onAuth(data)
                    }}
                  />
                )}
                <div className="message">{msg}</div>
                {/* {formModeState !== 'register' && <>
                    <br/>
                    <br/>
                    <hr />
                    <h4>New User</h4>
                    <p>Create new account and register according to your role</p>
                    </>
                    }
                    <span className=""> 
                     
                      <MDBBtn
                        color="indigo"
                        rounded
                        className={formModeState === 'register' ? "float-left" : "float-right"}
                        onClick={() =>
                          formModeState === 'register'
                            ? [
                                setformModeState('login'),
                                setFormTypeState('loginUserForm'),
                              ]
                            : [
                                setformModeState('register'),
                                setFormTypeState('userForm'),
                              ]
                        }
                      >

                        <strong>
                          {formModeState === 'register'
                            ? 'Back to login'
                            : 'Create account'}
                        </strong>
                      </MDBBtn>
                    </span> */}

                {/* <MDBBtn
                      color="mdb-color"
                      rounded
                      className="float-right"
                      onClick={handleNextPrevClick(3)(2)}
                    >
                      next
                    </MDBBtn> */}
              </MDBCol>
            )}
            {active.formActivePanel3 === 2 && (
              <MDBCol md="12" className="basic_info">
                <Header text={`${steps[1].name}`} />
                {formModeState == 'register' ? (
                  accoutTypes.map(account => (
                    <HoverableWrapper
                      key={account.formType}
                      bgColor="hsla(10, 100%, 48%, 0.343)"
                      className="text-left p-3"
                      style={{ height: '3.4rem' }}
                      color="rgba(255, 140, 0, 1)"
                      hoverColor="black"
                      afterBgColor={'rgba(255, 140, 0, 0.335)'}
                      useAfter={true}
                      hoverEffect="backGroundEnterLeft"
                      onClick={() => handleSelectAccountType(account)}
                    >
                      <h5>{account.name}</h5>
                    </HoverableWrapper>
                  ))
                ) : (
                  <>
                    {currentUser.userOrganiztionRoles &&
                      currentUser.userOrganiztionRoles.length && (
                        
                        // <UserOrgRoles user={currentUser} />
                        <OrgNames user={currentUser} />
                      )}
                    <UserProviderRoles user={currentUser} />
                    <UserOrgRoles user={currentUser} />
                    {/* <Overlay
                      overlayOpen={showOverlay}
                      animationType="overlayAnimation"
                      toggleOverlay={() => setShowOverlay(!showOverlay)}
                    > 
                      <UserOrgRoles user={currentUser} />
                     
                    </Overlay> */}
                    {/* {organization && currentUser.userProviderRoles.length && (
                      <UserProviderRoles user={currentUser} />
                    )} */}
                    {/* {currentUser.userProviderRoles &&
                        currentUser.userProviderRoles.length && (
                          <UserProviderRoles user={currentUser} />
                        )} */}
                    {/* {providerOrganizations.length ? (
                        <>
                          <h5>Choose organization you wish to work on</h5>
                          {providerOrganizations.map(org => (
                            <HoverableWrapper
                              key={org.id}
                              bgColor="hsla(10, 100%, 48%, 0.343)"
                              className="text-left p-3"
                              style={{ height: '3.4rem' }}
                              color="rgba(255, 140, 0, 1)"
                              hoverColor="black"
                              afterBgColor={'rgba(255, 140, 0, 0.335)'}
                              useAfter={true}
                              hoverEffect="backGroundEnterLeft"
                              onClick={() => {
                                history.push({
                                  pathname:
                                    './providers/' + provider.provider_id,
                                  search: '?query=abc',
                                  state: { org_id: org.id },
                                });
                              }}
                            >
                              <h5>{org.name}</h5>
                            </HoverableWrapper>
                          ))}
                        </>
                      ) : (
                        ''
                      )} */}
                  </>
                )}

                {/* <MDBBtn
                      color="mdb-color"
                      rounded
                      className=""
                      onClick={handleNextPrevClick(3)(1)}
                    >
                      previous
                    </MDBBtn> */}
                {/* <MDBBtn
                      color="mdb-color"
                      rounded
                      className="float-right"
                      onClick={handleNextPrevClick(3)(3)}
                    >
                      next
                    </MDBBtn> */}
              </MDBCol>
            )}
            {active.formActivePanel3 === 3 && (
              <MDBCol md="12" className="basic_info">
                <Header text={`${steps[2].name}`} />
                {formModeState == 'register' ? (
                  <Form
                    formType={'basicInfoForm'}
                    editMode={formModeState}
                    colWidth={6}
                    editFunction={(data, event) =>
                      // onSubmitForm(data, event)
                      console.log(data, event)
                    }
                  />
                ) : (
                  <>
                    {providerOrganizations.length
                      ? providerOrganizations.map(org => (
                          <HoverableWrapper
                            key={org.id}
                            bgColor="hsla(10, 100%, 48%, 0.343)"
                            className="text-left p-3"
                            style={{ height: '3.4rem' }}
                            color="rgba(255, 140, 0, 1)"
                            hoverColor="black"
                            afterBgColor={'rgba(255, 140, 0, 0.335)'}
                            useAfter={true}
                            hoverEffect="backGroundEnterLeft"
                            onClick={() => {
                              history.push({
                                pathname:
                                  './providers/' + provider.provider_id,
                                search: '?query=abc',
                                state: { org_id: org.id },
                              });
                            }}
                          >
                            <h5>{org.name}</h5>
                          </HoverableWrapper>
                        ))
                      : ''}
                  </>
                )}

                <MDBBtn
                  color="mdb-color"
                  rounded
                  className="float-left"
                  onClick={handleNextPrevClick(3)(2)}
                >
                  previous
                </MDBBtn>
                {/* <MDBBtn
                      color="mdb-color"
                      rounded
                      className="float-right"
                      onClick={handleNextPrevClick(3)(4)}
                    >
                      next
                    </MDBBtn> */}
              </MDBCol>
            )}
            {active.formActivePanel3 === 4 && (
              <MDBCol md="12">
                <h3 className="font-weight-bold pl-0 my-4">
                  <strong>Finish</strong>
                </h3>
                <h2 className="text-center font-weight-bold my-4">
                  Registration completed!
                </h2>
                <MDBBtn
                  color="mdb-color"
                  rounded
                  className="float-left"
                  onClick={handleNextPrevClick(3)(3)}
                >
                  previous
                </MDBBtn>
                <MDBBtn
                  color="success"
                  rounded
                  className="float-right"
                  onClick={handleSubmission}
                >
                  submit
                </MDBBtn>
              </MDBCol>
            )}
          </MDBCol>
        </MDBRow>

      </MDBCard>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: makeSelectCurrentUser(),
  currentUserRole: makeSelectCurrentUserRole(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
  msg: makeSelectMessage(),
  providerOrganizations: makeSelectProviderOrganizations(),
  // roles: makeSelectRoles(),
});
// const mapStateToProps = (state) => {
//     console.log(state)
//     return {

//         providerOrganizations: makeSelectProviderOrganizations(),
//     }
//     // currentUser: makeSelectCurrentUser(),
//     // loading: makeSelectLoading(),
//     // error: makeSelectError(),
//     // roles: makeSelectRoles(),
//     // roles: makeSelectRoles(),
//   };

export function mapDispatchToProps(dispatch) {
  return {
    onAuth: userData => dispatch(actions.auth(userData)),
    onLoginUser: userData => dispatch(login(userData)),
    // onRegisterUser: data => dispatch(registerUser(data)),
    onRegisterProvider: data => dispatch(registerProvider(data)),
    onRegisterOrg: data => dispatch(registerOrg(data)),
    onRoleSelected: role => dispatch(roleSelected(role)),
    getProviderOrganizations: providerId =>
      dispatch(getProviderOrganizations(providerId)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(RegistrationProcess);
