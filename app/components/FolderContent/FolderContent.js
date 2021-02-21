import React, {memo, useState, useEffect} from 'react'
import {MDBBtn, MDBIcon, MDBInput, MDBSwitch} from 'mdbreact';
import { getFileExtension, getFileNameByString } from 'utils/dataUtils';
import Gallery from 'components/Gallery/Gallery';
import styled from 'styled-components';


const FolderContent = ({
    files,
    isImages,
    selectedFolder, 
    allowDownload
}) => {

    const [galleryMode, setGalleryMode] = useState(false)
    const [selectedFiles, setSelectedFiles] = useState([])

    useEffect(() => {
      setGalleryMode(isImages ? true : false)

    }, [isImages])
    const handleGalleryClick = (file) => {
        if (selectedFiles.includes(file)) {
            setSelectedFiles(selectedFiles.filter(f => f !== file))
        } else {
            setSelectedFiles([...selectedFiles, file])
        }
    }
    
    const handleDownload = () => {
      console.log(selectedFiles)
      let index = 0
      setInterval(function(){
        if (selectedFiles.length > index) {
          download(selectedFiles[index].name, selectedFiles[index].fullImageLink);
          index++
          
        }
      }, 500);
    }

    const download = (fileName, fileLink) => {
        const element = document.createElement('a');
        element.setAttribute('href', fileLink);
        element.setAttribute('download', fileName);
      
        element.style.display = 'none';
        document.body.appendChild(element);
      
        element.click();
      
        document.body.removeChild(element);
      }

    
    const FolderContentBody = styled.div`
      max-height: 35rem;
      overflow-y: auto;
    `
    return (
      <div className="">
        <div className="d-flex p-2 align-items-center folder_content_header">
      
          <span className="bold mr-2 p-3">{selectedFolder}</span>
          {isImages && <MDBSwitch
            className="mt-2 p-1"
            checked={galleryMode}
            onChange={() => setGalleryMode(!galleryMode)}
            labelLeft=""
            labelRight={`Display as ${galleryMode ? 'images' : 'table'}`}
          />}
          {selectedFiles.length ? (
            <MDBBtn
              color="primary"
              size="sm"
              rounded
              className=""
              onClick={() => setSelectedFiles([])}
            >
              Clear ({selectedFiles.length})
              <MDBIcon icon="trash" className="ml-2" />
            </MDBBtn>
          ) : (
            ''
          )}
        </div>
        {galleryMode ? (
          <div className="p-3 px-5">
            <Gallery
              images={files}
              onClick={file => allowDownload ? handleGalleryClick(file) : null}
              selectedFiles={selectedFiles}
              checkBoxMode ={allowDownload ? true : false}
            />
          </div>
        ) : (
          <FolderContentBody>
            {files.map(file => {
              if (allowDownload) {
                return (
                  <div className="p-2 px-3" key={file.name}>
                    <MDBInput
                      id={file.name}
                      type="checkbox"
                      checked={selectedFiles.includes(file)}
                      label={file.fullImageName ? file.fullImageName.split('/')[4] : file.name}
                      onChange={() => handleGalleryClick(file)}
                    />
                  </div>
                );

              } else {
                return (
                  <div className="p-2 px-3" key={file.name}>
                   {file.fullImageName ? file.fullImageName.split('/')[4] : file.name}
                </div>
                )
              }
            })}
            
          </FolderContentBody>
        )}
        {allowDownload && selectedFiles.length ? (
          <MDBBtn
            color="success"
            size="lg"
            rounded
            className="taskFileUploadButton"
            onClick={() => handleDownload()}
          >
            Download ({selectedFiles.length})
            <MDBIcon icon="download" className="ml-2" />
          </MDBBtn>
        ) : (
          ''
        )}
      </div>
    );
}

export default memo(FolderContent)