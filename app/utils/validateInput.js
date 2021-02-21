export function validateInput(inputType, value, validators) {
    let valid = false
    let errMsg
    switch (inputType) {
        case 'email':
            valid = validateEmail(value)
            errMsg = "Not email structure"
            return {valid, errMsg};
    
        default:
            break;
    }
    if (validators) {
        if (validators.minLength) {
            valid = parseInt(value.length) >= validators.minLength;
            errMsg = `Must be at least ${validators.minLength} charecters`
            if (!valid) return {valid, errMsg}
        }
        if (validators.maxLength) {
            valid = parseInt(value.length) <= validators.maxLength
            errMsg = `Must be maximum ${validators.maxLength} charecters`
            if (!valid) return {valid, errMsg} 
        }
        if (validators.equalTo) {
            valid = validators.equalTo === value;
            errMsg = 'No match'
            if (!valid) return {valid, errMsg}
        }

    } else {
        return {valid: true, errMsg: ''}
    }
    return {valid, errMsg}
}

const validateEmail = (mail) =>
{
 if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
  {
    return (true)
  }

    return (false)
}