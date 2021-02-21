import React, { useState, memo } from 'react';
import { MDBInput, MDBBtn, MDBIcon, MDBSelect } from 'mdbreact';
import IconButtonToolTip from 'components/IconButtonToolTip/IconButtonToolTip';
const SpanRow = ({
    inputSpan,
    structureTypes,
    changeSpanOrder,
    onChangeSpan,
    index
}) => {
    const [span, setSpan] = useState(inputSpan)

    const onChange = (element, value) => {
        let newSpan = {...span}
        newSpan[element] = value
        setSpan(newSpan)
        // onChangeSpan(element, value)
    }
    return (
      <div className="row border-bottom py-1">
        <div className="col-2">
          <MDBInput
            label="Name"
            type="text"
            value={span.name}
            onChange={e => onChange('name', e.target.value)}
          />
        </div>
        <div className="col-4">
          <MDBInput
            label="Description"
            type="text"
            value={span.description}
            onChange={e => onChange('description', e.target.value)}
          />
        </div>
        <div className="col-2">
          <MDBSelect
            options={structureTypes}
            value={span.structure_type_id}
            onChange={e => onChange('structure_type_id', e[0])}
          />
        </div>
        <div className="col-1">
          <MDBInput
            label="Area"
            type="text"
            value={span.span_area}
            onChange={e => onChange('span_area', e.target.value)}
          />
        </div>
        <div className="col-2">
          <MDBInput
            label="Status"
            type="text"
            value={span.status}
            onChange={e => onChange('status', e.target.value)}
          />
        </div>
        <div className="col-1">
          <IconButtonToolTip
            className=""
            size="sm"
            iconName="arrow-alt-circle-up"
            toolTipType="info"
            toolTipPosition="left"
            toolTipEffect="float"
            toolTipText="Move up"
            onClickFunction={() => changeSpanOrder('up', index, span)}
          />
          <IconButtonToolTip
            className="color-red"
            size="sm"
            iconName="trash"
            toolTipType="error"
            toolTipPosition="left"
            toolTipEffect="float"
            toolTipText="Remove span"
            onClickFunction={() => console.log('aksjhdkasjhsdk')}
          />
          <IconButtonToolTip
            className=""
            size="sm"
            iconName="arrow-alt-circle-down"
            toolTipType="info"
            toolTipPosition="left"
            toolTipEffect="float"
            toolTipText="Move down"
            onClickFunction={() => changeSpanOrder('down', index, span)}
          />
        </div>
      </div>
    );
}

export default memo(SpanRow)
