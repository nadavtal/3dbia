import React, { memo, useState, useEffect } from 'react';
import { useHistory} from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { getRoleById, getOrganizationUser } from 'utils/dataUtils'
import {
  makeSelectCurrentUser,
  makeSelectGeneralUserStatuses,
  makeSelectCurrentUserRole
} from 'containers/App/selectors';
import { MDBIcon, MDBBtn, MDBAvatar } from 'mdbreact';
import { toggleAlert, toggleModal } from 'containers/App/actions';
import { updatedUser, uploadFile } from 'containers/AppData/actions';
import IconButtonToolTip from '../IconButtonToolTip/IconButtonToolTip'
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Status from 'components/Status';
import FilesUploadComponent from 'components/FilesUploadComponent'

import './UserInfoBox.css'


function UserInfoBox({
  currentUser,
  organization,
  company,
  statuses,
  history = useHistory(),
  onToggleModal,
  handleAction,
  onUpdatedUser,
  onUploadImage,
  currentUserRole
}) {
  
  const [editMode, setEditMode] = useState(false);
  // const [status, setStatus] = useState(statuses[currentUser.userInfo.general_status])
  useEffect(() => {
    // setStatus(statuses[currentUser.userInfo.general_status])
  }, [currentUser])
  useEffect(() => {
    // console.log('organization', organization)
  }, [currentUserRole])


  const onHandleAction = (actionName, val) => {
    // console.log(actionName, val)
    switch (actionName) {
      case 'Edit user info':
        handleAction();
        editProfile();
        
        break
      case 'Show user info':
        handleAction();
        showProfile();
        
        break
      case 'Upload image':
        console.log(val)
        break
      default:
        break
    }

  }
  const editProfile = () => onToggleModal({
    title: 'Edit profile info',
    text: '',
    // confirmButton: 'Create',
    cancelButton: 'Cancel',
    data: {
      editMode: 'edit',
      item: currentUser.userInfo
    },
    colWidth: 6,
    formType:'userForm',
    confirmFunction: (data) => {
      console.log(data)
      data['general_status'] = 'Active'
      onUpdatedUser(data)
      // onUploadImage(data.user_image[0])
      
    },
  })
  const showProfile = () => onToggleModal({
    title: `${currentUser.userInfo.first_name} ${currentUser.userInfo.last_name} info` ,
    text: '',
    // confirmButton: 'Create',
    cancelButton: 'Close',
    body : <UserRolesInfo />,
    confirmButton: 'Switch roles',
    confirmFunction: () => {
      onToggleModal()
      history.push('/')
    }
  })
  const linkToProfilePage = () => {
    history.push('/users/'+currentUser.userInfo.id)
  }
  // const editProfile = () => {
  //   history.push('/users/'+currentUser.userInfo.id)
  // }
  const Wrapper = styled.div`
    height: 9.5rem;
    position: relative;
    padding: .7rem;
    font-size: .8rem;
    color: white;
  `

  const image = currentUser.userInfo.profile_image
  const UserRolesInfo = () => {

    return <div>
      {currentUser.userOrganiztionRoles && currentUser.userOrganiztionRoles.length ? <>
        <h5>Organizations</h5>
          {currentUser.userOrganiztionRoles.map(role => {
            // const org = 
            return <div key={role.role_id}>{`${role.org_name} - ${role.role_name}`}</div>})
          }
      
      </>: ''}
      {currentUser.userProviderRoles && currentUser.userProviderRoles.length ? <>
        <h5 className="mt-3">Providers</h5>
          {currentUser.userProviderRoles.map(role => {
              // const org = 
              return <div key={role.role_id}>{`${role.provider_name} - ${role.role_name}`}</div>})
            }

      </>: ''}
    </div>
  }
  return (
    <Wrapper

      className={`bgPrimaryLight`}
    >
      <div className="text-left">
        <div className="d-flex align-items-center mb-2">
          <MDBAvatar
            tag="img"
            src={
              image && image !== 'undefined'
                ? image
                : require(`../../images/LOGIN.jpg`)
            }
            alt="User Photo"
            className="z-depth-1"
          />

          <div>
            <div className="bold userInfoBoxTitle ml-2">
              {currentUser.userInfo.first_name +
                ' ' + 
                currentUser.userInfo.last_name}
            </div>
            {/* {console.log(currentUser)} */}
            <div className="text-center">
              {currentUser.userInfo.general_status && <Status statusName={currentUser.userInfo.general_status} />}
            </div>
          </div>
        </div>
        {currentUserRole.org_name && (
          <div>
            <span className="bold">Organization: </span> {currentUserRole.org_name}
          </div>
        )}
        {currentUserRole.provider_name && (
          <div>
          <span className="bold">Provider:</span> {currentUserRole.provider_name}
        </div>
        )}

        {/* {organization ? (
          <>
            <div>
              <span className="bold">Organization: </span> {organization.name}
            </div>
            <div>
              <span className="bold">Provider:</span> {company.name}
            </div>
          </>
        ) : (
          company && (
            <div>
              <span className="bold">Organization:</span> {company.name}
            </div>
          )
        )} */}

        {/* {organization && (
          <div>
            <span className="bold">Organization: </span> {organization.name}
          </div>
        )}
        {company && (
          <div>
            <span className="bold">Provider:</span> {company.name}
          </div>
        )} */}
        <div>
          <span className="bold"> Role: </span>
          {currentUserRole.role_name}
        </div>
      </div>
     
    </Wrapper>
  );
}

UserInfoBox.propTypes = {
  currentUser: PropTypes.any,
};
const mapStateToProps = createStructuredSelector({
  currentUser: makeSelectCurrentUser(),
  currentUserRole: makeSelectCurrentUserRole(),
  statuses: makeSelectGeneralUserStatuses(),
});

const mapDispatchToProps = dispatch => {
  return {
    onToggleAlert: alertData => dispatch(toggleAlert(alertData)),
    onToggleModal: modalData => dispatch(toggleModal(modalData)),
    onUpdatedUser: user => dispatch(updatedUser(user)),
    onUploadImage: file => dispatch(uploadFile(file)),
  };
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(UserInfoBox);
