import React, { memo } from 'react';
import {
  MDBTreeview,
  MDBTreeviewList,
  MDBTreeviewItem,
} from 'mdbreact';

import Accordion from 'components/Accordion/Accordion'
const TreeSimple = ({
  data,
  accordionMode,
  onClick,
  selectedItem
}) => {
  // console.log(data);

  const handleClick = (value) => {
    // console.log(value)
    onClick(value)
    // if (value) props.onClick(parseInt(value))
  }
  
  return (
    <MDBTreeview
      theme='colorful'
      // header={props.header}
      className='fullWidth bgPrimaryFaded1'
      // getValue={value => handleClick(value)}
    >
      {data.map(parent => {
        return (
          <MDBTreeviewList
            key={parent.name}
            // icon='envelope-open'
            title={parent.name}
            far open>

            {parent.children && parent.children.length && parent.children.map(child => {
              if (child.children) {
                return (
                  <MDBTreeviewList
                    key={child.name}
                    title={child.name}
                    // icon='plus'
                    far
                  >
                    {child.children &&
                      child.children.length &&
                      child.children.map(child2 => {
                        return (
                          <MDBTreeviewItem
                            key={child2.name}
                            className={child2.name == selectedItem ? 'opened' : ''}
                            icon="folder"
                            title={child2.name}
                            opened={child2.name == selectedItem}
                            onClick={() =>
                              handleClick(child2.name)
                            }
                          />
                        );
                      })}
                  </MDBTreeviewList>
                );

              } else {
                // console.log(child.name == selectedItem)
                return !accordionMode ? 
                <MDBTreeviewItem
                    key={child.name}
                    className={child.name == selectedItem ? 'opened' : ''}
                    icon="folder"
                    title={`${child.name} (${child.files ? child.files.length : '0'})`}
                    // opened={child.name == selectedItem}
                    onClick={() =>
                      handleClick(child)
                    }
                  />
                  :
                  <Accordion 
                    header={child.name}
                    data={[]}
                    />
                // return (
                //   // <MDBTreeviewItem
                //   //   key={child}
                //   //   icon="folder"
                //   //   title={child}
                //   //   onClick={() =>
                //   //     handleClick(child)
                //   //   }
                //   // />
                //   <Accordion 
                //     header={child}
                //     data={[]}
                //     />
                // );
              }

              })
            }
          </MDBTreeviewList>

        )
      })}
      {/* <MDBTreeviewList icon='envelope-open' title='Mail' far open>
        <MDBTreeviewItem icon='address-book' title='Contact' far />
        <MDBTreeviewItem icon='bell' title='Offer' far />
        <MDBTreeviewList icon='calendar' title='Calendar' far open>
          <MDBTreeviewItem icon='clock' title='Deadlines' far />
          <MDBTreeviewItem icon='users' title='Meetings' opened />
          <MDBTreeviewItem icon='basketball-ball' title='Workouts' />
          <MDBTreeviewItem icon='mug-hot' title='Events' />
        </MDBTreeviewList>
      </MDBTreeviewList>
      <MDBTreeviewList title='Inbox' far>
        <MDBTreeviewItem title='Admin' far />
        <MDBTreeviewItem title='Corporate' far />
        <MDBTreeviewItem title='Finance' far />
        <MDBTreeviewItem title='Other' far />
      </MDBTreeviewList>
      <MDBTreeviewList icon='gem' title='Favourites' far>
        <MDBTreeviewItem icon='pepper-hot' title='Restaurants' />
        <MDBTreeviewItem icon='eye' title='Places' far />
        <MDBTreeviewItem icon='gamepad' title='Games' />
        <MDBTreeviewItem icon='cocktail' title='Cocktails' />
        <MDBTreeviewItem icon='pizza-slice' title='Food' />
      </MDBTreeviewList>
      <MDBTreeviewItem icon='comment' title='Notes' far />
      <MDBTreeviewItem icon='cog' title='Settings' />
      <MDBTreeviewItem icon='desktop' title='Devices' />
      <MDBTreeviewItem icon='trash-alt' title='Deleted items' /> */}
    </MDBTreeview>
  )
}

export default memo(TreeSimple)

