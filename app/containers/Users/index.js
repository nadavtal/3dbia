import React, { useEffect, memo } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { useHistory , Link } from 'react-router-dom';

import {  MDBRow, MDBCol, MDBCard, MDBAvatar, MDBBadge, MDBIcon } from "mdbreact";

import './Users.css';

import Input from '../../components/Input/Input';
import DataTable from '../../components/DataTable/DataTable';
const key = 'usersPage';


export function UsersPage({
  onCreateUser,
  onDeleteUser,
  onUpdateUser,
  history = useHistory(),
  linkToUserPage,
  users,
  provider

}) {

  useEffect(() => {

    // console.log(users)
  }, [users]);

  linkToUserPage = (id) => {
    history.push("/users/"+id);
  }

  const Badges = (props) => props.items.map((item, index) => <MDBBadge
                                                      key={index}
                                                      pill
                                                      color={getRoleColors(item)}
                                                      className="mr-1">{item}</MDBBadge>)


  const getRoleColors = (roleName) => {
    let color = ''
    switch (roleName) {
      case "Analyzer":
        color = 'danger'
        break;
      case "CAD":
        color = 'success'
        break;
      case "UAV":
        color = 'danger'
        break;
      case "DOT":
        color = 'default'
        break;
      case "Project manager":
        color = 'primary'
        break;

      default:
        color = 'primary'
        break;
    }
    return color
  }

  const UserBox = (props) => {
    const user = props.user
    return (
    <MDBCol lg="6" md="12" className="mb-5" >
      <MDBCol md="4" lg="6" className="float-left">
          <MDBAvatar

            src="https://mdbootstrap.com/img/Photos/Avatars/img%20(29).jpg"
            className="mx-auto mb-md-0 mb-4 rounded z-depth-1 img-fluid fullWidth fullHeight"
            tag="img"
            alt="Sample avatar"
          />

      </MDBCol>
      <MDBCol md="8" lg="6" className="float-right">
        <h4 className="font-weight-bold mb-3">{user.first_name + ' ' + user.last_name}</h4>
        <h6 className="font-weight-bold grey-text mb-3">
          Front-end Developer
        </h6>

        {user.roleTypes && (
          <Badges items={user.roleTypes}/>

        )}
        <p className="grey-text">
          {user.remarks}
        </p>
        <a href="#!" className="p-2 fa-lg ">
          <MDBIcon fab icon="facebook" />
        </a>
        <a href="#!" className="p-2 fa-lg li-ic">
          <MDBIcon fab icon="linkedin-in" />
        </a>
        <a href="#!" className="p-2 fa-lg email-ic">
          <MDBIcon icon="envelope" />
        </a>
      </MDBCol>
    </MDBCol>

    )

  }

  return (

    <div className="usersPage">

      <div className="">
        <div className="px-5 pb-1 text-center">
          <div>
            <h2 className="h1-responsive font-weight-bold my-1">
              Freelancers
            </h2>
            {provider && <p className="grey-text w-responsive mx-auto mb-3">
              {provider.about_team}
            </p>}
            <MDBRow className="text-md-left">
              {users.map((user, index) => <UserBox user={user} key={index}/>)}
            </MDBRow>
          </div>
        </div>
        <DataTable

          dataType="usersShortTable"
          displayEntries={false}
          paging={false}
          data={users}
          onRowClick={(id) => linkToUserPage(id)} >

        </DataTable>

      </div>

    </div>
  );
}


export default compose(
  // withConnect,
  memo,
)(UsersPage);
