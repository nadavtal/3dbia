import React from 'react'
import IconButtonToolTip from 'components/IconButtonToolTip/IconButtonToolTip';
import Block from 'components/Block'

const ScrollRow = ({item}) => {

     
    return <div className="row">
        <div className="col-2">
            {item.name}
        </div>
        <div className="col-8 d-flex">

        </div>
        <div className="col-2">
            <IconButtonToolTip
                className="leftTopCorner m-2"
                size="lg"
                iconName="chevron-left"
                toolTipType="info"
                toolTipPosition="right"
                toolTipEffect="float"
                toolTipText="Show all projects"
                onClickFunction={() => console.log(item)}
            />
        </div>
    </div>
}

export default ScrollRow