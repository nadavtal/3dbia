import React, {memo} from 'react'

import '@grapecity/wijmo.touch';
import * as wjCore from '@grapecity/wijmo';
import { CellMaker, SparklineMarkers } from '@grapecity/wijmo.grid.cellmaker';
import { DataMap } from '@grapecity/wijmo.grid';
import { FlexGrid, FlexGridColumn, FlexGridCellTemplate } from '@grapecity/wijmo.react.grid';
import * as wjGrid from '@grapecity/wijmo.grid';
import { FlexGridFilter } from '@grapecity/wijmo.react.grid.filter';
import { createTableColumnsArray } from './tableUtils'
import { FlexGridDetail } from '@grapecity/wijmo.react.grid.detail';
import * as wjcGridDetail from '@grapecity/wijmo.grid.detail';
import { FlexGridSearch } from '@grapecity/wijmo.react.grid.search';
import { GroupPanel as FlexGridGroupPanel } from '@grapecity/wijmo.react.grid.grouppanel';
import { ListBox } from '@grapecity/wijmo.react.input';
import { InputDate, InputTime } from '@grapecity/wijmo.react.input';
import IconButtonToolTip from '../../components/IconButtonToolTip/IconButtonToolTip';
import DateField from 'components/DateField/DateField';
import SimpleTable from 'containers/MyTables/SimpleTable';
import {sortBy} from 'utils/dataUtils'
import Roles from '../../components/Roles';
wjCore.setLicenseKey('localhost,194534385925989#B0ORe36Nxs4azNjQFl5UWtWZGxEars4TwB7djFTauRFUYRlb7ITR5YVRzVVeRpWNTd4KkdXeQVlTV9EdFF6RyQEVOJmMxwUb7JzKHdGbuNDWZZmMIRlQMhWULp4TxI6R4IzN7pndElURIhHePJ4YyE7QudVRZxWePlEM6hmZ9sSNrF6YT9Ee7pGex96bud7LHlHb5czbaVzRWVmW6QjayQDcvUDWRt4aQpmb6tiYh34UOh6NH5UMXVzawF4KlJ4b8NGSjlmWOtUYvJWV6ZWMw3EeFdzQEdjNGhVYzx4QOBDUFZTRDZ5M6Ajb0h6S6NEdvlmI0IyUiwiI8MUO7UzQ9UjI0ICSiwCN4gTO9QjM9ITM0IicfJye#4Xfd5nIzMEMCJiOiMkIsISZy36Qg2Wbql6ViojIOJyebpjIkJHUiwiI4ADOzgDMgYDM8ADMyAjMiojI4J7QiwiI4N7boxWYj3GbiojIz5GRiwiIslmLvNmLtFmbh5GQzRWYsl6ZiojIh94QiwiI9gTO5ITO5gzM4MTN4kTMiojIklkIs4nIyYHMyAjMiojIyVmdiwSZzxWYmpjIyNHZisnOiwmbBJye0ICRiwiI34zZwcjdNtESuFnZV9makJDSzcDWUR7NllHehRVVhh6byYkTlpGTvgzLywkMjBTMThHOMlVRyJFdUtiWJFnYrgTNNxGeZZma5lmc0JTRsp7MyAnVOp5VLBjTkFHazkGWxlUYGpYavQ');
wjCore.setLicenseKey('localhost,194534385925989#B0j3EjT9ImYrcjcy2CbKB5YDZzTIhHUR5GW7FUNWdDZtdVdMNTN8gmTndnbQlHZ4kDOiFDdWR4LUFHZNZDVU9WNzZzMGRmQEhHRJRWYLlFevYnZ5JTe5EVSrY7NzpVQHRjNKlWbFxGTZNXYvRlcklWVFFHN4NVVMV6MzdGTMRkThNTNTlUc5FleVZTU92ycnhzSUBTVFdjavokZ4IDbOtkb5ZDS7J6L6hHWylTdpJ6NHRHMBhTTEdEVvRlVIVWaPZVQ7V6QilENvY4cLF7Z7gETBFnZVdjaUh7cHJUMhB7L6tmMPRHStRmaKFTUspGbQpXVhNlI0IyUiwiI4EEOChzM7MjI0ICSiwCM4kTOwUTM8gTM0IicfJye&Qf35VfiMzQwIkI0IyQiwiIlJ7bDBybtpWaXJiOi8kI1tlOiQmcQJCLigDNyQDNwAiMwIDMxIDMyIiOiQncDJCLiIDNy8SN5IjLyIjMuUzMiojIz5GRiwiIslmLvNmLtFmbh5GQzRWYsl6ZiojIh94QiwiI9gTO5ITO5gzM4MTN4kTMiojIklkIs4nIyYHMyAjMiojIyVmdiwSZzxWYmpjIyNHZisnOiwmbBJye0ICRiwiI34zZRpmewwGavwEM4gTcKdHb9M6N9dGdYtCNTdFTQxGMkJlTUlUQMh6SDJHajdkR7gUN8RUTJRFMSRmNromaKhzbZl7Q0VDeKhlU4JUT9Q6L4sySyFGeRBneMBjNxRzNY5ULusj');

class WijmoTable extends React.Component {
    //
    constructor(props) {
        super(props);
        this.dp = React.createRef();
        // console.log(props)
        //
        this.gridInitialized = (flexgrid) => {
            // create extra header row
            // const extraRow = new wjGrid.Row();
            // extraRow.allowMerging = true;

            // // add extra header row to the grid
            // const panel = flexgrid.columnHeaders;
            // panel.rows.splice(0, 0, extraRow);
            // //
            // // populate the extra header row
            // for (let colIndex = 1; colIndex <= 2; colIndex++) {
            //     panel.setCellData(0, colIndex, 'Bridge data');
            // }
            //
            // merge "Country" and "Active" headers vertically
            // ['name', 'bid'].forEach(function(binding) {
            //     let col = flexgrid.getColumn(binding);
            //     col.allowMerging = true;
            //     panel.setCellData(0, col.index, col.header);
            // });

            // center-align merged header cells

            // new wjcGridDetail.FlexGridDetailProvider(flexgrid, {

            //     // use animation when showing details
            //     isAnimated: true,
          
            //     // create detail cells for a given row
            //     createDetailCell: (row) => {
            //       let cell = document.createElement('div')
            //       var gridChild = new wjGrid.FlexGrid(cell, {
            //         headersVisibility: wjGrid.HeadersVisibility.Column,
            //         isReadOnly: true,
            //         autoGenerateColumns: false,
            //         itemsSource: this.subDataByField(row),
            //         columns: [
            //           { header: 'ID', binding: 'id' },
            //           { header: 'Name', binding: 'name' },

            //         ]
            //       });
          
            //       return cell;
            //     }
            //   });
            flexgrid.formatItem.addHandler(function (s, e) {
                // console.log(e.panel)
                // console.log(s.columnHeaders)
                // console.log(e.range.rowSpan)
                // if (e.panel == s.columnHeaders && e.range.rowSpan > 1) {
                //     const html = e.cell.innerHTML;
                //     console.log(html)
                //     e.cell.innerHTML = '<div class="v-center">' + html + '</div>';
                // }

                if (e.panel == s.topLeftCells) {
                    e.cell.innerHTML = (
                      `<span className="column-picker-icon glyphicon glyphicon-cog">*</span>`
                    );

                }
            });
            // flexgrid.formatItem.addHandler((s, e) => {
            //     if (e.panel == s.topLeftCells) {
            //         e.cell.innerHTML = (
            //           `<span className="column-picker-icon glyphicon glyphicon-cog">*</span>`
            //         );

            //     }
            // });
            // show the column picker when the user clicks the top-left cell
            let ref = flexgrid.hostElement.querySelector(".wj-topleft");
            
            ref.addEventListener("mousedown", e => {
                // console.log(e.target)
                console.log(wjCore.hasClass(e.target, "column-picker-icon"))
                // if (wjCore.hasClass(e.target, "column-picker-icon")) {
                    let host = this.columnPicker.hostElement;
                    console.log(host)
                    if (!host.offsetHeight) {
                        wjCore.showPopup(host, ref, false, true, false);
                        this.columnPicker.focus();
                    }
                    else {
                        wjCore.hidePopup(host, true, true);
                        flexgrid.focus();
                    }
                    this.columnPicker.focus();
                    e.preventDefault();
                // }
            });
            
            flexgrid.hostElement.addEventListener("mousedown", e => {
                // console.log(flexgrid.hitTest(e))
                if (wjCore.hasClass(e.target, "wj-cell") && !wjCore.hasClass(e.target, "wj-header") && e.button == 0) {
                    const hti = flexgrid.hitTest(e);
                    const rowData = this.state.flex.rows[hti.row].dataItem;
                    // console.log(rowData)
                    rowData && this.props.onRowClick(rowData)
                }

              });
            
            // work around Safari/IOS bug (TFS 321525, 361500, 402670)
            // https://developer.mozilla.org/en-US/docs/Web/Events/click#Safari_Mobile
            window.addEventListener('touchstart', (e) => {
                let host = this.columnPicker.hostElement;
                if (!wjCore.contains(host, e.target) && !wjCore.closest(e.target, '.wj-flexgrid')) {
                    hidePopup(host, true, true);
                }
            });
            this.setState({ flex: flexgrid }, () => {
                this.state.flex.itemsSource = this._createItemsSource(this.state.itemsCount);
            });
            console.log(this.dp)
            var detail = this.dp.current.control;
            // save the original showDetail method
            const _showDetail = detail.showDetail;
            // override the method
            detail.showDetail = function(row, hide) {
              // call the original method
              _showDetail.call(this, row, hide);
              
              setTimeout(() => {
                flexgrid.deferUpdate(() => {
                  flexgrid.autoSizeRows();
                //   wjCore.Control.getControl('.wj-flexgrid').autoSizeRows();
                });
              }, 10);
            }



        };
        this.detailTemplate = (ctx) => {
            return (
              <div className="">
                <div className="detailedHeader">
                  {this.props.detailedHeader}
                </div>
                <div className="p-2">
                  <SimpleTable 
                        data={this.props.detailedData ? this.props.detailedData(ctx) : this.subDataByField(ctx)}
                        onRowClick={row => this.props.onDetailedRowClick(row)}
                        selectionMode="Row"
                        tableConfig={{
                            exludesFields: [

                            ],
            
                            editableFields: [],
                            longFields: [],
                            // tableName: selectedElements.length ? selectedElements[0].element_type_name : 'No elements selected',
                            dateFields: [],
                            fixedColumns: [],
                            wholeNumberFields: [],
                            decimelNumberFields: [],
                          }}
                        />
                </div>
              </div>
            );
        };
        
        this.dateCellEditTemplate = (ctx) => {
            console.log(ctx)
            const value = ctx.value;
            return (<InputDate className="cell-editor" format="MM/dd/yyyy" isRequired={false} value={value ? value : null} valueChanged={ctl => ctx.value = ctl.value}/>);
        };
        //
        this.timeCellEditTemplate = (ctx) => {
            const value = ctx.value;
            return (<InputTime className="cell-editor" format="HH:mm" isRequired={false} value={value ? value : null} valueChanged={ctl => ctx.value = ctl.value}/>);
        };
        //
        this.formatItem = this.formatItem.bind(this);
        //
        this.dueDateField = (ctx) => {
        
            return (<DateField date={ctx.item.due_date}/>);
        };
        this.startDateField = (ctx) => {
        
            return (<DateField date={ctx.item.start_date}/>);
        };
        this.updatedAtField = (ctx) => {
            // console.log(ctx)
            return (<DateField date={ctx.item.due_date}/>);
        };
        this.createdAtField = (ctx) => {
            // console.log(ctx)
            return (<DateField date={ctx.item.createdAt}/>);
        };
        this.countryCellTemplate = (ctx) => {
            const country = this._countryMap.getDataItem(ctx.item.countryId) || Country.NotFound;
            return (<React.Fragment>
                <span className={`flag-icon flag-icon-${country.flag}`}/>
                {' '}{country.name}{' '}
            </React.Fragment>);
        };
        //
        this.colorCellTemplate = (ctx) => {
            const color = (this._colorMap.getDataItem(ctx.item.colorId) || KeyValue.NotFound).value;
            return (<React.Fragment>
                <span className="color-tile" style={{ background: color }}/>
                {' '}{color}{' '}
            </React.Fragment>);
        };
        //
        this.changeCellTemplate = (ctx) => {
            const change = ctx.item.change;
            let cssClass = '';
            let displayValue = '';
            if (wjCore.isNumber(change)) {
                if (change > 0) {
                    cssClass = 'change-up';
                }
                else if (change < 0) {
                    cssClass = 'change-down';
                }
                displayValue = wjCore.Globalize.formatNumber(change, 'c');
            }
            else if (!wjCore.isUndefined(change) && change !== null) {
                displayValue = wjCore.changeType(change, wjCore.DataType.String);
            }
            return (<span className={cssClass}>
                {displayValue}
            </span>);
        };
        //
        
        //
        this.itemsCountChanged = (e) => {
            this.setState({
                itemsCount: parseInt(e.target.value),
            }, () => {
                this.state.flex.itemsSource.collectionChanged.removeAllHandlers();
                this._lastId = this.state.itemsCount;
                this.state.flex.itemsSource = this._createItemsSource(this.state.itemsCount);
            });
        };
        //
        this.exportToExcel = () => {
            const exportService = this.props.exportService;
            const { isExcelPreparing: preparing, isExcelExporting: exporting } = this.state;
            const resetState = () => this.setState({
                isExcelPreparing: false,
                isExcelExporting: false,
                excelProgress: 0,
            });
            if (!preparing && !exporting) {
                this.setState({ isExcelPreparing: true });
                exportService.startExcelExportAsync(this.state.flex, () => {
                    console.log('Export to Excel completed');
                    resetState();
                }, err => {
                    console.error(`Export to Excel failed: ${err}`);
                    resetState();
                }, prg => {
                    this.setState({
                        isExcelPreparing: false,
                        isExcelExporting: true,
                        excelProgress: prg,
                    });
                });
                console.log('Export to Excel started');
            }
            else {
                exportService.cancelExcelExportAsync(progress => {
                    console.log('Export to Excel canceled');
                    resetState();
                });
            }
        };
        //
        this.exportToPdf = () => {
            this.props.exportService.exportToPdf(this.state.flex, {
                countryMap: this._countryMap,
                colorMap: this._colorMap,
                historyCellTemplate: this._historyCellTemplate
            });
        };
        //

        this.state = {
            itemsCount: 20,
            flex: null,
            isExcelPreparing: false,
            isExcelExporting: false,
            excelProgress: 0,
            rowCount: '',
            cellCount: '',
        };
        this.selector = null;
        this.isDragEnabled = true;
        this.dragSrc = null;
        this.dragDst = null;
        
        this.theGrid = React.createRef();
        this.theSearch = React.createRef();
        this._lastId = this.state.itemsCount;
        // initializes data maps
        const dataService = props.dataService;

        this._historyCellTemplate = CellMaker.makeSparkline({
            markers: SparklineMarkers.High | SparklineMarkers.Low,
            maxPoints: 25,
            label: 'price history',
        });
        this._ratingCellTemplate = CellMaker.makeRating({
            range: [1, 5],
            label: 'rating'
        });
     
       
    }
    //
    formatItem(s, e) {
       console.log(s)
       console.log(e)
    }
    //
    initializedPicker(picker) {
        this.columnPicker = picker;
    }
    saveLayout() {
        localStorage.setItem("myLayout", this.flex.columnLayout);
    }
    loadLayout() {
        let layout = localStorage.getItem("myLayout");
        if (layout) {
            console.log('Settiing layout')
            this.flex.columnLayout = layout;
        }
    }
    handleDragStart(e) {
        this.dragSrc = wjCore.closest(e.target, '.wj-listbox-item');
        if (this.dragSrc) {
            e.dataTransfer.setData('text', this.dragSrc.innerHTML);
            e.dataTransfer.effectAllowed = 'move';
        }
    }
    handleDragOver(e) {
        const dragOver = wjCore.closest(e.target, '.wj-listbox-item');
        if (this.dragDst && this.dragDst !== dragOver) {
            this.removeDropMarker();
        }
        if (dragOver && dragOver !== this.dragSrc) {
            e.preventDefault();
            e.dataTransfer.dropEffect = 'move';
            this.dragDst = dragOver;
            const src = this.getElementIndex(this.dragSrc);
            const dst = this.getElementIndex(this.dragDst);
            this.removeDropMarker();
            this.addDropMarker(dst > src);
        }
        else {
            this.dragDst = null;
        }
    }
    handleDrop(e) {
        if (this.dragSrc && this.dragDst) {
            e.preventDefault();
            const src = this.getElementIndex(this.dragSrc);
            const dst = this.getElementIndex(this.dragDst);
            this.state.flex.columns.moveElement(src, dst);
        }
    }
    handleDragEnd(e) {
        this.dragSrc = null;
        this.dragDst = null;
        this.removeDropMarker();
    }
    enableDrag(e) {
        const element = e.target;
        this.isDragEnabled = element.checked;
        const host = this.columnPicker.hostElement;
        const items = host.getElementsByClassName('wj-listbox-item');
        for (let i = 0; i < items.length; i++) {
            this.enableDragItem(items[i], this.isDragEnabled);
        }
    }
    enableDragItem(item, enabled) {
        item.setAttribute('draggable', enabled.toString());
    }
    getElementIndex(element) {
        console.log(element)
        const parent = element.parentElement;
        const siblings = Array.prototype.slice.call(parent.children);
        return siblings.indexOf(element);
    }

    subDataByField(ctx) {

        const data = this.props.subData.filter(item => item[this.props.connectingChildField] == ctx.item[this.props.connectingParentField])
        console.log(data)
        return data
        // return sortBy('task_order', this.props.subData.filter(item => item[this.props.connectingChildField] == ctx.item[this.props.connectingParentField]))
    }
    removeDropMarker() {
        wjCore.removeChild(wjCore.getElement('.drop-marker'));
    }
    addDropMarker(isAfterPos) {
        const itemsGap = 10;
        const width = 6;
        const margin = itemsGap / width;
        const height = this.dragDst.clientHeight;
        const topPos = this.dragDst.offsetTop;
        const leftPos = isAfterPos
            ? (this.dragDst.offsetLeft + this.dragDst.clientWidth + margin)
            : (this.dragDst.offsetLeft - itemsGap + margin);
        const css = `top:${topPos}px;left:${leftPos}px;height:${height}px;width:${width}px`;
        const html = `<div class="drop-marker" style="${css}">&nbsp</div>`;
        wjCore.createElement(html, this.columnPicker.hostElement);
    }
    //
    componentDidMount() {
        // connect search box and grid

        let theGrid = this.theGrid.current.control;
        let theSearch = this.theSearch.current.control;
        theSearch.grid = theGrid;
       
        if (this.state.flex) {
            this.columnPicker.itemsSource = this.state.flex.columns;
            this.columnPicker.checkedMemberPath = 'visible';
            this.columnPicker.displayMemberPath = 'header';
            this.columnPicker.lostFocus.addHandler(() => {
                wjCore.hidePopup(this.columnPicker.hostElement);
            });
            this.columnPicker.formatItem.addHandler((s, e) => {
                this.enableDragItem(e.item, this.isDragEnabled);
            });
        }
    }

    //
    componentDidUpdate(prevProps) {
        // console.log('componentDidUpdate')
        if (prevProps.data !== this.props.data) {
            // console.log('DATA CHANGED')
            this.setState({  }, () => {
                this.state.flex.itemsSource = this._createItemsSource(this.state.itemsCount);
            });
        }
        if (prevProps.selectedItems !== this.props.selectedItems) {
            // console.log(this.props.selectedItems)
            // this.setState({  }, () => {
            //     this.state.flex.selectedItems = this.props.selectedItems;
            // });
        }
        if (prevProps.multiSelectionMode !== this.props.multiSelectionMode) {
            if (!this.props.multiSelectionMode) {
                
                this.state.flex.rows.forEach(r => {
                  r.isSelected = false;
                });

            }
        }

        if (this.state.flex) {
            this.columnPicker.itemsSource = this.state.flex.columns;
            this.columnPicker.checkedMemberPath = 'visible';
            this.columnPicker.displayMemberPath = 'header';
            this.columnPicker.lostFocus.addHandler(() => {
                wjCore.hidePopup(this.columnPicker.hostElement);
            });
            this.columnPicker.formatItem.addHandler((s, e) => {
                this.enableDragItem(e.item, this.isDragEnabled);
            });
        }
      }
    //
    componentWillUnmount() {
        this.props.exportService.cancelExcelExportAsync();
    }
    //
    render() {

        return (
          <div className="container-fluid">
            <div className="row align-items-center mb-2">
              <div className="toolbar-item col-sm-3 col-md-5">
                <FlexGridSearch
                  ref={this.theSearch}
                  placeholder="Search"
                  cssMatch=""
                />
              </div>

              <div className="toolbar-item col-sm-3 col-md-3" />
              <div className="toolbar-item col-sm-3 col-md-2 d-flex text-right" />

              <div className="toolbar-item col-sm-3 col-md-2 d-flex text-right justify-content-around">
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
                  iconClassName="color-red"
                  iconName="file-pdf"
                  toolTipType="info"
                  toolTipPosition="left"
                  toolTipEffect="float"
                  toolTipText="Export To PDF"
                  onClickFunction={this.exportToPdf}
                />
              </div>
            </div>

            <FlexGridGroupPanel
              grid={this.state.flex}
              placeholder={'Drag columns here to create groups'}
            />

            <FlexGrid
              ref={this.theGrid}
              className={this.props.className}
              autoGenerateColumns={false}
              frozenColumns={this.props.tableConfig.fixedColumns}
              allowPinning="SingleColumn"
              newRowAtTop
              showMarquee
              selectionMode={this.props.selectionMode}
              validateEdits={false}
              initialized={this.gridInitialized}
              allowDragging={
                this.props.tableConfig.allowDragging
                  ? this.props.tableConfig.allowDragging
                  : false
              }
              //   formatItem={this.formatItem}
            >
              <FlexGridFilter />
              <div
                className="column-picker-div"
                onDragStart={this.handleDragStart.bind(this)}
                onDragOver={this.handleDragOver.bind(this)}
                onDrop={this.handleDrop.bind(this)}
                onDragEnd={this.handleDragEnd.bind(this)}
              >
                <ListBox
                  className="column-picker"
                  initialized={this.initializedPicker.bind(this)}
                />
              </div>
              {console.log(this.props)}
              {createTableColumnsArray(
                this.props.data[0],
                this.props.tableConfig,
              ).map(column => {
                switch (column.accessor) {
                  case 'due_date':
                    return (
                      <FlexGridColumn
                        key={column.accessor}
                        header={column.header}
                        binding={column.accessor}
                        format="MMM d yyyy"
                        width={column.width}
                        isReadOnly={true}
                      >
                        <FlexGridCellTemplate
                          cellType="Cell"
                          template={this.dueDateField}
                        />
                      </FlexGridColumn>
                    );
                  case 'start_date':
                    return (
                      <FlexGridColumn
                        key={column.accessor}
                        header={column.header}
                        binding={column.accessor}
                        format="MMM d yyyy"
                        align={column.align}
                        width={column.width}
                        isReadOnly={true}
                      >
                        <FlexGridCellTemplate
                          cellType="Cell"
                          template={this.startDateField}
                        />
                      </FlexGridColumn>
                    );

                  case 'updatedAt':
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
                          template={this.updatedAtField}
                        />
                      </FlexGridColumn>
                    );
                  case 'createdAt':
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
                          template={this.createdAtField}
                        />
                      </FlexGridColumn>
                    );

                  default:
                    return (
                      <FlexGridColumn
                        key={column.accessor}
                        header={column.header}
                        binding={column.accessor}
                        align={column.align}
                        width={column.width}
                        isReadOnly={true}
                      />
                    );
                }
              })}
              <FlexGridDetail
                isAnimated
                ref={this.dp}
                // maxHeight={350}
                // template={this.detailTemplate}
                template={ctx => (
                  <>
                    <h6>{this.props.detailedHeader}</h6>
                    <SimpleTable
                      data={
                        this.props.detailedData
                          ? this.props.detailedData(ctx)
                          : this.subDataByField(ctx)
                      }
                      onRowClick={row =>
                        this.props.onDetailedRowClick(row)
                      }
                      selectionMode="Row"
                      tableConfig={{
                        exludesFields: [],
                        editableFields: [],
                        longFields: ['name'],
                        // tableName: selectedElements.length ? selectedElements[0].element_type_name : 'No elements selected',
                        dateFields: [],
                        fixedColumns: [],
                        wholeNumberFields: [],
                        decimelNumberFields: [],
                        showFilters: true,
                      }}
                    />
                    {/* <Roles
                      // roles={allRoles}
                      users={this.subDataByField(ctx)}
                      type="organizationUsers"
                      handleAction={(actionName, val) =>
                        console.log(actionName, val)
                      }
                      handleChecked={userRole => console.log(userRole)}
                    /> */}
                  </>
                )}
              />
            </FlexGrid>
          </div>
        );
    }
    //
    //
    get productMap() {
        return this._productMap;
    }
    //
    get countryMap() {
        return this._countryMap;
    }
    //
    get colorMap() {
        return this._colorMap;
    }
    //
    get historyCellTemplate() {
        return this._historyCellTemplate;
    }
    //
    get ratingCellTemplate() {
        return this._ratingCellTemplate;
    }

   
    //
    _createItemsSource(count, start) {
        // console.log('_createItemsSource')
        // const data = this.props.dataService.getData(counter);
        const data = this.props.data;
        const view = new wjCore.CollectionView(data, {
            getError: (item, prop) => {
                const displayName = this.state.flex.columns.getColumn(prop).header;
                // return this.props.dataService.validate(item, prop, displayName);
            },
        });
        view.collectionChanged.addHandler((s, e) => {
            // initializes new added item with a history data
            if (e.action === wjCore.NotifyCollectionChangedAction.Add) {
                e.item.history = this.props.dataService.getHistoryData();
                e.item.id = this._lastId;
                this._lastId++;
            }
        });
        return view;
    }
    // build a data map from a string array using the indices as keys
    _buildDataMap(items) {
        const map = [];
        for (let i = 0; i < items.length; i++) {
            map.push({ key: i, value: items[i] });
        }
        return new DataMap(map, 'key', 'value');
    }

    // addData(data, cnt) {
    //     let more = this.getData(cnt, data.length);
    //     console.log(more)
    //     for (let i = 0; i < more.length; i++) {
    //         data.push(more[i]);
    //     }
    // }

    // getData(cnt, start) {
    //     let data = [];
        
    //     if (start == null) {
    //         start = 0;
    //     }
    //     for (let i = 0; i < cnt; i++) {
    //         if (this.props.data[start + i]) {
    //             data.push(this.props.data[start + i]);
    //         }
    //     }
    //     return data;
    // }
}

export default memo(WijmoTable)