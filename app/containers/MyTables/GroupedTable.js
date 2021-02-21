import React, { useMemo, useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import { GroupRow } from "@grapecity/wijmo.grid";
import { FlexGrid, FlexGridColumn, FlexGridCellTemplate } from "@grapecity/wijmo.react.grid";
import { GroupPanel } from "@grapecity/wijmo.react.grid.grouppanel";
import * as wjcCore from "@grapecity/wijmo";
import * as wjcGrid from "@grapecity/wijmo.grid";
import { createTableColumnsArray } from './tableUtils';
import { FlexGridSearch } from '@grapecity/wijmo.react.grid.search';
import DateField from 'components/DateField/DateField';
import "@grapecity/wijmo.styles/wijmo.css";
import IconButtonToolTip from "../../components/IconButtonToolTip/IconButtonToolTip";
import { FlexGridFilter } from '@grapecity/wijmo.react.grid.filter';
// import "./style.css";

const GroupedTable = ({ 
    data, 
    className, 
    tableConfig,
    onRowClick,
    selectedItems
 }) => {
  const tableRef = useRef();
  const searchRef = useRef();

  useEffect(() => {
    let grid = tableRef.current.control;
        
    let theSearch = searchRef.current.control;
    if (grid) {
      theSearch.grid = grid;
      console.log(selectedItems)
      // selectedItems && syncCheckedItems(grid, selectedItems.length ? selectedItems : [selectedItems] || []);
    }
    //   return () => {
    //       cleanup
    //   }
  }, [])
    useEffect(() => {
      console.log(data)
      let grid = tableRef.current.control;
      if (grid) {
        // console.log(grid)
        var view = grid.collectionView;
        // console.log(view)
        tableConfig.groups.map(group => view.groupDescriptions.push(theCreator(group)))
        // console.log(selectedItems)
        selectedItems && syncCheckedItems(grid, selectedItems.length ? selectedItems : [selectedItems] || []);
        grid.collapseGroupsToLevel(0);
      }
    }, [data])

    useEffect(() => {
      // console.log('selectedItems', selectedItems)
      let grid = tableRef.current.control;
      if (grid) {
        selectedItems && syncCheckedItems(grid, selectedItems.length ? selectedItems : [selectedItems] || []);
      }
    }, [selectedItems])
    const table = useMemo(
      () => createTableColumnsArray(data[0], tableConfig),
      tableConfig,
    );
    const dateField = (ctx, accessor) => {
      return <DateField date={ctx.item[accessor]} />;
    };
    
    function initGrid(grid) {
     
      syncCheckedItems(grid, selectedItems || []);

      grid.invalidate();
        // console.log(grid)
        // var view = grid.collectionView;
        // tableConfig.groups.map(group => view.groupDescriptions.push(theCreator(group)))
        
        // grid.groupHeaderFormat = tableConfig.groupHeaderFormat,


        

        // grid.formatItem.addHandler((s, e) => {
        //     var row = s.rows[e.row];
        //     if (s.cells === e.panel && row instanceof wjcGrid.GroupRow && e.col === 0) {
        //         var btn = e.cell.querySelector("button");
        //         // console.log(row.groupDescription.propertyName)
        //         // name is the property of CollectionViewGroup class
        //         // do not change this
        //         // in your scenario, this will return the id of the username like 282 or 285
        //         // var item = row.dataItem.items[0];
        //         // var updatedValue = `${item.first_name} ${item.last_name}`;
        //         if (row.dataItem.groupDescription.propertyName == 'user_id') {
        //             // console.log(row.dataItem)
        //             var itemId = row.dataItem.name;
        //             const item = data.find(it => it.user_id == itemId)
        //             var updatedValue =  `${item.first_name} ${item.last_name} (${row.dataItem.items.length})`;
        //             e.cell.textContent = "";
        //             e.cell.append(btn);
        //             e.cell.innerHTML += "&nbsp;" + updatedValue;
        //         }

        //     }
        // });
        grid.hostElement.addEventListener("mousedown", e => {
            const hti = grid.hitTest(e);
            const rowData = grid.rows[hti.row].dataItem;
            grid.rows.forEach(row => row.isSelected = false)
            if (rowData.items) {
              // rowData.items.forEach(row => {
              //     // console.log(row)
              //     // console.log(grid.rows)
              //     grid.rows.find(r =>r.dataItem.id == row.id).isSelected = true
              //   })
                onRowClick(rowData.items)
            } else {
                
                onRowClick([rowData])
            }
            // selChange(grid)
        });
    }
    function selChange(g, args) {
      let currentSelection = g.rows
        .filter((r) => r.isSelected)
        // .filter((r) => r.isSelected && r.dataItem && !(r instanceof wjcGrid.GroupRow))
        .map((r) => r.dataItem);
      if (onRowClick) {
        console.log('currentSelection', currentSelection)
        console.log(selectedItems)
        if (currentSelection && currentSelection[0].items) {
          // if (currentSelection[0].items == selectedItems) onRowClick(null);
          // else 
          // onRowClick(currentSelection[0].items);

        } else {
          // if (currentSelection == selectedItems) onRowClick(null);
          // else onRowClick(currentSelection);
          // onRowClick(currentSelection);

        }
      }
    }
  
    function syncCheckedItems(grid, selectedItems) {
      console.log('syncCheckedItems selectedItems', selectedItems)
      grid.selectedItems = selectedItems;
    }
    // function syncCheckedItems(grid, itemsArr) {
    //   console.log(itemsArr)
    //   console.log(itemsArr.length)
    //   let map = new Map();
    //   if (itemsArr.length) {
    //     itemsArr.forEach((item) => {
    //       map.set(item, true);
    //     });

    //   } else {
    //     map.set(itemsArr, true);
    //   }
    //   console.log('map', map)
    //   console.log(grid.rows)
    //   grid.rows.forEach((r) => {
    //     console.log(map.has(r.dataItem))
    //     if (map.has(r.dataItem)) {
    //       r.isSelected = false;
    //     } else {
    //       r.isSelected = false;
    //     }
    //   });
    // }
    // function selChange(g, args) {
    //   let selectedItems = g.rows
    //     .filter((r) => r.isSelected)
    //     .map((r) => r.dataItem);
    //   if (onRowClick) {
    //     console.log('selectedItems', selectedItems)
    //     if (selectedItems.items) {
    //       selectedItems.items.forEach(row => {
    //         // console.log(row)
    //         // console.log(grid.rows)
    //         grid.rows.find(
    //           r => r.dataItem.id == row.id,
    //         ).isSelected = true;
    //       });
    //       onRowClick(selectedItems.items);
    //     } else {
    //       onRowClick(selectedItems);
    //     }
    //     // onRowClick(selectedItems);
    //   }
    // }
    function formatItem(s, e) {
    
      // console.log(s)
      var row = s.rows[e.row];
            if (
              s.cells === e.panel &&
              row instanceof wjcGrid.GroupRow &&
              e.col === 0
            ) {
              var btn = e.cell.querySelector('button');
              if (
                row.dataItem.groupDescription.propertyName ==
                'user_id'
              ) {
                // console.log(row.dataItem);
                var itemId = row.dataItem.name;
                // console.log('itemId', itemId)
                // console.log(data)
                const item = s.itemsSource.find(it => it.user_id == itemId);
                var updatedValue = `${item.first_name} ${
                  item.last_name
                } (${row.dataItem.items.length})`;
                e.cell.textContent = '';
                e.cell.append(btn);
                e.cell.innerHTML += '&nbsp;' + updatedValue;
              }
            }
    }
    function theCreator(groupName) {
    return new wjcCore.PropertyGroupDescription(groupName, (item, prop) => {
        return item[prop];
    });
    }
    // console.log(data)
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
          {/* <div className="toolbar-item mt-2 d-flex text-right justify-content-around">
            <IconButtonToolTip
              size="lg"
              iconClassName="color-green"
              iconName="file-excel"
              toolTipType="info"
              toolTipPosition="left"
              toolTipEffect="float"
              toolTipText="Export to excel"
              onClickFunction={this.exportToExcel}
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
              onClickFunction={this.exportToPdf}
            />
          </div> */}
        </div>
        <FlexGrid
          ref={tableRef}
          formatItem={formatItem}
          className={className}
          itemsSource={data}
          initialized={initGrid}
          selectionMode={
            tableConfig.selectionMode ? tableConfig.selectionMode : 'Cell'
          }
          // selectionChanged={selChange}
          allowPinning={tableConfig.allowPinning ? tableConfig.allowPinning : false}
          frozenColumns={tableConfig.frozenColumns ? tableConfig.frozenColumns : []}
          allowDragging={
            tableConfig.allowDragging ? tableConfig.allowDragging : false
          }
        >
          <FlexGridFilter />
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
                  binding={column.accessor}
                  header={column.header}
                  format={column.format}
                  width={column.width}
                  align={column.align}
                >
                  {/* <FlexGridCellTemplate
                cellType="Cell"
                template={ctx => inputField(ctx, column.accessor)}
                /> */}
                </FlexGridColumn>
              );
            } else {
              // console.log()
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
        </FlexGrid>
      </>

      // <div className="App">
      //   <FlexGrid
      //     itemsSource={new wjcCore.CollectionView(data)} initialized={initGrid}
      //     className={className}/>
      // </div>
    );
};


export default GroupedTable
