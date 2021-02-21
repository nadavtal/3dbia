import React, { Component, memo } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';

import { createStructuredSelector } from 'reselect';
import { makeSelectModalOpen, makeSelectModalData } from '../App/selectors';
import {TOGGLE_MODAL} from '../App/constants';
import  Dropdown  from '../../components/DropDown/Dropdown';
import Form from '../Forms/Form'
import './Modal.css'
class ModalPage extends Component {

confirm = (data, event) => {
  // console.log(data)
  // if(event) {
    // console.log('lalsdkjalskdjlaksjdlkasjdlkas')
    this.props.modalData.confirmFunction(data, event);

  // }
  // this.props.onToggleModal()

}

render() {

  const modalData = this.props.modalData;

  return (
    <MDBContainer>
      {/* <MDBBtn onClick={this.props.onToggleModal}>Modal</MDBBtn> */}
      <MDBModal
        isOpen={this.props.modalOpen}
        // toggle={this.props.onToggleModal}
        disableFocusTrap
      >
        <MDBModalHeader
          className="bgPrimary color-white"
          toggle={this.props.onToggleModal}
        >
          {modalData.title}
        </MDBModalHeader>
        <MDBModalBody>
          {modalData.text}
          {modalData.formType ? (
            <Form
              formType={modalData.formType}
              editMode={modalData.editMode}
              colWidth={modalData.colWidth}
              {...modalData.data}
              createFunction={(data, event) => this.confirm(data, event)}
              editFunction={(data, event) => this.confirm(data, event)}
              onBlurFunction={value =>
                this.props.modalData.onBlurFunction
                  ? this.props.modalData.onBlurFunction(value)
                  : console.log('No Blur Function')
              }
            />
          ) : (
            modalData.body
          )}
          
        </MDBModalBody>
        <MDBModalFooter>
          {modalData.cancelButton ? (
            <MDBBtn 
              // color="secondary" 
              className="bgSecondary"
              rounded
              onClick={this.props.onToggleModal}>
              {modalData.cancelButton}
            </MDBBtn>
          ) : (
            ''
          )}
          {modalData.confirmButton ? (
            <MDBBtn 
              // color="primary" 
              className="bgPrimary"
              rounded
              onClick={modalData.confirmFunction}>
              {modalData.confirmButton}
            </MDBBtn>
          ) : (
            ''
          )}
        </MDBModalFooter>
      </MDBModal>
    </MDBContainer>
  );
  }
}

const mapStateToProps = createStructuredSelector({
  modalOpen: makeSelectModalOpen(),
  modalData: makeSelectModalData(),
});

const mapDispatchToProps = dispatch => {
  return {
    onToggleModal: () => dispatch({type: TOGGLE_MODAL}),
  }
}
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(ModalPage);
// export default connect(mapStateToProps, mapDispatchToProps)(ModalPage);
