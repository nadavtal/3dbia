import React from 'react';
import Form from '../../containers/Forms/Form';
import {
  MDBRow,
  MDBCol,
  MDBCard,
  MDBView,
  MDBCardBody,
  MDBInput,
  MDBContainer,
  MDBAvatar,
  MDBBtn, MDBAnimation
} from 'mdbreact';
import FilesUploadComponent from 'components/FilesUploadComponent'


const Layout = ({
    menu,
    bodyTitle,
    menuTitle,
    headerComponent,
    component,
    sideBarColWidth
}) => {
  
  // console.log(image)
  // console.log(props.item)
  const scrollContainerStyle = {
    width: "100%", 
    minHeight: `71vh`, 
    maxHeight: `73vh`, 
    overFlowY: 'auto',
    overFlowX: 'auto'
   };
  return (
    <div id="profile-v2" className="mb-5 ">
      <MDBContainer fluid>
        <MDBRow >
          <MDBCol lg={sideBarColWidth ? sideBarColWidth : 2} className="mb-4">
            {/* <MDBAnimation type="bounceInUp" className=""> */}
            <MDBCard narrow>
              <MDBView cascade className="mdb-color card-header bgPrimary">
                <h5 className="mb-0 font-weight-bold text-center text-white ">
                  {menuTitle}
                </h5>
              </MDBView>
              <MDBCardBody className="">
                {menu}

                {/* <MDBRow center>
                  <FilesUploadComponent
                  onUploadImage={formData => props.uploadImage(formData)}
                  id="image-upload"
                  />
                </MDBRow> */}
              </MDBCardBody>
            </MDBCard>
            {/* </MDBAnimation> */}
          </MDBCol>
          <MDBCol lg={sideBarColWidth ? 12 - sideBarColWidth : 10} className="mb-r">
            <MDBCard narrow>
              <MDBView
                cascade
                className="mdb-color color-white card-header bgPrimary"
              >
                {/* <MDBAnimation type="bounceInRight" className=""> */}
                {headerComponent}
                {/* </MDBAnimation> */}
              </MDBView>
              <MDBAnimation type="fadeIn" className="">
                <MDBCardBody className="position-relative">
                  <div
                    style={scrollContainerStyle}
                    className="scrollbar scrollbar-primary"
                  >
                    {component}
                  </div>
                </MDBCardBody>
              </MDBAnimation>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
};

export default Layout;
