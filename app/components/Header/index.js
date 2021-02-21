import React,  {memo}from 'react';
import { FormattedMessage } from 'react-intl';

import A from './A';
import Img from './Img';
import NavBar from './NavBar';
import HeaderLink from './HeaderLink';
import Banner from './banner.jpg';
import messages from './messages';
import { makeSelectCurrentUser } from 'containers/App/selectors';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';

function Header(
  props,
  currentUser
) {
  currentUser = JSON.parse(localStorage.getItem('currentUser'));
  // console.log(currentUser)
  return (
    <div>
      {/* <A href="https://www.reactboilerplate.com/">
        <Img src={Banner} alt="react-boilerplate - Logo" />
      </A> */}
      <NavBar>

        <div>{currentUser? currentUser.firstName + ': ' +  currentUser.role: ''}</div>
        <HeaderLink to="/">
          <FormattedMessage {...messages.home} />
        </HeaderLink>
        <HeaderLink to="/users">
          <FormattedMessage {...messages.users} />
        </HeaderLink>
        <HeaderLink to="/roles">
          <FormattedMessage {...messages.roles} />
        </HeaderLink>

        <HeaderLink to="/projects">
          <FormattedMessage {...messages.projectsPage} />
        </HeaderLink>
        <HeaderLink to="/messages">
          <FormattedMessage {...messages.messages} />
        </HeaderLink>
      </NavBar>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  currentUser: makeSelectCurrentUser(),
  // username: makeSelectUsername(),
  // loading: makeSelectLoading(),
  // error: makeSelectError(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onUploadProject: () => dispatch({type: UPLOAD_PROJECT}),
    // onChangeUsername: evt => dispatch(changeUsername(evt.target.value)),
    // onSubmitForm: evt => {
    //   if (evt !== undefined && evt.preventDefault) evt.preventDefault();
    //   dispatch(loadRepos());
    // },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo
)(Header);
