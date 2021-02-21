/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import Confirmation from '../Confirmation/Confirmation'
import HomePage from 'containers/HomePage/Loadable';
import RolesPage from '../RolesPage/index'
import UsersPage from 'containers/Users';
import UserPage from 'containers/UserPage/index';
import ProvidersPage from 'containers/Providers/Providers';
import OrganizationsPage from 'containers/Organizations/Organizations';
import OrganizationModule from 'containers/Organizations/Organization/OrganizationModule';
import Projects from 'containers/Projects/Projects';
import Processes from '../Processes/Processes';
import Process from '../Process/Process';
import AppData from '../AppData/AppData'
import AdminModule from '../AdminModule/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import SpinnerMessage from 'components/SpinnerMessage';
import Modal from '../Modal/Modal'
import Messages from '../Messages/Messages';
import Notification from '../../components/Toast/Toast';
import Alert from '../Alert/Alert'
import GlobalStyle from '../../global-styles';
import Chat from '../../components/RightSideLayout/Chat/Chat';
import RightSideLayout from 'components/RightSideLayout/RightSideLayout'
import ProviderModule from '../Providers/Provider/ProviderModule';

// localStorage.removeItem('currentUser')
const AppWrapper = styled.div`
  max-width: 100vw;
  overflow: hidden;
  // margin: 0 auto;
  display: flex;
  min-height: 100%;
  // padding: 0 16px;
  flex-direction: column;
`;

const dynamicLeftPadding = {
  paddingLeft: '0'
    // this.state.windowWidth > this.state.breakWidth ? '240px' : '0'
}
// localStorage.removeItem('currentUser')
export default function App() {
  return (
    <AppWrapper>
      <Helmet
        titleTemplate="%s - Manam-portal"
        defaultTitle="Manam-portal"
      >
        <meta name="description" content="Web portal for 3d models" />
      </Helmet>
        {/* <div className=''> */}
          {/* <SideNav></SideNav> */}
        {/* </div> */}
        <AppData></AppData>
        <main style={{ ...dynamicLeftPadding, margin: '0 0 0 0' }}>
          <Switch>
            
            <Route path="/users/:id" component={UserPage} />
            <Route path="/users" component={UsersPage} />
            {/* <Route path="/organizations/:id/bridges/:bridgeId" render={(routeProps) => <BridgePage 
              {...routeProps}
              // models={props.models}
            />}
             /> */}
            <Route path="/organizations/:id" component={OrganizationModule} />
            <Route path="/confirmation/:type/:token" component={Confirmation} />
            <Route path="/organizations" component={OrganizationsPage} />
            <Route path="/providers/:id/:orgName" component={ProviderModule} />
            <Route path="/providers/:id" component={ProviderModule} />
            <Route path="/providers" component={ProvidersPage} />
            <Route path="/roles" component={RolesPage} />
            <Route path="/projects" component={Projects} />
            <Route path="/proccesses/:id" component={Process} />
            <Route path="/proccesses" component={Processes} />
            <Route path="/messages" component={Messages} />
            {/* <Route path="/database/organization/:id" component={DataBaseModule} /> */}
            <Route path="/admin" component={AdminModule} />
            <Route path="/" component={HomePage} />
            <Route path="" component={NotFoundPage} />
          </Switch>

        </main>
        {/* <SideNav /> */}
        {/* <SideMenu /> */}
        <Modal />
        <Alert />
        <Notification
          type="info"
          />
        <SpinnerMessage />
        <RightSideLayout />
        {/* <Chat /> */}
        
      <GlobalStyle />
    </AppWrapper>
  );
}
