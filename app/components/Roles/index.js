import React, {useState, useEffect} from 'react';
import RoleRow from '../RoleRow';
import UserRow from '../UserRow/UserRow'
import TableHeader from '../TableHeader';
import { MDBIcon } from 'mdbreact';
import { getRolesByUserId, getAvailableRolesByUserId, sortBy } from 'utils/dataUtils';
import TableRowWrapper from "../TableRow";
import Status from 'components/Status';

const Roles = ({ roles, type, users, handleAction, handleChecked }) => {

  const [activeFilter, setActiveFilter] = useState('first_name');
  const [reverse, setReverse] = useState(false);
  
  const SortTableHeaderItem = ({name, field}) => {

    return <div
      onClick={() => handleActiveFilter(field)}>
      {name}
      <MDBIcon 
        // rotate={active == item.name ? '180' : ''} 
        icon={'sort'} size="1x" className="float-right mt-1" 
        />
    </div>
  }

  const handleActiveFilter = (field) => {
    if (field !== activeFilter) {
      setReverse(false)
      setActiveFilter(field)
    } else {
      setReverse(!reverse)
    }
  }
  // console.log(roles);
  // console.log(users);
  let actions = []
  switch (type) {
    case 'roles':
      console.log(roles)
      roles.map(role => role['companyName'] = role.orgName ? role.orgName : role.provName ? role.provName : 'In-house')
      roles = sortBy(activeFilter, roles, reverse)
      return (
        <div className="toggled">
          <TableHeader className="row text-center py-1">
            <div className="col-2 text-left">
            <SortTableHeaderItem name="Role name" field={'name'}/>
            </div>
            <div className="col-2">
            <SortTableHeaderItem name="Company name" field={'companyName'}/>
              </div>
            <div className="col-3">description</div>
            <div className="col-2">
            <SortTableHeaderItem name="Type" field={'type'}/>
            </div>
            <div className="col-1" >
              <SortTableHeaderItem name="Visibility" field={'visibility'}/>
            </div>
    
            <div className="col-2">
              {/* <Actions 
          actions={actions[activeItemClassicTabs3].ifSelectedActions}
        /> */}
              {/* <PopperMenu 
          actions={actions[activeItemClassicTabs3].ifSelectedActions}
          bgColor={'peach'}
          // selectedUser={selectedUser}
          handleAction={(actionName, val) => handleAction(actionName, val)}
          /> */}
            </div>
          </TableHeader>
          {roles.map((role, index) => (
            <RoleRow className="" key={index} role={role} />
          ))}
        </div>
      );
    case 'userRoles':
      
      // roles.map(role => role['companyName'] = role.org_name ? role.org_name : role.provider_name ? role.provider_name : 'In-house')
      roles = sortBy(activeFilter, roles, reverse)
      console.log(roles)
      return (
        <div className="toggled">
          <TableHeader className="row text-center py-1">
            <div className="col-2 text-left">
              <SortTableHeaderItem name="Role name" field={'role_name'} />
            </div>
            <div className="col-2">
              <SortTableHeaderItem
                name="Organization"
                field={'org_name'}
              />
            </div>
            <div className="col-2">
              <SortTableHeaderItem
                name="Provider"
                field={'provider_name'}
              />
            </div>
            <div className="col-2">remarks</div>
            <div className="col-2">
              <SortTableHeaderItem name="Type" field={'role_type'} />
            </div>
            {/* <div className="col-1" >
              <SortTableHeaderItem name="Visibility" field={'visibility'}/>
            </div> */}

            <div className="col-2">Status</div>
          </TableHeader>
          {roles.map((role, index) => (
            <TableRowWrapper
              className="row py-1 text-center tableRow"
              key={index}
            >
              <div className="col-2">{role.role_name}</div>
              <div className="col-2">{role.org_name ? role.org_name : ''}</div>
              <div className="col-2">{role.provider_name ? role.provider_name : ''}</div>
              <div className="col-2">{role.remarks}</div>
              <div className="col-2">{role.role_type}</div>
              <div className="col-2">
                {role.status}
                {/* <Status statusName={role.status} /> */}
              </div>
            </TableRowWrapper>
          ))}
        </div>
      );
    case 'users':
      users = sortBy(activeFilter, users, reverse)
      // console.log(roles)
      actions = [
        { name: `Switch roles`, icon: 'random', type: 'info', selectOptionsType: 'role'},
        { name: `Change status`, icon: 'sync', type: 'info', selectOptionsType: 'status'},
        { name: `Update role`, icon: 'sync', type: 'info'},
        { name: `Delete role`, icon: 'trash', type: 'error', confirmationMessageType: 'danger', confirmationMessage: 'Are you sure you want to delete '},
      ]
      return (
        <div className="toggled">
          <TableHeader className="row py-1">
            <div className="col-2 text-left">
              <SortTableHeaderItem name="Name" field="first_name" />
            </div>
            <div className="col-2">
              <SortTableHeaderItem name="Email" field="email" />
            </div>
            <div className="col-3">Remarks</div>
            <div className="col-1">
              <SortTableHeaderItem
                name="Create at"
                field="date_created"
              />
            </div>
            <div className="col-2">
              <SortTableHeaderItem name="Status" field={'status'} />
            </div>
            <div className="col-2">
       
            </div>
          </TableHeader>
          {users.length &&
            users.map((user, index) => (
              <UserRow
                key={index}
                className=""
                index={index}
                roles={roles}
                key={index}
                user={user}
                actions={actions}
                type="simple"
                statusesType="connectionStatuses"
                // handleAction={(actionName, val) => handleAction(actionName, val)}
              />
            ))}
        </div>
      );
    case 'inhouseUsers':
      // console.log(users)
      // console.log(activeFilter)
      users = sortBy(activeFilter, users, reverse)
      actions = [
        { name: `Switch roles`, icon: 'random', type: 'info', selectOptionsType: 'role'},
        { name: `Change status`, icon: 'sync', type: 'info', selectOptionsType: 'status'},
        { name: `Update role`, icon: 'sync', type: 'info'},
        { name: `Delete role`, icon: 'trash', type: 'error', confirmationMessageType: 'danger', confirmationMessage: 'Are you sure you want to delete '},
      ]
      return (
        <div className="toggled">
          <TableHeader className="row py-1">
            <div className="col-2 text-left">
              <SortTableHeaderItem  name="Name" field="first_name"/>
            </div>
            <div className="col-2">
            <SortTableHeaderItem name="Role name" field="roleName"/>
            </div>
            <div className="col-2">description</div>
            <div className="col-2">Remarks</div>
            <div className="col-1">
              <SortTableHeaderItem name="Create at" field="date_created"/>
            </div>
            <div className="col-1"><SortTableHeaderItem name="Status" field={'status'}/></div>
            <div className="col-1">
              {/* <Actions 
          actions={actions[activeItemClassicTabs3].ifSelectedActions}
        /> */}
              {/* <PopperMenu 
          actions={actions[activeItemClassicTabs3].ifSelectedActions}
          bgColor={'peach'}
          // selectedUser={selectedUser}
          handleAction={(actionName, val) => handleAction(actionName, val)}
          /> */}
            </div>
          </TableHeader>
          {users.length && users.map((user, index) => {
            // console.log(activeFilter)
            return <UserRow 
              className=""
              roles={roles} 
              key={index} 
              user={user}
              actions={actions} 
              type="extended"
              statusesType="connectionStatuses"
              // handleAction={(actionName, val) => handleAction(actionName, val)}
              />
        })}
        </div>
      );
    case 'providerUsers':
      
      users = sortBy(activeFilter, users, reverse)
      return (
        <div className="toggled">
          <TableHeader className="row py-1">
            <div className="col-2 text-left">
              <SortTableHeaderItem name="Name" field="first_name" />
            </div>
            <div className="col-1">
              <SortTableHeaderItem name="Provider" field="companyName" />
            </div>
            <div className="col-2">
              <SortTableHeaderItem name="Role name" field="roleName" />
            </div>
            <div className="col-2">description</div>
            <div className="col-2">Remarks</div>
            <div className="col-1">
              <SortTableHeaderItem
                name="Created at"
                field="date_created"
              />
            </div>
            <div className="col-1">
              <SortTableHeaderItem name="Status" field="status" />
            </div>
            <div className="col-1">
              {/* <Actions 
        actions={actions[activeItemClassicTabs3].ifSelectedActions}
      /> */}
              {/* <PopperMenu 
        actions={actions[activeItemClassicTabs3].ifSelectedActions}
        bgColor={'peach'}
        // selectedUser={selectedUser}
        handleAction={(actionName, val) => handleAction(actionName, val)}
        /> */}
            </div>
          </TableHeader>
          {users.map((user, index) => {
            return (
              <UserRow
                className=""
                roles={roles}
                key={index}
                user={user}
                actions={actions}
                type="extended"
                statusesType="connectionStatuses"
                // handleAction={actionName => handleAction(actionName)}
              />
              // <OrgProviderUserRow
              //   className=""
              //   key={index}
              //   role={role}
              // />
            );
          })}
        </div>
      );
    case 'organizationUsers':
      // console.log(users)
      users = sortBy(activeFilter, users, reverse)
      actions = [
        { name: `Switch roles`, icon: 'random', type: 'info', selectOptionsType: 'role'},
        { name: `Change status`, icon: 'sync', type: 'info', selectOptionsType: 'status'},
        { name: `Update role`, icon: 'sync', type: 'info'},
        { name: `Delete role`, icon: 'trash', type: 'error', confirmationMessageType: 'danger', confirmationMessage: 'Are you sure you want to delete '},
      ]
      return (
        <div className="toggled">
          <TableHeader className="row py-1">
            <div className="col-2 text-left">
              <SortTableHeaderItem name="Name" field="first_name"/>
            </div>
            <div className="col-1">
              <SortTableHeaderItem name="Organization" field={'companyName'}/>
            </div>
            <div className="col-2">
              <SortTableHeaderItem name="Role" field={'roleName'}/>
            </div>
            <div className="col-2">description</div>
            <div className="col-2">Remarks</div>
            <div className="col-1">
             <SortTableHeaderItem name="Create at" field={'date_created'}/>
            </div>
            <div className="col-1">
            <SortTableHeaderItem name="Status" field={'status'}/>
            </div>
            <div className="col-1">
              {/* <Actions 
        actions={actions[activeItemClassicTabs3].ifSelectedActions}
      /> */}
              {/* <PopperMenu 
        actions={actions[activeItemClassicTabs3].ifSelectedActions}
        bgColor={'peach'}
        // selectedUser={selectedUser}
        handleAction={(actionName, val) => handleAction(actionName, val)}
        /> */}
            </div>
          </TableHeader>
          {users.map((user, index) => { 
 
            const userRoles = getRolesByUserId(user.user_id, users, roles);
            const availableRoles = getAvailableRolesByUserId(roles, userRoles) 
            // console.log(availableRoles)       
            return (
              <UserRow
                className=""
                roles={availableRoles}
                key={index}
                user={user}
                actions={actions}
                type="extended"
                index={index}
                handleChecked={user => handleChecked(user)}
                statusesType="connectionStatuses"
              />
              // <OrgProviderUserRow
              //   className=""
              //   key={index}
              //   role={role}
              // />
            );
          })}
        </div>
      );
    // case 'organizationRoles':
    //   return (
    //     <div className="toggled">
    //       <TableHeader className="row py-1">
    //         <div className="col-2">Role name</div>
    //         <div className="col-2">Organization</div>
    //         <div className="col-3">description</div>
    //         <div className="col-2">Type</div>
    //         <div className="col-2" />

    //         <div className="col-1" />
    //       </TableHeader>
    //       {roles.map((role, index) => (
    //         <RoleRow className="" key={index} role={role} />
    //       ))}
    //       })}
    //     </div>
    //   );
      
  
    default:
      return null;
  }

};

export default Roles;
