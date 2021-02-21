import React, {useState, memo} from 'react';

import { MDBIcon } from 'mdbreact'
import {
  makeSelectCurrentUser,
} from 'containers/App/selectors';
const FilesUploadComponent = ({
  onUploadImage,
  id
}) => {


  const onFileChange = (e) => {
    if (e.target.files[0]) {
      // console.log(e.target.files[0])
      // setFile(e.target.files[0])
      // setProfileImg(e.target.files[0])
      // setValid(true)
      const formData = new FormData()
    // console.log(formData, typeof(formData))
    // console.log(file)
      formData.append('file', e.target.files[0]);
      
      // console.log(formData)
      onUploadImage(formData);
    }
  }
  return (
    <>
      <label htmlFor={id} className="custom-file-upload">
        <MDBIcon icon="upload" /> Upload image
      </label>
      <input id={id} type="file" onChange={onFileChange}/>
      {/* {file && <img src={file.name} alt=""/>} */}
      {/* <div className="form-group ">
      <input type="file" onChange={onFileChange} 
        className="fileUploadButton"/>
    </div> */}
    </>
  );
};
export default FilesUploadComponent
// const mapStateToProps = createStructuredSelector({

// });
// export function mapDispatchToProps(dispatch) {
//   return {
//     // onUploadImage: file => dispatch(uploadFile(file)),
//   };
// }

// const withConnect = connect(
//   mapStateToProps,
//   mapDispatchToProps,
// );

// export default compose(
//   withConnect,
//   memo,
// )(FilesUploadComponent);
// export default FilesUploadComponent