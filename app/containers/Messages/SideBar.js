import React, { useState } from 'react'
import {MDBIcon, MDBInput, MDBBtn} from 'mdbreact'
import Counter from 'components/Counter'

const SideBar = ({
    menu,
    createMessage
}) => {
    
    return <div className="pl-2">
        <div className="text-center">
            <MDBBtn className="rounded-8 background-dark-blue p-2 px-5"
                onClick={() => createMessage()}>
                COMPOSE
            </MDBBtn>

        </div>
        {menu.map(main => {
            return <>
                <h5 className="mt-5 mb-3">{main.name}</h5>
                {main.children.map(child => {
                    return <div className="d-flex justify-content-between align-items-center my-1 fullWidth">
                        <div>
                            <MDBIcon icon={child.icon}/>
                            <span className="ml-2">{child.name}</span>

                        </div>
                        
                        {child.counter && <div className="mr-2"><Counter count={2} bgColor="red"/></div>}
                    </div>
                })}
            </>
        })}
    </div>

}

export default SideBar