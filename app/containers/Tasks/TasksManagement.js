import React, {useState, memo, useEffect, useMemo} from "react";
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { getRolesByUserId, getAvailableRolesByUserId, getOrgById, getRoleById, searchBy, sortBy } from 'utils/dataUtils'
import { makeSelectLoading, makeSelectError, makeSelectCurrentUser,
  makeSelectRoleTypes, makeSelectCurrentUserRole, makeSelectShowChat,
  makeSelectMenuItem, makeSelectGeneralUserStatuses
} from 'containers/App/selectors';
import { ExportService } from 'containers/Wijmo/export';
import {makeSelectProvider,
    makeSelectProviderOrganizations,
    makeSelectProviderUsers,
    makeSelectProviderRoles,
    makeSelectOrganizationUsers,
    makeSelectOrganizationUsersByOrg,
    makeSelectSelectedOrganization,
    makeSelectOrganizationRolesByOrg,
    makeSelectSelectedComponent,
    makeSelectUniqueProviderUsers
} from './selectors'
import { toggleModal, toggleAlert, toggleLoadingSpinner } from 'containers/App/actions';
import { updateTask, createNewRole, createUserAndConnection, createUserConnection, updateUserConnection, registerNewOrgUser,
  allocateUserToOrg, updateProvider, getProviderbyId, logout, findEntityBy, 
  createNewProviderUserAndThenAllocateToOrganization, updatedUser,
   } from 'containers/AppData/actions';
import { setSelectedComponent } from './actions'
import Roles from 'components/Roles';
import { MDBBtn, MDBIcon } from 'mdbreact'
import IconButtonToolTip from 'components/IconButtonToolTip/IconButtonToolTip';
import PageHeader from 'components/PageHeader/PageHeader';
import Menu from 'containers/Management/Menu'
import Layout from 'containers/Management/Layout';
import MyWijmoCheckBoxTable from 'containers/MyTables/MyWijmoCheckBoxTable';
import GroupedTable from 'containers/MyTables/GroupedTable';
import MyWijmoDetailedTable from 'containers/MyTables/MyWijmoDetailedTable';
import SimpleTable from 'containers/MyTables/SimpleTable';
import styled from "styled-components";
const ActionsWrapper = styled.div`
position: absolute;
top: 1.1rem;
right: 9rem;
// width: 10rem;
`;
const TasksManagement = ({
  tasks
}) => {
    
  const [selected, setSelected] = useState(null)
  
  const handleSelected = (tasks) => {
    console.log(tasks)
    setSelected(tasks)
    // setshowActions(true)
  }
  const handleCheckboxClick = selectedItems => {
    console.log(selectedItems)
    setSelected(selectedItems)
    // console.log(task);
    // if (selection.includes(task))
    //   setSelection(selection.filter(item => item !== task));
    // else setSelection([...selection, task]);
  };

  const Actions = () => {

    return (
      <div className="mt-2 d-flex">
        {/* <MDBBtn>
        Add
        <MDBIcon icon="plus"/>
      </MDBBtn> */}
        <IconButtonToolTip
          className=""
          iconClassName="colorPrimary"
          size="sm"
          iconName="user-tag"
          toolTipType="info"
          toolTipPosition="left"
          toolTipEffect="float"
          toolTipText={`Add role to users`}
          onClickFunction={() => handleAction('Add role to users')}
        />
        <IconButtonToolTip
          className="mx-3"
          iconClassName="colorPrimary"
          size="sm"
          iconName="envelope"
          toolTipType="info"
          toolTipPosition="left"
          toolTipEffect="float"
          toolTipText="Send message"
          onClickFunction={() =>
            handleAction('Send message')
          }
        />
        <IconButtonToolTip
          className=""
          iconClassName="colorPrimary"
          size="sm"
          iconName="edit"
          toolTipType="info"
          toolTipPosition="left"
          toolTipEffect="float"
          toolTipText="Update user role"
          onClickFunction={() =>
            handleAction('Edit user role')
          }
        />
      </div>
    );
  }
  const scrollContainerStyle = {
    width: "100%", 
   //  maxHeight: `calc(100vh)-${theme.layout.topBarSize}`, 
    maxHeight: `50vh`, 
    overFlowY: 'auto',
    overFlowX: 'auto'
   };

  return (
    <>
      {selected && (
        <ActionsWrapper className="">
          <Actions />
        </ActionsWrapper>
      )}
      <GroupedTable 
        data={tasks}
        className="maxHeight65vh"
        tableConfig={{
          exludesFields: [
            'id',
            'user_id',
            'provider_id',
            'role_id',
            'profile_image',
            'confirmation_token',
            'role_type_id',
            'organization_id',
            'task_inputs',
            'sub_tasks_names',
            'sub_tasks_dates',
            'sub_tasks_remarks',
            'sub_tasks_file_types',
            'bridge_image_url',
            'lot',
            'lat',
            'x',
            'y',
            'bridge_bid',
            'bridge_primary_model_id'
          ],

          editableFields: [],
          longFields: ['remarks', 'description', 'email'],
          dateFields: ['date_created', 'due_date'],
          // fixedColumns: 3,
          wholeNumberFields: ['bid', 'survey_id', 'completed'],
          decimelNumberFields: ['bridge_lat', 'bridge_lon', ],
          groups: ['bridge_name', 'survey_name'],
          frozenColumns: 3,
          groupHeaderFormat: `<b>{value}</b> ({count:n0} tasks)`,
          hideGroupPanel: true,
          allowPinning: false,
          selectionMode: "RowRange",
          showSearch: true,
          allowDragging: false
          // 
        }}
        onRowClick={selectedItems => handleSelected(selectedItems)}
        />
      {/* <MyWijmoCheckBoxTable
        // style={scrollContainerStyle}
        className="maxHeight65vh"
        data={providerUsers}
        // dataService={new DataService()}
        exportService={new ExportService()}
        handleCheckboxClick={selectedItems => handleSelected(selectedItems)}
        multiSelectionMode={false}
        selected={selected}
        // selectedItems={selection}
        tableConfig={{
          exludesFields: [
            'user_id',
            'provider_id',
            'role_id',
            'profile_image',
            'confirmation_token',
            'role_type_id',
          ],

          editableFields: [],
          longFields: ['remarks', 'description', 'full_name'],
          dateFields: ['date_created'],
          // fixedColumns: 3,
          wholeNumberFields: [],
          decimelNumberFields: [],
          groups: ['user_id'],
          frozenColumns: 1,
          groupHeaderFormat: `<b>{value}</b> ({count:n0} roles)`,
          hideGroupPanel: true,
        }}
      /> */}
    </>
  );

}

const mapStateToProps = createStructuredSelector({
  currentUser: makeSelectCurrentUser(),
  
  
//   roleTypes: makeSelectRoleTypes()
});


const mapDispatchToProps = (dispatch) => {
  return {
    onToggleModal: (modalData) => {dispatch(toggleModal(modalData))},
    onToggleAlert: alertData => dispatch(toggleAlert(alertData)),
    
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(TasksManagement);



