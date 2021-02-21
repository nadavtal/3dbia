import React, {useState, memo, useEffect} from "react";
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectLoading, makeSelectError, makeSelectUsers,
  } from '../App/selectors';
// import { makeSelectUser, makeSelectUserProjects, makeSelectUserBridges,
//   makeSelectUserProcessesTemplates, makeSelectUserOrganizations, makeSelectUserProcessesTasks,
//   makeSelectUserMessages, makeSelectUserProcesses, makeSelectUserProjectsProcesses,
//   makeSelectUserTasks, makeSelectUserUsers, getUserBridges } from './selectors'
import { getUser } from '../AppData/actions'
import TableFilters from '../TableFilters/TableFilters';
import Processes from '../Processes/Processes';
import Calender from '../Calender/Calender';
import AccordionTable from '../AccordionTable/AccordionTable';
import { convertToMySqlDateFormat } from '../../utils/dateTimeUtils';
import { updateTask } from '../AppData/actions'
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import Form from '../Forms/Form';
import * as actions from './actions';
import Projects from '../Projects/Projects'
import {  MDBTabPane,
  MDBTabContent,
  MDBNav,
  MDBNavItem,
  MDBNavLink,
  MDBIcon,
  MDBBtn,
  MDBSwitch
  } from "mdbreact";
import ToolBar from '../../components/ToolBar/ToolBar';
import Extended from 'components/Extended/Extended';
import Basic from 'components/Basic/Basic';
import UsersPage from '../Users/index'
import { toggleModal } from '../App/actions';
import { getUserbyId } from '../AppData/actions';
import { createNewProject } from '../Projects/actions';
import reducer from './reducer';
import saga from './saga';
const key = "userPage";

const UserPage = (props) => {
  // useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  useInjectReducer({ key, reducer });
  useEffect(() => {
    const userId = props.match.params.id;
    props.getUser(userId)
    // console.log('[UserPage] all', props)
  }, []);

  const [activeItemClassicTabs3, setActiveItemClassicTabs3] = useState(localStorage.getItem('activeItemClassicTabs3') ? localStorage.getItem('activeItemClassicTabs3') : '1');
  const [showUserProcesses, setsShowUserProcesses] = useState(true);
  const toggleClassicTabs3 = (tab) => {
    // console.log(activeItemClassicTabs3, tab)
    if (activeItemClassicTabs3 !== tab) {
    setActiveItemClassicTabs3(tab)
    localStorage.setItem('activeItemClassicTabs3', tab)
    }
  }

  const linkToOrgPage = (id) => {
    console.log(props.history)
    props.history.push("../organizations/"+id);
  }


  const changeTaskPercentage = (task, value) => {
    console.log('changeTaskPercentage',  value)
    if(value) {
      task.completed = parseInt(value);
      task.due_date = convertToMySqlDateFormat(task.due_date);
      task.last_update = convertToMySqlDateFormat(new Date)
      // console.log(task.due_date)
      // console.log(convertToMySqlDateFormat(task.due_date))
      // updateTask.due_date = convertToMySqlDateFormat(updateTask.due_date)
      // updateTask.last_update = convertToMySqlDateFormat(new Date)

      // console.log(task);
      props.onUpdateTask(task)

    }

  }
  const changeTaskDate = (task, value) => {
    console.log('changeTaskDate', value)
    if(value) {

      task.due_date = convertToMySqlDateFormat(value);
      task.last_update = convertToMySqlDateFormat(new Date)

      console.log(task);
      props.onUpdateTask(task)
    }

  }

  const toggleModal = (modalType) => {
    switch (modalType) {
      case 'allocateUsers':
        props.onToggleModal({
          title: 'Add User',
          text: '',
          // confirmButton: 'Create',
          cancelButton: 'Cancel',
          formType: 'allocateUserForm',
          users: props.users,
          // options: {
          //   buttonText: 'Add users',
          //   options: [props.users],
          // },
          confirmFunction: (data) => allocateUsers(data)
        });
        break
    }

  }

  const linkToBridgePage = (bridgeId, orgId) => {
    // console.log(orgId, bridgeId)
    console.log(props.history)
    props.history.push('../organizations/' + orgId + "/bridges/"+bridgeId);
  }



  return (

    <div className="position-relative">
      <div className="classic-tabs">

        <MDBNav classicTabs color="orange" className="">
          <MDBNavItem active={activeItemClassicTabs3==="1"}>
            <MDBNavLink link to="#" active={activeItemClassicTabs3==="1"} onClick={() => toggleClassicTabs3("1")}>
              <MDBIcon icon="info" size="1x" />
              <br />
              Bridges
            </MDBNavLink>
          </MDBNavItem>

          <MDBNavItem>
            <MDBNavLink link  to="#" active={activeItemClassicTabs3==="3"} onClick={() => toggleClassicTabs3("3")}>
              <MDBIcon icon="project-diagram" size="1x" />
              <br />
              Projects
            </MDBNavLink>
          </MDBNavItem>
          <MDBNavItem>
            <MDBNavLink link  to="#" active={activeItemClassicTabs3==="4"} onClick={() => toggleClassicTabs3("4")}>
              <MDBIcon icon="users" size="1x" />
              <br />
              Processes
            </MDBNavLink>
          </MDBNavItem>
          <MDBNavItem>
            <MDBNavLink link  to="#" active={activeItemClassicTabs3==="5"} onClick={() => toggleClassicTabs3("5")}>
              <MDBIcon icon="users" size="1x" />
              <br />
              Organizations
            </MDBNavLink>
          </MDBNavItem>
          <div className="absolute-right d-flex" >
            <MDBNavItem >
              <MDBNavLink link to="#" active={activeItemClassicTabs3==="6"} onClick={() => toggleClassicTabs3("6")}
                >

                <span className='counter mt-2' >6</span>
                <MDBIcon icon="envelope" size="2x" className='mt-2' />

              </MDBNavLink>
            </MDBNavItem>
            <MDBNavItem className="" >
              <MDBNavLink link to="#" active={activeItemClassicTabs3==="7"} onClick={() => toggleClassicTabs3("7")}
                >

                <span className='counter mt-2' >22</span>
                <MDBIcon icon="calendar-alt" size="2x" className='mt-2' />

              </MDBNavLink>
            </MDBNavItem>

          </div>

        </MDBNav>

        <MDBTabContent className="card" activeItem={activeItemClassicTabs3}>
          {/* <MDBTabPane tabId="1">
          <Basic
            item={props.provider}
            updateItem={(data) => props.updateUser(data, props.provider.id)}
            dataType="provider"
            ></Basic>
          </MDBTabPane> */}
          <MDBTabPane tabId="1">
          {/* <Projects
            items={props.bridges}
            rootLink={props.match.url}
            onProjectClick={(orgId, bridgeId) => linkToBridgePage(orgId, bridgeId)}>

          </Projects> */}
          </MDBTabPane>
          <MDBTabPane tabId="2">

          </MDBTabPane>
          <MDBTabPane tabId="3">
            <div className='text-center mt-3 mb-5 d-flex justify-content-between'>
              <h4>
                <strong>John's projects</strong>
              </h4>
              <MDBBtn
                color='info'
                rounded
                className='ml-3'
                onClick={() => toggleModal('createProject')}
              >
                Submit new project <MDBIcon icon='image' className='ml-1' />
              </MDBBtn>
            </div>
            {/* <Form
              formType="projectForm"
              editMode="create"
              createFunction= {(data) => createNewProject(data)}
            ></Form> */}
            {/* <Projects></Projects> */}



          </MDBTabPane>
          <MDBTabPane tabId="4">

          <MDBSwitch
              checked={showUserProcesses}
              onChange={() => setsShowUserProcesses(!showUserProcesses)}
              labelLeft=""
              labelRight={`Show ${showUserProcesses ? 'process templates' : 'all processes'}`}
              />
            {/* {showUserProcesses?
             <AccordionTable
                data={props.projectsProcesses}
                rows={props.tasks}
                dataType="processes"
                // bridges={props.bridges}
                changePercentage={(task, value) => changeTaskPercentage(task, value)}
                changeDate={(task, value) => changeTaskDate(task, value)}
                />
             :
            <Processes
              provider={props.provider}
              />} */}

          </MDBTabPane>
          <MDBTabPane tabId="5">
            {/* <TableFilters
              dataType={'organizationsTable'}
              data={props.organizations}
              checkBoxFunction={(item) => console.log(item)}
              isChecked={(item) => {return false}}
              // providers={this.props.providers}
              tableName={'Organizations'}
              onRowClick={(id) => linkToOrgPage(id)}
            /> */}

              </MDBTabPane>
          <MDBTabPane tabId="6">
            {/* <TableFilters
              dataType={'messagesTable'}
              data={props.messages}
              // checkBoxFunction={(item) => this.addRemoveItem(item, task.dataType)}
              // isChecked={(item) => this.isItemInArray(item, task.dataType)}
              // providers={this.props.providers}
              tableName={'Messages'}
              onRowClick={(id) => console.log(id)}
            /> */}

              </MDBTabPane>
          <MDBTabPane tabId="7">
            <Calender />

          </MDBTabPane>
          </MDBTabContent>
      </div>
      <br></br>


    </div>
    );
}

const mapStateToProps = createStructuredSelector({
  // users: makeSelectUsers(),

  loading: makeSelectLoading(),
  error: makeSelectError(),
  // provider: makeSelectUser(),
  // // bridges: getUserBridges(),
  // bridges: makeSelectUserBridges(),
  // projects: makeSelectUserProjects(),
  // processes: makeSelectUserProcesses(),
  // processesTemplates: makeSelectUserProcessesTemplates(),
  // processesTasks: makeSelectUserProcessesTasks(),
  // organizations: makeSelectUserOrganizations(),
  // messages: makeSelectUserMessages(),
  // projectsProcesses: makeSelectUserProjectsProcesses(),
  // tasks: makeSelectUserTasks(),
  // provider_users: makeSelectUserUsers(),


});


const mapDispatchToProps = (dispatch) => {
  return {
    getUser: (userId) => dispatch(getUser(userId))

  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(UserPage);


