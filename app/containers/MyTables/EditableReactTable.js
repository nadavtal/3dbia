import React from "react";
// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";

class RenderEditable extends React.Component {
  constructor(props) {
    super();
    this.state = {
      data: props.data
    };
    this.renderEditable = this.renderEditable.bind(this);
  }
  renderEditable(cellInfo) {
    return (
      <div
        style={{ backgroundColor: "#fafafa" }}
        contentEditable
        suppressContentEditableWarning
        onBlur={e => {
          const data = [...this.state.data];
          data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
          this.setState({ data });
        }}
        dangerouslySetInnerHTML={{
          __html: this.state.data[cellInfo.index][cellInfo.column.id]
        }}
      />
    );
  }
  render() {
    const { data } = this.state;
    return (
      <div>
        <ReactTable
          data={data}
          columns={ Object.keys(data[0]).map(key => {
            return {
              Header: key,
              accessor: key,
              minWidth: 200,
              resizable: false,
              Cell: this.renderEditable
            }
          })}
          // columns={[
          //   {
          //     Header: "First Name",
          //     accessor: "firstName",
          //     Cell: this.renderEditable
          //   },
          //   {
          //     Header: "Last Name",
          //     accessor: "lastName",
          //     Cell: this.renderEditable
          //   },
          //   {
          //     Header: "Full Name",
          //     id: "full",
          //     accessor: d =>
          //       <div
          //         dangerouslySetInnerHTML={{
          //           __html: d.firstName + " " + d.lastName
          //         }}
          //       />
          //   }
          // ]}
          defaultPageSize={data.length}
          className="-striped -highlight"
        />
      </div>
    );
  }
}

export default RenderEditable
