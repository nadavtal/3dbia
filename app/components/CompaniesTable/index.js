import React, {memo, useState} from 'react';

import UserRow from '../UserRow/UserRow'
import TableHeader from '../TableHeader';
import Status from 'components/Status'
import { connect } from 'react-redux';
import { compose } from 'redux';
import CompanyRow from 'components/CompanyRow'
import { createStructuredSelector } from 'reselect';
import { MDBIcon } from 'mdbreact';
import {
  makeSelectLoading,
  makeSelectCurrentUser,
  makeSelectGeneralUserStatuses
} from 'containers/App/selectors';
import { sortBy } from 'utils/dataUtils';

const CompaniesTable = ({
  companies, 
  type,
  }) => {
  
  const [activeFilter, setActiveFilter] = useState('name');
  const [reverse, setReverse] = useState(false);

  const SortTableHeaderItem = ({name, field}) => {

    return <div
      onClick={() => handleActiveFilter(field)}>
      {name}
      <MDBIcon 
        // rotate={active == item.name ? '180' : ''} 
        icon={'sort'} size="1x" className="float-right mt-1 mr-2 " 
        />
    </div>
  }
  const handleActiveFilter = (field) => {
    if (field !== activeFilter) {
      setActiveFilter(field)
    } else {
      setReverse(!reverse)
    }
  }

  companies = sortBy(activeFilter, companies, reverse)
  return <div className="toggled">
    
    <TableHeader className="row no-gutters">
    
      <div className="col-1">
        <SortTableHeaderItem name="Name" field="name" />
      </div>
      <div className="col-1">
        Contact name
      </div>
      <div className="col-3">
      remarks
      </div>
      <div className="col-2">
        {type === 'organization' ?  
          <SortTableHeaderItem name="Metric system" field="unit_system" /> : 
          <SortTableHeaderItem name="Region" field="region" />}
      </div>
      <div className="col-2">
      phone
      </div>
      <div className="col-2">
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
  {/* <DataTable
      displayEntries={false}
      paging={false}
      data={props.bridge3dImages}
      onRowClick={name => show3dImage(name)}
      dataType="images3dTable"
      className="bridgePageDataTable"
    /> */}
      {companies.map((company, index) => {
        // console.log(company)
        return <CompanyRow
         key={company.name} 
         company={company}
        //  statusesType='connectionStatuses' 
          />
      })}
      </div>
}
const mapStateToProps = createStructuredSelector({
  currentUser: makeSelectCurrentUser(),
  loading: makeSelectLoading(),
  statuses: makeSelectGeneralUserStatuses(),
  
});

const mapDispatchToProps = dispatch => {
  return {
    onToggleAlert: alertData => dispatch(toggleAlert(alertData)),
    
  };
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(CompaniesTable);

