import React from 'react'
import useHover from 'utils/customHooks/useHover';
const Hovered = ({children}) => {
    const [hoverRef, isHovered] = useHover();
    // console.log(isHovered)
    return (
      <div
        
        // onClick={() => console.log(item)}
        className="position-relative"
      >
        {/* <div className=" d-flex justify-content-between"> */}
        <div ref={hoverRef}>{children[0]}</div>
        {isHovered && <div className={`${isHovered ? 'show' : 'hide'}`}>
            {children[1]}
        </div>}
        {/* </div>   */}
      </div>
    );
}

export default Hovered