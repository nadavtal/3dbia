import React, { memo, useState } from 'react';
import {
  MDBTreeview,
  MDBTreeviewList,
  MDBTreeviewItem,
  MDBIcon
} from 'mdbreact';

import Accordion from 'components/Accordion/Accordion'
import IconButtonToolTip from '../IconButtonToolTip/IconButtonToolTip';
const FolderStructureTree = ({
  data,
  accordionMode,
  onClick,
  // selectedItem,
  className,
  handleFolderClick,
  showFolderContent,
  handleFolderCheckbox,
  selectedFolders,
  mode
}) => {
  console.log(data);
  const [allOpen, setAllOpen] = useState(false)
  const [selectedItem, setSelected] = useState()

  const handleClick = (value) => {
    // console.log(value)
    onClick(value)
    // if (value) props.onClick(parseInt(value))
  }
  const handleAllOpen = (value) => {
    if (allOpen == value) {
      setAllOpen()
      setAllOpen(value)
    } else {
      setAllOpen(value)

    }
  }

  const FolderRow = ({folder}) => {
    return <div className="my-1 d-flex justify-content-between">
    <div className="cursor-pointer">
      <div
        onClick={() => handleFolderClick(folder)}
      >
        {`${folder.name} ${folder.files ? `(${folder.files.length})` : ''}`}
      </div>
    </div>
    <div className="d-flex mr-2">
      {folder.files && folder.files.length > 0 && <MDBIcon
        icon="eye"
        size="sm"
        className="mr-2 cursor-pointer"
        onClick={() => showFolderContent(folder)}
        far
      />
      }
      {mode == 'Download' && (
        <MDBIcon
          icon={
            selectedFolders.includes(folder)
              ? 'check-square'
              : 'square'
          }
          size="sm"
          className="cursor-pointer"
          onClick={() => handleFolderCheckbox(folder)}
          far
        />
      )}
    </div>
  </div>
  }
  const ParentsAndChilds = ({parents}) => {
    return parents.map(parent => {
        if (parent.children && parent.children.length) {
          return <MDBTreeviewList
            key={parent.name}
            className={className}
            // icon='envelope-open'
            // title={`${parent.name} ${parent.files ? `(${parent.files.length})` : ''}`}
            title={<FolderRow folder={parent}/>}
            far
            // opened={allOpen !== undefined ? allOpen : selectedSpans.includes(span.span_id)}
            opened={allOpen}
          >
            <ParentsAndChilds parents={parent.children} />    
          </MDBTreeviewList>
        }
        else {
          return (
            <MDBTreeviewItem
              key={parent.name}
              className={`${className} ${parent.name == selectedItem ? 'opened' : ''}` }
              icon="folder"
              // title={`${parent.name} ${parent.files ? `(${parent.files.length})` : ''}`}
              title={<FolderRow folder={parent}/>}
              // opened={parent.name == selectedItem}
              onClick={() => handleClick(parent.name)}
            />
          );
        }
    })}
  
  
  return <>
      <div className="d-flex mb-1">
        <IconButtonToolTip
          className="mx-3"
          iconClassName="text-blue"
          size="lg"
          iconName="plus-circle"
          toolTipType="info"
          toolTipPosition="right"
          toolTipEffect="float"
          toolTipText={`Expand all`}
          onClickFunction={() => handleAllOpen(true)}
        />
        <IconButtonToolTip
          className=""
          iconClassName="text-blue"
          size="lg"
          iconName="minus-circle"
          toolTipType="info"
          toolTipPosition="right"
          toolTipEffect="float"
          toolTipText={`Minimize all`}
          onClickFunction={() => handleAllOpen(false)}
        />
    </div>
    <MDBTreeview
      theme='colorful'
      // header={props.header}
      className='fullWidth bgPrimaryFaded1'
      // getValue={value => handleClick(value)}
    >
      <ParentsAndChilds parents={data}/>  

    </MDBTreeview>
  </>
}

export default memo(FolderStructureTree)

