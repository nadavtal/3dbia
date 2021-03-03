import React from 'react'
import { MDBIcon, MDBSpinner } from 'mdbreact'
MDBSpinner
const MouseLocation = ({
    notification,
    loading
}) => {
    console.log('notification', notification)

    return (
        <div 
            className="cesiumNotifications d-flex bgPrimary color-white fontSmall transitioned">   
            {loading && <MDBSpinner yellow small className="mr-1" />  }        
            {notification}
            {/* <span>HEIGHT: <span>{position.height}</span></span> */}

        </div>
    )
}

export default MouseLocation