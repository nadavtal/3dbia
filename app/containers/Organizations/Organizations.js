import React, { useEffect, memo } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectOrganizations } from '../App/selectors';
import { useInjectReducer } from 'utils/injectReducer';

import { useHistory , Link } from 'react-router-dom';
import {
  makeSelectLoading,
  makeSelectError,
} from 'containers/App/selectors';
import reducer from './reducer';
import { useInjectSaga } from 'utils/injectSaga';

import saga from './saga';
import * as actionCreators from './actions'
import ToolBar from '../../components/ToolBar/ToolBar';
import ButtonsSection from '../../components/ToolBar/ButtonsSection/ButtonsSection';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './Organizations.css';

import DataTable from '../../components/DataTable/DataTable';
const key = 'OrganizationsPage';


export function OrganizationsPage({
  onCreateOrganization,
  onDeleteOrganization,
  onUpdateOrganization,
  history = useHistory(),
  linkToOrganizationPage,
  organizations

}) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  useEffect(() => {

    console.log(organizations)

  }, [organizations]);

  linkToOrganizationPage = (id) => {
    history.push("/organizations/"+id);
  }

  return (
    <div className="OrganizationsPage">
      <ToolBar position="topToolBar">

          <FontAwesomeIcon icon="user-edit" onClick={onUpdateOrganization}/><br></br>
          <FontAwesomeIcon icon="user-plus" onClick={onCreateOrganization}/><br></br>
          <FontAwesomeIcon icon="user-minus" onClick={onDeleteOrganization}/>

      </ToolBar>
      <div className="pl-3">

        <DataTable

          dataType="organizationsTable"
          displayEntries={false}
          paging={false}
          data={organizations}
          onRowClick={(id) => linkToOrganizationPage(id)}
          >

        </DataTable>

      </div>

    </div>
  );
}

const mapStateToProps = createStructuredSelector({

  organizations: makeSelectOrganizations(),
  loading: makeSelectLoading(),
  error: makeSelectError(),

});

const mapDispatchToProps = (dispatch) => {
  return {
    onCreateOrganization: (organization) => dispatch(addOrganization(organization)),
    // onDeleteOrganization: (organization) => dispatch(actionCreators.deleteOrganization(organization)),
    // onUpdateOrganization: (organization) => dispatch(actionCreators.editOrganization(organization)),


  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(OrganizationsPage);
