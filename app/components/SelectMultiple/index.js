import React, { useState, memo } from "react";
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
  // console.log('value SelectMultiple', value, typeof(value))
  let name = '';

  if (option.first_name) {
    name = option.first_name + ' ' + option.last_name
  } else name = option.name
  
  let text = name;
  if (option.importance) {
    text = name + ' - ' + option.importance
  }
  let checked = value.includes(option.name)
  // if (value && typeof(value) == 'object') {
    // checked =  value.includes(option.name)
  // }
  
  return {
    text: text,
    value: option.id ? option.id : name,
    checked: checked ,
    disabled: disabled
  }
}

const SelectMultiple = ({options, label, value, onChange, disabled, className}) => {

  // const [selected, setSelected] = useState([])
  let optionsSelect
  
  optionsSelect = createSelectOptionsArray(options, value, disabled) 
  // console.log(typeof(options), options)

  const handleSelected = (value) => {
    // console.log('handleSelectedMultiple', value)
    if( value.length) {
      onChange(value)
    }
  }
  // console.log('optionsSelectMultiple', optionsSelect)
  return (

        <MDBSelect
          // search
          options={optionsSelect}
          // selected={value ? optionsSelect.find(option => option.value == value).text : ''}
          // label={value ? optionsSelect.find(option => option.value == value).text : label}
          selected={value}
          label={label}
          className={className}
          multiple
          getValue={value => handleSelected(value)}
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

export default memo(SelectMultiple);
