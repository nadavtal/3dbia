import React, { memo, useState, useMemo } from "react";
import { MDBSelect } from "mdbreact";

const createSelectOptionsArray = (options, value, disabled) => {
  let array  
  if (typeof(options) === 'object'){    
    array = Object.keys(options).map(key => {
     return createSelectOption(options[key], value, disabled)
    })
  } else {
    array = options.map(option => {
      return createSelectOption(option, value, disabled)    
   })   
  } 
  return array
}

const createSelectOption = (option, value, disabled) => {
  // console.log('createSelectOption - value: ', value, typeof(value))
  let name = '';

  if (option.first_name) {
    name = option.first_name + ' ' + option.last_name
  } else name = option.name
  
  let text = name;
  if (option.importance) {
    text = name + ' - ' + option.importance
  }
 
  return {
    text: text,
    value: option.id ? option.id : name,
    disabled: disabled,
    checked: option.id ? option.id == value : option.name == value
  }
}

const Select = ({options, label, value, onChange, disabled, className, selected, labelClass}) => {

  // const [selected, setSelected] = useState([])
  // let optionsSelect
  
  // optionsSelect = createSelectOptionsArray(options, value, disabled) 
  const optionsSelect = useMemo(() => createSelectOptionsArray(options, value, disabled) , [options, value, disabled])
  // console.log(typeof(options), options)

  const handleSelected = (event) => {
    // console.log('handleSelected', event, value)
    if( event && event.length && event[0] !== value) {
      console.log('SELECT FIREeeeee', event[0], value)
      onChange(event[0])
    }
  }
  return (

        <MDBSelect
          // search
          options={optionsSelect}
          selected={label}
          // label={value ? optionsSelect.find(option => option.value == value).text : label}
          label={label}
          value={value}
          className={className}
          labelClass={labelClass}
          getValue={event => handleSelected(event)}
          // getValue={(e) => {
          //   // console.log(typeof(e[0]), typeof(value))
          //   // console.log(e[0], value)
          //   if (e[0] && e[0] !== value) {
          //     // console.log('FIREEEEEEEEEE')
          //     onChange(e[0])
          //   }
          // }}
        />

    );
}

export default memo(Select);
