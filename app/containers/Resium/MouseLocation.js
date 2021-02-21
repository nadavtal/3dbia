import React from 'react'

const MouseLocation = ({
    position
}) => {
    // console.log('position', position)

    return (
        <div 
            className="mouseLocation d-flex bgDefault color-white fontSmall transitioned">            
            <span >LAT: <span>{position.lat}</span></span>
            <span className="mx-2">LON: <span>{position.lon}</span></span>
            {/* <span>HEIGHT: <span>{position.height}</span></span> */}

        </div>
    )
}

export default MouseLocation