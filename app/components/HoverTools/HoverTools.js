import React, { Component } from 'react';
import {
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBIcon,
  MDBSelect,
  MDBSelectInput,
  MDBSelectOptions,
  MDBSelectOption,
  MDBDatePicker,
  MDBTooltip,
  MDBSimpleChart,
  MDBBadge,
  MDBView,
  MDBBtn,
  MDBPagination,
  MDBPageItem,
  MDBPageNav,
  MDBCardHeader,
  MDBListGroup,
  MDBListGroupItem,
  MDBProgress,
  MDBTable,
  MDBBtnFixed,
  MDBBtnFixedItem
} from 'mdbreact';
import { Line } from 'react-chartjs-2';

class HoverTools extends Component {
  state = {
    buttonStyle: {
      transform: 'scaleY(0.4) scaleX(0.4) translateY(40px) translateX(0)',
      opacity: '0'
    }
  };

  onHover = () => {
    this.setState({
      buttonStyle: {
        transform: 'scaleY(1) scaleX(1) translateY(0) translateX(0)',
        opacity: '1'
      }
    });
  };

  onMouseLeave = () => {
    this.setState({
      buttonStyle: {
        transform: 'scaleY(0.4) scaleX(0.4) translateY(40px) translateX(0)',
        opacity: '0'
      }
    });
  };

  render() {

    return (

        <MDBBtnFixed
          onMouseEnter={this.onHover}
          onMouseLeave={this.onMouseLeave}
          floating
          color='red'
          icon='pencil-alt'
          style={{ bottom: '100px', right: '24px' }}
        >
          <MDBBtnFixedItem
            buttonStyle={this.state.buttonStyle}
            color='red'
            icon='star'
          />
          <MDBBtnFixedItem
            buttonStyle={this.state.buttonStyle}
            color='yellow'
            icon='user'
          />
          <MDBBtnFixedItem
            buttonStyle={this.state.buttonStyle}
            color='green'
            icon='envelope'
          />
          <MDBBtnFixedItem
            buttonStyle={this.state.buttonStyle}
            color='blue'
            icon='shopping-cart'
            onClick={this.handleClick}
          />
        </MDBBtnFixed>

    );
  }
}

export default HoverTools;
