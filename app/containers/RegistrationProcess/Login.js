import React, { useState, memo, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { MDBBtn, MDBCard } from 'mdbreact';
import { connect } from 'react-redux';
import { compose } from 'redux';
import reducer from './reducer';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import HoverableWrapper from '../../components/Hoverable/Hoverable';
import CustomSelect from '../../components/CustomSelect';
import {onlyUnique} from 'utils/dataUtils'
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
import { makeSelectRoles } from '../App/selectors';
const key = 'registrationProcess';

const Login = ({
  currentUser,
  onLoginUser,
  onAuth,
  onRoleSelected,
  onRegisterUser,
  // providerOrganizations,
  // getProviderOrganizations,
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
  const [provider, setProvider] = useState();
  const [providers, setProviders] = useState([]);
  const [organization, setOrganization] = useState();
  const [selectedRole, setSelectedRole] = useState();
  const [roles, setRoles] = useState([]);
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
    ];
  } else {
    steps = [
      { name: 'Login', icon: 'sign-in-alt' },
      { name: 'Choose Work space', icon: 'building' },
    ];
  }
  const handleNextPrevClick2 = (a, param) => {
    // console.log(a, param)
    setActive({
      ['formActivePanel' + a]: param,
      ['formActivePanel' + a + 'Changed']: true,
    });
  };
  const handleCurrentUser = () => {
    console.log(currentUser)
    console.log('userSystemRoles', currentUser.userSystemRoles);
    console.log('userOrganiztionRoles', currentUser.userOrganiztionRoles);
    console.log('userProviderRoles', currentUser.userProviderRoles);
    // console.log('providerOrganizations', providerOrganizations);
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
          './organizations/' + currentUser.userOrganiztionRoles[0].organization_id,
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
          `./providers/${currentUser.userProviderRoles[0].provider_id}`,
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
          console.log('// If user has 1 organization role and 1 provider role and are connected', currentUser.userOrganiztionRoles[0]);
          const orgId = currentUser.userOrganiztionRoles[0].organization_id
          const orgName = currentUser.userOrganiztionRoles[0].org_name
          history.push({
            pathname:
              `./providers/${currentUser.userProviderRoles[0].provider_id}/${orgName}`,
            // search: '?query=abc',
            state: { organization_id: currentUser.userOrganiztionRoles[0].organization_id },
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

  const handleGo = () => {
    console.log(selectedRole)
    if (selectedRole.provider_id) {
      history.push({
        pathname: `./providers/${selectedRole.provider_id}/${selectedRole.org_name}`,
        state: { 
          organization_id: selectedRole.organization_id,
          role: selectedRole.role_name
        },
      });
      onRoleSelected(selectedRole)
    } else {
      history.push({
        pathname: './organizations/' + selectedRole.organization_id,
        role: selectedRole.role_name,
  
      });
      onRoleSelected(selectedRole);

    }
  }

  const handleOrgClick = orgName => {
    console.log('handleOrgClick', organization, orgName)
    if (organization !==  orgName) {
      setOrganization(orgName);
      setSelectedRole()
      const orgRoles = currentUser.userOrganiztionRoles.filter(
        role => role.org_name == orgName,
      );
      // console.log(orgRoles)
      if (orgRoles.length == 1) {
        setSelectedRole(orgRoles[0])
        setProviders([])
        setRoles([])
      } else {
        setSelectedRole()
        let providersNames = orgRoles.map(orgRole => orgRole.provider_name ? orgRole.provider_name : 'None')
        const uniqueProvNames = providersNames.filter(onlyUnique)
        console.log(uniqueProvNames);
        let inHouseProviderRoles = getIndependantProviderRoles()
        console.log(inHouseProviderRoles);
        let providerNames = [];
  
        //If ehre is no organization roles and only in house provider roles
        if (orgName == 'None') {
          inHouseProviderRoles.forEach(role => {
            if (!providerNames.includes(role.provider_name)) providerNames.push(role.provider_name);
          });
          if (providerNames.length == 1) handleProviderClick(providerNames[0], orgName);
          else setProviders(providerNames)
        } else {
          console.log(uniqueProvNames)
          if (uniqueProvNames.length == 1) handleProviderClick(uniqueProvNames[0], orgName);
          // else 
          setProviders(uniqueProvNames)
        }
        
       
  
      }

    }
  };

  const handleProviderClick = (provider_name, orgName) => {
    console.log('handleProviderClick', provider_name, orgName)
    setProvider(provider_name)
    setRoles([])
    setSelectedRole()
    let roles;
    if (provider_name == 'None') {
      roles = currentUser.userOrganiztionRoles.filter(orgRole => orgRole.provider_id == null)
      console.log(roles)
      if (roles.length == 1) {
        setSelectedRole(roles[0])
  
      }
    } else {
       if (organization == 'None') {
        roles = currentUser.userProviderRoles.filter(provRole => provRole.provider_name == provider_name)
      } else {
        roles = currentUser.userOrganiztionRoles.filter(orgRole => orgRole.provider_name == provider_name && orgRole.org_name == orgName)

      }
      console.log(roles)
      if (roles.length == 1) {   
        setSelectedRole(roles[0])     
      }
    }
    if (roles.length > 1) {
      setRoles(roles)
    }
  };

  const handleRoleClick = role => {
    setSelectedRole(role)
  };



  const getIndependantProviderRoles = () => {
    const organizationRolesIds = currentUser.userOrganiztionRoles.map(orgRole => orgRole.role_id);
    // console.log(organizationRolesIds);
    const inHouseProviderRoles = currentUser.userProviderRoles.filter(provRole => {

      return !organizationRolesIds.includes(provRole.role_id)
    })
    return inHouseProviderRoles
  }

  
  const OrgNames = () => {
    console.log('Runing OrgNames', currentUser)
    // if (user.userOrganiztionRoles && user.userOrganiztionRoles.length){
    // console.log(user.userOrganiztionRoles)
    let orgNames = [];
    if (currentUser.userOrganiztionRoles && currentUser.userOrganiztionRoles.length) {
      currentUser.userOrganiztionRoles.forEach(role => {
        if (!orgNames.includes(role.org_name)) orgNames.push(role.org_name);
      });
      console.log(orgNames)
      if (orgNames.length == 1) handleOrgClick(orgNames[0])
      if (getIndependantProviderRoles().length) orgNames.push('None')
      // orgNames = orgNames.map((org, index) => { return {id: index+1, name: org}})
      console.log(orgNames);
      return <CustomSelect
        className={orgNames.length <= 1 && 'disabled'}
        label="Organization"
        value={organization}
        options={orgNames.map(orgName => { return {name : orgName}})}
        onChange={orgName => handleOrgClick(orgName)
        }
      />
    } else {
      return null
    }
    
  };
  const ProviderNames = () => {
    // const inHouseProviderRoles = getIndependantProviderRoles()
    // console.log(inHouseProviderRoles)
    
    console.log(providers.map(provName => { return {name : provName}}))
    return <CustomSelect
      className={providers.length <= 1 && 'disabled'}
      label="Provider"
      value={provider}
      options={providers.map(provName => { return {name : provName}})}
      onChange={provName => handleProviderClick(provName[0], organization)}
    />
  };

  const Roles = () => {
    // console.log(user)
    // console.log(user.userOrganiztionRoles)
    // const orgRoles = user.userOrganiztionRoles.filter(role => role.org_name == organization)
    // const inHouseRoles = orgRoles.filter(orgRole => !orgRole.provider_id)
    // const providerRoles = orgRoles.filter(orgRole => orgRole.provider_id)
    // console.log(orgRoles);
    const rolesSelect = roles.map(role => {
      return {id: role.role_id, name: role.role_name}
    })
    return (
      <>
        {/* <h5 className="text-center">Found {orgRoles.length} roles by {organization}</h5>
        <p className="text-center">Please choose a role</p> */}
        <CustomSelect
          className={!roles.length && 'disabled'} 
          options={rolesSelect}
          value={selectedRole && selectedRole.role_id}
          label="Role"
          onChange={roleId => handleRoleClick(roles.find(role => role.role_id == roleId))}
          />
      </>
    );
    // }
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
        {/* <h5 className="text-center">Found {orgRoles.length} roles by {organization}</h5>
        <p className="text-center">Please choose a role</p> */}
        <CustomSelect
          className={!orgRoles.length && 'disabled'} 
          options={orgRolesSelect}
          label="Choose role"
          onChange={roleId => handleRoleClick(orgRoles.find(role => role.role_id == roleId))}
          />
      </>
    );
    // }
  };

  return (
    <div className="registrationProcess ">
      <MDBCard className="background-white">
        <div className="bgPrimary text-white text-center py-2">
          {pageTitle}
        </div>

        <div className="justify-content-center no-gutters bg-white m-2">
          {/* <div> */}
          {active.formActivePanel3 === 1 && (
            <div className="login">
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
            </div>
          )}
          {active.formActivePanel3 === 2 && (
            <div className="selects p-3">
              {/* {currentUser.userOrganiztionRoles &&
                currentUser.userOrganiztionRoles.length && (
                  // <UserOrgRoles user={currentUser} />
                  <OrgNames user={currentUser} />
                )} */}
              <OrgNames />
              <ProviderNames />
              {/* <UserProviderRoles user={currentUser} /> */}
              <Roles />
              <div>
                {organization && (
                  <div>
                    Selected organization: <span>{organization}</span>
                  </div>
                )}
                {provider && (
                  <div>
                    Selected provider: <span>{provider}</span>
                  </div>
                )}
                {selectedRole && (
                  <div>
                    Selected role: <span>{selectedRole.role_name}</span>
                  </div>
                )}
              </div>
              <MDBBtn
                onClick={handleGo}
                className={!selectedRole && 'disabled'}
              >
                Go
              </MDBBtn>
              {/* <img src='https://drive.google.com/file/d/1Nrr0XoCWDqNvcV5BJKlxz0d5M82e6e8q/view?usp=drivesdk'/> */}
              {/* <img src='https://drive.google.com/uc?export=view&id=1Nrr0XoCWDqNvcV5BJKlxz0d5M82e6e8q'/> */}
            </div>
          )}

          {/* </div> */}
        </div>
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
  // providerOrganizations: makeSelectProviderOrganizations(),
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
    onRegisterUser: data => dispatch(registerUser(data)),
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
)(Login);
