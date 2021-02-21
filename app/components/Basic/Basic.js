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
  MDBBtn
} from 'mdbreact';
import FilesUploadComponent from 'components/FilesUploadComponent'
import './Basic.css';

const PV2 = (props) => {
  const image = props.item.profile_image;
  console.log(image)
  console.log(image !== 'null' && image !== 'undefined')
  // console.log(props.item)
  return (
    <div id="profile-v2" className="mb-5">
      <MDBContainer fluid>
        <MDBRow>
          <MDBCol lg="4" className="mb-4">
            <MDBCard narrow>
              <MDBView 
                className="mdb-color bgSecondary p-3"
                hover>
                <h6 className="mb-0 text-center text-white">
                  Edit Photo
                </h6>
              </MDBView>
              <MDBCardBody className="text-center">
                {/* <MDBAvatar
                  tag="img"
                  src={
                    image && image !== 'undefined'
                      ? require(`../../../resources/static/assets/tmp/${image}`)
                      : require(`../../images/LOGIN.jpg`)
                  }
                  alt="User Photo"
                  className="z-depth-1 mb-3 mx-auto"
                /> */}
                <img
                  className="basicImage mb-3"
                  src={ 
                    image && image !== 'undefined' && image !== 'null' 
                      ? image
                      : require(`../../images/LOGIN.jpg`)
                  }
                  alt="Photo"
         
                />
                <MDBRow center>
                  <FilesUploadComponent
                    onUploadImage={formData => props.uploadImage(formData)}
                    id="image-upload"
                  />
                  {/* <MDBBtn color="info" rounded size="sm">
                    Upload New Photo
                  </MDBBtn>
                  <MDBBtn color="danger" rounded size="sm">
                    Delete
                  </MDBBtn> */}
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol lg="8" className="mb-r">
            <MDBCard narrow>
              <MDBView 
                hover
                className="mdb-color bgSecondary p-3">
                <h6 className="mb-0 text-center text-white">
                  Edit Account Details
                </h6>
              </MDBView>
              <MDBCardBody className="text-center">
                <Form
                  formType={props.dataType}
                  item={props.item}
                  editMode="edit"
                  // createFunction={(formData) => this.props.createNewProject(formData)}
                  editFunction={formData => props.updateItem(formData)}
                />
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
};

export default PV2;
