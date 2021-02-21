import React from 'react';
import {
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBCard,
  MDBCardTitle,
  MDBCardBody,
  MDBCardText,
  MDBContainer,
  MDBCardImage,
  MDBBtn,
  MDBAvatar,
  MDBCardUp,
  MDBView,
  MDBMask
} from 'mdbreact';
// import LinkCard from '../LinkCard';

const Cards = (props) => {
  return (
      <MDBCard>
        <MDBCardImage
          className='img-fluid'
          src={props.imageUrl}
          waves
          alt='Card cap'
        />
        <MDBCardBody className="p-1">
          <MDBCardTitle className="p-0 m-1">{props.title}</MDBCardTitle>
          <MDBCardText>
            {props.data}
          </MDBCardText>
          {props.showButton? <MDBBtn href='#' color='primary'>
            Button
          </MDBBtn> : ''}
        </MDBCardBody>
      </MDBCard>
    );
};

export default Cards;
