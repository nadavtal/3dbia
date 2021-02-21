import React from 'react';
import { MDBRow, MDBCol, MDBBtn, MDBInput, MDBFileInput } from "mdbreact";
const action = (props) => {
  console.log(props.action)
  switch (props.action.type) {
    case('upload'):
      return <MDBRow className="">
              <MDBCol md="12">
              <MDBFileInput
                btnTitle= {props.action.name}
                textFieldTitle={props.action.name}

                />
              </MDBCol>

            </MDBRow>




    case('download'):
        return <MDBRow className="">
                <MDBCol md="12">
                  <MDBBtn
                    size ="sm"
                    color="mdb-color"
                    disabled={false}
                    className={'CustomButton text-center'}
                    onClick={() => console.log('buttonclick')}>
                      {props.action.name}
                  </MDBBtn>
                </MDBCol>

              </MDBRow>

    default:
      return <MDBRow className="">
                <MDBCol md="12">
                  <MDBBtn
                    size ="sm"
                    color="mdb-color"
                    disabled={false}
                    className={'CustomButton text-center'}
                    onClick={() => console.log('buttonclick')}>
                      {props.action.name}
                  </MDBBtn>
                </MDBCol>

              </MDBRow>
  }

}

export default action
