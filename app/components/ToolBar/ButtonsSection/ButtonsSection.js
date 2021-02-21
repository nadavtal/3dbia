import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './ButtonsSection.css'
const ButtonsSection = (props) => (

  <div className={"buttonsSection"}
    // onMouseEnter={() => console.log(true)}
    // onMouseLeave={() => console.log(false)}
    >
    <div className="buttonsSectionTitle">
      {props.title}
    </div>
    <div className={"buttonsSectionButtons d-" + props.displayClass}>
      {props.children}
    </div>
    {}
    <hr className="buttonsSectionHR"></hr>
  </div>
)

export default ButtonsSection
