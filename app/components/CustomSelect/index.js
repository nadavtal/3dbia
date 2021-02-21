import React, { useState, memo, useEffect } from "react";
import { MDBSelect } from "mdbreact";

const createSelectOptionsArray = (options, value, disabled) => {
  // console.log(options, typeof(options))
  let array  
  if (typeof(options) === 'object'){    
    array = Object.keys(options).map((key, index) => {
     return createSelectOption(options[key], index, value, disabled)
    })
  } else {
    array = options.map((option, index) => {
      return createSelectOption(option, index, value, disabled)    
   })   
  } 
  return array
}

const createSelectOption = (option, index, incomingValue, disabled) => {
  // console.log('createSelectOption: ', incomingValue, option)
  let name = '';

  if (option.first_name) {
    name = option.first_name + ' ' + option.last_name
  } 
  else if (option.name) name = option.name
  else name = option

  
  let text = name;
  if (option.importance) {
    text = name + ' - ' + option.importance
  }
  let val;
  let checked
  if ( option.id ) {
    val = JSON.stringify(option.id)

  }
  else if (option.user_id) {
    val = JSON.stringify(option.user_id)
  }
  else if (option.org_id) {
    val = JSON.stringify(option.org_id)

  }
  else if (option.bid) {
    val = JSON.stringify(option.bid)

  }
  else {
    // val = JSON.stringify(index + 1)
    val = name
  }
  if (typeof(incomingValue) == 'object') {
    checked = incomingValue.includes(val)
  } else {
    // console.log(incomingValue)
    if (typeof(incomingValue) == 'string') {
      // console.log(text)
      checked = incomingValue == text 

    } else {
      // console.log(val)
      checked = incomingValue == val 
    }
  }
  
  
  return {
    text: text,
    value: val,
    checked: checked,
    // value: name,
    disabled: disabled
  }
}


const CustomSelect = ({options, label, multiple, search, onChange, value, className}) => {
  // console.log(options)
  
  let selectOptions = createSelectOptionsArray(options, value)
  // console.log(selectOptions)
  
  const handleSelected = (event) => {
    
    if (event.length) {
      // console.log('handleSelected event', event, typeof(event))
      // console.log('handleSelected value', value, typeof(value))
      if (!multiple) {
        if (event[0] != value) {
          console.log('FIRE Single', event, value)
          // console.log('FIRE NON MULTIPLE', event[0])
          onChange(event)
        }
      } else {
        // console.log(value)
        // if (value && !value.includes(+event)) {
        // console.log('value != event', JSON.stringify(value) === JSON.stringify(event) )
        if (JSON.stringify(value) != JSON.stringify(event)) {
          console.log('FIRE MULTIPLE')
          onChange(event)
        }
      }

    }
    // console.log('event.length', event.length)
    // console.log(value.includes(event[0]))
    // console.log(event[event.length-1] !== value[0])
    // if( event && event.length && event[0] !== value && !value.includes(event[0])) {
    //   console.log('SELECT FIREeeeee', event, value);
    //   onChange(event[0])
      
    // }
  }
  return (
    <div>
      <MDBSelect

        className={className}
        search={search}
        multiple={multiple}
        options={selectOptions}
        selected={label}
        label={label}
        getValue={event => handleSelected(event)}
      />
    </div>
  );
}

export default memo(CustomSelect);