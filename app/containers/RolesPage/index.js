import React, { Component } from 'react';
import ToolBar from '../../components/ToolBar/ToolBar';
import ButtonsSection from '../../components/ToolBar/ButtonsSection/ButtonsSection';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';
import * as actions  from './actions';
import { toggleModal } from '../App/actions'
import { makeSelectRoles, makeSelectPermissions } from './selectors';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from 'utils/injectReducer';
import reducer from './reducer';
import Input from '../../components/Input/Input';
import ActionRow from '../../components/ActionRow/ActionRow';
import IconButtonToolTip from '../../components/IconButtonToolTip/IconButtonToolTip'

const key = 'roles';

class RolesPage extends Component {

  state = {
    selectedRole: '',
    permissions: [],
    newRole: '',
    roleInput: '',
    permissionInput: '',
    roles: []
  }

  onSearchRole = (e) => {
    // console.log(e.target.value)
    this.setState({ roleInput: e.target.value })
  }
  onSearchPermission = (e) => {

    this.setState({ permissionInput: e.target.value })
  }

  onSelectRole = (name) => {
    this.setState({ selectedRole: name })
  }



  toggleAddRoleModal = () => {

    console.log(this.props.permissions);
    this.props.onToggleModal({
      title: 'Adding role',
      text: 'Please confim adding role: '+ this.state.roleInput,
      confirmButton: 'Add',
      cancelButton: 'Cancel',
      options: {
        buttonText: 'Add permissions',
        options: this.props.permissions,
      },
      confirmFunction: () => this.props.onAddRole(this.state.roleInput)
    });

  }

  toggleAddPermissionModal = () => {

    console.log(this.props.permissions);
    this.props.onToggleModal({
      title: 'Adding permission?',
      text: 'Please confim adding permission: '+ this.state.permissionInput,
      confirmButton: 'Add',
      cancelButton: 'Cancel',
      options: {
        buttonText: 'Add roles',
        options: this.props.roles,
      },
      confirmFunction: () => this.props.onAddPermission(this.state.permissionInput, this.state.selectedRole)
    });

  }



  render () {

    return (
      <div >
        <ToolBar position="topToolBar">
            {/* <a data-tip data-for='happyFace'>
              <FontAwesomeIcon icon="plus" />
            </a>
            <ReactTooltip id='happyFace' type='info' place="bottom" effect="float">
              <span>Show happy face</span>
            </ReactTooltip> */}

            <FontAwesomeIcon icon="minus" />
            <FontAwesomeIcon icon="edit" />
        </ToolBar>
        <div className="tableHeaders row">
          <div className="col-6">
            <div className="d-flex flex-row justify-content-between align-items-center">
              <h2>Roles</h2>
              <ButtonsSection displayClass="d-flex align-items-center">
                <IconButtonToolTip
                  iconName="plus"
                  toolTipType="info"
                  toolTipPosition="bottom"
                  toolTipEffect="float"
                  toolTipText="Add new role"
                  onClickFunction={() => this.toggleAddRoleModal()}/>
                <Input
                  elementtype='input'
                  elementconfig={{type: 'text', placeholder: 'Add/Search roles'}}
                  value={this.state.roleInput}
                  changed={(event) => this.onSearchRole(event)}
                  invalid={true}
                  shouldValidate={true}
                  touched={false}
                  errMsg='Please enter role name'
                ></Input>

              </ButtonsSection>

            </div>
          </div>
          <div className="col-6">
            <div className="d-flex flex-row justify-content-between align-items-center">
              <h2>Permissions</h2>
              <ButtonsSection displayClass="d-flex align-items-center">
              <IconButtonToolTip
                  iconName="plus"
                  toolTipType="info"
                  toolTipPosition="bottom"
                  toolTipEffect="float"
                  toolTipText={this.state.selectedRole? "Add new permission to " + this.state.selectedRole : "Add new permission"}
                  onClickFunction={() => this.toggleAddPermissionModal()}/>
                <Input
                  elementtype='input'
                  elementconfig={{type: 'text', placeholder: 'Search permissions'}}
                  value={this.state.permissionInput}
                  changed={(event) => this.onSearchPermission(event)}
                  invalid={true}
                  shouldValidate={true}
                  touched={false}
                  errMsg='Please enter role name'
                ></Input>
                {/* <input
                  id="permissionInput"
                  value={this.state.permissionInput}
                  onChange={this.onSearchPermission}>
                </input> */}
              </ButtonsSection>

            </div>
          </div>

        </div>
        <div className="row">
          <div className="col-6">
            {this.props.roles.map(role => {
              return (
                <ActionRow
                  key={role.id}
                  text={role.name}
                  onTextClick={() => this.onSelectRole(role.name)}
                  actions={[
                    { iconName: 'minus',
                      function:  () => this.props.onDeleteRole(role.name)
                    },
                    // { iconName: 'edit',
                    //   function:  () => this.props.onUpdateRole(role.name)
                    // },
                  ]} />
                )
            })}
          </div>
          <div className="col-6">
            {this.props.permissions.map(permission => {
              if (this.state.selectedRole === ''){
                return (
                  <ActionRow
                  key={permission.id}
                  text={permission.name}
                  actions={[
                    { iconName: 'minus',
                      function:  () => this.props.onDeletePermission(permission.name)
                    },
                    { iconName: 'edit',
                      function:  () => console.log('clicked')
                    },
                  ]} />
                //   <div className="optionsRow d-flex justify-content-between" key={permission.id} >
                //       <div >{permission.name}</div>
                //       <div className="optionsRow__buttons">
                //         <FontAwesomeIcon className="m-1" icon="minus"/>
                //         <FontAwesomeIcon className="m-1" icon="edit"/>
                //       </div>
                //  </div>
                )
              }
              for (let role of permission.roles){
                if(role === this.state.selectedRole){
                  return (
                    <div className="optionsRow d-flex justify-content-between" key={permission.id} >
                      <div >{permission.name}</div>
                      <div className="optionsRow__buttons">
                        <FontAwesomeIcon className="m-1" icon="minus"/>
                        <FontAwesomeIcon className="m-1" icon="edit"/>
                      </div>
                    </div>
                  )
                }
              }

            })}
          </div>
        </div>
      </div>
    )
  }
}

// const mapStateToProps = createStructuredSelector({
//   // currentUser: makeSelectCurrentUser(),
//   // users: makeSelectUsers(),
//   roles: makeSelectRoles(),
//   permissions: makeSelectPermissions(),
//   // loading: makeSelectLoading(),
//   // error: makeSelectError(),
// });

const mapStateToProps = state => {

  return {
    roles: state.rolesReducer.roles,
    permissions: state.rolesReducer.permissions,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAddRole: (newRole) => dispatch(actions.addRole(newRole)),
    // onUpdateRole: (updatedRole) => dispatch(actions.updateRole(updatedRole)),
    onDeleteRole: (name) => dispatch(actions.deleteRole(name)),
    onSearchRole: (searchTerm) => dispatch(actions.searchRole(searchTerm)),
    onAddPermission: (newPermission, role) => dispatch(actions.addPermission(newPermission, role)),
    onDeletePermission: (name) => dispatch(actions.deletePermission(name)),
    onSearchPermission: (searchTerm) => dispatch(actions.searchPermissions(searchTerm)),
    onToggleModal: (modalData) => dispatch(toggleModal(modalData))
    // openModal: (modalData) => dispatch()
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RolesPage)
