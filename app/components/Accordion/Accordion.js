import React, { useState } from 'react';
import {
  MDBContainer,
  MDBCollapse,
  MDBCard,
  MDBCardBody,
  MDBCollapseHeader,
  MDBIcon,
} from 'mdbreact';
import Gallery from 'components/Gallery/Gallery';
const CollapsePage = ({
  data,
  header
}) => {
  const [collapseID, setCollapseID] = useState('')
  const toggleCollapse = newCollapseID => {
    console.log(newCollapseID)
    collapseID !== newCollapseID ? setCollapseID(newCollapseID) : setCollapseID('')
  }
  
    return (
      
        <MDBContainer
          className='accordion md-accordion accordion-3'
        >
          {/* <MDBCard> */}
            <MDBCollapseHeader
              className="p-1 background-transparent"
              onClick={() => toggleCollapse('collapse1')}
              tag='div'
              tagClassName='d-flex justify-content-between align-items-center '
            >
              {header}
              <MDBIcon
                icon={
                  collapseID === 'collapse1'
                    ? 'angle-up'
                    : 'angle-down'
                }
                className=''
                size='1x'
              />
            </MDBCollapseHeader>
            <MDBCollapse id='collapse1' isOpen={collapseID}>
              <MDBCardBody class='pt-0'>
                  <Gallery />
              </MDBCardBody>
            </MDBCollapse>
          {/* </MDBCard> */}
  
       
        </MDBContainer>
      
    );




}

export default CollapsePage;