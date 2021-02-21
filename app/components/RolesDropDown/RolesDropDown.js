import React, { Component, memo, } from "react";
import {
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  } from "mdbreact";

const RolesDropDown = ({
  userData,
  onProviderClick,
  onOrganizationClick
}) => {
  // console.log(options)
  const userOrgRoles = () => {
    let roles = []
    userData.userOrganiztionRoles.map(role =>  {
      // console.log(role)
      roles.push({
        org_id: role.org_id,
        name: role.org_name,
        roleName: role.role_name
      })
    })

    return roles
  }
  const userProviderRoles = () => {
    let roles = []

    userData.userProviderRoles.map(role =>  {
      // console.log(role)
      roles.push({
        provider_id: role.provider_id,
        name: role.name,
        roleName: ''
      })

    })

    return roles
  }

  return <MDBDropdown>
  <MDBDropdownToggle nav caret>
    <div className="d-none d-md-inline">
      Work spaces
    </div>
  </MDBDropdownToggle>
  <MDBDropdownMenu className="nav-drop-down tabs-orange active">
    {userData.userOrganiztionRoles.length ? <>
      <MDBDropdownItem header>Organizations</MDBDropdownItem>
      {userOrgRoles().map(role => <MDBDropdownItem href="#!" className="text-left"
        onClick={(e) =>  onOrganizationClick(role.org_id)}>
          {role.name}
      </MDBDropdownItem>)}
      </>
      : ''
    }
    {userData.userProviderRoles.length ? <>
      <MDBDropdownItem header>Providers</MDBDropdownItem>
      {userProviderRoles().map(role => <MDBDropdownItem href="#!" className="text-left"
        onClick={(e) =>  onProviderClick(role.provider_id)}>
          {role.name}
      </MDBDropdownItem>)}
      </>
      : ''
    }

  </MDBDropdownMenu>
</MDBDropdown>;
}

export default memo(RolesDropDown);
