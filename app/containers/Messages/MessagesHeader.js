import React, { useState } from 'react'
import {MDBIcon, MDBInput} from 'mdbreact'
import styled from 'styled-components';
styled
const MessagesHeader = () => {
    const [searchInput, setSearchInput] = useState('');
    const handleSearch = (e) => {
        setSearchInput(e.target.balue)
    }
    return <div className="flex flex-1 align-items-center p-1 pl-2 background-white rounded-8 mt-5 w-90">
        <MDBIcon icon="search"
            size="lg"
            className="color-dark-blue"/>
        <MDBInput 
            value={searchInput}
            className=""
            onChange={handleSearch}
            containerClass="fullWidth pl-2"
            /> 
    </div>
}

export default MessagesHeader