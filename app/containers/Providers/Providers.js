import React, { useEffect, memo, useState } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectProviders } from '../App/selectors';
import { useInjectReducer } from 'utils/injectReducer';
import IconButtonToolTip from '../../components/IconButtonToolTip/IconButtonToolTip';
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
import Form from '../Forms/Form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './Providers.css';

import DataTable from '../../components/DataTable/DataTable';
const key = 'ProvidersPage';


export function ProvidersPage({
  onCreateProvider,
  onDeleteProvider,
  onUpdateProvider,
  history = useHistory(),

  linkToProviderPage,
  providers,
  onSubmitForm

}) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  useEffect(() => {


  }, []);
  const [showFormState, setShowFormState] = useState(false);
  const [formModeState, setformModeState] = useState('create');

  linkToProviderPage = (id) => {
    console.log(id)
    history.push("/providers/"+id);
  }

  onSubmitForm = (data) => {
    console.log(data)
  }

  return (
    <div className="ProvidersPage">
      <ToolBar position="topToolBar">
        <IconButtonToolTip iconName="plus"
            toolTipType="info"
            toolTipPosition="bottom"
            toolTipEffect="float"
            toolTipText='Create provider'
            onClickFunction={() => setShowFormState(true)}
          />
          {/* <FontAwesomeIcon icon="user-edit" onClick={onUpdateProvider}/><br></br>
          <FontAwesomeIcon icon="user-plus" onClick={onCreateProvider}/><br></br>
          <FontAwesomeIcon icon="user-minus" onClick={onDeleteProvider}/> */}

      </ToolBar>
      <div className="pl-3">
        <DataTable

          dataType="providersTable"
          displayEntries={false}
          paging={false}
          data={providers}
          onRowClick={(id) => linkToProviderPage(id)} >

        </DataTable>
        {/* <Form
          formType="providerForm"
          editMode={formModeState}
          createFunction={(data) => onSubmitForm(data, event)}
          >

        </Form> */}
      </div>

    </div>
  );
}

const mapStateToProps = createStructuredSelector({

  providers: makeSelectProviders(),
  loading: makeSelectLoading(),
  error: makeSelectError(),

});

const mapDispatchToProps = (dispatch) => {
  return {
    onCreateProvider: (provider) => dispatch(addProvider(provider)),
    // onDeleteProvider: (provider) => dispatch(actionCreators.deleteProvider(provider)),
    // onUpdateProvider: (provider) => dispatch(actionCreators.updateProvider(provider)),


  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(ProvidersPage);
