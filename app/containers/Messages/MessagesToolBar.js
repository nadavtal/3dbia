import React, { useState } from 'react'
import {MDBIcon, MDBInput, MDBSelect} from 'mdbreact'
import styled from 'styled-components';
import Select from 'components/Select/Select';


const Wrapper = styled.div`
    height: 4rem;
    background-color: white;
    position: absolute;
    bottom: 0;
    width: 90%;
    display: flex;
`

const MessagesToolBar = ({
  selectedMessages,
  selectedMessage,
  handleCheckBoxAll,
  messages,
  backToMessages
  }) => {

    const [messageStatus, setMessageStatus] = useState();
    return <Wrapper>
      {selectedMessage ? 
      <div className="d-flex fullWidth justify-content-between align-items-center color-dark-blue">
        <MDBIcon 
         icon="arrow-left" 
         className="ml-2" 
         size="lg"
         onClick={() => backToMessages()}
         />
        <div className="d-flex mr-2">
          <MDBIcon 
            icon="star" 
            far
            className="mr-3" 
            size="lg"
            // onClick={() => backToMessages()}
          />
          <MDBIcon 
            icon="tag" 
            className="mr-3" 
            size="lg"
            // onClick={() => backToMessages()}
          />
        </div>
      </div>
      : 
      <div className={`d-flex align-items-center ${selectedMessages.length && 'border-right'}  my-1`}>
        <MDBInput
            id={`messageToolBarCheckBox`}
            checked={selectedMessages.length == messages.length}
            type="checkbox"
            label=" "
            onChange={handleCheckBoxAll}
          />
        <MDBSelect
          className="mr-3"
          selected="Filter by" 
          options={
            [
              {text: 'Read',  value: 'Read'},
              {text: 'Unread',  value: 'Unread'},
              {text: 'Starred',  value: 'Starred'},
              {text: 'Unstarred',  value: 'Unstarred'},
              {text: 'Important',  value: 'Important'},
            ]  
          }
          />
      </div>
      
      }
      {selectedMessages.length  ? <div className="messageToolBarIcons d-flex align-items-center px-3">
        <MDBIcon icon="trash-alt" far className="ml-4"/>
        <MDBIcon icon="folder" far className="ml-4"/>
        <MDBSelect
          className="mr-3 shortSelect"
          selected="" 
          options={
            [
              {text: 'Read',  value: 'Read'},
              {text: 'Unread',  value: 'Unread'},
              {text: 'Starred',  value: 'Starred'},
              {text: 'Unstarred',  value: 'Unstarred'},
              {text: 'Important',  value: 'Important'},
            ]  
          }
          />

        {/* <MDBIcon icon="tag" far/> */}
        {/* <MDBSelect
          className="mr-3"
          // selected={} 
          options={
            [
              {text: 'Read',  value: 'Read'},
              {text: 'Unread',  value: 'Unread'},
              {text: 'Starred',  value: 'Starred'},
              {text: 'Unstarred',  value: 'Unstarred'},
              {text: 'Important',  value: 'Important'},
            ]  
          }
          /> */}
        
      </div> : ''}
    </Wrapper>
}

export default MessagesToolBar