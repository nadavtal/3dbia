import React, {  } from "react";
import { MDBPopover,
  MDBPopoverHeader,
  MDBPopoverBody,
  MDBBtn,
  MDBIcon,
  MDBAlert }
  from "mdbreact";
import Select from '../Select/Select'
import styled from 'styled-components';
import './PopperMenu.css';
const PopperMenu = ({actions, selectedUser, handleAction, bgColor, rounded, roles}) => {
  // console.log(actions)
  const ActionsWrapper = styled.div`
    min-width: 10rem;
    background-color: hsla(33, 100%, 50%, 0.124);
    // border-bottom: 1px solid lightgrey;
  `;
  
  const ActionWrapper = styled.div`
    min-width: 10rem;
    background-color: hsla(33, 100%, 50%, 0.224);
    
    // border-bottom: 1px solid lightgrey;
    
  `;
  
  return (
    <div className="popperMenu">
      <MDBPopover placement="left" popover clickable id="popper4">
        <MDBBtn size="sm" rounded={rounded} gradient={bgColor}>
          <MDBIcon icon="bars" />
        </MDBBtn>
        <ActionsWrapper>
          <MDBPopoverHeader>Actions</MDBPopoverHeader>
          <MDBPopoverBody>
            {actions &&
              actions.map(action => {
                let selectOptions = [];
                if (action.selectOptionsType) {
                  switch (action.selectOptionsType) {
                    case 'role':
                      selectOptions = roles;
                      break;
                    case 'status':
                      selectOptions = [
                        { id: 'created', name: 'created' },
                        { id: 'confirmed', name: 'confirmed' },
                        { id: 'active', name: 'active' },
                        { id: 'in active', name: 'in active' },
                      ];
                      break;

                    default:
                      break;
                  }
                  return (
                    <Select
                      key={action.name}
                      label={action.name}
                      options={selectOptions}
                      onChange={val => handleAction(action.name, val)}
                    />
                  );
                } else {
                  return (
                    <MDBPopover
                      key={action.name}
                      placement="left"
                      popover
                      clickable
                      id="popper3"
                      className="mr-4 "
                      onChange={e => console.log(e)}
                    >
                      <MDBBtn
                        size="sm"
                        color={action.confirmationMessageType}
                        className="d-flex align-items-center"
                      >
                        {action.name}
                      </MDBBtn>
                      <ActionWrapper>
                        <MDBPopoverHeader>{action.name}</MDBPopoverHeader>
                        <MDBPopoverBody>
                          <MDBAlert color={action.confirmationMessageType}>
                            {action.confirmationMessage}
                            {/* {action.confirmationMessage + selectedUser.first_name + ' as ' + roleDetails.name + ' from ' + employer.name + '?'} */}
                            <MDBBtn
                              size="sm"
                              className="d-flex align-items-center"
                              onClick={() => handleAction(action.name, 'Yes')}
                            >
                              Yes
                            </MDBBtn>
                            <MDBBtn
                              size="sm"
                              className="d-flex align-items-center"
                              onClick={() => handleAction(action.name, 'No')}
                            >
                              No
                            </MDBBtn>
                          </MDBAlert>
                        </MDBPopoverBody>
                      </ActionWrapper>
                    </MDBPopover>
                  );
                }

                // return <span className="text-center" key={action.name}>
                //   <MDBPopover
                //     placement="left"
                //     popover
                //     clickable
                //     id="popper3"
                //     className="mr-4 "
                //   >
                //     <MDBBtn size="sm" gradient="orange" className="d-flex align-items-center">

                //       {action.name}

                //     </MDBBtn>
                //     <ActionWrapper >
                //       <MDBPopoverHeader>
                //         {action.name}

                //       </MDBPopoverHeader>
                //       <MDBPopoverBody >
                //         {selectOptions ?
                //         <Select
                //         label={action.name}
                //         options={selectOptions}
                //         onChange={val => handleAction(val)}/>

                //       :
                //       <MDBAlert color={action.confirmationMessageType} >
                //         {action.confirmationMessage + selectedUser.first_name + ' as ' + roleDetails.name + ' from ' + employer.name + '?'}
                //         <MDBBtn size="sm" className="d-flex align-items-center">
                //           Yes
                //         </MDBBtn>
                //         <MDBBtn size="sm" className="d-flex align-items-center">
                //           No
                //         </MDBBtn>
                //       </MDBAlert>}

                //       </MDBPopoverBody>
                //     </ActionWrapper>

                //   </MDBPopover>

                // </span>
              })}
          </MDBPopoverBody>
        </ActionsWrapper>
      </MDBPopover>
    </div>
  );
}

export default PopperMenu;

