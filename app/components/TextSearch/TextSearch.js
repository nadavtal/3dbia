import React, { useState, useEffect, memo} from 'react';
import { MDBIcon, MDBFormInline } from 'mdbreact'
import { userAllocated } from '../../containers/App/actions';
// import TextField from 'components/base/TextField';

const WAIT_INTERVAL = 1000;
const ENTER_KEY = 13;

const TextSearch = (props) => {
  const [value, setValue] = useState(props.value ? props.value : '');

  let timer = null;
  const handleKeyDown = (e) => {
    // e.preventDefault();
    // console.log(e.keyCode)
    if (e.keyCode === ENTER_KEY) {
      e.preventDefault();
      triggerChange();
    }

  }
  const triggerChange = () => {
    // const value = this.state;
    console.log(value)
    props.onChange(value);
  }

  const handleChange = (value) => {
    clearTimeout(timer);
    console.log(value)
    setValue(value)

    timer = setTimeout(props.onChange(value), WAIT_INTERVAL);
}
  return (
    <MDBFormInline 
      className={`${props.className}`}
      >
      <MDBIcon icon="search" />
      <input
        className="form-control form-control-sm ml-3 w-75"
        type="text"
        placeholder="Search"
        aria-label="Search"
        value={value}
        onChange={e => handleChange(e.target.value)}
        onKeyDown={e => handleKeyDown(e)}
      />
    </MDBFormInline>
    // <input
    //     className={props.className}
    //     placeholder={"change percentage"}
    //     value={value}
    //     onChange={(value) => handleChange(value)}
    //     onKeyDown={(e) => handleKeyDown(e)}
    // />
  );
}

export default memo(TextSearch)
