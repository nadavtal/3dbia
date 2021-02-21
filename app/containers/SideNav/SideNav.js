import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import { MDBSideNavCat, MDBSideNavNav, MDBSideNav, MDBSideNavLink, MDBContainer, MDBIcon, MDBBtn } from "mdbreact";

class  SideNav extends Component {
  state = {
    sideNavLeft: false,
  }

sidenavToggle = sidenavId => () => {
  const sidenavNr = `sideNav${sidenavId}`
  this.setState({
    [sidenavNr]: !this.state[sidenavNr]
  });
};

render() {

    return (
      // <BrowserRouter>
        <MDBContainer>
          <MDBBtn className="d-lg-none" onClick={this.sidenavToggle("Left")}>
            <MDBIcon size="lg" icon="bars" />
          </MDBBtn>
          <MDBSideNav
            slim fixed
            mask="rgba-orange-strong"
            triggerOpening={this.state.sideNavLeft}
            breakWidth={991}
            className="sn-bg-1">
            <li>
              <div className="logo-wrapper sn-ad-avatar-wrapper">
                <a href="#!">
                  <img alt="" src={require('../../images/gilad.jpg')} className="rounded-circle" />
                  <span>Gilad</span>
                </a>
              </div>
            </li>

            <MDBSideNavNav>
              <MDBSideNavLink to="/" topLevel>
                <MDBIcon icon="home" className="mr-2" />Home</MDBSideNavLink>
              <MDBSideNavLink to="/users">
                <MDBIcon icon="users" className="mr-2" />Users</MDBSideNavLink>
              <MDBSideNavLink to="/organizations">
                <MDBIcon icon="building" className="mr-2" />Organizations</MDBSideNavLink>
              <MDBSideNavLink to="/providers">
                <MDBIcon icon="address-card" className="mr-2" />Providers</MDBSideNavLink>
              <MDBSideNavLink to="/roles">
                <MDBIcon icon="briefcase" className="mr-2" />Roles</MDBSideNavLink>
              <MDBSideNavLink to="/projects">
                <MDBIcon icon="map-marked" className="mr-2" />Projects</MDBSideNavLink>
              <MDBSideNavLink to="/proccesses">
                <MDBIcon icon="map-marked" className="mr-2" />Proccesses</MDBSideNavLink>
              {/* <MDBSideNavCat name="Users" id="users" icon="users">
                <MDBSideNavLink>Submit listing</MDBSideNavLink>
                <MDBSideNavLink>Registration form</MDBSideNavLink>
              </MDBSideNavCat> */}
              <MDBSideNavCat name="Instruction" id="instruction" icon="hand-pointer" href="#">
                <MDBSideNavLink>For survey manager</MDBSideNavLink>
                <MDBSideNavLink>For UAV operators</MDBSideNavLink>
                <MDBSideNavLink>For CAD technitians</MDBSideNavLink>
                <MDBSideNavLink>For QC managers</MDBSideNavLink>
              </MDBSideNavCat>
              <MDBSideNavCat name="About" id="about" icon="eye">
                <MDBSideNavLink>Instructions</MDBSideNavLink>
                <MDBSideNavLink>Monthly meetings</MDBSideNavLink>
              </MDBSideNavCat>
              <MDBSideNavCat name="Contact us" id="contact-me" icon="envelope">
                <MDBSideNavLink>FAQ</MDBSideNavLink>
                <MDBSideNavLink>Write a message</MDBSideNavLink>
              </MDBSideNavCat>
            </MDBSideNavNav>
          </MDBSideNav>
        </MDBContainer>

      // </BrowserRouter>
    );
  }
}

export default  SideNav;
