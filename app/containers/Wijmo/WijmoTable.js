import React from 'react'

import '@grapecity/wijmo.touch';
import * as wjCore from '@grapecity/wijmo';
import { CellMaker, SparklineMarkers } from '@grapecity/wijmo.grid.cellmaker';
import { DataMap } from '@grapecity/wijmo.grid';
import { FlexGrid, FlexGridColumn, FlexGridCellTemplate } from '@grapecity/wijmo.react.grid';
import { FlexGridFilter } from '@grapecity/wijmo.react.grid.filter';
import { FlexGridDetail } from '@grapecity/wijmo.react.grid.detail';
import { FlexGridSearch } from '@grapecity/wijmo.react.grid.search';
import { GroupPanel as FlexGridGroupPanel } from '@grapecity/wijmo.react.grid.grouppanel';
import { InputDate, InputTime } from '@grapecity/wijmo.react.input';
import { DataService, Country, KeyValue } from './data';
import { ExportService } from './export';
//
class WijmoTable extends React.Component {
    //
    constructor(props) {
        super(props);
        console.log(props)
        //
        this.productDetailTemplate = (ctx) => {
            const pStyle = {
                whiteSpace: 'normal'
            };
            return (<React.Fragment>
                <h3>Product Specifications</h3>
                <ul>
                    <li>Size: <b>{ctx.item.size}</b></li>
                    <li>Weight: <b>{ctx.item.weight}</b></li>
                    <li>Quantity: <b>{ctx.item.quantity}</b></li>
                </ul>
                <h4>Description</h4>
                <p style={pStyle}>{ctx.item.description}</p>
            </React.Fragment>);
        };
        //
        this.dateCellEditTemplate = (ctx) => {
            const value = ctx.value;
            return (<InputDate className="cell-editor" format="MM/dd/yyyy" isRequired={false} value={value ? value : null} valueChanged={ctl => ctx.value = ctl.value}/>);
        };
        //
        this.timeCellEditTemplate = (ctx) => {
            const value = ctx.value;
            return (<InputTime className="cell-editor" format="HH:mm" isRequired={false} value={value ? value : null} valueChanged={ctl => ctx.value = ctl.value}/>);
        };
        //
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
        this.gridInitialized = (ctl) => {
            this.setState({ flex: ctl }, () => {
                this.state.flex.itemsSource = this._createItemsSource(this.state.itemsCount);
            });
        };
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
        this.state = {
            itemsCount: 10,
            flex: null,
            isExcelPreparing: false,
            isExcelExporting: false,
            excelProgress: 0,
        };
        this.theGrid = React.createRef();
        this.theSearch = React.createRef();
        this._lastId = this.state.itemsCount;
        // initializes data maps
        const dataService = props.dataService;
        this._productMap = this._buildDataMap(dataService.getProducts());
        this._countryMap = new DataMap(dataService.getCountries(), 'id', 'name');
        this._colorMap = this._buildDataMap(dataService.getColors());
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
    //
    componentDidMount() {
        // connect search box and grid
        let theGrid = this.theGrid.current.control;
        let theSearch = this.theSearch.current.control;
        theSearch.grid = theGrid;
    }
    //
    componentWillUnmount() {
        this.props.exportService.cancelExcelExportAsync();
    }
    //
    render() {
        return (<div className="container-fluid">
                <div className="row">
                    <div className="toolbar-item col-sm-3 col-md-5">
                        <FlexGridSearch ref={this.theSearch} placeholder="Search" cssMatch=""/>
                    </div>

                    <div className="toolbar-item col-sm-3 col-md-3">
                        <div className="input-group">
                            <span className="input-group-addon">Items:</span>
                            <select className="form-control" value={this.state.itemsCount} onChange={this.itemsCountChanged}>
                                <option value="5">5</option>
                                <option value="50">50</option>
                                <option value="500">500</option>
                                <option value="5000">5,000</option>
                                <option value="50000">50,000</option>
                                <option value="100000">100,000</option>
                            </select>
                        </div>
                    </div>

                    <div className="toolbar-item col-sm-3 col-md-2">
                        <button className="btn btn-default btn-block" disabled={this.state.isExcelPreparing} onClick={this.exportToExcel}>
                            {this.state.isExcelExporting ? `Cancel (${this.state.excelProgress}% done)` : 'Export To Excel'}
                        </button>
                    </div>

                    <div className="toolbar-item col-sm-3 col-md-2">
                        <button className="btn btn-default btn-block" onClick={this.exportToPdf}>Export To PDF</button>
                    </div>
                </div>

                <FlexGridGroupPanel grid={this.state.flex} placeholder={"Drag columns here to create groups"}/>

                <FlexGrid ref={this.theGrid} 
                    autoGenerateColumns={false} 
                    allowAddNew 
                    allowDelete 
                    allowPinning="SingleColumn" 
                    newRowAtTop 
                    showMarquee 
                    selectionMode="MultiRange" 
                    validateEdits={false} 
                    initialized={this.gridInitialized}>
                    <FlexGridFilter />

                    <FlexGridDetail isAnimated template={this.productDetailTemplate}/>

                    <FlexGridColumn header="ID" binding="id" width={70} isReadOnly={true}/>
                    <FlexGridColumn header="Date" binding="date" format="MMM d yyyy" isRequired={false} width={130}>
                        <FlexGridCellTemplate cellType="CellEdit" template={this.dateCellEditTemplate}/>
                    </FlexGridColumn>
                    <FlexGridColumn header="Country" binding="countryId" dataMap={this.countryMap} width={145}>
                        <FlexGridCellTemplate cellType="Cell" template={this.countryCellTemplate}/>
                    </FlexGridColumn>
                    <FlexGridColumn header="Price" binding="price" format="c" isRequired={false} width={100}/>
                    <FlexGridColumn header="History" binding="history" align="center" width={180} allowSorting={false} cellTemplate={this.historyCellTemplate}/>
                    <FlexGridColumn header="Change" binding="change" align="right" width={115}>
                        <FlexGridCellTemplate cellType="Cell" template={this.changeCellTemplate}/>
                    </FlexGridColumn>
                    <FlexGridColumn header="Rating" binding="rating" align="center" width={180} cssClass="cell-rating" cellTemplate={this.ratingCellTemplate}/>
                    <FlexGridColumn header="Time" binding="time" format="HH:mm" width={95}>
                        <FlexGridCellTemplate cellType="CellEdit" template={this.timeCellEditTemplate}/>
                    </FlexGridColumn>
                    <FlexGridColumn header="Color" binding="colorId" dataMap={this.colorMap} width={145}>
                        <FlexGridCellTemplate cellType="Cell" template={this.colorCellTemplate}/>
                    </FlexGridColumn>
                    <FlexGridColumn header="Product" binding="productId" dataMap={this.productMap} width={145}/>
                    <FlexGridColumn header="Discount" binding="discount" format="p0" width={130}/>
                    <FlexGridColumn header="Active" binding="active" width={100}/>
                </FlexGrid>
            </div>);
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
    _createItemsSource(counter) {
        const data = this.props.dataService.getData(counter);
        const view = new wjCore.CollectionView(data, {
            getError: (item, prop) => {
                const displayName = this.state.flex.columns.getColumn(prop).header;
                return this.props.dataService.validate(item, prop, displayName);
            }
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
}

export default WijmoTable