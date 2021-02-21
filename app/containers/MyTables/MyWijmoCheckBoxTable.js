import React from 'react'

import '@grapecity/wijmo.touch';
import * as wjCore from '@grapecity/wijmo';
import { CellMaker, SparklineMarkers } from '@grapecity/wijmo.grid.cellmaker';
import { DataMap } from '@grapecity/wijmo.grid';
import { FlexGrid, FlexGridColumn, FlexGridCellTemplate } from '@grapecity/wijmo.react.grid';
import { FlexGridFilter } from '@grapecity/wijmo.react.grid.filter';
import { Selector } from "@grapecity/wijmo.grid.selector";
import { FlexGridDetail } from '@grapecity/wijmo.react.grid.detail';
import { FlexGridSearch } from '@grapecity/wijmo.react.grid.search';
import { GroupPanel as FlexGridGroupPanel } from '@grapecity/wijmo.react.grid.grouppanel';
import { ListBox } from '@grapecity/wijmo.react.input';
import { InputDate, InputTime } from '@grapecity/wijmo.react.input';
import IconButtonToolTip from '../../components/IconButtonToolTip/IconButtonToolTip';
import DateField from 'components/DateField/DateField';
import { MDBIcon, MDBSimpleChart } from 'mdbreact';
import {sortBy} from 'utils/dataUtils'
import { isDueDatePassed } from 'utils/dateTimeUtils';
import { createTableColumnsArray } from './tableUtils';
import './Tables.css'
wjCore.setLicenseKey('localhost,194534385925989#B0ORe36Nxs4azNjQFl5UWtWZGxEars4TwB7djFTauRFUYRlb7ITR5YVRzVVeRpWNTd4KkdXeQVlTV9EdFF6RyQEVOJmMxwUb7JzKHdGbuNDWZZmMIRlQMhWULp4TxI6R4IzN7pndElURIhHePJ4YyE7QudVRZxWePlEM6hmZ9sSNrF6YT9Ee7pGex96bud7LHlHb5czbaVzRWVmW6QjayQDcvUDWRt4aQpmb6tiYh34UOh6NH5UMXVzawF4KlJ4b8NGSjlmWOtUYvJWV6ZWMw3EeFdzQEdjNGhVYzx4QOBDUFZTRDZ5M6Ajb0h6S6NEdvlmI0IyUiwiI8MUO7UzQ9UjI0ICSiwCN4gTO9QjM9ITM0IicfJye#4Xfd5nIzMEMCJiOiMkIsISZy36Qg2Wbql6ViojIOJyebpjIkJHUiwiI4ADOzgDMgYDM8ADMyAjMiojI4J7QiwiI4N7boxWYj3GbiojIz5GRiwiIslmLvNmLtFmbh5GQzRWYsl6ZiojIh94QiwiI9gTO5ITO5gzM4MTN4kTMiojIklkIs4nIyYHMyAjMiojIyVmdiwSZzxWYmpjIyNHZisnOiwmbBJye0ICRiwiI34zZwcjdNtESuFnZV9makJDSzcDWUR7NllHehRVVhh6byYkTlpGTvgzLywkMjBTMThHOMlVRyJFdUtiWJFnYrgTNNxGeZZma5lmc0JTRsp7MyAnVOp5VLBjTkFHazkGWxlUYGpYavQ');
wjCore.setLicenseKey('localhost,194534385925989#B0j3EjT9ImYrcjcy2CbKB5YDZzTIhHUR5GW7FUNWdDZtdVdMNTN8gmTndnbQlHZ4kDOiFDdWR4LUFHZNZDVU9WNzZzMGRmQEhHRJRWYLlFevYnZ5JTe5EVSrY7NzpVQHRjNKlWbFxGTZNXYvRlcklWVFFHN4NVVMV6MzdGTMRkThNTNTlUc5FleVZTU92ycnhzSUBTVFdjavokZ4IDbOtkb5ZDS7J6L6hHWylTdpJ6NHRHMBhTTEdEVvRlVIVWaPZVQ7V6QilENvY4cLF7Z7gETBFnZVdjaUh7cHJUMhB7L6tmMPRHStRmaKFTUspGbQpXVhNlI0IyUiwiI4EEOChzM7MjI0ICSiwCM4kTOwUTM8gTM0IicfJye&Qf35VfiMzQwIkI0IyQiwiIlJ7bDBybtpWaXJiOi8kI1tlOiQmcQJCLigDNyQDNwAiMwIDMxIDMyIiOiQncDJCLiIDNy8SN5IjLyIjMuUzMiojIz5GRiwiIslmLvNmLtFmbh5GQzRWYsl6ZiojIh94QiwiI9gTO5ITO5gzM4MTN4kTMiojIklkIs4nIyYHMyAjMiojIyVmdiwSZzxWYmpjIyNHZisnOiwmbBJye0ICRiwiI34zZRpmewwGavwEM4gTcKdHb9M6N9dGdYtCNTdFTQxGMkJlTUlUQMh6SDJHajdkR7gUN8RUTJRFMSRmNromaKhzbZl7Q0VDeKhlU4JUT9Q6L4sySyFGeRBneMBjNxRzNY5ULusj');

class WijmoTable extends React.Component {
    //
    constructor(props) {
        super(props);
        
        //
        this.gridInitialized = (flexgrid) => {
            // console.log(flexgrid)
            // flexgrid.rows.forEach(
            //   r => {

            //     r.isSelected = this.props.selected.includes(r.dataItem) ? true : false;
            //   },
            // );
            this.selector = new Selector(flexgrid, {
                itemChecked: () => {
     
                    let selectedItems = [...flexgrid.selectedItems]
                    console.log(selectedItems)
                    if (selectedItems.length) {

                      if (props.multiSelectionMode) {
                        this.props.handleCheckboxClick(selectedItems[0].groupDescription ? null : selectedItems)
                      } else {
                        selectedItems[0].groupDescription && selectedItems.shift();
                        this.props.handleCheckboxClick(selectedItems.length ? selectedItems : null)
                      }
                    } else {
                      this.props.handleCheckboxClick([])
                    }
                    this.state.flex.select(-1,-1)
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
                // console.log(wjCore.hasClass(e.target, "column-picker-icon"))
                // if (wjCore.hasClass(e.target, "column-picker-icon")) {
                if (e.button == 0) {
                    let host = this.columnPicker.hostElement;
                    console.log(host)
                    // if (!host.offsetHeight) {
                    //     wjCore.showPopup(host, ref, false, true, false);
                    //     this.columnPicker.focus();
                    // }
                    // else {
                    //     wjCore.hidePopup(host, true, true);
                    //     flexgrid.focus();
                    // }
                    // this.columnPicker.focus();
                    e.preventDefault();
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
                // console.log('COLLAPSING', this.state.flex)
                this.state.flex.itemsSource = this._createItemsSource(this.state.itemsCount);
                this.state.flex.collapseGroupsToLevel(0);
                // this.state.flex.itemsSource = this.getData(this.state.itemsCount, 0);
                // this.state.data = this.getData(this.state.itemsCount, 0);
            });
            flexgrid.hostElement.addEventListener("mousedown", e => {
                // console.log(wjCore.hasClass(e.target, "wj-column-selector"))
                // console.log(e.target)
                // console.log(this.props.multiSelectionMode)
                const trg = e.target.tagName === 'LABEL' ? e.target.querySelector('input[type="checkbox"]') : e.target
                // console.log(trg);
                if (wjCore.hasClass(trg, "wj-column-selector"))  {
                  // console.log('this.props.multiSelectionMode', this.props.multiSelectionMode)
                 if (!this.props.multiSelectionMode) {
       
                      const chked = !e.target.checked;
                      const hti = flexgrid.hitTest(e);
                      flexgrid.rows.forEach(r => {
                        r.isSelected = r.index === hti.row && chked;

                      });
                    }
                    // console.log(flexgrid.selectedItems)
                    

                }
              });
            flexgrid.groupHeaderFormat = this.props.tableConfig.groupHeaderFormat;
            // console.log(flexgrid)
            // console.log(this.state.flex)
            
            // this.setState({
            //     rowCount: flexgrid.rows.length.toString(),
            //     cellCount: flexgrid.hostElement
            //         .querySelectorAll(".wj-cell")
            //         .length.toString()
            // });
            // flexgrid.updatedView.addHandler((s, e) => {
            //     this.setState({
            //         rowCount: s.rows.length.toString(),
            //         cellCount: s.hostElement.querySelectorAll(".wj-cell").length.toString()
            //     });
            // });
            // flexgrid.scrollPositionChanged.addHandler((s, e) => {
            //     // console.log(this.state.flex.itemsSource)
            //     // if we're close to the bottom, add 20 items
            //     if (s.viewRange.bottomRow >= s.rows.length - 1) {
            //         let view = s.collectionView;
            //         let index = view.currentPosition; // keep position in case the view is sorted
            //         this.addData(this.state.flex.itemsSource.items, 20);
            //         view.refresh();
            //         view.currentPosition = index;
            //     }
            // });
        };

        this.productDetailTemplate = (ctx) => {
            const pStyle = {
                whiteSpace: 'normal'
            };
            return (<React.Fragment>
                <h3>Product Specifications</h3>
                {/* <ul>
                    <li>Size: <b>{ctx.item.size}</b></li>
                    <li>Weight: <b>{ctx.item.weight}</b></li>
                    <li>Quantity: <b>{ctx.item.quantity}</b></li>
                </ul>
                <h4>Description</h4> */}
                <p style={pStyle}>{ctx.item.description}</p>
            </React.Fragment>);
        };
        //
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
        this.dueDateField = (ctx, accessor) => {
            // console.log(ctx)
            return (<DateField date={ctx.item[accessor]}/>);
        };
        this.completedField = (ctx) => {
            const isPast = isDueDatePassed(ctx.item.due_date);
            return <MDBSimpleChart
            strokeColor={
                ctx.item.completed == 100
                ? 'green'
                : 'red'
            }
            strokeWidth={3}
            width={30}
            height={30}
            percent={ctx.item.completed}
            labelFontWeight="normal"
            labelFontSize="13"
            labelColor={
                ctx.item.completed !== 100 && isPast
                ? 'red'
                : 'green'
            }
            // railColor={'blue'}
          />;
        };
        this.updatedAtField = (ctx) => {
            // console.log(ctx)
            return (<DateField date={ctx.item.updatedAt}/>);
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
        // this._productMap = this._buildDataMap(dataService.getProducts());
        // this._countryMap = new DataMap(dataService.getCountries(), 'id', 'name');
        // this._colorMap = this._buildDataMap(dataService.getColors());
        // initializes cell templates
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
    initGroupPanel = panel => {
        panel.refreshed.addHandler((s, e) => {
          let groups = s.hostElement.querySelectorAll(".wj-groupmarker");
          // console.log(groups)
          groups.forEach(g => {
            const groupName = g.innerText.slice(0, -1).toLowerCase().split(' ').join('_')
            console.log(groupName)
            console.log(this.props.tableConfig.groups)
            // let rgx = /\s*(Bridge name|Survey name)\s*/i;
            // let text = g.innerText;
            // if (rgx.test(text.substr(0, text.length - 1))) {
              console.log(this.props.tableConfig.groups.includes(groupName))
            if (this.props.tableConfig.groups.includes(groupName)) {
              g.removeChild(g.querySelector(".wj-remove"));
            }
          });
        });
      };
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
        console.log(this.props.data)

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
        // this.setState({
        //     gridData: new wjcCore.CollectionView(this.state.flex.columns, {
        //         // sortDescriptions: ["country", "product"],
        //         groupDescriptions: ["bridge_name"]
        //     })
        // });
    }

    //
    componentDidUpdate(prevProps) {
        // console.log('componentDidUpdate', this.props.data)
 
        // console.log('this.props.selectedItems', this.props.selectedItems)
        if (prevProps.data !== this.props.data) {
            console.log('DATA CHANGED', this.props.multiSelectionMode)
            this.setState({}, () => {
                this.state.flex.itemsSource = this._createItemsSource(this.state.itemsCount);
                // this.state.flex.collapseGroupsToLevel(0);
                // this.state.flex.itemsSource = this.getData(this.state.itemsCount, 0);
                // this.state.data = this.getData(this.state.itemsCount, 0);
            });
            if (!this.props.multiSelectionMode) {
                this.state.flex.rows.forEach(r => {
                    r.isSelected = false;
                  });
            }
        }
        // console.log('prevProps.selected',prevProps.selected)
        // console.log('this.props.selected',this.props.selected)
        // if (prevProps.selected !== this.props.selected) {
        // console.log(this.state.flex.rows)
        // console.log(typeof(this.state.flex.rows))
    
        this.props.selected && this.state.flex.rows.forEach(
          r => {
      
            console.log(this.props.selected.includes(r.dataItem))
            r.isSelected = this.props.selected.includes(r.dataItem) ? true : false;
          },
        );
        // this.state.flex.select(-1,-1)
        // }
        // if (prevProps.multiSelectionMode !== this.props.multiSelectionMode) {
        //     if (!this.props.multiSelectionMode) {
        //         console.log()
        //         this.state.flex.rows.forEach(r => {
        //           r.isSelected = false;
        //         });

        //     } else {
        //         console.log(this.state.flex)
        //         console.log(this.state.flex.itemsSource.groupDescriptions)
        //     //    this.state.flex.itemsSource.groupDescriptions = []
        //     }
        // }
        // console.log(this.state.flex)
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

              <div className="toolbar-item col-sm-3 col-md-3">
                {/* <div className="input-group">
                  <span className="input-group-addon">Items:</span>
                  <select
                    className="form-control"
                    value={this.state.itemsCount}
                    onChange={this.itemsCountChanged}
                  >
                    <option value="5">5</option>
                    <option value="50">50</option>
                    <option value="500">500</option>
                    <option value="5000">5,000</option>
                    <option value="50000">50,000</option>
                    <option value="100000">100,000</option>
                  </select>
                </div> */}
              </div>
              <div className="toolbar-item col-sm-4 col-md-3 d-flex text-right" />

              <div className="toolbar-item col-sm-2 col-md-1 d-flex text-right justify-content-around">
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
            {/* {console.log(this.props.tableConfig.hideGroupPanel)} */}
            {!this.props.tableConfig.hideGroupPanel && <FlexGridGroupPanel
              initialized={this.initGroupPanel}
              grid={this.state.flex}
              placeholder={'Drag columns here to create groups'}
            />}

            <FlexGrid
              className={this.props.className}
              ref={this.theGrid}
              autoGenerateColumns={false}
              autoRowHeights={true}
              allowPinning={this.props.tableConfig.allowPinning ? this.props.tableConfig.allowPinning : false}
              frozenColumns={this.props.tableConfig.frozenColumns}
              newRowAtTop
              showMarquee
              selectionMode={this.props.tableConfig.selectionMode}
              validateEdits={false}
              initialized={this.gridInitialized}
              allowDragging={this.props.tableConfig.allowDragging}
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
              {/* <FlexGridDetail
                isAnimated
                template={this.productDetailTemplate}
              /> */}

              {/* <FlexGridColumn header="Bridge name" binding="bridge_name" width={70} isReadOnly={true}/> */}
              {this.props.data && this.props.data[0] && createTableColumnsArray(
                this.props.data[0],
                this.props.tableConfig

              ).map(column => {
                if (
                  this.props.tableConfig.dateFields &&
                  this.props.tableConfig.dateFields.includes(column.accessor)
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
                        template={(ctx) => this.dueDateField(ctx, column.accessor)}
                      />
                    </FlexGridColumn>
                  );
                } else if (
                  this.props.tableConfig.editableFields &&
                  this.props.tableConfig.editableFields.includes(column.accessor)
                ) {
                  return (
                    <FlexGridColumn
                      binding={column.accessor}
                      header={column.header}
                      format={column.format}
                      width={column.width}
                      align={column.align}
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
        console.log('_createItemsSource')
        // const data = this.props.dataService.getData(counter);
        const data = this.props.data;
        const view = new wjCore.CollectionView(data, {
            getError: (item, prop) => {
                const displayName = this.state.flex.columns.getColumn(prop).header;
                // return this.props.dataService.validate(item, prop, displayName);
            },
            groupDescriptions: this.props.tableConfig.groups
           
        });
        // console.log(view)
        view.collectionChanged.addHandler((s, e) => {
            // initializes new added item with a history data
            
            if (e.action === wjCore.NotifyCollectionChangedAction.Add) {
                e.item.history = this.props.dataService.getHistoryData();
                e.item.id = this._lastId;
                this._lastId++;
            }

            view.groups && view.groups.map(group => {
                // console.log(group)
               return sortBy('task_order', group.items, false)
            })
        });
        view.groupDescriptions.collectionChanged.addHandler(function(s,e){
            console.log(s)
            console.log(e)
            console.log(view.groupDescriptions)
            // var sorts=cv.sortDescriptions;
            //     cv.deferUpdate(function() {
            //             cv.stableSort = true;
            //       sorts.clear();
            //       cv.groupDescriptions.forEach(function(gd) {
            //         var gsd = new wijmo.collections.SortDescription(gd.propertyName, true);
            //         sorts.push(gsd);
            //       });
                 
            //     });
            //     cv.moveCurrentToPosition(0);
              
            })
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

export default WijmoTable