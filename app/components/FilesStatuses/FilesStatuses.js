import React, { useState, memo } from 'react'
import { MDBAnimation, MDBSpinner, MDBIcon } from "mdbreact";
import styled from 'styled-components';
import './FilesStatuses.css'

const FilesStatuses = ({
  files, 
  close, 
  removeFile,
  // minimize
}) => {

  const [isMinimized, setIsMinimized] = useState(false)
  const Wrapper = styled.div`
      position: absolute;
      right: 0;
      // transition: .3s all;
      bottom: 56px;
      z-index: 1000;
      font-size: .7rem;
      width: 15rem;
      background-color: lightyellow;
      max-height: 20rem;
      overflow-y: auto;
      overflow-x: hidden;
      
  `;

   
  const File = ({ file }) => (
    <div className="d-flex justify-content-between my-1 p-1">
      <span>{file.name}</span>
      {file.status == 'Uploading' ? <MDBSpinner yellow small className="" /> 
      : file.status == 'Uploaded' ? <div>
      <MDBIcon icon="check-circle" className="ml-2"/>
      <MDBIcon icon="times" onClick={() => removeFile(file)}/>
      </div>
      : <div><MDBIcon icon="exclamation-circle"/> </div>}
      
    </div>
  );
                              
    return (
      <MDBAnimation type="fadeInRight" className="filesStatuses">
        <Wrapper className={`${isMinimized ? 'filesStatusMinified' : 'filesStatusOpen'}`}>
          <div className="d-flex justify-content-between background-dark-blue p-2 color-white">
            <span>{`Uploading (${files.length})`}</span>
            <div className="d-flex">
              <MDBIcon icon={isMinimized ? "window-maximize": "window-minimize"} onClick={() => setIsMinimized(!isMinimized)}/>
              <MDBIcon icon="times" onClick={close} className="ml-2"/>
            </div>
          </div>
          {/* {files.map(file => file.status == 'Uploading' && <File file={file} key={file.name}/>)} */}
          { !isMinimized && files.map(file => <File file={file} key={file.name}/>)}
        </Wrapper>
      </MDBAnimation>
    );
}

export default memo(FilesStatuses)