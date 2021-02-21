import React, { useState, useRef, memo, useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { MDBInput, MDBBtn, MDBIcon, MDBSelect } from 'mdbreact';
import IconButtonToolTip from 'components/IconButtonToolTip/IconButtonToolTip';
import TableHeader from 'components/TableHeader';
import { toggleModal, keyPressed, toggleAlert } from 'containers/App/actions';
import { sortBy } from 'utils/dataUtils';
import Select from 'components/Select/Select';
import styled from 'styled-components';
import LoadingIndicator from 'components/LoadingIndicator';
import { makeSelectBottomViewSize } from 'containers/ResizableLayOut/selectors';
// import MyWijmoTable from 'containers/MyTables/MyWijmoCheckBoxTable';
// import EditableReactTable from 'containers/MyTables/EditableReactTable';
// import FixedColumnsReactTable from 'containers/MyTables/FixedColumnsReactTable';
import SimpleTable from 'containers/MyTables/SimpleTable';

import { ExportService } from 'containers/Wijmo/export';
import './ReorderModule.css'
import {
    makeSelectLoading,
    makeSelectCurrentUser,
    makeSelectCurrentUserRole
  } from 'containers/App/selectors';
import DateField from '../DateField/DateField';

const ReorderModule = ({
    onToggleAlert,
    // show
    data,
    selected,
    show,
    exludesFields,
    dateFields,
    tableConfig,
    onRowClick,
    onFinishEditinig,
    onSaveRows,
    bottomViewSize
}) => {
    // const [numRows, setNumRows] = useState();
    const [rows, setRows] = useState(data);
    const [updating, setUpdating] = useState(false);
    const [canSave, setCanSave] = useState(false);
    const [selectedRow, setSelectedRow] = useState()
    const tableRef = useRef()
    // const selectedRow = rows.find(row => row.object_id == selected[0])
    useEffect(() => {
        // console.log(data)
        // setRows(sortBy('span_order', spansInput))
        setRows(data)
        // setNumRows(data.length);
        setUpdating(false)
        setCanSave(false)
    }, [data])
    // useEffect(() => {
    //     console.log(tableRef)
    //     // setRows(sortBy('span_order', spansInput))
    // }, [tableRef, bottomViewSize])
   
    const changeRowOrder = (direction) => {
        // const selectedRow = rows.find(row => row.object_id == selected[0])
        // console.log(selectedRow)
        const index = rows.indexOf(selectedRow);
        console.log(index)
        setCanSave(true)
        let updatedRows = [...rows]
        updatedRows.splice(index, 1);

        // let spanToUpdate = updatedRows.splice(index,1)[0];
        // console.log(spanToUpdate)
        console.log(updatedRows)
        if (direction == 'up') {
            updatedRows.splice(index+1, 0, selectedRow)

        } else {
            updatedRows.splice(index-1, 0, selectedRow)
        }
        console.log(updatedRows)
        // const spanToUpdate = updatedRows.find(s => s.span_order == row.span_order)
        // updatedRows.filter(s => s.name !== row.name)
        updatedRows.forEach((row, index) => row.element_order = index + 1)
        setRows(updatedRows)
        
    }

    const removeRow = (index) => {
        let updatedRows = [...rows];
        updatedRows.splice(index, 1);
        onToggleAlert({
            title: 'Are you sure want to delete this span?',
            // text: 'blah blah blah blah',
            confirmButton: 'Delete',
            cancelButton: 'Cancel',
            alertType: 'danger',
            confirmFunction: () =>  setRows(updatedRows)
          });
                
    }


    const handleRowClick = (row) => {
      console.log(row)
      setSelectedRow(row)
      // onRowClick(row)
    }

    const propareSaveSpans = () => {
        console.log(rows);
        let canBeSaved = true
        //  for (let index = 0; index < rows.length; index++) {

        //     if (rows[index].structure_type_id ==  null) {
        //         console.log('ALERTTTTTTTTT')
        //         onToggleAlert({
        //             title: 'Structure type is required',
        //             text: `Please update structure type in ${rows[0].name}`,
        //             confirmButton: 'Got it',
        //             // cancelButton: 'Got it',
        //             alertType: 'danger',
        //             // confirmFunction: () =>  setRows(updatedSpans)
        //         });
        //         canBeSaved = false 
        //         break
        //     } 
        //  }
         if (canBeSaved) {
             rows.forEach((span, index) => {
                
                 span.span_order = index + 1
                 // if (span.id) spansToUpdate.push(span)
                 // else spansToCreate.push(span)
             })
             // if (spansToCreate.length) onSaveSpans(rows)
             console.log('SAVING SPANSSSSSSSS', rows)
             onSaveRows()
             setUpdating(true)

         }

    }
//    console.log(structureTypes)
    
    const Layout1 = () => (
      <>
      <TableHeader className="row no-gutters">
        <div className="col-11 pl-1">
          <div className="reorderModuleRow fontSmall">
            {Object.keys(rows[0]).map(key => {
              if (!exludesFields.includes(key)) {
                const keyDispay = key.split('_').join(' ')
                return <span className="reorderModuleCell">{keyDispay}</span>;
              }
            })}
          </div>
        </div>

        <div className="col-1" />
      </TableHeader>

      {rows &&
        rows.map((row, index) => {
          // console.log(row);
          return (
            <div className="row border-bottom py-1 px-1 " key={index}>
              <div className="col-11 text-center">
                <div className="reorderModuleRow">
                  {Object.keys(row).map(key => {
                    if (!exludesFields.includes(key)) {
                      if (dateFields.includes(key)) {
       
                        return <span className="reorderModuleCell fontSmall">
                  
                          <DateField date={row[key]}/>
                       
                        </span>;
                      } else {
                        return (
                          <span className="reorderModuleCell fontSmall">
                            {row[key]}
                          </span>
                        );

                      }

                    }
                  })}
                </div>
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
                      changeRowOrder('down', index, row)
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
                  toolTipText="Remove row"
                  onClickFunction={() => removeRow(index)}
                />
                {index !== rows.length - 1 && (
                  <IconButtonToolTip
                    className=""
                    size="sm"
                    iconName="arrow-alt-circle-down"
                    toolTipType="info"
                    toolTipPosition="left"
                    toolTipEffect="float"
                    toolTipText="Move down"
                    onClickFunction={() =>
                      changeRowOrder('up', index, row)
                    }
                  />
                )}
              </div>
            </div>
          );
        })}

    </>
  
    )
    

    // console.log(bottomViewSize)
    const scrollContainerStyle = {
      // width: "100%", 
     //  maxHeight: `calc(100vh)-${theme.layout.topBarSize}`, 
      maxHeight: bottomViewSize.height - 30, 
      maxWidth: '100%', 
      overFlow: 'auto',
      // overFlowY: 'auto',
      // overFlowX: 'auto'
     }; 
     const table = useMemo(
       () => (
         <SimpleTable
           style={scrollContainerStyle}
           className="fontSmall"
           data={rows}
           tableConfig={tableConfig}
           selectedRows={selectedRow && [selectedRow.object_id]}
           onRowClick={row => handleRowClick(row)}
           onFinishEditinig={(row, cellName, value) =>
             onFinishEditinig(row, cellName, value)
           }
         />
       ),
       [rows, bottomViewSize.height, selectedRow],
     );
    return (
      <div className={`reorderModule ${show ? '' : 'offScreenBottom'}`}>
        <div className="d-flex justify-content-between align-items-center p-2">
          <div className={`p-1 ${!rows.length && 'border-dark-blue-2'}`}>
            {/* <MDBInput
              className={`p-1`}
              // containerClass={`border-dark-blue-2`}
              label="Number os rows"
              type="number"
              onChange={createSpanRows}
              value={rows.length}
            /> */}
          </div>
          <div className="title">{tableConfig.tableName}</div>
          <div className="d-flex justify-content-between mr-5">
            <MDBBtn
              disabled={!canSave}
              size="sm"
              
              className="mr-5 bgPrimary"
              onClick={() => onSaveRows(rows)}
            >
              <MDBIcon icon="save" className="mr-1" />
              Save
            </MDBBtn>
            <IconButtonToolTip
              className={`mx-3 ${(!selectedRow || rows.indexOf(selectedRow) == 0) && 'disabled'}`}
              size="2x"
              iconName="arrow-alt-circle-up"
              toolTipType="info"
              toolTipPosition="left"
              toolTipEffect="float"
              toolTipText="Move up"
              onClickFunction={() => changeRowOrder('down')}
            />
            <IconButtonToolTip
              className={`mx-3 ${(!selectedRow || rows.indexOf(selectedRow) == rows.length - 1) && 'disabled'}`}
              size="2x"
              iconName="arrow-alt-circle-down"
              toolTipType="info"
              toolTipPosition="left"
              toolTipEffect="float"
              toolTipText="Move down"
              onClickFunction={() => changeRowOrder('up')}
            />
          </div>
        </div>
        {!updating && rows.length ? (
           table
        ) : (
          <LoadingIndicator />
        )}
      </div>
    );
}

const mapStateToProps = createStructuredSelector({
    currentUser: makeSelectCurrentUser(),
    currentUserRole: makeSelectCurrentUserRole(),
    loading: makeSelectLoading(),
    bottomViewSize: makeSelectBottomViewSize(),
    
  });
  
  const mapDispatchToProps = dispatch => {
    return {
      onToggleAlert: alertData => dispatch(toggleAlert(alertData)),
      onToggleModal: modalData => dispatch(toggleModal(modalData)),
    };
  };
  
  const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps,
  );
  
  export default compose(
    withConnect,
    memo,
  )(ReorderModule);