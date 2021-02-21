import { MDBIcon, MDBListGroup, MDBListGroupItem } from 'mdbreact';
import React, { useState } from 'react'

const Menu = ({
    menu,
    handleClick,
    selected
}) => {

    return (
      <MDBListGroup>
        {menu.map(item => (
          <MDBListGroupItem
            key={item.name}
            className={`cursor-pointer transitioned ${
              selected == item.name && 'bgPrimaryFaded5 color-white'
            }`}
            
            // className={`hoverBgPrimaryFaded1 cursor-pointer`}
            onClick={() => handleClick(item.name)}
          >
            <MDBIcon 
                icon={item.icon}                 
                className="mr-2 colorSecondary" />
            {item.name}
          </MDBListGroupItem>
        ))}
      </MDBListGroup>
    );
    // menuItems[type].map(item => {

    //           if (item.roleTypes) {
    //             if (item.roleTypes.includes(currentUserRole.role_type_id)) {
    //               return (
    //                 <h6
    //                   key={item.name}
    //                   className={`py-3 pl-3 ${
    //                     selectedComponent === item.name
    //                       ? 'active border-bottom-turkize'
    //                       : 'faded border-bottom border-light'
    //                   }`}
    //                   onClick={() => {
    //                     localStorage.setItem('selectedComponent', item.name);
    //                     setSelectedComponent(item.name);
    //                   }}
    //                 >
    //                   {item.name}
    //                 </h6>
    //                 )
    //               }
                
    //           } else return (
    //             <h6
    //               key={item.name}
    //               className={`py-3 pl-3 ${
    //                 selectedComponent === item.name
    //                   ? 'active border-bottom-turkize'
    //                   : 'faded border-bottom border-light'
    //               }`}
    //               onClick={() => {
    //                 localStorage.setItem('selectedComponent', item.name);
    //                 setSelectedComponent(item.name);
    //               }}
    //             >
    //               {item.name}
    //             </h6>
    //           )
    //         })
        
}

export default Menu