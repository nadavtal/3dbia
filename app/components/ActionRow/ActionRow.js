import React from 'react';
import './ActionRow.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const actionRow = (props) => {

  const actions = props.actions.map(action => {

    return <FontAwesomeIcon key={action.iconName} className="m-1" icon={action.iconName} onClick={action.function}/>
  })

  return (
    <div className="optionsRow d-flex justify-content-between">
        <div onClick={props.onTextClick}>{props.text}</div>
        <div className="optionsRow__buttons">
          {actions}
          {/* <FontAwesomeIcon className="m-1" icon="minus" onClick={() => this.props.onDeleteRole(role.name)}/> */}
          {/* <FontAwesomeIcon className="m-1" icon="edit" onClick={this.props.onUpdateRole}/> */}

        </div>
    </div>
  )
}

export default actionRow
