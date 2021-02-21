import React, { useMemo, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { FlexGrid, FlexGridColumn, FlexGridCellTemplate } from "@grapecity/wijmo.react.grid";
import { GroupPanel } from "@grapecity/wijmo.react.grid.grouppanel";
import * as wjcCore from "@grapecity/wijmo";
import * as wjcGrid from "@grapecity/wijmo.grid";
import { createTableColumnsArray } from './tableUtils';
import { FlexGridFilter } from '@grapecity/wijmo.react.grid.filter';
import { FlexGridSearch } from '@grapecity/wijmo.react.grid.search';
import "@grapecity/wijmo.styles/wijmo.css";


const UsersGroupedTable = ({
    data,
    tableConfig
}) => {
    const tableRef = useRef();
    const searchRef = useRef();
  
    useEffect(() => {
      let theGrid = tableRef.current.control;
          
      let theSearch = searchRef.current.control;
      theSearch.grid = theGrid;
      //   return () => {
      //       cleanup
      //   }
    }, [])
    const table = useMemo(
        () => createTableColumnsArray(data[0], tableConfig),
        tableConfig,
      );
    function initGrid(grid) {
        var view = grid.collectionView;
        view.groupDescriptions.push(theCreator());
        grid.groupHeaderFormat = "{value}";
        grid.collapseGroupsToLevel(0)
        grid.formatItem.addHandler((s, e) => {
            var row = s.rows[e.row];
            if (s.cells === e.panel && row instanceof wjcGrid.GroupRow) {
            var btn = e.cell.querySelector("button");
            // name is the property of CollectionViewGroup class
            // do not change this
            // in your scenario, this will return the id of the username like 282 or 285
            // var item = row.dataItem.items[0];
            // var updatedValue = `${item.first_name} ${item.last_name}`;
            var itemId = row.dataItem.name;
            const item = data.find(it => it.user_id == itemId)
            var updatedValue =  `${item.first_name} ${item.last_name}`;
            e.cell.textContent = updatedValue;
            e.cell.insertBefore(btn, e.cell.firstChild);
            }
        });
    function theCreator() {
        return new wjcCore.PropertyGroupDescription("user_id");
        }
    }

    return <>
          {tableConfig.showSearch && (
        <div className="mb-2">
          <FlexGridSearch ref={searchRef} placeholder="Search" cssMatch="" />
        </div>
      )}
        <FlexGrid
        ref={tableRef}
        itemsSource={new wjcCore.CollectionView(data)}
        initialized={initGrid}
        selectionMode={tableConfig.selectionMode ? tableConfig.selectionMode : 'Cell'}
        allowPinning={tableConfig.allowPinning ? tableConfig.allowPinning : 'SingleColumn'}
        // frozenColumns={tableConfig.frozenColumns ? tableConfig.frozenColumns : []}
        allowDragging={tableConfig.allowDragging ? tableConfig.allowDragging : false}
  
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
                align="center"
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
                align="center"
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
      {/* <FlexGrid itemsSource={new wjcCore.CollectionView(data)} initialized={initGrid} /> */}
    
    </>;
};



// function getCountries() {
//   var countries = "US,Germany,UK,Japan,Italy,Greece".split(",");
//   return countries.map((c, i) => {
//     return { id: i, name: c };
//   });
// }

// function getCountryById(id) {
//   return getCountries()[id].name;
// }





export default UsersGroupedTable
