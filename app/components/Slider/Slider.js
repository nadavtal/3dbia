
/* eslint-disable react/prop-types */

import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';
import React from 'react';
import { MDBIcon} from "mdbreact";
import Tooltip from 'rc-tooltip';
import Slider from 'rc-slider';

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider);
const Handle = Slider.Handle;

const handle = (props) => {
  const { value, dragging, index, ...restProps } = props;
  return (
    <Tooltip
      prefixCls="rc-slider-tooltip"
      overlay={value}
      visible={dragging}
      placement="top"
      key={index}
    >
      <Handle value={value} {...restProps} />
    </Tooltip>
  );
};

const wrapperStyle = { width: '100%',  display: 'flex', 'alignItems': 'center'};
const spanStyle = {width: '3rem', 'textAlign': 'center'}
const CustomSlider = (props) => {
      // console.log('CustomSlider renderprops', props)
      return (
        <div style={wrapperStyle}>
          <span style={spanStyle}><MDBIcon icon='minus' className='mt-0 hoverScale' onClick={() => props.onChange(props.value - props.step)}/></span>
          <Range
            min={props.min}
            max={props.max}
            value={props.value}
            defaultValue={props.range ? [props.defaultMin, props.defaultMax] : props.defaultValue}
            tipFormatter={value => props.tipFormatter ? props.tipFormatter(value) : `${value}`}
            onChange={(value) => props.onChange(value)}
            range={props.range}
            step={props.step}
            // onAfterChange={(value) => console.log('onAfterChange', value)}
            />
          <span style={spanStyle}><MDBIcon icon='plus' className='mt-0 hoverScale' onClick={() => props.onChange(props.value + props.step)}/></span>
        </div>

      )


    };



export default CustomSlider
