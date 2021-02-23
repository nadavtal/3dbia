import React, { useState, memo, useEffect, useMemo, useRef } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { useInjectReducer } from 'utils/injectReducer';
import { createStructuredSelector } from 'reselect';
import FilesUploadComponent from 'components/FilesUploadComponent';
import {
  MDBIcon,
  MDBCardImage,
  MDBInput,
  MDBListGroup,
  MDBListGroupItem,
} from 'mdbreact';
import { 
  showInView, 
  onUpdateElements,
  updateSpan,
  editElement,
  updateElements
 } from 'containers/BridgeModul/actions';
import * as selectors from './selectors';
import { 
  makeSelectBridge, 
  makeSelectSelectedObjectIds, 
  makeSelectStructureTypes,
  makeSelectBridgeElements,
  makeSelectBridgeSpans,
  makeSelectElementsGroups,
  makeSelectElementsTypes,
  makeSelectMode,
  makeSelectSelectedElements
 } from 'containers/BridgeModul/selectors';
import TreeCustom from 'components/Tree/TreeCustom';
import IconButtonToolTip from "components/IconButtonToolTip/IconButtonToolTip";
import AccordionTable from "containers/AccordionTable/AccordionTable";
import { elementSelected, elementsSelected, receiveAction, zoomToElement } from 'containers/Resium/actions';
import { toggleModal, showNotification, toggleAlert } from 'containers/App/actions';
import { sortBy } from 'utils/dataUtils';
import * as actions from './actions';
import reducer from './reducer';

const key = 'spansTab';

const SpansTab = ({
  selectedObjectIds,
  elementsGroups,
  elementsTypes,
  bridgeElements,
  structureTypes,
  bridgeSpans,
  onElementSelected,
  onElementsSelected,
  onToggleModal,
  onToggleAlert,
  onShowInView,
  editSpan,
  onEditElement,
  onUpdateElements,
  selectedElements,
  mode,
  onZoomToElement,
  focusedElement,
}) => {
  const allocatedRef = useRef();
  const unAllocatedRef = useRef();
  // const [selectedAllocated, setSelectedAllocated] = useState([]);
  // const [selectedUnAllocated, setSelectedUnAllocated] = useState([]);
  // const selectedElements = selectedObjectIds.map(objectId => bridgeElements.find(rl => rl.object_id == objectId))

  useEffect(() => {
    if (focusedElement) {
      const element = bridgeElements.find(el => el.object_id == focusedElement)
      const parentDiv = document.getElementById('spanTabScrollContainer')
      const elementDiv = document.getElementById(element.object_id)
      // console.log(allocatedRef.current.offsetHeight)
      // console.log(unAllocatedRef)

      if (element.span_id) {
        parentDiv.scrollTop = allocatedRef.current.offsetHeight / 2;
      } else {
        const topPos = elementDiv.offsetTop;
        parentDiv.scrollTop = topPos - allocatedRef.current.offsetHeight - 50;
      }
    }
    // selectedObjectIds.forEach(objectId => {
    //   const element = bridgeElements.find(el => el.object_id == objectId)
    //   handleElementSelect(element)
    // })
    return () => {
        
    }
  }, [focusedElement])
  useInjectReducer({ key, reducer });
  // const selectedAllocated = selectedElements.filter(el => el.span_id)
  // const selectedUnAllocated = selectedElements.filter(el => !el.span_id)
  // console.log('selectedElements', selectedElements)
  // console.log('selectedObjectIds', selectedObjectIds)

  const selectedAllocated = useMemo(
    () =>
      bridgeElements.filter(
        el => el.span_id && selectedObjectIds.includes(el.object_id),
      ),
    [selectedObjectIds, bridgeElements],
  );
  const selectedUnAllocated = useMemo(
    () =>
      bridgeElements.filter(
        el => !el.span_id && selectedObjectIds.includes(el.object_id),
      ),
    [selectedObjectIds, bridgeElements],
  );
  const unAllocatedElements = useMemo(
    () => bridgeElements.filter(el => !el.span_id),
    bridgeElements,
  );
  // console.log('unAllocatedElements', unAllocatedElements)
  // if (selectedElements[0] && unAllocatedElements.includes(selectedElements[0])) {
  //   const elementDiv = document.getElementById(selectedElements[0].object_id)
  //   const topPos = elementDiv.offsetTop;
  //   // console.log(elementDiv)
  //   // console.log(topPos)
  //   document.getElementById('spanTabScrollContainer').scrollTop = topPos - 300;
  // }
  const removeElementsSpanId = () => {
    const updatedElements = [];
    selectedObjectIds.forEach((id, index) => {
      const updatedElement = { ...bridgeElements.find(el => el.object_id == id) };
      updatedElement.span_id = null;
      updatedElement.element_group_id = null;
      updatedElement.element_type_id = null;
      updatedElement.primary_unit = null;
      updatedElement.secondary_unit = null;
      updatedElement.importance = null;
      updatedElement.element_type_name = null;
      updatedElement.detailed_evaluation_required = null;
      // updatedElement.remarks = updatedElement.remarks;
      updatedElement.element_order = null;

      updatedElements.push(updatedElement);
    });
    // console.log(updatedElements);
    onUpdateElements(updatedElements);
  };
  const toggleAlert = alertType => {
    switch (alertType) {
      case 'unAllocate':
        onToggleAlert({
          title: 'Confirm Unallocation',
          text: `Are you sure you want to unallocate ${
            selectedObjectIds.length
          } elements from all spans?`,
          confirmButton: 'Unallocate',
          cancelButton: 'Cancel',
          alertType: 'danger',
          confirmFunction: () => removeElementsSpanId(),
        });
        break;
    }
  };

  const toggleModal = (modalType, objectId) => {
    // console.log(modalType);
    switch (modalType) {
      case 'allocateToSpan':
        onToggleModal({
          title: `Allocate elements(${selectedObjectIds.length}) to span`,
          text:
            'Choose span name, element group and element type to allocate properties to element',
          // confirmButton: 'Create',
          cancelButton: 'Cancel',
          formType: 'spanAllocationForm',
          data: {
            spans: bridgeSpans,
            elementsGroups,
            elementsTypes,
            editMode: 'Allocate',
          },
          // options: {
          //   buttonText: 'Add users',
          //   options: [],
          // },
          confirmFunction: (data, event) => prepareUpdateElements(data),
        });
        break;
      case 'editSpan':
        onToggleModal({
          title: `Edit span`,
          text: '',
          // confirmButton: 'Create',
          cancelButton: 'Cancel',
          formType: 'spansForm',
          data: {
            structureTypes,
            // elementsGroups: elementsGroups,
            // elementsTypes: elementsTypes,
            item: bridgeSpans.find(span => span.id == objectId),
            editMode: 'edit',
          },
          // options: {
          //   buttonText: 'Add users',
          //   options: [],
          // },
          confirmFunction: (data, event) => editSpan(data),
        });
        break;
      case 'editElement':
        const item = bridgeElements.find(el => el.object_id == objectId)
        onToggleModal({
          title: `Edit element id ${objectId}: ${item.name}`,
          text: '',
          // confirmButton: 'Create',
          cancelButton: 'Cancel',
          formType: 'elementForm',
          data: {
            spans: bridgeSpans,
            elementsGroups: elementsGroups,
            elementsTypes: elementsTypes,
            item,
            editMode: 'edit',
          },
          // options: {
          //   buttonText: 'Add users',
          //   options: [],
          // },
          confirmFunction: (data, event) => onEditElement({...item, ...data}),
        });
        break;;
      default: break
    }

  };

  const prepareUpdateElements = data => {
    // console.log(bridgeElements);
    const type = elementsTypes.find(type => type.id == data.element_type_id);
    // console.log(type);
    const updatedElements = [];
    selectedObjectIds.forEach((id, index) => {
      const updatedElement = { ...bridgeElements.find(el => el.object_id == id) };
      updatedElement.span_id = +data.span_id[0];
      updatedElement.element_group_id = +data.element_group_id[0];
      updatedElement.element_type_id = +data.element_type_id[0];
      updatedElement.primary_unit = type.primary_unit;
      updatedElement.secondary_unit = type.secondary_unit;
      updatedElement.importance = type.importance;
      updatedElement.element_type_name = type.name;
      updatedElement.detailed_evaluation_required =
        type.detailed_evaluation_required;
      updatedElement.remarks = type.remarks;
      updatedElement.element_order = index + 1;

      updatedElements.push(updatedElement);
    });
    // console.log(updatedElements);
    onUpdateElements(updatedElements);
  };

  const handleElementSelect = el => {
    // console.log(el)
    // if (el.span_id) {
    //   if (selectedAllocated.includes(el)) {
    //     setSelectedAllocated(selectedAllocated.filter(
    //     element =>  element !== el))
    //   } else {
    //     setSelectedAllocated([...selectedAllocated, el])
    //   }
    // } else {
    //   if (selectedUnAllocated.includes(el)) {
    //     setSelectedUnAllocated(selectedUnAllocated.filter(
    //     element =>  element !== el))
    //   } else {
    //     setSelectedUnAllocated([...selectedUnAllocated, el])
    //   }
    // }
    onElementSelected(el.object_id, false);
  };

  const selectAllElements = () => {
    onElementsSelected(['all']);
    // onShowInView('bottomView', 'elements', 'edit')
  };
  const clearAllSelected = () => {
    onElementsSelected([]);
    onShowInView('bottomView');
  };
  const scrollContainerStyle = {
    width: '99%',
    //  maxHeight: `calc(100vh)-${theme.layout.topBarSize}`,
    maxHeight: `69vh`,
    overFlowY: 'auto',
    overFlowX: 'hidden',
  };

  if (!bridgeElements.length)
    return <div className="bold fullWidth p-2">No Elements yet</div>;
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-1 color-white bgPrimaryLight">
        {/* <MDBSwitch
            checked={showInfo}
            onChange={() => setShowInfo(!showInfo)}
            labelLeft=""
            labelRight={`Show ${showInfo ? 'tree' : 'info'}`}
            /> */}
        <div className="projectTabsHeader d-flex p-2 ">
          <IconButtonToolTip
            iconName={selectedObjectIds.length ? 'check-square' : 'square'}
            size="lg"
            // far={selectedObjectIds.length ? false : true}
            toolTipType="info"
            toolTipPosition="right"
            toolTipEffect="float"
            toolTipText={
              selectedObjectIds.length ? 'Clear selected' : 'Select all'
            }
            // className={selectedObjectIds.length ? '' : 'disabled'}
            onClickFunction={() =>
              selectedObjectIds.length
                ? clearAllSelected()
                : selectAllElements()
            }
          />
          <span className="mx-2">
            {selectedObjectIds.length
              ? `Selected elements: `
              : `No selected elements`}
          </span>
          {selectedObjectIds.length ? selectedObjectIds.length : ''}
        </div>

        <div className="d-flex mr-2">
          <IconButtonToolTip
            className={`mx-3 ${!selectedAllocated.length ? 'disabled' : ''}`}
            iconClassName="text-blue"
            size="sm"
            iconName="unlock-alt"
            toolTipType="info"
            toolTipPosition="left"
            toolTipEffect="float"
            toolTipText={`Unallocate selected (${selectedObjectIds.length})`}
            onClickFunction={() => toggleAlert('unAllocate')}
          />
          <IconButtonToolTip
            className=""
            iconClassName=""
            size="sm"
            iconName="pen-nib"
            toolTipType="info"
            toolTipPosition="left"
            toolTipEffect="float"
            toolTipText="Edit spans"
            onClickFunction={() => onShowInView('bottomView', 'spans', 'edit')}
          />
        </div>
      </div>
      <div
        style={scrollContainerStyle}
        id="spanTabScrollContainer"
        className="scrollbar scrollbar-primary">
        <div ref={allocatedRef}>
          <TreeCustom
            header="Spans"
            className="customTreeView bgPrimaryFaded1 fontSmall"
            data={{
              level_1: bridgeSpans,
              level_2: elementsGroups,
              level_3: elementsTypes,
              level_4: bridgeElements,
            }}
            // selectNodesMode={selectNodesMode}
            selectedObjectIds={selectedObjectIds}
            selectedElements={selectedElements}
            onClick={element => handleElementSelect(element)}
            editElement={(modalType, objectId) =>
              toggleModal(modalType, objectId)
            }
            zoomToElement={objectId => {
              onZoomToElement(objectId)
              setTimeout(() => {
                onZoomToElement();
              }, 300);
            }}
            showElements={(elementsObjectIds, showBottomView) => {
              onElementsSelected(elementsObjectIds);
              showBottomView
                ? onShowInView('bottomView', 'elements', 'edit')
                : onShowInView('bottomView');
            }}
          />
        </div>
        <div
          className="projectTabsHeader d-flex justify-content-between p-2 stickyTop z-100 bgPrimaryLight color-white"
          id="unAllocatedHeader"
          ref={unAllocatedRef}
        >
          <span> Unallocated elements:</span>

          <IconButtonToolTip
            className={`mx-3 ${!selectedUnAllocated.length ? 'disabled' : ''}`}
            iconClassName="text-blue"
            size="lg"
            iconName="plus"
            toolTipType="info"
            toolTipPosition="left"
            toolTipEffect="float"
            toolTipText={`Allocate ${selectedObjectIds.length} element to span`}
            onClickFunction={() => toggleModal('allocateToSpan')}
          />
        </div>
        <MDBListGroup
className="">
          {unAllocatedElements.map((el, index) => (
            <MDBListGroupItem
              key={el.id}
              id={el.object_id}
              className={`hoverBgPrimaryFaded1 cursor-pointer ${
                selectedObjectIds.includes(el.object_id)
                  ? 'bgPrimaryFaded3'
                  : ''
              }`}
            >
              <MDBInput
                containerClass="pl-0"
                label={el.name}
                key={el.id ? el.name + el.id : el.name + index}
                checked={selectedObjectIds.includes(el.object_id)}
                type="checkbox"
                id={`checkBox${el.object_id}`}
                onChange={() => handleElementSelect(el)}
              />
            </MDBListGroupItem>
          ))}
        </MDBListGroup>
      </div>
      {/* {unAllocatedElements.map((el, index) => (
        <MDBInput
          label={el.name}
          key={el.id ? el.name + el.id : el.name + index}
          checked={selectedObjectIds.includes(el.object_id)}
          type="checkbox"
          id={`checkBox${el.object_id}`}
          onChange={() => handleElementSelect(el)}
        />
      ))} */}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  bridge: makeSelectBridge(),
  selectedObjectIds: makeSelectSelectedObjectIds(),
  selectedElements: makeSelectSelectedElements(),
  bridgeElements: makeSelectBridgeElements(),
  bridgeSpans: makeSelectBridgeSpans(),
  elementsGroups: makeSelectElementsGroups(),
  elementsTypes: makeSelectElementsTypes(),
  structureTypes: makeSelectStructureTypes(),
  mode: makeSelectMode(),
  focusedElement: selectors.makeSelectFocusedElement(),
});

const mapDispatchToProps = dispatch => ({
  onElementsSelected: ids => dispatch(elementsSelected(ids)),
  onShowInView: (view, componentName, mode, id) => dispatch(showInView(view, componentName, mode, id)),
  onToggleModal: modalData => dispatch(toggleModal(modalData)),
  onToggleAlert: data => dispatch(toggleAlert(data)),
  onUpdateElements: elements => dispatch(updateElements(elements)),
  onElementSelected: (id, mode) => dispatch(elementSelected(id, mode)),
  editSpan: span => dispatch(updateSpan(span)),
  onEditElement: element => dispatch(editElement(element)),
  onZoomToElement: objectId => dispatch(zoomToElement(objectId)),
})

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(SpansTab);
