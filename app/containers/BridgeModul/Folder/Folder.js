import React, {memo, useState, useEffect, useMemo} from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { useInjectReducer } from 'utils/injectReducer';
import { createStructuredSelector } from 'reselect';
// import reducer from './reducer';
import { 
  makeSelectCurrentUser, 
  makeSelectCurrentUserRole } 
  from 'containers/App/selectors';
import {
    makeSelectSelectedFolderFiles,
    makeSelectSelectedFolder
  } from 'containers/BridgeModul/selectors';
import {
    showInView,
    loadSurveyData,
    setSharedState
  } from 'containers/BridgeModul/actions';
import {MDBAnimation, MDBBtn, MDBIcon, MDBInput, MDBSwitch} from 'mdbreact';
import { getFileExtension, getFileNameByString } from 'utils/dataUtils';
import Gallery from 'components/Gallery/Gallery';
import styled from 'styled-components';
import { Card } from 'react-bootstrap';


const Folder = ({
    files,
    selectedFolder,
    allowDownload = true
}) => {
    console.log(selectedFolder)
    console.log(files)
    const isImages = files.find(file => file.name.includes('Images'))
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
 
    `
    const scrollContainerStyle = {
        width: "100%", 
       //  maxHeight: `calc(100vh)-${theme.layout.topBarSize}`, 
        maxHeight: `calc(80vh)`, 
        overFlowY: 'auto',
        overFlowX: 'hidden'
       }; 

    return (
      <MDBAnimation type="fadeIn">
        <div className="">
          <div className="text-center p-2">
            <h3>{selectedFolder.name}</h3>
          </div>
          {isImages && (
            <MDBSwitch
              className="rightTopCorner mt-3 mr-3"
              checked={galleryMode}
              onChange={() => setGalleryMode(!galleryMode)}
              labelLeft=""
              labelRight={`Display as ${galleryMode ? 'images' : 'table'}`}
            />
          )}

          {selectedFiles.length ? (
            <MDBBtn
              size="sm"
              rounded
              className="leftTopCorner ml-5 bgSecondary mt-2 z-100"
              onClick={() => setSelectedFiles([])}
            >
              Clear ({selectedFiles.length})
              <MDBIcon icon="trash" className="ml-2" />
            </MDBBtn>
          ) : (
            ''
          )} 
          <Card className="p-3 mx-3">
            <div 
                style={scrollContainerStyle}
                className="scrollbar scrollbar-primary"
                >
              {galleryMode ? (
                <Gallery
                  images={files}
                  onClick={file =>
                    allowDownload ? handleGalleryClick(file) : null
                  }
                  selectedFiles={selectedFiles}
                  checkBoxMode={allowDownload ? true : false}
                />
              ) : (
                <div className="">
                  {files.map(file => {
                    if (allowDownload) {
                      return (
                        <div className="p-1" key={file.name}>
                          <MDBInput
                            id={file.name}
                            type="checkbox"
                            checked={selectedFiles.includes(file)}
                            label={
                              file.fullImageName
                                ? file.fullImageName.split('/')[4]
                                : file.name
                            }
                            onChange={() => handleGalleryClick(file)}
                          />
                        </div>
                      );
                    } else {
                      return (
                        <div className="p-2 px-3" key={file.name}>
                          {file.fullImageName
                            ? file.fullImageName.split('/')[4]
                            : file.name}
                        </div>
                      );
                    }
                  })}
                </div>
              )}
            </div>
          </Card>
          {allowDownload && selectedFiles.length ? (
            <MDBBtn
              size="lg"
              rounded
              className="taskFileUploadButton bgPrimary"
              onClick={() => handleDownload()}
            >
              Download ({selectedFiles.length})
              <MDBIcon icon="download" className="ml-2" />
            </MDBBtn>
          ) : (
            ''
          )}
        </div>
      </MDBAnimation>
    );
}

const mapStateToProps = createStructuredSelector({
    files: makeSelectSelectedFolderFiles(),
    selectedFolder: makeSelectSelectedFolder()
  });
const mapDispatchToProps = (dispatch) => {
  return {
    onShowInView: (view, componentName, mode, id) => dispatch(showInView(view, componentName, mode, id)),
    onSetSharedState: (key, value) => dispatch(setSharedState(key, value)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Folder);