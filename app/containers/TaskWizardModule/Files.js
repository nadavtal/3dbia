import React from 'react'
import {MDBAnimation, MDBSpinner} from 'mdbreact';
import IconButtonToolTip from 'components/IconButtonToolTip/IconButtonToolTip';
const Files = ({
    files,
    removeFile
}) => {
      
    return (
      <div className={`p-2 taskWizardfiles`}>
      {files.map(file => {
        const sizeInMB = (file.size / (1024 * 1024)).toFixed(
          2,
        );
        return (
          <div
            key={file.name}
            className={`row ${
              file.status == 'Uploading'
                ? 'color-red'
                : file.status == 'Uploaded'
                ? 'color-green'
                : ''
            }`}
          >
            <div className="col-7">{file.name}</div>

            <div className="col-2">
              <span className="fontSmall"> {sizeInMB}Mb</span>
            </div>

            <div className="col-3 fontSmall">
              {file.status == 'Uploading' ? (
                <div className="d-flex">
                  <MDBSpinner yellow small className="mr-2" />
                  <MDBAnimation
                    type="flash"
                    infinite={true}
                    duration={'1s'}
                  >
                    'Uploading...'
                  </MDBAnimation>
                </div>
              ) : file.status == 'Uploaded' ? (
                'Uploaded'
              ) : (
                <IconButtonToolTip
                  iconName="trash-alt"
                  toolTipType="error"
                  toolTipPosition="left"
                  toolTipEffect="float"
                  toolTipText="Remove file"
                  className={`mx-2 z-100`}
                  onClickFunction={() => removeFile(file)}
                />
              )}
            </div>
          </div>
        );
      })}
    </div>
    )
  }

  export default Files