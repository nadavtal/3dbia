import React, { useState, useEffect, memo, useMemo } from 'react'
import { MDBInput, MDBBtn } from 'mdbreact';
import DataComponent from 'components/DataComponent/DataComponent';
import Hovered from 'components/Hovered';
const CheckBoxList = ({
    title,
    data,
    
}) => {

    const [selected, setSelected] = useState([])
    const handleItemCheckBox = (item) => {
        console.log(item)
        if (selected.includes(item)) {
            setSelected(selected.filter(n => n !== item))
        } else {
            setSelected([...selected, item])
        }
    }
    const handleItemCheckBoxAll = () => {

        if (selected.length) {
            setSelected([])
        } else {
            
            setSelected(data)
        }
    }
    return <>
        <h6 className="border-bottom p-3 d-flex justify-content-between">
        <span>{title}</span>
        <MDBInput
          type="checkbox"
          labelClass={
            selected.length == data.length &&
            'checkbox-label'
          }
          id={'CheckBoxList - select-all'}
          label={` `}
          checked={selected.length !== data.length}
          onChange={() => handleItemCheckBoxAll()}
        />
        {/* <IconButtonToolTip
              size="lg"
              iconName={selected.length == elementObjectIds.length
                  ? 'check-square'
                  : 'square'
              }
              far={selected.length == elementObjectIds.length ? false : true}
              toolTipType="info"
              toolTipPosition="left"
              toolTipEffect="float"
              toolTipText={
                  selected.length == elementObjectIds.length
                  ? 'Dont touch existing elements'
                  : 'Reset all exisitng elements'
              }
              className={
                  selected.length == elementObjectIds.length ? 'color-green' : 'color-red'
              }
              onClickFunction={() => handleNodeCheckBoxAll()}
            /> */}
      </h6>
      <div className="elementsList">
        
        {data.map((item, index) => {
        //   const isNew = newNodes.includes(item);
          const isSelected = selected.includes(item);
        //   const matchingElement = bridgeElements.find(
        //     el => el.object_id == item.name,
        //   );
          return (
            <div
              className="d-flex justify-content-between align-items-center"
              key={item.name}
            >
              <Hovered
              // element={item}
              // item={item}
              // index={index}
              >
                <span>{`${index + 1}) ${item.name}`}</span>
                {/* <span>{`${index + 1}) ${item.name} ${
                  matchingElement &&
                  matchingElement.name !== item.name
                    ? `(${matchingElement.name})`
                    : ''
                }`}</span> */}
                <div className="hoveringElement thin">
                  <DataComponent data={item} />
                </div>
                {/* <MDBIcon
                  icon={
                  isNew ? 'times-circle' : 'check'
                  }
                  className={
                  isNew ? 'color-red' : 'color-green'
                  }
              /> */}
              </Hovered>
              <MDBInput
                type="checkbox"
                labelClass={
                  isSelected && 'checkbox-label'
                }
                id={item.name + 's'}
                label={` `}
                checked={!isSelected}
                disabled={item.disabled}
                onChange={() =>
                  handleItemCheckBox(item)
                }
              />
              {/* <IconButtonToolTip
                iconName={
                  !isNew
                    ? selected.includes(item)
                      ? 'square'
                      : 'check-square'
                    : 'times-circle'
                }
                far={!selected.includes(item) ? false : true}
                toolTipType="info"
                toolTipPosition="top"
                toolTipEffect="float"
                toolTipText={
                  !isNew ? 'Reset element data' : ' as completed'
                }
                className={
                  !isNew && !selected.includes(item)
                    ? 'color-green'
                    : 'color-red'
                }
                onClickFunction={() =>
                  handleNodeCheckBoxClick(item, matchingElement)
                }
              /> */}
            </div>
          );
        })}
      </div>
    

    </>
}

export default memo(CheckBoxList)