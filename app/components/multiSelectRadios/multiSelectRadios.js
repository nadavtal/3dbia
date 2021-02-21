import React from 'react';
import { MDBInput, MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem } from "mdbreact";

const multiSelectRadios = (props) => {

  const inSelectedOptions = (id) => {
    let inSelected = false;
    for (let option of props.selectedOptions) {
      if (option.ID === id) {
        inSelected = true
      }
    }
    // console.log('inSelected', inSelected)
    return inSelected
  }

  const checkboxChecked = (event, index) => {
    console.log(event.currentTarget.value);
    const selected = event.currentTarget.value;

    if (!selected) {
      props.selectedOptions.push(props.options[index])
    }
  }
  console.log(props)
  const options = (
    props.options.map(option => {
      return <MDBInput
        key={option.ID}
        label= {option.firstName + ' ' + option.lastName}
        type="checkbox"
        id={option.ID}
        value={inSelectedOptions(option.ID)}
        checked={inSelectedOptions(option.ID)}
        onChange={(event, index) => checkboxChecked(event, index)}
        />
    })
  )


  return (
    <React.Fragment>
      {options}

    </React.Fragment>
  )
}

export default multiSelectRadios
