import React, { useEffect } from "react";
import { MDBNotification, toast, ToastContainer, MDBBtn } from "mdbreact";
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectShowNotification, makeSelectNotificationData } from '../../containers/App/selectors';
import {closeNotification} from '../../containers/App/actions'
import './Toast.css';

const Notification = ({
  notificationData,
  autoClose = 5000,
  show
}) => {


  useEffect(() => {
    // console.log('Use Effect notificationData', notificationData)
    // notify('info', 'top-right')
    notify(notificationData.type)
    // notify('error')
    // setTimeout(() => {
    //   props.closeNotification();
    // }, 5000);
  }, [notificationData]);
  // useEffect(() => {
  //   // console.log('Use Effect Notification', props)
  //   // notify('info', 'top-right')
  //   setTimeout(() => {
  //     console.log('Use Effect show changed', props.show)
  //   }, 5000);
  // }, [props.show]);

  const notify = (type, position = 'bottom-right') => {
    // console.log('NOTIFYYYYYY', type)

    // return () => {
      switch (type) {
        case 'info':
          toast.info(notificationData.message, {
            autoClose: autoClose,
            position: position
          });
          break;
        case 'success':
 
          toast.success(notificationData.message, {
            position: position,
            closeButton: false,
            icon: 'check'
          });
          break;
        case 'warning':
          // console.log('ajsdkjahskjdhaksjd')
          toast.warn(notificationData.message, {
            position,
            autoClose,
            closeButton: false
          });
          break;
        case 'error':
          toast.error(notificationData.message, {
            position: position
          });
          break;
        default:
      }
    // };
  }
  return <ToastContainer
  hideProgressBar={true}
  newestOnTop={true}
  autoClose={5000}/>

  // (
  //   <>
  //   <ToastContainer
  //   hideProgressBar={true}
  //   newestOnTop={true}
  //   autoClose={5000}
  // />
  //     {show && (
  //       <MDBNotification
  //           // autohide={notificationData.autohide} // by default = ∞ ms
  //           bodyClassName="p-5 font-weight-bold white-text"
  //           className="stylish-color-dark"
  //           closeClassName="blue-grey-text"
  //           // fade
  //           icon={notificationData.icon}
  //           iconClassName="blue-grey-text"
  //           message={notificationData.message}
  //           show={show}
  //           text={notificationData.text}
  //           title={notificationData.title}
  //           titleClassName="elegant-color-dark white-text"
  //         />

  //     )}
  //     {/* <MDBBtn color='indigo' onClick={notify('warning')}>
  //         Top right
  //       </MDBBtn> */}
  //     <ToastContainer
  //         hideProgressBar={true}
  //         newestOnTop={true}
  //         autoClose={5000}
  //       />
  //     </>
  //   );
  }



const mapStateToProps = createStructuredSelector({
  show: makeSelectShowNotification(),
  notificationData: makeSelectNotificationData(),
});

const mapDispatchToProps = dispatch => {
  return {
    closeNotification: () => dispatch(closeNotification())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Notification);
