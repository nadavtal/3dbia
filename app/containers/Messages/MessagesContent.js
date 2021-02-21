import React, { useState } from 'react'
import {MDBIcon, MDBInput} from 'mdbreact'
import ProfileUserImage from 'components/ProfileUserImage';
import styled from 'styled-components';
import DateField from 'components/DateField/DateField';
import { Badge } from 'react-bootstrap';

const MessagesWrapper = styled.div`
    height: 65vh;
    max-height: 65vh;
    overflow-y: auto;
`
const MessageListItemWrapper = styled.div`
    height: 10rem;
    position: relative;
    border-bottom: 1px solid lightgrey;
`
const MessageWrapper = styled.div`
    height: 100%;
    width: 100%;
    position: relative;
    border-bottom: 1px solid lightgrey;
`

const MessagesContent = ({
    messages, 
    selectedMessages,
    selectedMessage,
    onMessageCheckboxClick,
    onMessageClick
}) => {
    
    
    const MessageListItem = ({message}) => {

        return (
          <MessageListItemWrapper className="d-flex align-items-center" >
        
            <MDBInput
              id={`messageCheckBox_${message.id}`}
              checked={selectedMessages.includes(message)}
              type="checkbox"
              label=" "
              onChange={() => onMessageCheckboxClick(message)}
            />
            <div className="messageBody" onClick={() => onMessageClick(message)}>
              <div className="rightTopCorner">
                <DateField date={message.createdAt} />
              </div>
              <div className="d-flex align-items-center mb-2">
                <ProfileUserImage />
                <span className="ml-2">Nadav Almagor</span>
                <MDBIcon icon="reply" className="float-right ml-3"/>
              </div>
              <div className="messageSubject bold">{message.subject}</div>
              <div className="messageContent">{message.message}</div>
              <div className="rightBottomCorner">
                <Badge variant="warning">{message.type}</Badge>
              </div>
            </div>
          </MessageListItemWrapper>
        );
    }

    const Message = () => {
        return <MessageWrapper>
            <div className="d-flex justify-content-between border-bottom p-2 py-4">
                <div className="">
                {selectedMessage.subject}
                </div>
                <MDBIcon icon="reply" className="float-right mr-5"/>
            </div>
            <div className="d-flex align-items-center p-2">
                <ProfileUserImage />
                <div className="ml-2">
                    <div>Nadav Almagor</div>
                    <div className="fontSmall">to me</div>
                </div>
                
            </div>
            <div className="p-2">
                {selectedMessage.message}
            </div>
        </MessageWrapper>
    }
    return selectedMessage ? <Message /> : <MessagesWrapper>
     { messages.map(message => {
        
        return  <MessageListItem message={message}/>
    })}
    </MessagesWrapper>
}

export default MessagesContent