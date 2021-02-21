import React, { memo } from 'react'
import { MDBBadge } from "mdbreact";
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import {
    makeSelectAllStatuses
} from 'containers/App/selectors';

const Status = ({
    statusName,
    statuses,
    type
    }) => {
    const status = statuses.find(status => status.name == statusName)
    return <MDBBadge
    className="p-1 px-2" 
    pill
    color={status.color}>
        {status.name}
    </MDBBadge>
}

const mapStateToProps = createStructuredSelector({
    statuses: makeSelectAllStatuses(),
  });
  
  const mapDispatchToProps = dispatch => {
    return {
    };
  };
  
  const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps,
  );
  
  export default compose(
    withConnect,
    memo,
  )(Status);