import React, { useState, memo } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import styled from 'styled-components'
import ProfileUserImage from 'components/ProfileUserImage'
import {MDBIcon} from 'mdbreact';
import './Chat.css'
import { makeSelectLoading, makeSelectError, makeSelectCurrentUser,
  makeSelectChatUsers, makeSelectCurrentUserRole, makeSelectShowChat,
} from 'containers/App/selectors';
import { makeSelectSelectedTask, makeSelectDisplayedSurvey, makeSelectBridge, makeSelectSurveyMessages } from 'containers/BridgeModul/selectors'
import { createMessage } from 'containers/AppData/actions'
import { getUniqueUsers } from 'utils/dataUtils';
import { theme } from 'global-styles' 
import ChatInput from './Input';
import DateField from 'components/DateField/DateField';
import Message from './Message'
const Chat = ({
  users,
  showChat,
  onCreateMessage,
  bridge,
  task,
  survey,
  currentUser,
  messages
}) => {
    const [open, setOpen] = useState(false)
    // console.log(getUniqueUsers(users))
    // console.log('messages', messages)
    const uniqueUsers = getUniqueUsers(users)
    const ChatHeader = styled.div`
        color: #fff;
        height: ${theme.layout.topBarSize};
        background-color: ${theme.primary};
        width: 100%;
        display: flex;
        align-items: center;
        // z-index: 1100;
        box-sizing: border-box;
        justify-content: space-between;
        flex-shrink: 0;
       
        box-shadow: 0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12);
    `
    const ChatBody = styled.div`
        width: 100%;
        display: flex;
        border-radius: 4px;
        flex: 1 1;
        // z-index: 100;
        box-shadow: 0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12);
    `
    const Profiles = styled.div`
        width: 70px;
        
    `
    const IconWrapper = styled.div`
      flex: 0 0 auto;
      font-size: 2.4rem;
      padding: 12px;
      overflow: visible;
      
    //   text-align: center;
      transition: background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
      border-radius: 50%;
    `;
    const Messages = styled.div`
        position: relative;
        padding-bottom: 6.4rem;
        display: flex;
        flex: 1 1;
        flex-direction: column;
        background: #f6f7f9;
        box-shadow: 0px 3px 3px -2px rgba(0,0,0,0.2), 0px 3px 4px 0px rgba(0,0,0,0.14), 0px 1px 8px 0px rgba(0,0,0,0.12);
        border-radius: 4px;
        color: rgba(0, 0, 0, 0.87);
        transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
        min-height: calc(100vh - 54px);
    `;

    const handleProfileClick = () => {
        if (!open) setOpen(!open)
    }

    const Profile = ({user}) => {
        return (
          <button className="MuiButtonBase-root MuiButton-root MuiButton-text makeStyles-contactButton-270"
            onClick={handleProfileClick}>
            <span className="MuiButton-label">
              <div className="makeStyles-unreadBadge-271">2</div>
              <div className="online makeStyles-status-272" />
              <ProfileUserImage src={user.profile_image}/>
              <span className="MuiTouchRipple-root" />
            </span>
          </button>
        );
    }

    const SystemProfile = ({user}) => {
      return (
        <button className="MuiButtonBase-root MuiButton-root MuiButton-text makeStyles-contactButton-270"
          onClick={handleProfileClick}>
          <span className="MuiButton-label">
            <div className="makeStyles-unreadBadge-271">2</div>
            <div className="online makeStyles-status-272" />
            <ProfileUserImage src={require('../../../images/systemProfileImage.jpg')}/>
            <span className="MuiTouchRipple-root" />
          </span>
        </button>
      );
    }

    const sendMessage = (msg) => {
      const messageObject = {
        sender_user_id: currentUser.userInfo.id,
        receiver_user_id: null,
        subject: '',
        message: msg,
        createdAt: Date.now(),
        type: null,
        status: 'Sent',
        task_id: task ? task.id : null,
        survey_id: survey.id,
        bid: bridge.bid,
        parent_message_id: null,
        location: '',
        element_id: null
      }
      onCreateMessage(messageObject)
    }

    const scrollContainerStyle = {
      width: "100%", 
     //  maxHeight: `calc(100vh)-${theme.layout.topBarSize}`, 
      maxHeight: `85vh`, 
      overFlowY: 'auto',
      overFlowX: 'hidden'
     }; 
    if (showChat) {
      return (
        <div
          className={`sidePanel ${
            open ? 'sidePanelOpened' : 'sidePanelClosed'
          }`}
        >
          <ChatHeader>
            <IconWrapper>
              <MDBIcon
                icon="comments"
                className=""
                onClick={() => setOpen(!open)}
              />
            </IconWrapper>
            <span className="ml-3 mr-4">Team chat</span>
            <MDBIcon
              icon="times"
              className="mr-2"
              onClick={() => setOpen(!open)}
            />
          </ChatHeader>
          <ChatBody>
            <Profiles>
              <SystemProfile />
              {uniqueUsers.map(user => (
                <Profile user={user} />
              ))}
            </Profiles>
            <Messages>
              <div 
                style={scrollContainerStyle}
                className=" scrollbar scrollbar-primary">
                <div className="flex flex-col pt-16 pl-4 mt-2">
                  {messages.map(message => {
                    if (message.sender_user_id == currentUser.userInfo.id
                    ) {
                      return (
                        <Message 
                          message={message} 
                          key={message.id}
                          onDelete={() => console.log('delete')}
                          onView={() => console.log('view')}
                          />
                      );
                    } else {
                      return (
                        <Message 
                          message={message} 
                          showProfile 
                          key={message.id}
                          onDelete={() => console.log('delete')}
                          onView={() => console.log('view')}
                          />
                      );
                    }
                  })}
                 
                </div>
              </div>
              <ChatInput onSubmit={msg => sendMessage(msg)}/>
            </Messages>
          </ChatBody>
        </div>
      );
    } else {
      return <></>
    }
    
}

const mapStateToProps = createStructuredSelector({
  currentUser: makeSelectCurrentUser(),
  showChat: makeSelectShowChat(),
  bridge: makeSelectBridge(),
  users: makeSelectChatUsers(),
  task: makeSelectSelectedTask(),
  survey: makeSelectDisplayedSurvey(),
  messages: makeSelectSurveyMessages()
});

const mapDispatchToProps = dispatch => {
  return {
    onCreateMessage: (messageObject) => dispatch(createMessage(messageObject)),
  }
}
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Chat);

