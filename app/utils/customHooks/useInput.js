import { useState } from "react";
import { validateInput } from 'utils/validateInput'
export const useInput = (initialValue, type, placeholder, validators, disabled) => {
  const [value, setValue] = useState(initialValue);
  const [valid, setValid] = useState(false);
  const [touched, setTouched] = useState(false);
  const [errMsg, setErrMsg] = useState('');

  return {
    value,
    setValue,
    reset: () => setValue(""),  
    valid,
    touched, 
    errMsg, 
    bind: {
      value,
      type,
      // placeholder,
      disabled,
      onChange: event => {
        setValid(validateInput(type, event.target.value, validators).valid);  
        setErrMsg(validateInput(type, event.target.value, validators).errMsg);  
        setTouched(true);  
        setValue(event.target.value);
      },
    },
    // validateInput: validateInput(type)
  };
};