import React, { useState } from 'react'
import {MDBIcon, MDBInput} from 'mdbreact'

const SideBarHeader = () => {
    
    return <div className="flex flex-1 pl-3 pt-5 align-items-center">
        <MDBIcon 
            icon="envelope"
            size="lg"/>
        <h4 className="ml-3">Messages</h4>
    </div>
}

export default SideBarHeader