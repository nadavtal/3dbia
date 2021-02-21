import React from 'react';
import { MDBRow, MDBCol, MDBProgress } from "mdbreact";
import IconButtonToolTip from '../../../components/IconButtonToolTip/IconButtonToolTip'
const NodeRow = (props) => {
  // console.log(props)
  const caculateCompletedPercentage = (el) => {
    const keysNum = Object.keys(el).length
    let completed = 0;
    let avg
    for (const key of Object.keys(el)) {
      if(el[key]) completed++
    }
    avg = Math.ceil(completed/keysNum*100)
    return avg
  }
  const avg = caculateCompletedPercentage(props.element)
  // console.log(avg)
  if (props.showId ) return <MDBRow className="no-gutters nodeRow"

            className={props.className}
            >
          <MDBCol md='7' onClick={() => props.onClick()}>
            <span className="nodeRowId">{props.showId ? `${props.element.object_id} : ${props.element.name}`: ''}</span>
          </MDBCol>
          <MDBCol md='3' onClick={() => props.onClick()}>
            {/* <span className="nodeRowName">{props.element.name}</span> */}
            <MDBProgress material  value={avg} className="my-1" >{avg}%</MDBProgress>
          </MDBCol>
          <MDBCol md='1' className="nodeRowActions d-flex justify-content-around">
            <div className="nodeRowActions d-flex">
              <IconButtonToolTip iconName="edit"
                toolTipType="info"
                toolTipPosition="left"
                toolTipEffect="float"
                toolTipText='Edit element'
                onClickFunction={() => props.editFunction(props.element.object_id)}
                />
              </div>
          </MDBCol>
        </MDBRow>
  else return <MDBRow className="no-gutters nodeRow"

            className={props.className}
            >
          <MDBCol md='10' onClick={() => props.onClick()}>
            {/* <span className="nodeRowName">{props.element.name}</span> */}
            {/* <MDBProgress material  value={avg} className="my-1" >{avg}%</MDBProgress> */}
          </MDBCol>
          <MDBCol md='2' className="nodeRowActions d-flex justify-content-around">
            <div className="nodeRowActions d-flex">
              <IconButtonToolTip iconName="edit"
                toolTipType="info"
                toolTipPosition="left"
                toolTipEffect="float"
                toolTipText='Edit element'
                onClickFunction={() => props.editFunction(props.element.object_id)}
                />
              </div>
          </MDBCol>
        </MDBRow>
}

export default NodeRow
