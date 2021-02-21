import React, { useEffect, memo, useState } from 'react';


import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectLoading, makeSelectError, makeSelectCurrentUser,
  makeSelectRoleTypes, makeSelectCurrentUserRole} from 'containers/App/selectors';
import * as actions from './actions'
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import MessagesHeader from './MessagesHeader';
import MessagesContent from './MessagesContent';
import { createMessage } from 'containers/AppData/actions';
import { toggleModal, toggleAlert, toggleLoadingSpinner } from 'containers/App/actions';
import MessagesToolBar from './MessagesToolBar';
import SideBar from './SideBar';
import SideBarHeader from './SideBarHeader';
import './Messages.css';

import reducer from './reducer';
import saga from './saga'
const key = 'messages';

import IconButtonToolTip from '../../components/IconButtonToolTip/IconButtonToolTip';
const messagesArray = [
  {id: 1, sender_user_id: 1, receiver_user_id: 1, subject: 'message num 1 ', message: 'a;slkd;alksd; asdlas dajsdlkdahs djakjsldk jalskdja lskdj lakjsdl kdajlksdjl aksdj alsjkd als dk', type: 'notification', status: 'sent', task_id: null, survey_id: null, bid: null, createdAt: Date.now(), openedAt: Date.now(), parent_message_id: null},
  {id: 2, sender_user_id: 1, receiver_user_id: 1, subject: 'message num 2 ', message: 'a;slkd;alksd; asdlas dajsdlkdahs djakjsldk jalskdja lskdj lakjsdl kdajlksdjl aksdj alsjkd als dk', type: 'notification', status: 'sent', task_id: null, survey_id: null, bid: null, createdAt: Date.now(), openedAt: Date.now(), parent_message_id: null},
  {id: 3, sender_user_id: 1, receiver_user_id: 1, subject: 'message num 3 ', message: 'a;slkd;alksd; asdlas dajsdlkdahs djakjsldk jalskdja lskdj lakjsdl kdajlksdjl aksdj alsjkd als dk', type: 'notification', status: 'sent', task_id: null, survey_id: null, bid: null, createdAt: Date.now(), openedAt: Date.now(), parent_message_id: null},
  {id: 4, sender_user_id: 1, receiver_user_id: 1, subject: 'message num 4 ', message: 'a;slkd;alksd; asdlas dajsdlkdahs djakjsldk jalskdja lskdj lakjsdl kdajlksdjl aksdj alsjkd als dk', type: 'notification', status: 'sent', task_id: null, survey_id: null, bid: null, createdAt: Date.now(), openedAt: Date.now(), parent_message_id: null},
  {id: 5, sender_user_id: 1, receiver_user_id: 1, subject: 'message num 5 ', message: 'a;slkd;alksd; asdlas dajsdlkdahs djakjsldk jalskdja lskdj lakjsdl kdajlksdjl aksdj alsjkd als dk', type: 'notification', status: 'sent', task_id: null, survey_id: null, bid: null, createdAt: Date.now(), openedAt: Date.now(), parent_message_id: null},
  {id: 6, sender_user_id: 1, receiver_user_id: 1, subject: 'message num 6 ', message: 'a;slkd;alksd; asdlas dajsdlkdahs djakjsldk jalskdja lskdj lakjsdl kdajlksdjl aksdj alsjkd als dk', type: 'notification', status: 'sent', task_id: null, survey_id: null, bid: null, createdAt: Date.now(), openedAt: Date.now(), parent_message_id: null},
  {id: 7, sender_user_id: 1, receiver_user_id: 1, subject: 'message num 7 ', message: 'a;slkd;alksd; asdlas dajsdlkdahs djakjsldk jalskdja lskdj lakjsdl kdajlksdjl aksdj alsjkd als dk', type: 'notification', status: 'sent', task_id: null, survey_id: null, bid: null, createdAt: Date.now(), openedAt: Date.now(), parent_message_id: null},
  {id: 8, sender_user_id: 1, receiver_user_id: 1, subject: 'message num 8 ', message: 'a;slkd;alksd; asdlas dajsdlkdahs djakjsldk jalskdja lskdj lakjsdl kdajlksdjl aksdj alsjkd als dk', type: 'notification', status: 'sent', task_id: null, survey_id: null, bid: null, createdAt: Date.now(), openedAt: Date.now(), parent_message_id: null},
]

function Messages({
  currentUser,
  onToggleModal,
  onToggleAlert,
  onCreateMessage
}) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  const [selectedMessages, setSelectedMessages] = useState([])
  const [selectedMessage, setSelectedMessage] = useState()
  const [messages, setMessages] = useState(messagesArray)
  console.log(currentUser)
  const sideBarMenu = [
    {
      name: 'Folders',      
      counter: true,
      children: [
        {name: 'Inbox', counter: true, icon: 'inbox'},
        {name: 'Sent', counter: false, icon: 'paper-plane'},
        {name: 'Drafts', counter: false, icon: 'pencil-ruler'},
      ]
    },
    {
      name: 'Filters',      
      counter: true,
      children: [
        {name: 'Starred', counter: false, icon: 'star'},
        {name: 'Important', counter: false, icon: 'exclamation-circle'},
      ]
    },
    {
      name: 'Labels',      
      counter: true,
      children: [
        {name: 'Notifications', counter: true, icon: 'tag'},
        {name: 'Tasks', counter: true, icon: 'tag'},
        {name: 'Surveys', counter: true, icon: 'tag'},
      ]
    },
  ]


  useEffect(() => {


  }, []);

  const handleMessageCheckBoxClick = (msg) => {
    if (selectedMessages.includes(msg)) {
      setSelectedMessages(selectedMessages.filter(message => message !== msg))
    } else {
      setSelectedMessages([...selectedMessages, msg])

    }
  }
  const handleCheckBoxAll = () => {
    if (selectedMessages.length) {
      setSelectedMessages([])
    } else {
      setSelectedMessages(messages)

    }
  }

  const createNewMessage = () => {
    console.log(currentUser)
    onToggleModal({
        title: 'Send message',
        text: '',
        editMode: 'Send',
        cancelButton: 'Cancel',
        formType: 'messageForm',
        colWidth: 12,
        confirmFunction: (data) => {
          prepareSendMessage(data)
        }
      });
    }

  const prepareSendMessage = (message) => {
    message.sender_user_id = currentUser.userInfo.id;
    message.receiver_user_id = 17;
    message.type = 'message';
    onCreateMessage(message)
  }
  return <>
    <div className="row no-gutters messagesTopSection background-dark-blue color-white">
      <div className="col-2 ">
        <SideBarHeader />
      </div>
      <div className="col-10 position-relative">
        
          <MessagesHeader />  
          <MessagesToolBar 
            messages={messages}
            selectedMessages={selectedMessages}
            selectedMessage={selectedMessage}
            handleCheckBoxAll={handleCheckBoxAll}
            backToMessages={() => setSelectedMessage()}
            />

        
      </div>
    </div>
    <div className="row no-gutters messagesMainSection background-white color-dark-blue">
      <div className="col-2 border-right">
        <SideBar menu={sideBarMenu}
          createMessage={() => createNewMessage()}
          />
      </div>
      <div className="col-10">
         <MessagesContent 
          messages={messages}
          selectedMessages={selectedMessages}
          selectedMessage={selectedMessage}
          onMessageCheckboxClick={msg => handleMessageCheckBoxClick(msg)}
          onMessageClick={msg => setSelectedMessage(msg)}/>  

      </div>
    </div>
  </>


}

const mapStateToProps = createStructuredSelector({
  currentUser: makeSelectCurrentUser(),
  // users: makeSelectUsers(),
  // roles: makeSelectRoles(),
  // // permissions: makeSelectRoles(),
  // loading: appSelectors.makeSelectLoading(),
  // error: appSelectors.makeSelectError(),
  // showMessages: appSelectors.makeSelectShowMessages()
});

const mapDispatchToProps = (dispatch) => {
  return {    
    onToggleModal: (modalData) => {dispatch(toggleModal(modalData))},
    onToggleAlert: alertData => dispatch(toggleAlert(alertData)),
    onCreateMessage: message => dispatch(createMessage(message)),

  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Messages);
