import React, {useState, useEffect} from 'react'

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
import { InputDate, InputTime } from '@grapecity/wijmo.react.input';

// import { DataService, Country, KeyValue } from './data';
// import { ExportService } from './export';
//

const FullTable = (props) => {

    const [state, setState] = useState({
        itemsCount: 10,
        flex: null,
        isExcelPreparing: false,
        isExcelExporting: false,
        excelProgress: 0,
    })

    // useEffect(() => {
    //     effect
    //     return () => {
    //         cleanup
    //     }
    // }, [input])
    const ProductDetailTemplate = ({ctx}) => {
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
    }
    const dateCellEditTemplate = (ctx) => {
        const value = ctx.value;
        return (<InputDate className="cell-editor" format="MM/dd/yyyy" isRequired={false} value={value ? value : null} valueChanged={ctl => ctx.value = ctl.value}/>);
    };
    //
    const timeCellEditTemplate = (ctx) => {
        const value = ctx.value;
        return (<InputTime className="cell-editor" format="HH:mm" isRequired={false} value={value ? value : null} valueChanged={ctl => ctx.value = ctl.value}/>);
    };
    //
    const countryCellTemplate = (ctx) => {
        const country = _countryMap.getDataItem(ctx.item.countryId) || Country.NotFound;
        return (<React.Fragment>
            <span className={`flag-icon flag-icon-${country.flag}`}/>
            {' '}{country.name}{' '}
        </React.Fragment>);
    };
    //
    const colorCellTemplate = (ctx) => {
        const color = (_colorMap.getDataItem(ctx.item.colorId) || KeyValue.NotFound).value;
        return (<React.Fragment>
            <span className="color-tile" style={{ background: color }}/>
            {' '}{color}{' '}
        </React.Fragment>);
    };
    //
    const changeCellTemplate = (ctx) => {
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
    const gridInitialized = (ctl) => {
        ctl.itemsSource = _createItemsSource(state.itemsCount)
        setState( {...state, flex: ctl });
        selector = new Selector(ctl, {
            itemChecked: (s, e) => {
                console.log(s)
                console.log(e)
                console.log(ctl.selectedItems);
                props.handleCheckboxClick(ctl.selectedItems)
                setState({
                    ...state, selectedItems: ctl.selectedItems
                });
            }
        });
    };
    //
    const itemsCountChanged = (e) => {
        console.log(state)
        
        setState({
            itemsCount: parseInt(e.target.value),
        }, () => {
            state.flex.itemsSource.collectionChanged.removeAllHandlers();
            _lastId = state.itemsCount;
            state.flex.itemsSource = _createItemsSource(state.itemsCount);
        });
    };
    //
    const exportToExcel = () => {
        const exportService = props.exportService;
        const { isExcelPreparing: preparing, isExcelExporting: exporting } = state;
        const resetState = () => setState({
            isExcelPreparing: false,
            isExcelExporting: false,
            excelProgress: 0,
        });
        if (!preparing && !exporting) {
            setState({ isExcelPreparing: true });
            exportService.startExcelExportAsync(state.flex, () => {
                console.log('Export to Excel completed');
                resetState();
            }, err => {
                console.error(`Export to Excel failed: ${err}`);
                resetState();
            }, prg => {
                setState({
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
    const exportToPdf = () => {
        props.exportService.exportToPdf(state.flex, {
            countryMap: _countryMap,
            colorMap: _colorMap,
            historyCellTemplate: _historyCellTemplate
        });
    };
    //
    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
      }
    const createTableColumnsArray = (object) => {
        let coloumns = []
        coloumns = Object.keys(object).map(key => {
          const header = capitalizeFirstLetter(key.replace("_", " "));
    
          return {
            header: header,
            accessor: key,
          }
        })
        // console.log(coloumns)
        return coloumns
      }
      const  _createItemsSource = (counter) => {
        // const data = props.dataService.getData(counter);
        const data = props.data;
        const view = new wjCore.CollectionView(data, {
            getError: (item, prop) => {
                const displayName = state.flex.columns.getColumn(prop).header;
                return props.dataService.validate(item, prop, displayName);
            }
        });
        view.collectionChanged.addHandler((s, e) => {
            // initializes new added item with a history data
            if (e.action === wjCore.NotifyCollectionChangedAction.Add) {
                e.item.history = props.dataService.getHistoryData();
                e.item.id = _lastId;
                _lastId++;
            }
        });
        return view;
    }
    // build a data map from a string array using the indices as keys
    const _buildDataMap = (items) => {
        const map = [];
        for (let i = 0; i < items.length; i++) {
            map.push({ key: i, value: items[i] });
        }
        return new DataMap(map, 'key', 'value');
    }
    let selector = null;
   
    const theGrid = React.createRef();
    const theSearch = React.createRef();
    const _lastId = state.itemsCount;
    // initializes data maps
    const dataService = props.dataService;
    const _productMap = _buildDataMap(dataService.getProducts());
    const _countryMap = new DataMap(dataService.getCountries(), 'id', 'name');
    const _colorMap = _buildDataMap(dataService.getColors());
    // initializes cell templates
    const _historyCellTemplate = CellMaker.makeSparkline({
        markers: SparklineMarkers.High | SparklineMarkers.Low,
        maxPoints: 25,
        label: 'price history',
    });
    const _ratingCellTemplate = CellMaker.makeRating({
        range: [1, 5],
        label: 'rating'
    });

    return (<div className="container-fluid">
                <div className="row">
                    <div className="toolbar-item col-sm-3 col-md-5">
                        <FlexGridSearch ref={theSearch} placeholder="Search" cssMatch=""/>
                    </div>

                    <div className="toolbar-item col-sm-3 col-md-3">
                        <div className="input-group">
                            <span className="input-group-addon">Items:</span>
                            <select className="form-control" value={state.itemsCount} onChange={itemsCountChanged}>
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
                        <button className="btn btn-default btn-block" disabled={state.isExcelPreparing} onClick={exportToExcel}>
                            {state.isExcelExporting ? `Cancel (${state.excelProgress}% done)` : 'Export To Excel'}
                        </button>
                    </div>

                    <div className="toolbar-item col-sm-3 col-md-2">
                        <button className="btn btn-default btn-block" onClick={exportToPdf}>Export To PDF</button>
                    </div>
                </div>

                <FlexGridGroupPanel grid={state.flex} placeholder={"Drag columns here to create groups"}/>

                <FlexGrid 
                    ref={theGrid} 
                    autoGenerateColumns={false} 
                    allowAddNew 
                    allowDelete 
                    allowPinning="SingleColumn" 
                    newRowAtTop 
                    showMarquee 
                    selectionMode="MultiRange" 
                    validateEdits={false} 
                    initialized={gridInitialized}
                    >
                    <FlexGridFilter />

                    {/* <FlexGridDetail isAnimated template={productDetailTemplate}/> */}

                    {/* <FlexGridColumn header="Bridge name" binding="bridge_name" width={70} isReadOnly={true}/> */}
                    {createTableColumnsArray(props.data[0]).map(coloumn =>  {
                        // console.log(coloumn)
                        return <FlexGridColumn

                            header={coloumn.header} 
                            binding={coloumn.accessor} 
                            // width={70} 
                            isReadOnly={true}/>
                    })}
                    {/* <FlexGridColumn header="Date" binding="date" format="MMM d yyyy" isRequired={false} width={130}>
                        <FlexGridCellTemplate cellType="CellEdit" template={dateCellEditTemplate}/>
                    </FlexGridColumn>
                    <FlexGridColumn header="Country" binding="countryId" dataMap={countryMap} width={145}>
                        <FlexGridCellTemplate cellType="Cell" template={countryCellTemplate}/>
                    </FlexGridColumn>
                    <FlexGridColumn header="Price" binding="price" format="c" isRequired={false} width={100}/>
                    <FlexGridColumn header="History" binding="history" align="center" width={180} allowSorting={false} cellTemplate={historyCellTemplate}/>
                    <FlexGridColumn header="Change" binding="change" align="right" width={115}>
                        <FlexGridCellTemplate cellType="Cell" template={changeCellTemplate}/>
                    </FlexGridColumn>
                    <FlexGridColumn header="Rating" binding="rating" align="center" width={180} cssClass="cell-rating" cellTemplate={ratingCellTemplate}/>
                    <FlexGridColumn header="Time" binding="time" format="HH:mm" width={95}>
                        <FlexGridCellTemplate cellType="CellEdit" template={timeCellEditTemplate}/>
                    </FlexGridColumn>
                    <FlexGridColumn header="Color" binding="colorId" dataMap={colorMap} width={145}>
                        <FlexGridCellTemplate cellType="Cell" template={colorCellTemplate}/>
                    </FlexGridColumn>
                    <FlexGridColumn header="Product" binding="productId" dataMap={productMap} width={145}/>
                    <FlexGridColumn header="Discount" binding="discount" format="p0" width={130}/>
                    <FlexGridColumn header="Active" binding="active" width={100}/> */}
                </FlexGrid>
            </div>);
    
}


export default FullTable