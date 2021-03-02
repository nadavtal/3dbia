import React, {useState, memo, useEffect, useMemo} from "react";
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectLoading, makeSelectError, makeSelectCurrentUser,
  makeSelectRoleTypes, makeSelectCurrentUserRole, makeSelectShowChat,
  makeSelectMenuItem} from 'containers/App/selectors';
import * as selectors from './selectors'
import TopBarItem from 'components/TopBarItem';
import axios from 'axios';
import Calender from '../../Calender/Calender';
import SideMenu from 'components/SideMenu/SideMenu';
import SurveyTasksManager from './SurveyTasksManager'
import AllocationSimple from 'containers/Allocation/AllocationSimple'
import { getOrganizationbyId } from 'containers/AppData/actions';
import { toggleModal, toggleAlert, toggleLoadingSpinner, bridgeSelected } from 'containers/App/actions';
import {apiUrl} from 'containers/App/constants';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import * as actions from './actions';
import { menus } from '../../../menu-templates';
import Projects from '../../Projects/Projects';
import reducer from './reducer';
import saga from './saga';
import Messages from "containers/Messages/Messages";
import BridgeModule from "../../BridgeModul";
import InnerPage from "../../../components/InnerPage";
// import UserManagementModule from "./UserManagementModule";
import OrganizationManagementModule from "./OrganizationManagementModule";
import SurveyTypes from "components/SurveyTypes/SurveyTypes";

// import { selectOrganization } from "../../Organizations/Organization/selectors";
const key = 'organization';
const menu = menus['organizationMenu'];
const OrganizationModule = (props) => {
     
  useInjectSaga({ key, saga });
  useInjectReducer({ key, reducer });
  
  useEffect(() => {
    const orgId = props.match.params.id;
    props.onGetOrganizationbyId(orgId);
    return () => localStorage.removeItem('menuItem');
  }, [props.match.params.id]);
  useEffect(() => {
    // console.log(props.organization)
    if (props.organization) {
      if (props.organization.general_status === 'Active') {
              

      }
      else {
        props.onToggleAlert({
          title: `Welcome ${props.currentUser.userInfo.first_name} ${
            props.currentUser.userInfo.last_name
          }`,
          // text: `${user.first_name} ${user.last_name} is allready allocated as ${role.name}`,
          confirmButton: 'Got it',
          // cancelButton: 'Cancel',
          alertType: 'success',
          icon: 'door-open',
          body: (
            <div className="ml-5">
              <h3 className="ml-5">
                Please click on 'Settings' to manage all you personal, orgnaization, providers and users information.
              </h3>
              <p className="ml-5">
                Please fill in your personal and orgnaization info to activate your account and open all you organization functionality
              </p>
            </div>
          ),
          onCloseFunction: () => {
            // setSideMenuOpen(true);
            // console.log(sideMenuOpen);
          },
          confirmFunction: () => {
            // setSideMenuOpen(true);
          },
        });
        
      }
    }
  
  }, [props.organization]);


  // useEffect(() => {

  //   if (props.organization && props.organization.general_status === 'Active') {
  //     if ( props.bridges.length) setActiveItemClassicTabs3('Bridges') 
  //     else setActiveItemClassicTabs3('Settings')
      
  //   }
  
  // }, [props.organization.general_status]);

  // useEffect(() => {
    
  //   if (props.providersRoles.length && props.providers.length)
  //   addProviderToRoles(props.providersRoles, props.providers)

  // }, [props.providersRoles, props.providers]);
  // useEffect(() => {
    
  //   props.organizationUsers.map(orgUser => {
      
  //     if (orgUser.role_id && !orgUser.roleName) {
  //       const role = getRoleById(orgUser.role_id, props.organizationRoles)
  //       console.log(role)
  //       orgUser['roleName'] = role.name;
  //       orgUser['description'] = role.description;

  //     }
  //   })

  // }, [props.organizationUsers]);
  
  

  const handleCurrentUserAndOrganizationStatus = () => {
    
    if (props.currentUser && props.currentUser.userInfo.general_status !== 'Active') {
      setActiveItemClassicTabs3('Info')
      props.onToggleAlert({
        title: `Welcome ${props.currentUser.userInfo.first_name} ${
          props.currentUser.userInfo.last_name
        }`,
        // text: `${user.first_name} ${user.last_name} is allready allocated as ${role.name}`,
        confirmButton: 'Got it',
        // cancelButton: 'Cancel',
        alertType: 'success',
        icon: 'door-open',
        body: (
          <div className="ml-5">
            <h3 className="ml-5">
              This is you 'Info' tab. 
              Here you manage all you personal and provider information.
            </h3>
            <p className="ml-5">
              Please fill in your personal and provider info to activate your account
            </p>
          </div>
        ),
        onCloseFunction: () => {
          // setSideMenuOpen(true);
          // console.log(sideMenuOpen);
        },
        confirmFunction: () => {
          // setSideMenuOpen(true);
        },
      });
    }   
    else if 
      (props.provider &&
      props.provider.general_status !== 'Active' && 
      props.currentUser && 
      props.currentUser.userInfo.general_status == 'Active'
      ) 
      {   
      setActiveItemClassicTabs3('Info')
      props.onToggleAlert({
        title: `Great! `,
        // text: `${user.first_name} ${user.last_name} is allready allocated as ${role.name}`,
        confirmButton: 'Got it',
        // cancelButton: 'Cancel',
        alertType: 'success',
        icon: 'check-circle',
        body: (
          <div className="ml-5">
            <h3 className="ml-5">
              {`This is the 'Info' tab. this is where you manage all your provider information`}
            </h3>
            {/* <p className="ml-5">
                  You can allways access your provider info in the 'Info' tab in the side menu
                </p> */}
          </div>
        ),
        // onCloseFunction: () => {
        //   // setSideMenuOpen(true)

        //   // setActiveItemClassicTabs3('info')
        //   console.log(sideMenuOpen)
        // },
        confirmFunction: () => {
          // setSideMenuOpen(true);
          // setActiveItemClassicTabs3('info')
        },
      });

    }
     else if (props.provider &&
       props.provider.general_status == 'Active' && 
       props.currentUser && 
       props.currentUser.userInfo.general_status == 'Active'
       ) 
       {  
       if (props.providerUsers.length == 1) {
         setActiveItemClassicTabs3('Manage Users') 
         props.onToggleAlert({
           title: `All done! `,
           // text: `${user.first_name} ${user.last_name} is allready allocated as ${role.name}`,
           confirmButton: 'Got it',
           // cancelButton: 'Cancel',
           alertType: 'success',
           icon: 'check-circle',
           body: <div className="ml-5">
                   <h3 className="ml-5">
                     {`This is the 'Management' tab. this is where you manage all your users, roles and providers`} 
                   </h3>
 
                 </div>
           ,
 
           // confirmFunction: () => {
 
           // }
         });
       }
   
     }
     
  }

  const handleSelectBridge = (bridgeId) => {
    
    props.setSelectedbridge(bridgeId)
  }

  const Component = ({menuItem}) => {
    
    switch (menuItem) {
      case 'Settings':
         
        return (
          // <div className=""> 
        
            <OrganizationManagementModule />
          // </div>
        );
      case 'Bridges':
        return (
          <>
            {props.selectedbridgeId ? (
              <>
                <BridgeModule
                  bridgeId={props.selectedbridgeId}
                  orgId={props.organization.id}
                />
              </>
            ) : (
        
         
                <Projects
                  createNewBridge={() => handleAction('createBridge')}
                  items={props.bridges}
                  surveys={props.surveys}
                  rootLink={props.match.url}
                  onProjectClick={bridgeId =>
                    handleSelectBridge(bridgeId)
                  }
                  enableCreateBridge={true}
                />
        
            )}
          </>
        );
      
      case 'Allocate surveys':
        return (
          <AllocationSimple
            bridges={props.bridges}
            surveys={props.surveys}
          />
        );
      case 'Manage surveys':
        return props.surveys.length ? (
          <>
      
            <SurveyTasksManager readOnly />
          </>
        ) : (
          'No surveys'
        );
      case 'Surveys types':
        return <SurveyTypes
        processesTemplates={props.processesTemplates}
        processesTasks={props.processesTasks}
      />;

      case 'Messages': 
          return   <Messages />
      case 'Schedule': 
          return  <Calender />
      // case 'Manage Users':
      //   return (
      //     <>
      //       <TopBarItem position="center">
      //         Manage user and roles
      //       </TopBarItem>
      //       <br />
      //       <UserManagementModule/>
      //     </>
      //   );
      
        default:
        return null;
    }
  }
  
  const handleAction = (name, value) => {
    // console.log(name, value)
    let url
    switch (name) {
      case 'createBridge':
        console.log(props.bridgeTypes)
        props.onToggleModal({
          title: 'Create new bridge',
          text: '',
          // confirmButton: 'Create',
          cancelButton: 'Cancel',
          formType: 'bridgeForm',
          data: {
            editMode: 'Create',
            bridgeTypes: props.bridgeTypes
          },
          confirmFunction: (data, event) => createBridge(data, event),
        });
        break;
      default:
        break;
    }
  };
  const createBridge = data => {
  
    console.log(data);
    console.log(props.bridgeTypes);
    props.toggleLoadingSpinner(`Creating ${data.name} bridge`)
    data.organization_id = props.match.params.id;
    // data.project_id = null;
    data.bridge_type = props.bridgeTypes.length ? props.bridgeTypes.find(type => type.id == data.bridge_type[0]).name : null
    data.bridge_type_code = data.bridge_type_code[0]
    
    //CREATE NEW BRIDGE
    axios.post(apiUrl + 'bridges', data, {
    }).then(res => {
 
        
        if (res.data.bridgeResult.insertId) {
          //Add image to cloud
          data.bid = res.data.bridgeResult.insertId
          if (data.main_image) {
            const fileName = `bid_${res.data.bridgeResult.insertId}/general_files/main_image.jpg`
            const bucketName = '3dbia_organization_'+data.organization_id
            data.main_image.append('bucketName', bucketName)
            data.main_image.append('fileName', fileName);
            axios.post(apiUrl + 'cloud-upload', data.main_image, {})
            .then(res => {
              //Update bridge main image url
              console.log(res)
              console.log(data)
              data.image_url = res.data.imageUrl
              axios.put(apiUrl + 'bridges/' + data.bid, data, {})
              .then(res => {
                console.log(res)
                })
              })
          }
          
          props.onBridgeCreated(data);
          props.toggleLoadingSpinner()
        }
    })

  };
  return (
    <InnerPage>
      {props.organization && (
        <>
          <TopBarItem position="center">
            <div className="color-white">{props.menuItem}</div>
          </TopBarItem>
          {!props.selectedbridgeId && <br />}
          <Component menuItem={props.menuItem} />
          <SideMenu currentCompany={props.organization} menu={menu} />
        </>
      )}
    </InnerPage>
  );
}

const mapStateToProps = createStructuredSelector({
  currentUser: makeSelectCurrentUser(),
  currentUserRole: makeSelectCurrentUserRole(),
  loading: makeSelectLoading(),
  roleTypes: makeSelectRoleTypes(),
  surveys: selectors.makeSelectOrganizationSurveys(),
  organization: selectors.makeSelectOrganization(),
  bridgeTypes: selectors.makeSelectBridgeTypes(),
  // organizationUsers: selectors.makeSelectOrganizationUsers(),
  // organizationRoles: selectors.makeSelectOrganizationRoles(),
  // providersRoles: selectors.makeSelectProvidersRoles(),
  bridges: selectors.makeSelectOrganizationBridges(),
  processesTemplates: selectors.makeSelectOrganizationProcessesTemplates(),
  processesTasks: selectors.makeSelectOrganizationProcessesTasks(),
  selectedBridge: selectors.makeSelectSelectedBridge(),
  selectedbridgeId: selectors.makeSelectSelectedBridgeId(),  
  // showChat: makeSelectShowChat(),
  menuItem: makeSelectMenuItem(),
  
});


const mapDispatchToProps = (dispatch) => {
  return {
    onToggleModal: modalData => dispatch(toggleModal(modalData)),
    onToggleAlert: alertData => dispatch(toggleAlert(alertData)),
    toggleLoadingSpinner: (msg) => dispatch(toggleLoadingSpinner(msg)),
    onGetOrganizationbyId: id => dispatch(getOrganizationbyId(id)),
    setSelectedbridge: bid => dispatch(bridgeSelected(bid)),
    onBridgeCreated: bridge => dispatch(actions.newBridgeCreated(bridge)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(OrganizationModule);

