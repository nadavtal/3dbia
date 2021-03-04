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

  const ParentsAndChilds = ({parents}) => {
    return parents.map(parent => {
        if (parent.children && parent.children.length) {
          return <MDBTreeviewList
            key={parent.name}
            // icon='envelope-open'
            title={parent.name}
            far
            open
          >
            <ParentsAndChilds parents={parent.children} />    
          </MDBTreeviewList>
        }
        else {
          return (
            <MDBTreeviewItem
              key={parent.name}
              className={parent.name == selectedItem ? 'opened' : ''}
              icon="folder"
              title={parent.name}
              opened={parent.name == selectedItem}
              onClick={() => handleClick(parent.name)}
            />
          );
        }
    })}
  
  
  return (
    <MDBTreeview
      theme='colorful'
      // header={props.header}
      className='fullWidth bgPrimaryFaded1'
      // getValue={value => handleClick(value)}
    >
      <ParentsAndChilds parents={data}/>  

    </MDBTreeview>
  )
}

export default memo(TreeSimple)

