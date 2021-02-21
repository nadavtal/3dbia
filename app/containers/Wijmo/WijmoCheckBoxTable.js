import React from 'react'
import { FlexGrid, FlexGridColumn } from "@grapecity/wijmo.react.grid";
import { Selector } from "@grapecity/wijmo.grid.selector";
import { HeadersVisibility } from "@grapecity/wijmo.grid";
import { CollectionView, PropertyGroupDescription } from "@grapecity/wijmo";
import {MDBInput} from 'mdbreact'
import { FlexGridFilter } from '@grapecity/wijmo.react.grid.filter';
import { FlexGridSearch } from '@grapecity/wijmo.react.grid.search';

class WijmoCheckBoxTable extends React.Component {
    constructor(props) {
        super(props);
        this.selector = null;
        this.state = {
            view: new CollectionView(props.data),
            grouped: true,
            headers: true,
            flex: null,
            selectedItems: []
        };
        this.theGrid = React.createRef();
        this.theSearch = React.createRef();
    }
    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
      }
    createTableColumnsArray(object) {
        let coloumns = []
        coloumns = Object.keys(object).map(key => {
          const header = this.capitalizeFirstLetter(key.replace("_", " "));
    
          return {
            header: header,
            accessor: key,
          }
        })
        // console.log(coloumns)
        return coloumns
      }
    initGrid(grid) {
        this.setGroups(true);
        this.selector = new Selector(grid, {
            itemChecked: (s, e) => {
                console.log(s)
                console.log(e)
                console.log(grid.selectedItems);
                this.props.handleCheckboxClick(grid.selectedItems)
                this.setState({
                    selectedItems: grid.selectedItems
                });
            }
        });
    }
    setGroups(groupsOn) {
        let groups = this.state.view.groupDescriptions;
        groups.clear();
        if (groupsOn) {
            groups.push(
                new PropertyGroupDescription('surveyName'),
                new PropertyGroupDescription('name'), 
                );
        }
        this.setState({
            grouped: groupsOn
        });
    }
    setHeaders(headersOn) {
        let theGrid = this.selector.column.grid;
        theGrid.headersVisibility = headersOn
            ? HeadersVisibility.All
            : HeadersVisibility.Column;
        this.selector.column = headersOn
            ? theGrid.rowHeaders.columns[0]
            : theGrid.columns[0];
        this.setState({
            headers: headersOn
        });
    }
    componentDidMount() {
        // connect search box and grid
        let theGrid = this.theGrid.current.control;
        let theSearch = this.theSearch.current.control;
        theSearch.grid = theGrid;
    }
    render() {
        return (
          <div className="container-fluid">
              <div className="toolbar-item col-sm-3 col-md-5">
                        <FlexGridSearch ref={this.theSearch} placeholder="Search" cssMatch=""/>
                    </div>
            <MDBInput
              label="Grouped Data"
              filled
              type="checkbox"
              id={`checkbox1`}
              containerClass=""
              checked={this.state.grouped}
              onChange={e => this.setGroups(e.target.checked)}
            />
            <MDBInput
              label="Header Column"
              filled
              type="checkbox"
              id={`checkbox2`}
              containerClass=""
              checked={this.state.headers}
              onChange={e => this.setHeaders(e.target.checked)}
            />

            <p>
              There are now <b>{this.state.selectedItems.length}</b>{' '}
              items selected.
            </p>
            <FlexGridGroupPanel grid={this.state.flex} placeholder={"Drag columns here to create groups"}/>
            <FlexGrid
            ref={this.theGrid} 
            allowAddNew 
            allowDelete
            newRowAtTop
              allowPinning="SingleColumn"
              deferResizing={true}
              showMarquee={true}
              alternatingRowStep={0}
              itemsSource={this.state.view}
              initialized={s => this.initGrid(s)}
            >
                <FlexGridFilter />
              {this.createTableColumnsArray(this.props.data[0]).map(
                coloumn => {
                  // console.log(coloumn)
                  return (
                    <FlexGridColumn
                      key={coloumn.accessor}
                      header={coloumn.header}
                      binding={coloumn.accessor}
                      // width={70}
                      isReadOnly={true}
                    />
                  );
                },
              )}
              {/* <FlexGridColumn
                binding="id"
                header="ID"
                isReadOnly={true}
              />
              <FlexGridColumn binding="country" header="Country" />
              <FlexGridColumn binding="product" header="Product" />
              <FlexGridColumn
                binding="discount"
                header="Discount"
                format="p0"
              />
              <FlexGridColumn binding="downloads" header="Downloads" />
              <FlexGridColumn binding="sales" header="Sales" />
              <FlexGridColumn binding="expenses" header="Expenses" /> */}
            </FlexGrid>
          </div>
        );
    }
}

export default WijmoCheckBoxTable

