import React from 'react'
import {MDBInput} from 'mdbreact';

const CheckBoxImage = ({
    file,
    onClick,
    checked
}) => {

    return (
      <div className={`position-relative ${checked ? 'shadowed' : ''}`}>
        <MDBInput
        //   className="leftTopCorner"
          containerClass="checkbox_image_checkbox"
          filled
          id={file.name}
          checked={checked}
          type="checkbox"
          label={' '}
          onChange={() => onClick(file)}
        />
        <img
          src={file.mediaLink}
          alt="Gallery"
          className="img-fluid p-1"
          onClick={() => onClick(file)}
        />
      </div>
    );
}

export default CheckBoxImage