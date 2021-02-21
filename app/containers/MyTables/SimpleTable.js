import React, { useState, useMemo, useRef, useEffect } from 'react';

import * as wjcGrid from '@grapecity/wijmo.react.grid';
import { FlexGrid, FlexGridColumn, FlexGridCellTemplate } from '@grapecity/wijmo.react.grid';
import { FlexGridFilter } from '@grapecity/wijmo.react.grid.filter';
import { FlexGridDetail } from '@grapecity/wijmo.react.grid.detail';
import * as wjCore from '@grapecity/wijmo';
import { createTableColumnsArray } from './tableUtils';
import { FlexGridSearch } from '@grapecity/wijmo.react.grid.search';
import DateField from 'components/DateField/DateField';
import { isDueDatePassed } from 'utils/dateTimeUtils';
import { MDBIcon, MDBInput, MDBSimpleChart } from 'mdbreact';
import { InputDate, InputTime, ComboBox, AutoComplete, InputColor, InputNumber } from '@grapecity/wijmo.input';
import { roleSelected } from '../App/actions';
import { GroupPanel as FlexGridGroupPanel } from '@grapecity/wijmo.react.grid.grouppanel';
import IconButtonToolTip from '../../components/IconButtonToolTip/IconButtonToolTip';
const currentUser = JSON.parse(localStorage.getItem('currentUser'))
const currentUserRole = JSON.parse(localStorage.getItem('currentUserRole'))
wjCore.setLicenseKey('localhost,194534385925989#B0j3EjT9ImYrcjcy2CbKB5YDZzTIhHUR5GW7FUNWdDZtdVdMNTN8gmTndnbQlHZ4kDOiFDdWR4LUFHZNZDVU9WNzZzMGRmQEhHRJRWYLlFevYnZ5JTe5EVSrY7NzpVQHRjNKlWbFxGTZNXYvRlcklWVFFHN4NVVMV6MzdGTMRkThNTNTlUc5FleVZTU92ycnhzSUBTVFdjavokZ4IDbOtkb5ZDS7J6L6hHWylTdpJ6NHRHMBhTTEdEVvRlVIVWaPZVQ7V6QilENvY4cLF7Z7gETBFnZVdjaUh7cHJUMhB7L6tmMPRHStRmaKFTUspGbQpXVhNlI0IyUiwiI4EEOChzM7MjI0ICSiwCM4kTOwUTM8gTM0IicfJye&Qf35VfiMzQwIkI0IyQiwiIlJ7bDBybtpWaXJiOi8kI1tlOiQmcQJCLigDNyQDNwAiMwIDMxIDMyIiOiQncDJCLiIDNy8SN5IjLyIjMuUzMiojIz5GRiwiIslmLvNmLtFmbh5GQzRWYsl6ZiojIh94QiwiI9gTO5ITO5gzM4MTN4kTMiojIklkIs4nIyYHMyAjMiojIyVmdiwSZzxWYmpjIyNHZisnOiwmbBJye0ICRiwiI34zZRpmewwGavwEM4gTcKdHb9M6N9dGdYtCNTdFTQxGMkJlTUlUQMh6SDJHajdkR7gUN8RUTJRFMSRmNromaKhzbZl7Q0VDeKhlU4JUT9Q6L4sySyFGeRBneMBjNxRzNY5ULusj');

const WijmoSimpleTable = ({
  data,
  onRowClick,
  onCellClick,
  onFinishEditinig,
  selectionMode,
  tableConfig,
  selectedRows,
  childComponent,
  className,
  style,
  allowDelete,
  allowAddNew

  // selectedRow
}) => { 

    useEffect(() => {
      // console.log(selectedRow)
      // console.log(tableRef)
      
      if (tableRef.current.control) {

        tableRef.current.control.rows.forEach(row => {
          // if (selectedRows.includes(row.dataItem)) {
            // console.log(row)
          if (selectedRows && selectedRows.includes(
            row.dataItem.object_id ? row.dataItem.object_id : row.dataItem)
            ) {
            row.isSelected = true
            // row.cssClass = 'background-offWhite'
          } else {
            row.isSelected = false
            // row.cssClass = ''
          }

        })
      }
      
      return () => {
        
      }
    }, [selectedRows, data])
    
    useEffect(() => {
      if (tableRef.current && searchRef.current) {

        let theGrid = tableRef.current.control;
            
        let theSearch = searchRef.current.control;
        theSearch.grid = theGrid;
      }
      //   return () => {
      //       cleanup
      //   }
    }, [tableRef, searchRef])
    
    const tableRef = useRef()
    const searchRef = useRef();
    const childRef = useRef()
    const table = useMemo(() => createTableColumnsArray(
      data[0],
      tableConfig
    ), tableConfig)
    const gridInitialized = (flexgrid) => {
      // console.log('INITIALIZED')
      // flexgrid.rows.forEach(row => {
      //   console.log(row.dataItem);
      //   console.log(selectedRows);
      //   if (selectedRows.includes(row.dataItem)) {
      //     // row.isSelected = true
      //     row.cssClass = 'border-y-dark-blue-1'
      //   } else {
      //     // row.isSelected = false
      //     row.cssClass = 'border-none'
      //   }
      // })
      // flexgrid.selectionChanged.addHandler((grid, e) =>
      //   {
      //       const range = e.range;
      //       console.log('selectionChanged', e)
      //       console.log('selectionChanged', grid)
      //       grid.rows.forEach(row => {
      //         row.isSelected = false
      //         // if (selectedRows.includes(row.dataItem)) {
      //           // console.log(row.dataItem)
      //         // if (selectedRows.includes(row.dataItem.object_id)) {
      //         //   row.isSelected = true
      //         //   // row.cssClass = 'background-offWhite'
      //         // } else {
      //         //   row.isSelected = false
      //         //   // row.cssClass = ''
      //         // }
      //         // if (row.dataItem == selectedRow) {
      //         //   row.isSelected = true
      //         // } else {
      //         //   row.isSelected = false
      //         // }
      //       })
      //   });
      flexgrid.beginningEdit.addHandler((s, e) => {
        // console.log('BEGING EDITGING', e)
        let col = s.columns[e.col];
        // console.log(col)
        if (e.data.type == 'keypress') {
            console.log(e.cancel)
            // e.cancel = true;
        }
      });
      flexgrid.cellEditEnding.addHandler((s, e) => {
        // console.log('END EDITING', e.row)
        // console.log('END EDITING', s.rows)
        let value = s.activeEditor.value
        let col = s.columns[e.col];
        let key = col.binding
        let row = s.rows[e.row].dataItem;
        console.log(value, typeof(value))
        if (tableConfig.wholeNumberFields.includes(key) || tableConfig.decimelNumberFields.includes(key)) {
            value = wjCore.changeType(value, wjCore.DataType.Number, col.format);
            console.log(value, typeof(value))
           
            if (!wjCore.isNumber(value) || value < 0) { // prevent negative sales/expenses
                e.cancel = true;
            } else {
              // console.log(row)
              onFinishEditinig(row, key, value)

            }
        } else {
          onFinishEditinig(row, key, value)
        }
        // console.log(row)
        // const rowData = flexgrid.rows[hti.row].dataItem;
        // if (col.binding == 'sales' || col.binding == 'expenses') {
        //     let value = wjcCore.changeType(s.activeEditor.value, wjcCore.DataType.Number, col.format);
        //     if (!wjcCore.isNumber(value) || value < 0) { // prevent negative sales/expenses
        //         e.cancel = true;
        //         this.setState({
        //             logText: 'Please enter a positive amount'
        //         });
        //     }
        // }
    });
      flexgrid.hostElement.addEventListener("mousedown", e => {
        // console.log(flexgrid.hitTest(e))
        // console.log(e.target)
        //If clicked on header
        // e.preventDefault()
        const hti = flexgrid.hitTest(e);
        // flexgrid.rows[hti.row].isSelected = false
        const rowData = flexgrid.rows[hti.row].dataItem;
        // console.log(flexgrid.rows[hti.row])
        flexgrid.rows[hti.row].isSelected = false
        if (wjCore.hasClass(e.target, "wj-header")) {
          // console.log('HEADER CLICKED')
          onRowClick(rowData)
        }
        if (wjCore.hasClass(e.target, "wj-cell") && !wjCore.hasClass(e.target, "wj-header") && e.button == 0) {
          
          rowData && onCellClick && onCellClick(rowData)
        }

      });
      flexgrid.hostElement.addEventListener("mouseup", e => {
        // console.log(flexgrid.hitTest(e))
        const hti = flexgrid.hitTest(e);
        let selectedItems = hti.grid.selectedItems;
        // console.log(selectedItems)
        // console.log(e.target)
        //If clicked on header
        const rowData = flexgrid.rows[hti.row].dataItem;
        // if (wjCore.hasClass(e.target, "wj-header")) {
        //   console.log('HEADER CLICKED')
        //   onRowClick(rowData)
        // }
        // if (wjCore.hasClass(e.target, "wj-cell") && !wjCore.hasClass(e.target, "wj-header") && e.button == 0) {
          
        //   rowData && onRowClick(rowData)
        // }

      });
    }
    
    const dateField = (ctx, accessor) => {

        return (<DateField date={ctx.item[accessor]}/>);
    };
    const inputField = (ctx, accessor) => {

        return (<MDBInput value={ctx.item[accessor]} />);
    };

    return (
      <>
        <div className="flex justify-content-between align-items-center">
          {tableConfig.showSearch && (
            <div className="mb-2">
              <FlexGridSearch
                ref={searchRef}
                placeholder="Search"
                cssMatch=""
              />
            </div>
          )}
          {/* {tableConfig.showExport && <div className="toolbar-item mt-2 d-flex text-right justify-content-around">
            <IconButtonToolTip
              size="lg"
              iconClassName="color-green"
              iconName="file-excel"
              toolTipType="info"
              toolTipPosition="left"
              toolTipEffect="float"
              toolTipText="Export to excel"
              // onClickFunction={this.exportToExcel}
            />

            <IconButtonToolTip
              size="lg"
              className="mx-3"
              iconClassName="color-red"
              iconName="file-pdf"
              toolTipType="info"
              toolTipPosition="left"
              toolTipEffect="float"
              toolTipText="Export To PDF"
              // onClickFunction={this.exportToPdf}
            />
          </div>} */}
        </div>

        
        <FlexGrid
          className={className}
          style={style ? style : {}}
          ref={tableRef}
          itemsSource={data}
          initialized={gridInitialized}
          selectionMode={selectionMode ? selectionMode : 'Cell'}
          allowAddNew={allowAddNew ? allowAddNew : false}
          allowDelete={allowDelete ? allowDelete : false}
          // allowPinning="SingleColumn"
        >
          {table.map(column => {
            if (
              tableConfig.dateFields &&
              tableConfig.dateFields.includes(column.accessor)
            ) {
              return (
                <FlexGridColumn
                  key={column.accessor}
                  header={column.header}
                  binding={column.accessor}
                  align={column.align}
                  width={column.width}
                  isReadOnly={true}
                >
                  <FlexGridCellTemplate
                    cellType="Cell"
                    template={ctx => dateField(ctx, column.accessor)}
                  />
                </FlexGridColumn>
              );
            } else if (
              tableConfig.editableFields &&
              tableConfig.editableFields.includes(column.accessor)
            ) {
              return (
                <FlexGridColumn
                  key={column.accessor}
                  binding={column.accessor}
                  header={column.header}
                  format={column.format}
                  width={column.width}
                  align={column.align}
                  align="center"
                  // template={ctx => inputField(ctx, column.accessor)}
                  // editor={
                  //   new InputNumber(document.createElement('div'), {
                  //     format: 'n2',
                  //     step: 10,
                  //     min: 0,
                  //     max: 10000,
                  //   })
                  // }
                >
                  {/* <FlexGridCellTemplate
                  cellType="Cell"
                  template={ctx => inputField(ctx, column.accessor)}
                /> */}
                </FlexGridColumn>
              );
            } else {
              return (
                <FlexGridColumn
                  key={column.accessor}
                  header={column.header}
                  binding={column.accessor}
                  format={column.format}
                  align={column.align}
                  width={column.width}
                  isReadOnly={true}
                >
                  <FlexGridCellTemplate
                    cellType="Cell"
                    // template={dateField}
                  />
                </FlexGridColumn>
              );
            }
          })}

          {tableConfig.showFilters && <FlexGridFilter />}
          {childComponent && (
            <FlexGridDetail
              isAnimated
              ref={childRef}
              // maxHeight={350}
              // template={this.detailTemplate}
              template={ctx => <h5>{ctx.item.name}</h5>}
            />
          )}
          {/* <FlexGridGroupPanel
          grid={tableRef}
          placeholder={'Drag columns here to create groups'}
        /> */}
        </FlexGrid>
      </>
    );
}

export default WijmoSimpleTable