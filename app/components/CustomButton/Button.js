import React from 'react';
import { MDBBtn} from "mdbreact";
import './Button.css';

const button = (props) => (
    <MDBBtn
      color={props.btnType}
      disabled={props.disabled}
      rounded
      className={['CustomButton text-center', props.className].join(' ')}
      onClick={props.clicked}>
        {props.editMode}
    </MDBBtn>
    // <button
    //     disabled={props.disabled}
    //     className={['CustomButton', props.btnType].join(' ')}
    //     onClick={props.clicked}>{props.children}</button>
);

export default button;
