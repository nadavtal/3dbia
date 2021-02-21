import React, { useState } from 'react'

const ChatInput = ({
    onSubmit
}) => {
    const [msg, setMsg] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault()
        onSubmit(msg)
    }
    return (
      <form className="makeStyles-bottom-279 pb-16 px-8 absolute bottom-0 left-0 right-0"
        onSubmit={handleSubmit}>
        <div className="MuiPaper-root makeStyles-inputWrapper-280 flex align-items-center position-relative MuiPaper-elevation1 MuiPaper-rounded">
          <div className="MuiFormControl-root MuiTextField-root flex-1">
            <div className="MuiInputBase-root MuiInput-root flex flex-grow flex-shrink-0 mx-16 ltr:mr-48 rtl:ml-48 my-8 MuiInputBase-formControl MuiInput-formControl">
              <input
                value={msg}
                aria-invalid="false"
                id="message-input"
                placeholder="Type your message"
                type="text"
                className="MuiInputBase-input MuiInput-input"
                onChange={e => setMsg(e.target.value)}
              />
            </div>
          </div>
          <button
            className={`MuiButtonBase-root MuiIconButton-root absolute ltr:right-0 rtl:left-0 top-0 ${!msg.length && 'disabled'}`}
            tabIndex="0"
            type="submit"
          >
            <span className="MuiIconButton-label">
              <span
                className="material-icons MuiIcon-root text-24 MuiIcon-colorAction"
                aria-hidden="true"
              >
                send
              </span>
            </span>
            <span className="MuiTouchRipple-root" />
          </button>
        </div>
      </form>
    );
}

export default ChatInput