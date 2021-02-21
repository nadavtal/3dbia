import React, {memo, useEffect, useMemo} from "react";
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectCurrentUser, makeSelectCurrentUserRole, makeSelectShowChat,
  makeSelectMenuItem} from 'containers/App/selectors';
import * as selectors from './selectors'

import TopBarItem from 'components/TopBarItem';
import Calender from '../../Calender/Calender';
import SideMenu from 'components/SideMenu/SideMenu';
import { getProviderbyId } from '../../AppData/actions';
import { toggleModal, toggleAlert, toggleLoadingSpinner, bridgeSelected } from 'containers/App/actions';

import { createNewProject } from '../../Projects/actions';
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
import ProviderManagementModule from "./ProviderManagementModule";
import SurveyTasksManager from "./SurveyTasksManager";

// import { selectOrganization } from "../../Organizations/Organization/selectors";
const key = "provider";
const menu = menus['generic'];
const ProviderModule = (props) => {
    
  useInjectSaga({ key, saga });
  useInjectReducer({ key, reducer });
  
  useEffect(() => {
    const providerId = props.match.params.id;
    props.getProvider(providerId)
    return () => localStorage.removeItem('menuItem');
   
  }, [props.match.params.id]);

  useEffect(() => {
    if (props.organizations && props.organizations.length) {
      props.setSelectedOrganization(props.organizations.find(org => org.name == props.match.params.orgName))
      if (props.provider.general_status !== 'Active') {
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
                Please click on 'Settings' to manage all you personal, provider, organizations and users information.
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
    }, [props.provider]);


  useEffect(() => {
    
    // handleCurrentUserAndProviderStatus()

    return () => {};
  }, [props.currentUser.userInfo.general_status]);



  const handleCurrentUserAndProviderStatus = () => {
    
    if (props.currentUser && props.currentUser.userInfo.general_status !== 'Active') {
      // setActiveItemClassicTabs3('Info')
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
      // setActiveItemClassicTabs3('Info')
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
      //  if (props.providerUsers.length == 1) {
      //    setActiveItemClassicTabs3('Manage Users') 
      //    props.onToggleAlert({
      //      title: `All done! `,
      //      // text: `${user.first_name} ${user.last_name} is allready allocated as ${role.name}`,
      //      confirmButton: 'Got it',
      //      // cancelButton: 'Cancel',
      //      alertType: 'success',
      //      icon: 'check-circle',
      //      body: <div className="ml-5">
      //              <h3 className="ml-5">
      //                {`This is the 'Management' tab. this is where you manage all your users, roles and providers`} 
      //              </h3>
 
      //            </div>
      //      ,
 
      //      // confirmFunction: () => {
 
      //      // }
      //    });
      //  }
   
     }
     
  }

  const handleSelectBridge = (bridgeId) => {
    
    props.setSelectedbridge(bridgeId)
  }

  const Component = ({menuItem}) => {
    console.log(menuItem)
    switch (menuItem) {
      case 'Settings':
        
        return (
          <>
            {/* <div className="mt-5"> */}
    
              <ProviderManagementModule />
            {/* </div> */}
          </>
        );
      case 'Bridges':
        return (
          <>
            {/* <TopBarItem position="center">
              {props.selectedbridgeId
                ? props.selectedBridge.name
                : `Bridges (${props.bridges.length})`}
            </TopBarItem> */}

            {props.selectedbridgeId ? (
              <>
                <BridgeModule
                  bridgeId={props.selectedbridgeId}
                  orgId={props.selectedOrganization.id}
                />
              </>
            ) : props.bridges && props.bridges.length ? (
              <div className="mx-3">
           
              <Projects
                items={props.bridges.filter(
                  bridge =>
                    bridge.organization_id == props.selectedOrganization.id,
                )}
                surveys={props.surveys}
                rootLink={props.match.url}
                onProjectClick={bridgeId => handleSelectBridge(bridgeId)}
                enableCreateBridge={false}
              />

              </div>
            ) : (
              <div>No bridges yet...</div>
            )}
          </>
        );
      
      case 'Surveys':
        return props.surveys.length ? (
          <>
            {/* <TopBarItem position="center">
              <div className="color-white">
                My Surveys ({props.surveys.length})
              </div>
            </TopBarItem> */}
            <br />
            
            <SurveyTasksManager />
          </>
        ) : (
          'No surveys'
        );
      case 'Messages': 
          return   <Messages />
      case 'Schedule': 
          return  <Calender />
      // case 'Manage Users':
      //   console.log('Manage Users')
      //   return (
      //     <>
      //       <TopBarItem position="center">
      //         Manage user and roles
      //       </TopBarItem>
      //       <br />
      //       <UserManagementModule type="provider"/>
      //     </>
      //   );
      default:
        return null;
    }
  }

  return (
    <InnerPage>
      {props.provider && props.selectedOrganization && <>
        <TopBarItem position="center">
          <div className="color-white">
            {props.menuItem}
          </div>
        </TopBarItem>
        {!props.selectedbridgeId && <br />}
        <Component menuItem={props.menuItem}/>
        <SideMenu  
          currentCompany={props.provider}
          menu={menu}
          />
      
      </>}
    </InnerPage >
  );
}

const mapStateToProps = createStructuredSelector({
  currentUser: makeSelectCurrentUser(),
  currentUserRole: makeSelectCurrentUserRole(),
  provider: selectors.makeSelectProvider(),
  selectedOrganization: selectors.makeSelectSelectedOrganization(),
  selectedBridge: selectors.makeSelectSelectedBridge(),
  selectedbridgeId: selectors.makeSelectSelectedBridgeId(),  
  bridges: selectors.makeSelectProviderBridges(),
  organizations: selectors.makeSelectProviderOrganizations(),
  messages: selectors.makeSelectProviderMessages(),
  surveys: selectors.makeSelectProviderSurveys(),

  organizationUsers: selectors.makeSelectOrganizationUsers(),  
  showChat: makeSelectShowChat(),
  menuItem: makeSelectMenuItem()
});


const mapDispatchToProps = (dispatch) => {
  return {
    onToggleModal: (modalData) => {dispatch(toggleModal(modalData))},
    onToggleAlert: alertData => dispatch(toggleAlert(alertData)),
    onCreateNewProject: data => {dispatch(createNewProject(data))},
    getProvider: (id) => dispatch(getProviderbyId(id)),
    toggleLoadingSpinner: (msg) => dispatch(toggleLoadingSpinner(msg)),
    setSelectedbridge: bid => dispatch(bridgeSelected(bid)),
    setSelectedOrganization: bid => dispatch(actions.organizationSelected(bid)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(ProviderModule);

