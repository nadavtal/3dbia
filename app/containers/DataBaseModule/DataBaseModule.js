import React, { memo, useState, useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import { toggleAlert, toggleModal } from 'containers/App/actions';
import * as actions from './actions'
import { makeSelectData } from './selectors'
import CustomSelect from 'components/CustomSelect';
import { convertToMySqlDateFormat } from 'utils/dateTimeUtils';
import { sortBy } from 'utils/dataUtils';

import {
  makeSelectRoleTypes,
  makeSelectCurrentUser,
  makeSelectCurrentUserRole,
  makeSelectTaskStatuses, 
  makeSelectSurveyStatuses
} from 'containers/App/selectors';
import SimpleTable from 'containers/MyTables/SimpleTable';
import MyWijmoCheckBoxTable from 'containers/MyTables/MyWijmoCheckBoxTable';
import { ExportService } from 'containers/Wijmo/export';
import { MDBInput, MDBBtn, MDBIcon, MDBDatePicker, MDBListGroup, MDBListGroupItem } from 'mdbreact';
import reducer from './reducer';
import saga from './saga';

const key = 'databaseReducer';


const Database = ({
  org,
  onGetTable,
  onSaveField,
  onAddRow,
  onDeleteRows,
  data
}) => {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  const [tableName, setTableName] = useState('')
  const [selected, setSelected] = useState([])
  // const [rows, setRows] = useState(data)

  // useEffect(() => {
  //   setRows(data)
  //   return () => {
  //     setRows()
  //   }
  // }, [data])
  // console.log(org)
  console.log(data)

  const getEditableFields = (obj) => {
    let unEditableFields = ['id', 'organization_id']
    let editableFields = []
    Object.keys(obj).forEach(key => {
      if (!unEditableFields.includes(key)) editableFields.push(key)
    })
    return editableFields
  }
  const editableFields = useMemo(() => data && data.length && getEditableFields(data[0]), [data]) 

  console.log(editableFields)

  const handleChange = (row, key, value) => {
    // console.log(row, key, value)
    onSaveField(tableName, row.id, key, value)
    // if (row.id) {
    //   onSaveField(tableName, row.id, key, value)
    // } 
    // else {
    //   onAddRow(tableName, org.id, key, value)
    // }
    
  }

  const addRow = () => {
    onAddRow(tableName, org.id)
  }
  const deleteRows = () => {
    const ids = selected.map(item => item.id)
    onDeleteRows(tableName, ids)
    setSelected([])
  }

  const handleSelected = (rows) => {
    setSelected(rows)
  }
  console.log(selected)
  const tableConfig = {
    exludesFields: ['id', 'organization_id'],

    editableFields: editableFields,
    longFields: [],
    dateFields: [],
    // fixedColumns: 3,
    wholeNumberFields: [],
    decimelNumberFields: [],
    groups: [],
    frozenColumns: 1,
    showSearch: true,
    showExport: true,
    // groupHeaderFormat: `<b>{value}</b> ({count:n0} roles)`,
    hideGroupPanel: true,
    
  }
  return (
    <div>
      <div>
        <CustomSelect
          options={[
            // {name: 'tbl_process_template' },
            { name: 'tbl_bridge_type' },
            { name: 'tbl_bridge_type_code' },
            // {name: 'tbl_custom_fields' },
            { name: 'tbl_elements_groups' },
            { name: 'tbl_elements_types' },
            { name: 'tbl_structure_type' },
          ]}
          onChange={event => {
            //   handleFilterInput(event[0], filter);
            onGetTable(event[0], org.id);
            setTableName(event[0]);
            // let updatedFilters = [...selectedFilters]
            // updatedFilters.find(fil => fil.name == filter.name).value = event[0]
            // setSelectedFilters(updatedFilters)
          }}
          value={tableName}
          label={`Choose table`}
        />
        <div className="d-flex justify-content-between">
          <h5>{tableName}</h5>
          {tableName && (
            <div>
              <MDBBtn
                size="sm"
                className={`bgDanger ${!selected.length && 'disabled'}`}
                onClick={() => deleteRows()}
              >{`Delete rows ${selected.length}`}</MDBBtn>
              <MDBBtn
                size="sm"
                className="bgPrimary"
                onClick={() => addRow()}
              >
                Add row
              </MDBBtn>
            </div>
          )}
        </div>
        {data && data.length && (
          <MyWijmoCheckBoxTable
            data={sortBy('id', data)}
            className="maxHeight50vh pb-3"
            exportService={new ExportService()}
            handleCheckboxClick={selectedItems =>
              // handleOnChange(selectedItems)
              handleSelected(selectedItems)
            }
            multiSelectionMode={true}
            selectGroupsOnly={false}
            tableConfig={tableConfig}
          />
          // <SimpleTable
          //   // style={scrollContainerStyle}
          //   className="fontSmall maxHeight50vh"
          //   data={sortBy('id', data)}
          //   tableConfig={tableConfig}
          //   // selectedRows={selected && [selectedRow.object_id]}
          //   onRowClick={row => handleSelected(row)}
          //   onFinishEditinig={(row, cellName, value) =>
          //     handleChange(row, cellName, value)
          //   }
          // />
        )}
      </div>
    </div>
  );
}

const mapStateToProps = state => {

  return {
    data: state.databaseReducer.data
  }
}
// const mapStateToProps = createStructuredSelector({
//   currentUser: makeSelectCurrentUser(),
//   currentUserRole: makeSelectCurrentUserRole(),
//   roleTypes: makeSelectRoleTypes(),
//   taskStatuses: makeSelectTaskStatuses(),
//   surveyStatuses: makeSelectSurveyStatuses(),
//   data: makeSelectData()
// });

const mapDispatchToProps = dispatch => {
  return {
    onToggleAlert: alertData => dispatch(toggleAlert(alertData)),
    onToggleModal: modalData => dispatch(toggleModal(modalData)),
    onGetTable: (tableName, orgId) => dispatch(actions.getTable(tableName, orgId)),
    onSaveField: (tableName, id, key, value) => dispatch(actions.saveField(tableName, id, key, value)),
    onAddRow: (tableName, orgId, key, value) => dispatch(actions.addRow(tableName, orgId, key, value)),
    onDeleteRows: (tableName, ids) => dispatch(actions.deletsRows(tableName, ids)),
    //   onUpdateTask: (task) => dispatch(updateTask(task)),
  };
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Database);
