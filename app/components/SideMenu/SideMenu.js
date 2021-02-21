import React, { memo, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './webslidemenu.css';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectLoading, makeSelectError, makeSelectCurrentUser,
  makeSelectRoleTypes, makeSelectCurrentUserRole, makeSelectShowChat,
  makeSelectMenuItem } from 'containers/App/selectors';
// import './color-skins/white-orange.css';
// import './dropdown-effects/fade-down.css';
import { toggleModal, toggleAlert, menuItemClicked } from 'containers/App/actions';
import { logout } from 'containers/AppData/actions';
import { MDBIcon, MDBBtn, MDBAvatar, MDBSwitch } from 'mdbreact';
import { menus } from '../../menu-templates';
import UserInfoBox from 'components/UserInfoBox';
import Counter from 'components/Counter'

// import CSSTransition from 'react-transition-group/CSSTransition';
import { Transition, CSSTransition } from 'react-transition-group';
import Toolbar from 'components/ToolBar/ToolBar';
import TopBar from './TopBar';
import styled from 'styled-components';
import { theme } from '../../global-styles' 

// console.log(theme)

const MenuList = styled.div`
top: ${theme.layout.topBarSize};
width: 240px;
// margin-left: -240px;
`;
const SideMenu = ({
  menu,
  open = false,
  onMenuItemClick,
  menuItem,  
  currentCompany,
  currentUser,
  currentUserRole,
  history = useHistory(),
  onToggleAlert,
  onLogout,
  showChat
}) => {
  const [active, setActive] = useState('')
  const [showSideMenu, setShowSideMenu] = useState(open ? open : false)
  let totalRoles
  useEffect(() => {
    console.log(currentUser)
    totalRoles = 
      currentUser.userOrganiztionRoles ? currentUser.userOrganiztionRoles.length : 0
       + currentUser.userProviderRoles ? currentUser.userProviderRoles.length : 0
       + currentUser.userSystemRoles ? currentUser.userSystemRoles.length : 0
    if (currentUser.userInfo.general_status !== 'Active') {
      setShowSideMenu(true)
    }

  }, [currentUser, currentUserRole])
  // useEffect(() => {

  //   setShowSideMenu(open)

  // }, [open])
  // useEffect(() => {

    

  // }, [currentUserRole])
  
  const isAdmin = currentUser.userSystemRoles ? true : false

  const onMenuClick = (item => {
    switch (item) {
      case 'Switch work space':
        history.push('/');
        break;
      case 'Sign out':
        onToggleAlert({
          title: `Are you sure you want to sign out?`,
          // text: `${user.first_name} ${user.last_name} is allready allocated as ${role.name}`,
          confirmButton: 'Sign out',
          cancelButton: 'Cancel',
          alertType: 'danger',
          confirmFunction: () => {            
            onLogout();
            history.push('/');
          }
        });
        break;

      default:
        onMenuItemClick(item);
    }
   
  })
  const onSubMenuClick = (item => {
    onMenuClick(item);
  })
  const onFinalItemClick = (item => {
    console.log(item)
  })

  const MenuItem = ({ item }) => {

    return (
      <span
        onClick={() => {
          // console.log(item.name)
          if (!item.children ) {
            onMenuClick(item.name);
            toggleSideNav();
          }
          else {
            active == item.name ? setActive() : setActive(item.name);
          }
        }}
        className={`d-flex align-items-center cursor-pointer ${
          menuItem == item.name ? 'active bgPrimaryFaded5 color-white' : ''
        }`}
      >
        <MDBIcon icon={item.icon} size="2x" className={` ${
          menuItem == item.name ? 'color-white' : ''
        }`} />
        <span className="mr-2">{item.name}</span>
        {item.counter && <Counter count={2} bgColor="red"/>}
        <div className="float-right mt-1 ml-2">
          {item.children && (
            <MDBIcon
              rotate={active == item.name ? '180' : ''}
              icon={'chevron-down'}
              size="1x"
              
            />
          )}

        </div>

      </span>
    );     
   
  };

  const SubMenuItem = ({ parent, item }) => {
    return (
      <span 
        className="sideMenuSubMenu hoverBgPrimaryFaded3 cursor-pointer"
        onClick={() => {
          onSubMenuClick(item.name)
          !item.children && toggleSideNav()
        }}
        >
        {item.children && <i
          className={`fas fa-angle-${
            parent.float === 'right' ? 'left' : 'right'
          }`}
        />}
        {item.name}{' '}
         {item.counter && <span className="counter float-right">2</span>}
      </span>
    );
  };

  const toggleSideNav = () => {
    setShowSideMenu(!showSideMenu)
  }


  return (
    <div className={showSideMenu && 'wsactive'}>
      {/* <!-- Mobile Header --> */}
      <TopBar className="bgGradientPrimary">
        {/* <div className=""> */}
        <span
          id="wsnavtoggle"
          className="wsanimated-arrow ml-4"
          onClick={toggleSideNav}
        >
          <span />
        </span>

        {/* </div> */}
        <div className={`${showChat ? 'mr-chat' : 'mr-2'}`}>
          <Toolbar />
        </div>
      </TopBar>

      <div className="overlapblackbg z-100" onClick={toggleSideNav} />
      <CSSTransition
        in={showSideMenu}
        timeout={{ appear: 0, enter: 300, exit: 300 }}
        classNames="moveInRight"
        // unmountOnExit
        // onEnter={() => console.log('ENTER')}
        // onExited={() => console.log('EXIT')}
      >
        <MenuList className="wsmenu clearfix">
          <ul className="wsmenu-list background-white z-100">
            <li className="">
              <UserInfoBox handleAction={toggleSideNav} />
            </li>
            {(isAdmin ||
              (currentUser.userInfo.general_status == 'Active' &&
                currentCompany &&
                currentCompany.general_status == 'Active')) &&
              menu.map(item => {
                switch (item.type) {
                  case 'sub-menu':
                    return (
                      <li key={item.name} aria-haspopup="true">
                        <MenuItem item={item} />
                        {item.children && (
                          // <CSSTransition
                          //   unmountOnExit
                          //   in={active == item.name}
                          //   timeout={{ appear: 0, enter: 500, exit: 300 }}
                          //   classNames='toggleAnimation'
                          //   appear
                          // >
                          <CSSTransition
                            in={active == item.name}
                            timeout={{
                              appear: 0,
                              enter: 0,
                              exit: 300,
                            }}
                            classNames="toggleAnimation"
                            unmountOnExit
                            // onEnter={() => console.log(false)}
                            // onExited={() => console.log(true)}
                            appear
                          >
                            <ul className={`sub-menu `}>
                              {item.children.map(child => (
                                <li aria-haspopup="true" key={child.name}>
                                  <SubMenuItem parent={item} item={child} />

                                  {child.children && child.children.length && (
                                    <ul className="sub-menu">
                                      {child.children.map(subChild => (
                                        <li
                                          aria-haspopup="true"
                                          key={subChild.name}
                                        >
                                          <SubMenuItem
                                            parent={item}
                                            item={subChild}
                                          />
                                          {subChild.children &&
                                            subChild.children.length && (
                                              <ul className="sub-menu">
                                                {subChild.children.map(
                                                  finalItem => {
                                                    return (
                                                      <li
                                                        onClick={() =>
                                                          onFinalItemClick(
                                                            finalItem,
                                                            menuType,
                                                          )
                                                        }
                                                      >
                                                        <span>
                                                          {finalItem.name}{' '}
                                                        </span>
                                                      </li>
                                                    );
                                                  },
                                                )}
                                              </ul>
                                            )}
                                        </li>
                                      ))}
                                    </ul>
                                  )}
                                </li>
                              ))}
                            </ul>
                          </CSSTransition>
                        )
                        //   <Transition
                        //   in={active == item.name}
                        //   timeout={{
                        //     appear: 100,
                        //     enter: 300,
                        //     exit: 300
                        //   }}
                        //   appear
                        //   unmountOnExit
                        // >
                        //   {state => (
                        //     <div
                        //       style={{
                        //         ...defaultStyle,
                        //         ...transitionStyles[state]
                        //       }}
                        //     >
                        //       I am {state}
                        //     </div>
                        //   )}
                        // </Transition>
                        }
                      </li>
                    );
                  default:
                    break;
                }
              })}
            {/* {isAdmin || ((currentUserRole.role_type_id === 3 ||
              currentUserRole.role_type_id === 2) && currentCompany && 
              currentCompany.general_status == 'Active') && (
                <li className="">
                  <MenuItem
                    item={{
                      name: 'Manage Users',
                      icon: 'users',
                      type: 'sub-menu',
                      float: 'left',
                    }}
                  />
                </li>
              )} */}
            <li className="">
              <MenuItem
                item={{
                  name: 'Settings',
                  icon: 'cog',
                  type: 'sub-menu',
                  float: 'left',
                }}
              />
            </li>
            {totalRoles > 1 && <li className="">
              <MenuItem
                item={{
                  name: 'Switch work space',
                  icon: 'random',
                  type: 'sub-menu',
                  float: 'left',
                }}
              />
            </li>}
            <li className="">
              <MenuItem
                item={{
                  name: 'Sign out',
                  icon: 'sign-out-alt',
                  type: 'sub-menu',
                  float: 'right',
                }}
              />
            </li>
          </ul>
        </MenuList>
      </CSSTransition>

      {/* } */}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: makeSelectCurrentUser(),
  currentUserRole: makeSelectCurrentUserRole(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
  showChat: makeSelectShowChat(),
  menuItem: makeSelectMenuItem()
});


const mapDispatchToProps = (dispatch) => {
  return {
    onToggleModal: (modalData) => dispatch(toggleModal(modalData)),
    onToggleAlert: alertData => dispatch(toggleAlert(alertData)),
    onMenuItemClick: menuItem => dispatch(menuItemClicked(menuItem)),
    onLogout: () => dispatch(logout()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(SideMenu);




