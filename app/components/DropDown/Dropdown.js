import React from "react";
import { MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem } from "mdbreact";
import RadioInput from '../RadioButton/RadioButton';


const Dropdown = (props) => {

  return (
    <MDBDropdown dropright size={props.size}>
      <MDBDropdownToggle caret color="primary">
        {props.mainText}
      </MDBDropdownToggle>
      <MDBDropdownMenu basic>
      {
        props.options?
        props.options.map( option => {

          return (
            <div key={option.name}>
              <input
                className="ml-1"

                type="radio"
                name={option.name}
                value={option.name}
                onClick={props.selectFunction? props.selectFunction : null}
              />
              <label
                className="ml-1"
                htmlFor={option.name}
                // onClick={(e) => e.preventDefault}
                > {option.name}
              </label>

            </div>
            // <MDBDropdownItem key={option.name} onClick={props.selectFunction? props.selectFunction : null}>{option.name}</MDBDropdownItem>
            )

        }) :
        ''
      }
      </MDBDropdownMenu>
    </MDBDropdown>
    // <MDBDropdown size={props.size}>
    //   <MDBDropdownToggle caret color="primary">
    //     {props.mainText}
    //   </MDBDropdownToggle>
    //   <MDBDropdownMenu basic>
    //     {props.options.map( option => {
    //       return (
    //         <div>
    //           <input type="radio" name={option.name} value={option.name}
    //             />
    //           <label htmlFor={option.name}
    //             // onClick={(e) => e.preventDefault}
    //             > {option.name}
    //             </label>
    //         </div>
    //         )
    //         }
    //       )
    //     }
    //     <MDBDropdownToggle>Done</MDBDropdownToggle>
    //   </MDBDropdownMenu>
    // </MDBDropdown>
  );
}

export default Dropdown;
