import React, { Component } from "react";
import ReactDOM from "react-dom";

import * as wjOdata from "@grapecity/wijmo.odata";
import { FlexGrid, FlexGridColumn } from "@grapecity/wijmo.react.grid";
import { FlexGridDetail } from "@grapecity/wijmo.react.grid.detail";

import * as wjcGridDetail from "@grapecity/wijmo.grid.detail";
import * as wjcCore from "@grapecity/wijmo";
import * as wjcGrid from "@grapecity/wijmo.grid";

import SimpleTable from './SimpleTable';

import "@grapecity/wijmo.styles/wijmo.css";
// import "./style.css";

class DetailedTable extends Component {
  constructor() {
    super();
    this._catToProductMap = new Map();
    this.dp = React.createRef();
    this.state = {
      categories: [],
      products: []
    };
  }

  componentDidMount() {
    const url = "https://services.odata.org/Northwind/Northwind.svc";
    this.setState({
    //   categories: new wjOdata.ODataCollectionView(url, "Categories", {
    //     fields: ["CategoryID", "CategoryName", "Description"]
    //   }),
    //   products: new wjOdata.ODataCollectionView(url, "Products")
    });
  }
  getProducts(categoryID) {
    let categoryProducts = this._catToProductMap.get(categoryID);
    if (!categoryProducts) {
      categoryProducts = this.state.products.items.filter(
        product => product.CategoryID === categoryID
      );
      this._catToProductMap.set(categoryID, categoryProducts);
    }
    return categoryProducts;
  }

  initGrid(grid) {
    var detail = this.dp.current.control;
    // save the original showDetail method
    const _showDetail = detail.showDetail;
    // override the method
    detail.showDetail = function(row, hide) {
      // call the original method
      _showDetail.call(this, row, hide);
      
      setTimeout(() => {
        // auto size the new detail row
        grid.deferUpdate(() => {
          grid.autoSizeRows();
        });
      }, 10);
    }
  }


  render() {
    return (
      <div className="">
        <FlexGrid
          itemsSource={this.props.data}
          initialized={this.initGrid.bind(this)}
          isReadOnly
        >
          <FlexGridColumn
            header="Category Name"
            binding="CategoryName"
            width="*"
          />
          <FlexGridColumn
            header="Description"
            binding="Description"
            width="2*"
          />
          <FlexGridDetail
            ref={this.dp}
            isAnimated
            template={ctx => (
              <SimpleTable data={this.props.subData} />
            )}
          />
        </FlexGrid>
      </div>
    );
  }
}

export default DetailedTable
