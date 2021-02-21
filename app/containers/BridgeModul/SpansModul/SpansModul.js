import React, { useState, useRef, memo, useEffect } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { MDBInput, MDBBtn, MDBIcon, MDBAnimation  } from 'mdbreact';
import IconButtonToolTip from 'components/IconButtonToolTip/IconButtonToolTip';
import TableHeader from 'components/TableHeader';
import { toggleModal, keyPressed, toggleAlert } from 'containers/App/actions';
import SpanRow from './SpanRow'
import { sortBy } from 'utils/dataUtils';
import Select from 'components/Select/Select';
import styled from 'styled-components';
import LoadingIndicator from 'components/LoadingIndicator'
import './SpansModule.css'
import {
    makeSelectLoading,
    makeSelectCurrentUser,
    makeSelectCurrentUserRole
  } from 'containers/App/selectors';
  import { 
    makeSelectBridge, 
    makeSelectStructureTypes,
    makeSelectBridgeSpans,
   } from 'containers/BridgeModul/selectors';
import { makeSelectBottomViewSize } from 'containers/ResizableLayOut/selectors';
import { saveSpans, deleteBridgeSpan } from '../actions'

const SpansModule = ({
    structureTypes,
    bridge,
    onSaveSpans,
    bridgeSpans,
    onToggleAlert,
    show = true,
    onDeleteBridgeSpan,
    currentUser,
    bottomViewSize
}) => {
    const [numSpans, setNumSpans] = useState();
    const [spans, setSpans] = useState([]);
    const [updating, setUpdating] = useState(false);
    const [canSave, setCanSave] = useState(false)
    useEffect(() => {
        console.log(bridgeSpans)
        // setSpans(sortBy('span_order', bridgeSpans))
        setSpans(bridgeSpans)
        setNumSpans(bridgeSpans.length);
        setUpdating(false)
        setCanSave(false)
    }, [bridgeSpans])

    const createSpanRows = (e) => {
        
        // setNumSpans(+e.target.value)
        console.log(numSpans)
        console.log(typeof(numSpans))
        // let index = 0
        // while (index <= numSpans) {
        let spans = []
        for (let index = 0; index < e.target.value; index++) {
            const newSpan = {
                bid: bridge.bid,
                structure_type_id: null,
                name: `span_${index+1}`,
                description: '',
                span_order: index+1,
                span_area: 0,
                status: '',
            }
            // console.log(newSpan)
            spans.push(newSpan)
            
        }
        setSpans(spans);
        setNumSpans(e.target.value)
    }
    const addSpanRow = () => {
        const newSpan = {
            bid: bridge.bid,
            structure_type_id: null,
            name: `span_${spans.length+1}`,
            description: '',
            span_order: '',
            span_area: 0,
            status: '',
            }
        setSpans([...spans, newSpan])
    }

    const changeSpanOrder = (direction, index, span) => {
        // console.log(direction, index, span)
        setCanSave(true)
        let updatedSpans = [...spans]
        updatedSpans.splice(index, 1);

        // let spanToUpdate = updatedSpans.splice(index,1)[0];
        // console.log(spanToUpdate)
        console.log(updatedSpans)
        if (direction == 'up') {
            updatedSpans.splice(index+1, 0, span)

        } else {
            updatedSpans.splice(index-1, 0, span)
        }
        console.log(updatedSpans)
        // const spanToUpdate = updatedSpans.find(s => s.span_order == span.span_order)
        // updatedSpans.filter(s => s.name !== span.name)

        setSpans(updatedSpans)
    }

    const removeSpan = (spanId) => {
        let updatedSpans = [...spans];
        // updatedSpans.splice(index, 1);
        onToggleAlert({
            title: 'Are you sure want to delete this span?',
            // text: 'blah blah blah blah',
            confirmButton: 'Delete',
            cancelButton: 'Cancel',
            alertType: 'danger',
            confirmFunction: () =>  onDeleteBridgeSpan(spanId, currentUser.userInfo.id)
          });
                
    }
    const onChangeSpan = (span, element, value) => {
      console.log(span, element, value)
      let updatedSpans = [...spans]
      updatedSpans.find(s => s.name == span.name)[element] = value
      setSpans(updatedSpans)
      !canSave && setCanSave(true)
    }
    const SpanRows = () => {
        
        // return sortBy('span_order', spans).map(span => <SpanRow 
        return spans.map((span, index) => <SpanRow 
            inputSpan={span} 
            index={index}
            structureTypes={structureTypes} 
            onChangeSpan={(element, value) => onChangeSpan(span, element, value)}
            changeSpanOrder={(direction, index, span) => changeSpanOrder(direction, index, span)}/>)
    }

    const propareSaveSpans = () => {
        console.log(spans);
        let canBeSaved = true
        for (let index = 0; index < spans.length; index++) {

            if (spans[index].structure_type_id ==  null) {
                
                onToggleAlert({
                    title: 'Structure type is required',
                    text: `Please update structure type in ${spans[0].name}`,
                    confirmButton: 'Got it',
                    // cancelButton: 'Got it',
                    alertType: 'danger',
                    // confirmFunction: () =>  setSpans(updatedSpans)
                });
                canBeSaved = false 
                break
            } 
         }
         if (canBeSaved) {
             spans.forEach((span, index) => {
                
                 span.span_order = index + 1
                 // if (span.id) spansToUpdate.push(span)
                 // else spansToCreate.push(span)
             })
             // if (spansToCreate.length) onSaveSpans(spans)
             console.log('SAVING SPANSSSSSSSS', spans)
             onSaveSpans(spans)
             setUpdating(true)

         }

    }
//    console.log(structureTypes)
    const Header = () => (
      // <MDBAnimation type="bounceInRight">
        <div className="d-flex justify-content-between align-items-center p-2">
          {/* <div className={`p-1 ${!spans.length && 'border-dark-blue-2'}`}>
            <MDBInput
              className={`p-1`}
              // containerClass={`border-dark-blue-2`}
              label="Number os spans"
              type="number"
              onChange={createSpanRows}
              value={numSpans}
            />
          </div> */}
          <div className="title bold">{!spans.length ? 'Create Spans' : 'Edit Spans'}</div>
          <div className="d-flex justify-content-between">
            <MDBBtn
              disabled={!canSave}
              size="sm"
              className="mr-3 bgSecondary"
              onClick={() => propareSaveSpans()}
            >
              <MDBIcon icon="save" className="mr-1" />
              Save
            </MDBBtn>
            <MDBBtn
              size="sm"
              className="mr-5 bgPrimary"
              onClick={() => addSpanRow()}
            >
              <MDBIcon icon="plus" className="mr-1" />
              Add Span
            </MDBBtn>
          </div>
        </div>
      // </MDBAnimation>
    );
    const scrollContainerStyle = {
      // width: "100%", 
     //  maxHeight: `calc(100vh)-${theme.layout.topBarSize}`, 
      minHeight: bottomViewSize.height - 100,
      maxHeight: bottomViewSize.height - 100, 
      maxWidth: '100%', 
      overFlowY: 'auto',
      // overFlowY: 'auto',
      // overFlowX: 'auto'
     }; 
    return (
      <div className={`spansModule ${show ? '' : 'offScreenBottom'}`}>
        <Header />
        <MDBAnimation type="bounceInUp">
          {!updating ? (
            <>
              <TableHeader className="row no-gutters">
                <div className="col-2 pl-1">Name</div>
                <div className="col-4 text-center">Description</div>
                <div className="col-2 text-center">Structure type</div>
                <div className="col-1 text-center">Area</div>
                <div className="col-2 text-center">Status</div>
                <div className="col-1" />
              </TableHeader>
              <div style={scrollContainerStyle}
                className="scrollbar scrollbar-primary">
                {spans && spans.map((span, index) => {
                    return (
                      <div
                        className="row no-gutters border-bottom py-1"
                        key={index}
                      >
                        <div className="col-2">
                          <MDBInput
                            // id={`spanName`}
                            className=""
                            labelClass="d-none"
                            type="text"
                            value={span.name}
                            onChange={e =>
                              onChangeSpan(
                                span,
                                'name',
                                e.target.value,
                              )
                            }
                          />
                        </div>
                        <div className="col-4">
                          <MDBInput
                            // id="spanDescription"
                            className=""
                            labelClass="d-none"
                            type="text"
                            value={span.description}
                            onChange={e =>
                              onChangeSpan(
                                span,
                                'description',
                                e.target.value,
                              )
                            }
                          />
                        </div>
                        <div className="col-2">
                          <Select
                            value={span.structure_type_id}
                            className="fullWidth spansModuleSelect"
                            labelClass="d-none"
                            label="Structure type"
                            options={structureTypes}
                            onChange={val =>
                              onChangeSpan(
                                span,
                                'structure_type_id',
                                val,
                              )
                            }
                          />
                        </div>
                        <div className="col-1 pl-1">
                          <MDBInput
                            className=""
                            labelClass="d-none"
                            label="Area"
                            type="number"
                            value={span.span_area}
                            onChange={e =>
                              onChangeSpan(
                                span,
                                'span_area',
                                e.target.value,
                              )
                            }
                          />
                        </div>
                        <div className="col-2">
                          <MDBInput
                            className=""
                            labelClass="d-none"
                            label="Status"
                            type="text"
                            value={span.status}
                            onChange={e =>
                              onChangeSpan(
                                span,
                                'status',
                                e.target.value,
                              )
                            }
                          />
                        </div>
                        <div className="col-1 text-center">
                          {index !== 0 && (
                            <IconButtonToolTip
                              className=""
                              size="sm"
                              iconName="arrow-alt-circle-up"
                              toolTipType="info"
                              toolTipPosition="left"
                              toolTipEffect="float"
                              toolTipText="Move up"
                              onClickFunction={() =>
                                changeSpanOrder(
                                  'down',
                                  index,
                                  span,
                                )
                              }
                            />
                          )}
                          <IconButtonToolTip
                            className="color-red"
                            size="sm"
                            iconName="trash"
                            toolTipType="error"
                            toolTipPosition="left"
                            toolTipEffect="float"
                            toolTipText="Remove span"
                            onClickFunction={() =>
                              removeSpan(span.id)
                            }
                          />
                          {index !== spans.length - 1 && (
                            <IconButtonToolTip
                              className=""
                              size="sm"
                              iconName="arrow-alt-circle-down"
                              toolTipType="info"
                              toolTipPosition="left"
                              toolTipEffect="float"
                              toolTipText="Move down"
                              onClickFunction={() =>
                                changeSpanOrder(
                                  'up',
                                  index,
                                  span,
                                )
                              }
                            />
                          )}
                        </div>
                      </div>
                    );

                  })}
              </div>
            </>
          ) : (
            <LoadingIndicator />
          )}

        </MDBAnimation>
      </div>
    );
}

const mapStateToProps = createStructuredSelector({
    currentUser: makeSelectCurrentUser(),
    currentUserRole: makeSelectCurrentUserRole(),
    loading: makeSelectLoading(),
    bridge: makeSelectBridge(),
    structureTypes: makeSelectStructureTypes(),
    bridgeSpans: makeSelectBridgeSpans(),
    bottomViewSize: makeSelectBottomViewSize(),
  });
  
  const mapDispatchToProps = dispatch => {
    return {
      onToggleAlert: alertData => dispatch(toggleAlert(alertData)),
      onToggleModal: modalData => dispatch(toggleModal(modalData)),
      onDeleteBridgeSpan: (spanId, userId) => dispatch(deleteBridgeSpan(spanId, userId)),
      onSaveSpans: spans => dispatch(saveSpans(spans)),
    };
  };
  
  const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps,
  );

  export default compose(
    withConnect,
    memo,
  )(SpansModule);