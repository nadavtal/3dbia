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
  allocateUserToOrg, updateRole, getProviderbyId, logout, findEntityBy, 
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
import MyWijmoDetailedTable from 'containers/MyTables/MyWijmoDetailedTable';
import SimpleTable from 'containers/MyTables/SimpleTable';
import styled from "styled-components";
const ActionsWrapper = styled.div`
position: absolute;
top: 1.4rem;
right: 8rem;
`;
const RolesManagement = ({
  currentUser,
  provider,
  providerUsers,
  uniqueProviderUsers,
  providerRoles,
  organizationsRolesByOrg,
  onCreateNewRole,
  onUpdateRole,
  roleTypes,
  currentUserRole,
  selectedOrganization,
  onToggleModal,
  onToggleAlert,
  onCreateUserConnection,
  onCreateUserAndConnection,
  onFindEntity,
  statuses,
  onToggleLoadingSpinner,
  onUpdateUserConnection
}) => {
    
  const [selected, setSelected] = useState(null)
  console.log(providerRoles)
  let allRoles = [...providerRoles, ...organizationsRolesByOrg];
  const handleSelected = (role) => {
    console.log(role)
    setSelected(role)
    // setshowActions(true)
  }
  const handleAction = (name, value) => {
    console.log(name, value);
    let url;
    switch (name) {
      case 'Create new role':
        onToggleModal({
          title: `Create new role `,
          text: 'Create new role for ' + provider.name,
          // confirmButton: 'Create',
          cancelButton: 'Cancel',
          formType: 'generalRoleForm',

          data: {
            editMode: 'Create',
            colWidth: 12,
            roleTypes: roleTypes,
          },
          confirmFunction: (data, event) => {
            console.log(data);
            data['provider_id'] = provider.id;

            data['type'] = 'General';
            data['role_type_id'] = 13;
            onCreateNewRole(data);
          },
        });
        break;
      case 'Edit role':
  
        console.log(roleTypes)
        onToggleModal({
          title: `Edit role`,
          // text: 'Choose role to allocate to users',
          // confirmButton: 'Create',
          cancelButton: 'Cancel',
          formType: 'providerRoleForm',

          data: {
            item: selected,
            roleTypes: roleTypes,
            editMode: 'Edit',
            colWidth: 12,
          },
          confirmFunction: (data, event) => {
            console.log(data)
            const roleType = roleTypes.find(rt => rt.id == data.role_type_id)
            console.log(roleType)
            let updatedRole = {...selected, ...data}
            updatedRole.type = roleType.name
            console.log(updatedRole)
            onUpdateRole(updatedRole);
          },
        });
        break
      case 'Deactivate role':
        onToggleAlert({
          title: `Deactivate ${selected.name}?`,
          text: `This operation will allocate existing ${selected.name} roles to "General role"`,
          confirmButton: 'Deactivate',
          cancelButton: 'Cancel',
          alertType: 'danger',
          confirmFunction: () => {
            const updatedRole = {...selected}
            updatedRole.visibility = 'Inactive';
            onUpdateRole(updatedRole);
          }
        });
      default:
        break;
    }
  };
  const Actions = () => {

    return (
      <div className="mt-2 d-flex">

        <IconButtonToolTip
          className=""
          iconClassName="colorPrimary"
          size="sm"
          iconName="trash"
          toolTipType="info"
          toolTipPosition="left"
          toolTipEffect="float"
          toolTipText={`Deactivate role`}
          onClickFunction={() => handleAction('Deactivate role')}
        />
        {/* <IconButtonToolTip
          className="mx-3"
          iconClassName="colorPrimary"
          size="sm"
          iconName="plus"
          toolTipType="info"
          toolTipPosition="left"
          toolTipEffect="float"
          toolTipText="Add role"
          onClickFunction={() =>
            handleAction('Add role')
          }
        /> */}
        <IconButtonToolTip
          className="mx-3"
          iconClassName="colorPrimary"
          size="sm"
          iconName="edit"
          toolTipType="info"
          toolTipPosition="left"
          toolTipEffect="float"
          toolTipText="Edit role"
          onClickFunction={() =>
            handleAction('Edit role')
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
  // console.log(allRoles)
  allRoles.map(role => role['organization name'] = role.orgName ? role.orgName : role.provName ? role.provName : 'In-house')
  const table = useMemo(
    () => (
      <SimpleTable
        // style={scrollContainerStyle}
        className="maxHeight65vh"
        data={sortBy('id', allRoles)}
        // dataService={new DataService()}
        exportService={new ExportService()}
        onRowClick={selectedItems => handleSelected(selectedItems)}
        multiSelectionMode={false}
        selectionMode="Row"
        tableConfig={{
          exludesFields: [
            'id',
            'organization_id',
            'user_id',
            'provider_id',
            'role_id',
            'profile_image',
            'confirmation_token',
            'role_type_id',
          ],

          editableFields: [],
          longFields: [
            'name',
            'description',
            'type',
            'visibility',
            'organization name',
          ],
          dateFields: ['date_created'],
          // fixedColumns: 3,
          wholeNumberFields: [],
          decimelNumberFields: [],
          groups: [],
          frozenColumns: 1,
          showSearch: true,
          showExport: true,
          // groupHeaderFormat: `<b>{value}</b> ({count:n0} roles)`,
          hideGroupPanel: true,
        }}
      />
    ),
    allRoles,
  );
  return (
    <>
      {selected && selected['organization name'] == 'In-house' && (
        <ActionsWrapper className="">
          <Actions />
        </ActionsWrapper>
      )}
      {table}
    </>
  );

}

const mapStateToProps = createStructuredSelector({
  currentUser: makeSelectCurrentUser(),
  provider: makeSelectProvider(),
  organizations: makeSelectProviderOrganizations(),
  providerUsers: makeSelectProviderUsers(),
  uniqueProviderUsers: makeSelectUniqueProviderUsers(),
  providerRoles: makeSelectProviderRoles(),
  organizationsRolesByOrg: makeSelectOrganizationRolesByOrg(),
  organizationsUsersByOrg: makeSelectOrganizationUsersByOrg(),
  roleTypes: makeSelectRoleTypes(),
  currentUserRole: makeSelectCurrentUserRole(),
  selectedOrganization: makeSelectSelectedOrganization(),
  statuses: makeSelectGeneralUserStatuses(),
  roleTypes: makeSelectRoleTypes()
});


const mapDispatchToProps = (dispatch) => {
  return {
    onToggleModal: (modalData) => {dispatch(toggleModal(modalData))},
    onToggleAlert: alertData => dispatch(toggleAlert(alertData)),
    onCreateNewRole: (data) => dispatch(createNewRole(data)),
    onUpdateRole: (role) => dispatch(updateRole(role)),
    onCreateUserAndConnection: (newUser, provider, org) => dispatch(createUserAndConnection(newUser, provider, org)),
    onCreateUserConnection: (userConnectionData) => dispatch(createUserConnection(userConnectionData)),
    onUpdateUserConnection: (users) => dispatch(updateUserConnection(users)),
    onAllocateUser: (newProviderUser) => dispatch(actions.allocateUser(newProviderUser)),
    onCreateNewProviderUserAndOrganizationUser: (newUser, organization, provider) => dispatch(createNewProviderUserAndThenAllocateToOrganization(newUser, organization, provider)),
    onAllocateUserToOrg: (user, org, role_id, roleName, remarks, provider_id) => dispatch(allocateUserToOrg({user, org, role_id, roleName, remarks, provider_id})),
    onFindEntity: (type, value) => dispatch(findEntityBy(type, value)),
    onToggleLoadingSpinner: (msg) => dispatch(toggleLoadingSpinner(msg)),
    onSetSelectedComponent: componentName => dispatch(setSelectedComponent(componentName))
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(RolesManagement);



