import React from 'react'
import ProfileUserImage from 'components/ProfileUserImage'
import DateField from 'components/DateField/DateField';
import styled from 'styled-components';
import IconButtonToolTip from 'components/IconButtonToolTip/IconButtonToolTip';
import Hovered from 'components/Hovered';
import { MDBIcon } from 'mdbreact';
                
const Message = ({
    message,
    showProfile,
    onDelete,
    onView
}) => {

    const MessageWrapper = styled.div`
        position: relative;
        
        &:hover .messageActions {
            display: block;
        }
    `;
    const ActionsWrapper = styled.div`
        position: absolute;        
        top: .2rem;
        right: 1.7rem;
        font-size: .6rem;
        color: white;
        display: none;

    `;
    return (
      <div>
        <MessageWrapper
          className="makeStyles-messageRow-274 contact first-of-group last-of-group mt-4 transitioned"
          // className="makeStyles-messageRow-274 contact first-of-group last-of-group mt-4 transitioned"
        >
          {showProfile && (
            <div className="MuiAvatar-root MuiAvatar-circle makeStyles-avatar-275">
              <ProfileUserImage />
            </div>
          )}
          <div
            className={`makeStyles-bubble-276 color-white ${
              message.location && message.location.length
                ? 'bgSecondary'
                : 'bgPrimary'
            }`}
          >
            {message.location && (
              <IconButtonToolTip
                iconName="eye"
                toolTipType="info"
                toolTipPosition="left"
                toolTipEffect="float"
                toolTipText="View"
                className={`mx-2 text-black float-left`}
                onClickFunction={() => onView()}
              />
            )}
            <div className={`makeStyles-message-277`}>
              {message.message}
              <p className="MuiTypography-root makeStyles-time-278 MuiTypography-body1 MuiTypography-colorTextSecondary">
                <DateField date={message.createdAt} />
              </p>
            </div>
          </div>
          <ActionsWrapper className="z-100 messageActions">
            <MDBIcon icon="times" onClick={() => onDelete()} />
            {/* <IconButtonToolTip
              iconName="times"
              toolTipType="error"
              toolTipPosition="left"
              toolTipEffect="float"
              toolTipText="Delete"
              className={`mx-2 text-black`}
              onClickFunction={() => onDelete()}
            /> */}
          </ActionsWrapper>
        </MessageWrapper>
      </div>
    );
}

export default Message;