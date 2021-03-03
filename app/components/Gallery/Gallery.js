import React, {useEffect} from "react";
import { MDBContainer, MDBRow, MDBCol, MDBLightbox  } from "mdbreact";
import Lightbox from "react-image-lightbox";
import "./index.css";
import CheckBoxImage from 'components/CheckBoxImage/CheckBoxImage'
const LightboxPage = ({
  images,
  colLength = 2,
  onClick,
  selectedFiles,
  checkBoxMode
}) => {

  // const { photoIndex, isOpen } = this.state;
  const fullImages = images.map(image => {
    return {src: image.fullImageLink}
  })
  return (
    // <MDBContainer>
    // <MDBLightbox md='4' images={fullImages} noMargins/>
      <div className="mdb-lightbox no-margin ">
        <MDBRow className="no-gutters">
          {images && images.length && images.map( (image, index) => {
            return (
              <MDBCol md={colLength} key={index}>
                {/* <a href={image.fullImageLink} download> */}
                {checkBoxMode ? (
                  <CheckBoxImage
                    className="img-fluid p-1"
                    file={image}
                    checked={selectedFiles.includes(image)}
                    onClick={image => onClick(image)}
                  />
                ) : (
                  <img
                    src={image.mediaLink}
                    alt="Gallery"
                    className="img-fluid p-1"
                    onClick={() => onClick(image)}
                  />
                )}

                {/* </a> */}
              </MDBCol>
            );
          })}
          </MDBRow>

      </div>
      /* {isOpen && (
        <Lightbox
          mainSrc={this.props.images[photoIndex].url}
          nextSrc={this.props.images[(photoIndex + 1) % this.props.images.length].url}
          prevSrc={this.props.images[(photoIndex + this.props.images.length - 1) % this.props.images.length].url}
          imageTitle={photoIndex + 1 + "/" + this.props.images.length}
          onCloseRequest={() => this.setState({ isOpen: false })}
          onMovePrevRequest={() =>
            this.setState({
              photoIndex: (photoIndex + this.props.images.length - 1) % this.props.images.length
            })
          }
          onMoveNextRequest={() =>
            this.setState({
              photoIndex: (photoIndex + 1) % this.props.images.length
            })
          }
        />
      )} */
    // </MDBContainer>
  );
}
//  {
//   constructor(props) {
//     super(props);

//     this.state = {
//       photoIndex: 0,
//       isOpen: false
//     };
//   }

   



export default LightboxPage;
