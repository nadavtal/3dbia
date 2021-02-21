import React, {useState, memo, useEffect, useMemo} from "react";
import { connect } from 'react-redux';
import { compose } from 'redux';
import { useInjectReducer } from 'utils/injectReducer';
import { createStructuredSelector } from 'reselect';
import ReorderModule from 'components/ReorderModule/ReorderModule';
import { sortBy } from 'utils/dataUtils';
import { 
  makeSelectBridge, 
  makeSelectSelectedObjectIds, 
  makeSelectStructureTypes,
  makeSelectBridgeElements,
  makeSelectSelectedElements,
  makeSelectBridgeSpans,
  makeSelectElementsGroups,
  makeSelectElementsTypes
 } from 'containers/BridgeModul/selectors';
// import reducer from './reducer';
import {
  updateElements,
  editElement, 
  
} from 'containers/BridgeModul/actions'
import { getUniqueValuesFromColumn } from 'utils/dataUtils'
import { elementSelected, elementsSelected, receiveAction } from 'containers/Resium/actions';
const key = "leftView";

const EditElementsModule = ({
  selectedElements,
  selectedObjectIds,
  onEditElement,
  onElementSelected,
  onUpdateElements,
  bridgeElements
}) => {
  // console.log(selectedElements)
  const elementTypeIds = getUniqueValuesFromColumn('element_type_id', selectedElements)
  const spanIds = getUniqueValuesFromColumn('span_id', selectedElements)
  // console.log('elementTypeIds', elementTypeIds)
  // console.log('spanIds', spanIds)
  // const elements = bridgeElements.filter(el => elementTypeIds.includes(el.element_type_id) && spanIds.includes(el.span_id))
      // let elements;
      // if (element.element_type_id) {
      //   elements = state.bridgeElements.filter(
      //     el =>
      //       el.element_type_id ==
      //       element.element_type_id,
      //   );
      // }
  // useInjectReducer({ key, reducer });
  const getTableName = () => {
    let name = selectedElements[0].element_type_name
    selectedElements.forEach(element => {
      if (element.element_type_name !== name) name = "Elements"
      
    })
    return name
  }

  const tableName = useMemo(() => getTableName(), [selectedElements])

   
  return (
    <ReorderModule
      data={sortBy('element_order', selectedElements)}      
      selected={selectedObjectIds}
      show={true}
      tableConfig={{
        exludesFields: [
          'id',
          'object_id',
          'bid',
          'span_id',
          'bridge_model_id',
          'element_group_id',
          'view_position',
          'default_view_data',
          'updated_by_user_id',
          'element_type_id',
          'span_name',
          'model_name',
          'element_group',
          'element_type_name',
        ],

        editableFields: [
          'secondary_quantity',
          'primary_quantity',
          'remarks',
          'name',
        ],
        longFields: ['remarks'],
        tableName: tableName,
        dateFields: ['last_updated'],
        fixedColumns: ['element_type_name'],
        wholeNumberFields: ['element_order'],
        decimelNumberFields: ['primary_quantity', 'secondary_quantity'],
      }}
      onRowClick={row => onElementSelected(row.object_id, true)}
      onCellClick={row => console.log(row)}
      onFinishEditinig={(row, cellName, value) => {
        row[cellName] = value;
        onEditElement(row);
      }}
      onSaveRows={rows => onUpdateElements(rows)}
    />
  );


}

const mapStateToProps = createStructuredSelector({
  selectedElements: makeSelectSelectedElements(),
  bridgeElements: makeSelectBridgeElements(),
  selectedObjectIds: makeSelectSelectedObjectIds(),
  
});


const mapDispatchToProps = (dispatch) => {
  return {
    onUpdateElements: elements => dispatch(updateElements(elements)),
    onEditElement: (element) => dispatch(editElement(element)),
    onElementSelected: (id, mode) => dispatch(elementSelected(id, mode)),

  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(EditElementsModule);

