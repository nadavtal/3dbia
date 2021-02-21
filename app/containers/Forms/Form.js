import React, { useState, useEffect, memo } from 'react';
import Input from 'components/Input/Input';
import Button from 'components/CustomButton/Button';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import {
  makeSelectRoles,
  makeSelectRoleTypes,
  makeSelectUsers,
  makeSelectFoundResults,
  makeSelectModalOpen,
  makeSelectAlertOpen,
  makeSelectGeneralUserStatuses,
  makeSelectConnectionStatuses
} from '../App/selectors';
import { findEntityBy } from '../AppData/actions';
import { toggleAlert, toggleModal } from '../App/actions';
import Overlay from '../../components/Overlay';
import { MDBRow, MDBCol, MDBBtn } from 'mdbreact';
import { getAvailableUsersByRoleId } from 'utils/dataUtils'

import './Forms.css';
import { forms } from './formsTemplates';

const form = props => {
  //SET FROM STATES
  const [formTypeState, setFormTypeState] = useState({});
  const [formIsValidState, setformIsValidState] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const [overLayData, setOverLayData] = useState()
  let formElementArray = [];
  // console.log(formTypeState)

  useEffect(() => {

    let form = { ...forms[props.formType] };

    if (props.editMode !== 'create' && props.item) {
      form = insertItemInForm(form, props.item);
      // console.log(form)
      setformIsValidState(true);
    }
    assignPropsToSelects(form);
    // console.log(form)
    setFormTypeState(form);
    return () => {
      setFormTypeState({});
      setShowOverlay(false)
    };
  }, [props.formType]);

  useEffect(() => {
    if (props.foundResults) {
      console.log("props.foundResults", props.foundResults)
      handleBlurResults(props.foundResults, props.foundResults.element)

    }
    return () => {
      setShowOverlay(false);
      setOverLayData(null)
    };
  }, [props.foundResults]);
  useEffect(() => {
    
  }, [overLayData]);

  const insertItemInForm = (form, item) => {
    console.log(item)
    const updatedForm = {
      ...form,
    };

    for (let key in updatedForm) {
      // console.log(key, item[key])
      if (key == 'confirmPassword' && updatedForm.password) {
        updatedForm.confirmPassword.value = updatedForm.password.value;
        updatedForm.confirmPassword.valid = true;
      }
      if (item[key]) {
        // console.log(props)
        updatedForm[key].value = item[key] ? item[key] : '';
        updatedForm[key].valid = true
        
      }
      if (props.editMode == 'view') updatedForm[key].elementConfig['disabled'] = true

    }
    console.log(updatedForm)
    return updatedForm;
  
  };
  const assignPropsToSelects = form => {
    console.log('assignPropsToSelects', form)
    console.log('assignPropsToSelects', props)
    if (form) {
      if (form.user_id && props.users && props.users.length) {
   
        form.user_id.elementConfig.options = props.users;
      }
      if (form.project_manager_id && props.users && props.users.length) {
        // console.log(form.user_id)
        form.project_manager_id.elementConfig.options = props.users;
      }
      if (form.provider_id && props.providers && props.providers.length) {
        // console.log(form.user_id)
        form.provider_id.elementConfig.options = props.providers;
      }
      if (form.role && props.roleTypes && props.roleTypes.length) {
        // console.log(form.user_id)
        form.role.elementConfig.options = props.roleTypes;
      }
      if (form.roles && props.roleTypes && props.roleTypes.length) {
        // console.log(form.user_id)
        form.roles.elementConfig.options = props.roleTypes;
      }
      if (form.role_type_name && props.roleTypes && props.roleTypes.length) {
        // console.log(form.user_id)
        form.role_type_name.elementConfig.options = props.roleTypes;
      }
      if (form.nodes && props.nodes && props.nodes.length) {
        // console.log(props.nodes)
        form.nodes.elementConfig.options = props.nodes;
      }
      if (form.span_id && props.spans && props.spans.length) {
        // console.log(props.nodes)
        form.span_id.elementConfig.options = props.spans;
      }
      if (form.structure_type_id && props.structureTypes) {
        // console.log(props.structureTypes)
        form.structure_type_id.elementConfig.options = props.structureTypes;
      }
      if (form.element_group && props.elementsGroups) {
        // console.log(props.structureTypes)
        form.element_group.elementConfig.options = props.elementsGroups;
      }
      if (form.element_group_id && props.elementsGroups) {
        // console.log(props.structureTypes)
        form.element_group_id.elementConfig.options = props.elementsGroups;
      }
      if (form.element_type_id && props.elementsTypes) {
        // console.log('form.element_group', form.element_group_id.value)
        const types = props.elementsTypes.filter(
          type => type.element_group_id == form.element_group_id.value,
        );
        // console.log(types)
        form.element_type_id.elementConfig.options = types;
      }
      if (form.organization_id && props.organizations) {
        form.organization_id.elementConfig.options = props.organizations;
      }
      if (form.provider_id && props.providers) {
        form.provider_id.elementConfig.options = props.providers;
      }
      if (form.role_id && props.roles) {
        // console.log(props.roles)
        form.role_id.elementConfig.options = props.roles;
      }
      if (form.type && props.roleTypes) {
        form.type.elementConfig.options = props.roleTypes;
      }
    
      if (form.status && props.statuses) {
        form.status.elementConfig.options = props.statuses;
      }
      if (form.connectionStatus && props.connectionStatuses) {
        form.connectionStatus.elementConfig.options = props.connectionStatuses;
      }
      if (form.general_status && props.statuses) {
        form.general_status.elementConfig.options = props.statuses;
      }
      if (form.roles && props.roles) {
        form.roles.elementConfig.options = props.roles;
      }
      if (form.role_id && props.roles) {
        form.role_id.elementConfig.options = props.roles;
      }
      if (form.role_type_id && props.roleTypes) {
        form.role_type_id.elementConfig.options = props.roleTypes;
      }
      if (form.processTemplate && props.processesTemplates) {
        form.processTemplate.elementConfig.options = props.processesTemplates;
      }
      if (form.taskName && props.taskNames) {
        form.taskName.elementConfig.options = props.taskNames;
      }
      if (form.survey_id && props.surveys) {
        form.survey_id.elementConfig.options = props.surveys;
      }
      if (form.bridge_type && props.bridgeTypes) {
        form.bridge_type.elementConfig.options = props.bridgeTypes;
      }
    }
  };

  const inputChangedHandler = (event, inputIdetifier) => {
    // console.log('inputChangedHandler', event, inputIdetifier)
    // clone 1st order
    const updatedForm = {
      ...formTypeState,
    };

    //clone 2st order
    const updatedFormElement = {
      ...updatedForm[inputIdetifier],
    };

    // console.log(updatedFormElement)
    if (      
      updatedForm[inputIdetifier].elementType === 'date' ||
      
      updatedForm[inputIdetifier].elementType === 'select') {
       
        // console.log('SELECT', event, typeof(event))
        // console.log(updatedForm[inputIdetifier])
        // if (updatedForm[inputIdetifier].elementConfig.multiple) {
        //   console.log(updatedFormElement.value, event)
        //   updatedFormElement.value = event
        // } else {
        //   updatedFormElement.value = event;

        // }
        // updatedFormElement.value = event;
    // } else if (
    //    updatedForm[inputIdetifier].elementType === 'select') {
    //     console.log('select', typeof(event), event, updatedForm[inputIdetifier])
    //     if (typeof(event) === 'object') {
    //       updatedFormElement.value = [...updatedFormElement.value, ...event]
    //     } else {
          updatedFormElement.value = event;

    //     }
    } else if (updatedForm[inputIdetifier].elementType === 'file') {
      console.log(event);
      // updatedFormElement.value = event.currentTarget.value;
      updatedFormElement.value = event;
    } 
    
    else if (
      updatedForm[inputIdetifier].elementType === 'selectMultiple') {
     
        updatedFormElement.value = [...updatedFormElement.value, ...event]
    } else if (updatedForm[inputIdetifier].elementConfig.type === 'number') {
      // console.log(event, inputIdetifier);
      updatedFormElement.value = parseFloat(event.target.value);
    } else if (updatedForm[inputIdetifier].elementType === 'checkbox') {
      updatedFormElement.value = !updatedFormElement.value;
    } else {
      // console.log(event.target.value)
      updatedFormElement.value = event.target.value;
      // console.log(updatedFormElement)
    }

    if (inputIdetifier == 'element_group_id') {
      console.log(props.elementsTypes);
      const types = props.elementsTypes.filter(
        type => type.element_group_id == event,
      );
      updatedForm.element_type_id.elementConfig.options = types;
      if (props.formType === 'elementForm') {
        updatedForm.primary_unit.value = '';
        updatedForm.secondary_unit.value = '';
        updatedForm.importance.value = '';
        updatedForm.detailed_evaluation_required.value = '';
        updatedForm.remarks.value = '';
      }
    }
    if (inputIdetifier == 'organization_id' && props.roles) {
      console.log(props.roles);
      console.log(event);
      const orgRoles = props.roles.filter(
        role => role.organization_id == event,
      );
      console.log(orgRoles);
      console.log((updatedForm.role_id.elementConfig.options = orgRoles));
    }
    if (inputIdetifier == 'target') {
      if (event === 'organization') {
        updatedForm.provider_id.elementConfig['disabled'] = true;
        updatedForm.organization_id.elementConfig['disabled'] = false;
      }
      if (event === 'provider') {
        updatedForm.organization_id.elementConfig['disabled'] = true;
        updatedForm.provider_id.elementConfig['disabled'] = false;
      }
    }
    if (inputIdetifier == 'provider_id' && props.providerUsers) {
      console.log(props.providerUsers);
      const provUsers = props.providerUsers[event];
      updatedForm.user_id.elementConfig.options = provUsers;
    }
    if (inputIdetifier == 'user_type' && updatedForm.provider_id) {
      switch (event) {
        case 1:
          updatedForm.provider_id.value = null;
          updatedForm.provider_id.hidden = true;
          updatedForm.user_id.elementConfig.options = props.allUsers;
          updatedForm.provider_id.valid = true;
          break;
        case 2:
          updatedForm.provider_id.hidden = false;
          break;

        default:
          break;
      }
      console.log(event);
      // const provUsers = props.providerUsers[event]
      // console.log(provUsers)
      // console.log(updatedForm.provider_id)
      // updatedForm.user_id.elementConfig.options = provUsers
    }
    if (inputIdetifier == 'email' && updatedForm.first_name) {
      if (updatedForm.first_name.elementConfig.disabled) {
        updatedForm.first_name.elementConfig.disabled = false
        updatedForm.first_name.value = ''
      }
      if (updatedForm.last_name.elementConfig.disabled) {
        updatedForm.last_name.elementConfig.disabled = false
        updatedForm.last_name.value = ''
      }
      
    }

    if (props.formType === 'organizaionUserAllocationForm' && inputIdetifier == 'role_id' 
      && updatedForm.user_id) {
      console.log(event)
      console.log(props.users)
      const availableUsers = getAvailableUsersByRoleId(event, props.users)  
      console.log(availableUsers)
      updatedForm.user_id.elementConfig.options = availableUsers

    }

    // // check if valid
    if (updatedFormElement.validation)
      updatedFormElement.valid = checkValidity(
        updatedFormElement,
        inputIdetifier,
      );
    // console.log(updatedFormElement)
    // update touched
    updatedFormElement.touched = true;
    // console.log('updatedFormElement', updatedFormElement)
    updatedForm[inputIdetifier] = updatedFormElement;

    let formIsValid = true;
    for (let inputIdetifier in updatedForm) {
      formIsValid = updatedForm[inputIdetifier].valid && formIsValid;
    }
    // console.log(updatedForm);
    // console.log('formIsValid', formIsValid);
    //update state
    setFormTypeState(updatedForm);
    setformIsValidState(formIsValid);
  };
  const submitForm = event => {
   
    event.preventDefault();
    const formData = {};
    for (let formElementIdentifier in formTypeState) {
      formData[formElementIdentifier] =
        formTypeState[formElementIdentifier].value;
    }
    
    if (props.modalOpen) props.toggleModal()
    switch (props.editMode) {
      case 'create':
        // console.log(formData)
        props.createFunction(formData);
        break;
      default:
        props.editFunction(formData);
    }
  };
  const checkValidity = (formElement, inputIdetifier) => {

    let isValid = true;
    let errMsg;
 
    if (formElement.validation.required) {
      // if(typeof(formElement.value) == 'number') isValid = formElement.value
      // isValid = formElement.value.trim() !== '' && isValid;
      isValid =
        formElement.value !== null && formElement.value !== false && formElement.value !== '' && isValid;
      formElement.errMsg = 'This field is required';
      // console.log(isValid);
      if (!isValid) return isValid;
    }
    if (formElement.validation.unique) {
      isValid = formElement.value.trim() !== '' && isValid;
      formElement.errMsg = 'This user name is taken';
      if (!isValid) return isValid;
    }
    if (formElement.validation.maxLength) {
      // console.log(formElement.value.toString().length)
      isValid =
        formElement.value.toString().length <=
          formElement.validation.maxLength && isValid;
      formElement.errMsg = 'this field is too long';
      console.log(isValid);
      if (!isValid) return isValid;
    }
    if (formElement.validation.minLength) {
      console.log(formElement.value.toString().length);
      isValid =
        formElement.value.toString().length >=
          formElement.validation.minLength && isValid;
      formElement.errMsg = `'this field must be at least ${
        formElement.validation.minLength
      } figures'`;
      if (!isValid) return isValid;
    }

    if (formElement.elementConfig.type === 'email') {
      isValid = validateEmail(formElement.value);
      // console.log(isValid)
      formElement.errMsg = 'Invalid email';
      if (!isValid) return isValid;
    }
    // if (formElement.elementConfig.type === 'tel') {
    //   // if(isNaN(formElement.value)) {
    //   //   isValid = false;
    //   //   formElement.errMsg = 'Only numbers and "-" are accepted';
    //   //   return isValid
    //   // }
    //   isValid = validatePhone(formElement.value);
    //   // console.log(isValid)
    //   formElement.errMsg = 'Phone must be structured [000]-[00]-[0000000]';
    //   if (!isValid) return isValid;
    // }

    if (formElement.label === 'Model path') {
      const fileTypes = ['json', 'glb', 'gltf'];
      const extension = formElement.value.split('.').pop();
      if (!is_url(formElement.value)) {
        formElement.errMsg = 'The url is not a valid url';
        isValid = false;
        return isValid;
      }
      if (fileTypes.includes(extension)) {
        isValid = true;
        if (extension === 'json') {
          formTypeState.type.value = 'model';
          formTypeState.type.valid = true;
        } else if (extension === 'glb' || extension === 'gltf') {
          formTypeState.type.value = 'cad';
          formTypeState.type.valid = true;
        }
      } else {
        formElement.errMsg = 'File must be of type "json", "glb", "gltf"';
        isValid = false;
      }

      if (isValid) {
        formTypeState.ion_id.valid = true;
      }
    }
    if (formElement.label === 'ION ID') {
      if (formElement.valid) formTypeState.url.valid = true;
      else {
        if (!formTypeState.url.valid.length) formTypeState.url.valid = false;
      }
    }
    if (formElement.label === 'Confirm password') {
      const password = formTypeState['password'].value;
      const confirmPassword = formElement.value;
      if (password !== confirmPassword) {
        formElement.valid = false;
        formElement.errMsg = 'Must match password';
        isValid = false;
      }
    }
    return isValid;
  };
  const handleOnBlur = (formElement, value) => {
    if (formElement.config.valid) {
      if (formElement.id === 'email') {
        if (props.onBlurFunction) {
          console.log(formElement.id);
          const results = props.onBlurFunction({value, type: formElement.id});
          if (results) {
            handleBlurResults(results, formElement.id)  
          }
        }
      }
      if (formElement.id === 'name') {
        // console.log(props);
        if (props.onBlurFunction) {
          console.log(formElement.id);
          const results = props.onBlurFunction({value, type: formElement.id});
          if (results) {
            handleBlurResults(results, formElement.id)  
          }
        }
      }
    }
  };
  const validateEmail = mail => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
      return true;
    }

    return false;
  };
  const validatePhone = phone => {
    // console.log(isNaN(phone))
    if (/[0-9]{3}-[0-9]{2}-[0-9]{7}/.test(phone)) {
      return true;
    }

    return false;
  };
  const is_url = str => {
    const regexp = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
    if (regexp.test(str)) {
      return true;
    } else {
      return false;
    }
  };

  for (let key in formTypeState) {
    formElementArray.push({
      id: key,
      config: formTypeState[key],
    });
  }

  const handleBlurResults = (results, formElement) => {
    console.log(props.formType)
    switch (props.formType) {
      case 'organizationForm':
        console.log(formElement)
        switch (formElement) {
          case 'email':
            if (results.organization) {
              const updatedForm = {
                ...formTypeState,
              };
    
              //clone 2st order
              const updatedFormElement = {
                ...updatedForm[formElement],
              };
              console.log(updatedFormElement);
              updatedFormElement.valid = false;
              updatedFormElement.errMsg = `This email is allready used by organization: ${results.organization.name}`;
              updatedForm[formElement] = updatedFormElement;
              console.log(updatedForm);
              setFormTypeState(updatedForm);
              // setformIsValidState(false);
              break;
    
            }
    
            if (results.provider) {
              const updatedForm = {
                ...formTypeState,
              };
    
              //clone 2st order
              const updatedFormElement = {
                ...updatedForm[formElement],
              };
              console.log(updatedFormElement);
              updatedFormElement.valid = false;
              updatedFormElement.errMsg = `This email is allready used by provider: ${results.provider.name}`;
              updatedForm[formElement] = updatedFormElement;
              console.log(updatedForm);
              setFormTypeState(updatedForm);
              // setformIsValidState(false);
              break;
    
            }
            if (results.user) {
              const overlayConfig = {
                msg: `This email is assigned to a user: ${results.user.first_name}  ${results.user.last_name}`,
                actionText: `Do you want to allocate ${results.user.first_name}  ${results.user.last_name} as organization admin`,
                btnText: 'Allocate',
                cancelFunction: () => {
                  const updatedForm = {
                    ...formTypeState,
                  };
                  updatedForm.email.value = '';
                  updatedForm.email.valid = false
    
                  //clone 2st order
                  // const updatedFormElement = {
                  //   ...updatedForm[formElement],
                  // };
                  // console.log(updatedFormElement);
                  console.log(updatedForm);
                  setShowOverlay(false)
                  setFormTypeState(updatedForm);
                },
                confirmFunction: () => {
                    const updatedForm = {
                      ...formTypeState,
                    };
                    updatedForm.user_id.value = results.user.id;
                    // updatedForm.name.value = `${results.user.first_name} ${results.user.last_name}`
                    updatedForm.first_name.value = results.user.first_name;
                    updatedForm.last_name.value = results.user.last_name;
                    updatedForm.email.value = results.user.email;
                    updatedForm.first_name.valid = true
                    updatedForm.last_name.valid = true
                    updatedForm.email.valid = true;
                    updatedForm.first_name.elementConfig.disabled = true
                    updatedForm.last_name.elementConfig.disabled = true
                    
                    //clone 2st order
                    // const updatedFormElement = {
                    //   ...updatedForm[formElement],
                    // };
                    // console.log(updatedFormElement);
                    console.log(updatedForm);
                    setShowOverlay(false)
                    setFormTypeState(updatedForm);
                    // setformIsValidState(false);
                    
                }
              }
              setOverLayData({...results, ...overlayConfig})
              setShowOverlay(true)
              break;
    
            }
            break;
          case 'name':
            if (results.organization) {
              console.log(formElement)
              const updatedForm = {
                ...formTypeState,
              };
    
              //clone 2st order
              const updatedFormElement = {
                ...updatedForm[formElement],
              };
              // console.log(updatedFormElement);
              updatedFormElement.valid = false;
              updatedFormElement.errMsg = `This name is allready used by organization: ${results.organization.name}`;
              updatedForm[formElement] = updatedFormElement;
              console.log(updatedForm);
              setFormTypeState(updatedForm);
              setformIsValidState(false);
              break;
    
            }
    
            if (results.provider) {
              const updatedForm = {
                ...formTypeState,
              };
    
              //clone 2st order
              const updatedFormElement = {
                ...updatedForm[formElement],
              };
              console.log(updatedFormElement);
              updatedFormElement.valid = false;
              updatedFormElement.errMsg = `This name is allready used by provider: ${results.provider.name}`;
              updatedForm[formElement] = updatedFormElement;
              console.log(updatedForm);
              setFormTypeState(updatedForm);
              // setformIsValidState(false);
              break;
    
            }
   
            break;
        
          default:
            break;
        }
      break;  
      case 'registerUserForm':
        console.log(results)
        // if (results.organization) {
        //   const updatedForm = {
        //     ...formTypeState,
        //   };

        //   //clone 2st order
        //   // const updatedFormElement = {
        //   //   ...updatedForm[formElement],
        //   // };
        //   // console.log(updatedFormElement);
        //   updatedForm.email.valid = false;
        //   updatedForm.email.errMsg = `This email is allready used by organization: ${results.organization.name}`;
          
        //   console.log(updatedForm);
        //   setFormTypeState(updatedForm);
        //   // setformIsValidState(false);
        //   break;

        // }

        // if (results.provider) {
        //   // console.log(formElement)
        //   const updatedForm = {
        //     ...formTypeState,
        //   };

        //   updatedForm.email.valid = false;
        //   updatedForm.email.errMsg = `This email is allready used by provider: ${results.provider.name}`;
          
        //   console.log(updatedForm);
        //   setFormTypeState(updatedForm);
        //   // setformIsValidState(false);
        //   break;

        // }
        if (results.user) {
          if (results.allocated) {
            // const updatedForm = {
            //   ...formTypeState,
            // };
            // updatedForm.email.value = '';
            // updatedForm.email.valid = false
            // updatedForm.email.errMsg = `${results.user.first_name} ${results.user.last_name} is allready allocated to you`

            // setFormTypeState(updatedForm);
            const overlayConfig = {
              msg: `This email is assigned to ${results.user.first_name}  ${results.user.last_name} and is allocated to you`,
              actionText: `Do you want to allocate ${results.user.first_name}  ${results.user.last_name} to another role?`,
              btnText: 'Yes',
              cancelFunction: () => {
                const updatedForm = {
                  ...formTypeState,
                };
                updatedForm.email.value = '';
                updatedForm.email.valid = false
  
                //clone 2st order
                // const updatedFormElement = {
                //   ...updatedForm[formElement],
                // };
                // console.log(updatedFormElement);
                console.log(updatedForm);
                setShowOverlay(false)
                setFormTypeState(updatedForm);
              },
              confirmFunction: () => {
                  const updatedForm = {
                    ...formTypeState,
                  };
                  updatedForm.id.value = results.user.user_id;
                  updatedForm.id.valid = true;
                  updatedForm.email.value = results.user.email;
                  updatedForm.email.valid = true;
                  updatedForm.email.elementConfig.disabled = true;
                  updatedForm.first_name.value = results.user.first_name;
                  updatedForm.last_name.value = results.user.last_name;
                  updatedForm.first_name.valid = true;
                  updatedForm.last_name.valid = true;
                  updatedForm.first_name.elementConfig.disabled = true;
                  updatedForm.last_name.elementConfig.disabled = true;
                  setFormTypeState(updatedForm);
                  setShowOverlay(false)
                  setFormTypeState(updatedForm);
                  // setformIsValidState(false);
                  
              }
            }
            setOverLayData({...results, ...overlayConfig})
            setShowOverlay(true)
            break
          } 
          else {
            const overlayConfig = {
              msg: `This email is assigned to a user: ${results.user.first_name}  ${results.user.last_name}`,
              actionText: `Do you want to allocate ${results.user.first_name}  ${results.user.last_name} to this role?`,
              btnText: 'Allocate',
              cancelFunction: () => {
                const updatedForm = {
                  ...formTypeState,
                };
                updatedForm.email.value = '';
                updatedForm.email.valid = false
  
                //clone 2st order
                // const updatedFormElement = {
                //   ...updatedForm[formElement],
                // };
                // console.log(updatedFormElement);
                console.log(updatedForm);
                setShowOverlay(false)
                setFormTypeState(updatedForm);
              },
              confirmFunction: () => {
                  const updatedForm = {
                    ...formTypeState,
                  };
                  updatedForm.id.value = results.user.id
                  updatedForm.first_name.value = results.user.first_name;
                  updatedForm.last_name.value = results.user.last_name;
                  updatedForm.email.value = results.user.email;
                  updatedForm.first_name.valid = true
                  updatedForm.last_name.valid = true
                  updatedForm.email.valid = true;
                  updatedForm.first_name.elementConfig.disabled = true
                  updatedForm.last_name.elementConfig.disabled = true
                  // updatedForm.email.elementConfig.disabled = true;
                  //clone 2st order
                  // const updatedFormElement = {
                  //   ...updatedForm[formElement],
                  // };
                  // console.log(updatedFormElement);
                  console.log(updatedForm);
                  setShowOverlay(false)
                  setFormTypeState(updatedForm);
                  // setformIsValidState(false);
                  
              }
            }
            setOverLayData({...results, ...overlayConfig})
            setShowOverlay(true)
            break;

          }

        }
      case 'providerForm':
        switch (formElement) {
          case 'email':
            if (results.organization) {
              const updatedForm = {
                ...formTypeState,
              };
    
              //clone 2st order
              // const updatedFormElement = {
              //   ...updatedForm[formElement],
              // };
              // console.log(updatedFormElement);
              updatedForm.email.valid = false;
              updatedForm.email.errMsg = `This email is allready used by organization: ${results.organization.name}`;
              
              console.log(updatedForm);
              setFormTypeState(updatedForm);
              // setformIsValidState(false);
              break;
    
            }
    
            if (results.provider) {
              // console.log(formElement)
              if (results.allocated) {
                const updatedForm = {
                  ...formTypeState,
                };
                updatedForm.email.value = '';
                updatedForm.email.valid = false
                updatedForm.email.errMsg = `${results.provider.name} is allready allocated to you`
    
                setFormTypeState(updatedForm);
              } 
              else {
                const overlayConfig = {
                  msg: `This name is assigned to provider: ${results.provider.name}`,
                  actionText: `Do you want to allocate ${results.provider.name} to your providers?`,
                  btnText: 'Allocate',
                  cancelFunction: () => {
                    const updatedForm = {
                      ...formTypeState,
                    };
                    console.log(updatedForm);
                    updatedForm.email.value = '';
                    updatedForm.email.valid = false
      
                    //clone 2st order
                    // const updatedFormElement = {
                    //   ...updatedForm[formElement],
                    // };
                    // console.log(updatedFormElement);
                    setShowOverlay(false)
                    setFormTypeState(updatedForm);
                  },
                  confirmFunction: () => {
                    console.log(props.createFunction)
                    props.createFunction(results.provider); 
                    setShowOverlay(false)              
                  }
                }
                setOverLayData({...results, ...overlayConfig})
                setShowOverlay(true)
                break;
    
              }
    
            }
            if (results.user) {
              const overlayConfig = {
                msg: `This email is assigned to a user: ${results.user.first_name}  ${results.user.last_name}`,
                actionText: `Do you want to create a new provider with ${results.user.first_name}  ${results.user.last_name} as provider admin?`,
                btnText: 'Create provider',
                cancelFunction: () => {
                  const updatedForm = {
                    ...formTypeState,
                  };
                  updatedForm.email.value = '';
                  updatedForm.email.valid = false
      
                  //clone 2st order
                  // const updatedFormElement = {
                  //   ...updatedForm[formElement],
                  // };
                  // console.log(updatedFormElement);
                  console.log(updatedForm);
                  setShowOverlay(false)
                  setFormTypeState(updatedForm);
                },
                confirmFunction: () => {
                    const updatedForm = {
                      ...formTypeState,
                    };
                    updatedForm.user_id.value = results.user.id
                    // updatedForm.name.value = `${results.user.first_name} ${results.user.last_name}`
                    updatedForm.first_name.value = results.user.first_name;
                    updatedForm.last_name.value = results.user.last_name;
                    updatedForm.email.value = results.user.email;
                    // updatedForm.name.valid = true
                    updatedForm.first_name.valid = true
                    updatedForm.last_name.valid = true
                    updatedForm.email.valid = true;
                    updatedForm.first_name.elementConfig.disabled = true
                    updatedForm.last_name.elementConfig.disabled = true
                    
                    //clone 2st order
                    // const updatedFormElement = {
                    //   ...updatedForm[formElement],
                    // };
                    // console.log(updatedFormElement);
                    console.log(updatedForm);
                    setShowOverlay(false)
                    setFormTypeState(updatedForm);
      
                    
                }
              }
              setOverLayData({...results, ...overlayConfig})
              setShowOverlay(true)
              break
    
            }
            break
          case 'name':
            if (results.organization) {
              const updatedForm = {
                ...formTypeState,
              };
    
              //clone 2st order
              // const updatedFormElement = {
              //   ...updatedForm[formElement],
              // };
              // console.log(updatedFormElement);
              updatedForm.name.valid = false;
              updatedForm.name.errMsg = `This name is allready used by organization: ${results.organization.name}`;
              
              console.log(updatedForm);
              setFormTypeState(updatedForm);
              // setformIsValidState(false);
              break;
    
            }
    
            if (results.provider) {
              // console.log(formElement)
              if (results.allocated) {
                const updatedForm = {
                  ...formTypeState,
                };
                updatedForm.name.value = '';
                updatedForm.name.valid = false
                updatedForm.name.errMsg = `${results.provider.name} is allready allocated to you`
    
                setFormTypeState(updatedForm);
              } 
              else {
                const overlayConfig = {
                  msg: `This name is assigned to provider: ${results.provider.name}`,
                  actionText: `Do you want to allocate ${results.provider.name} to your providers?`,
                  btnText: 'Allocate',
                  cancelFunction: () => {
                    const updatedForm = {
                      ...formTypeState,
                    };
                    console.log(updatedForm);
                    updatedForm.email.value = '';
                    updatedForm.email.valid = false
      
                    //clone 2st order
                    // const updatedFormElement = {
                    //   ...updatedForm[formElement],
                    // };
                    // console.log(updatedFormElement);
                    setShowOverlay(false)
                    setFormTypeState(updatedForm);
                  },
                  confirmFunction: () => {
                    console.log(props.createFunction)
                    props.createFunction(results.provider); 
                    setShowOverlay(false)              
                  }
                }
                setOverLayData({...results, ...overlayConfig})
                setShowOverlay(true)
                break;
    
              }
    
            }
  
            break
          default: break
        }
      
      default:
        break;
    }
  }

  const handleOverLayAction = (action) => {
    console.log(action)
  }
  const OverlayContent = ({ overLayData }) => {

    return <>
      <h1 className="mx-auto">{overLayData.msg}</h1>
      <h5>
        {overLayData.actionText}
      </h5>

      <MDBBtn
        color={`${props.btnColor ? props.btnColor : 'primary'}`}
        // disabled={!formIsValidState}
        rounded
        className={[
          'text-center float-right background-orange',
          props.className,
        ].join(' ')}
        onClick={e =>
          overLayData.confirmFunction()
        }
      >
        {overLayData.btnText}
      </MDBBtn>
      <MDBBtn
        color={props.btnColor ? props.btnColor : 'primary'}
        // disabled={!formIsValidState}
        rounded
        className={[
          'text-center float-right background-turkize',
          props.className,
        ].join(' ')}
        onClick={e =>
          overLayData.cancelFunction()
        }
      >
        Cancel
      </MDBBtn>
    </>

  };

  const formHtml = (
    <div className={props.className ? props.className : 'fullWidth'}>
      <MDBRow className="no-gutters">
        {/* {console.log(formElementArray, formTypeState)} */}
        {formElementArray.length &&
          formElementArray.map(formElement => {
            // console.log(formElement.config.elementType)
            let colWidth = props.colWidth ? props.colWidth : 4;
            if (formElement.config.elementConfig.type === 'textarea' && props.colWidth < 6) {
              colWidth = colWidth * 2;
              // console.log(colWidth)
            }
            if (!formElement.config.hidden)
              return (
                <MDBCol md={colWidth} className="px-2" key={formElement.id}>
                  <Input
                    label={formElement.config.label}
                    elementtype={formElement.config.elementType}
                    elementconfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    changed={event =>
                      inputChangedHandler(event, formElement.id)
                    }
                    invalid={!formElement.config.valid}
                    shouldValidate={formElement.config.validation}
                    touched={formElement.config.touched}
                    errMsg={formElement.config.errMsg}
                    onBlur={e =>
                      handleOnBlur(formElement, e.currentTarget.value)
                    }
                    // onBlur={() => formElement.config.onBlur ? formElement.config.onBlur : console.log('No on blur')}
                  />
                </MDBCol>
              );
          })}
      </MDBRow>
      <Overlay
        overlayOpen={showOverlay}
        animationType="overlayAnimation"
        toggleOverlay={() => setShowOverlay(!showOverlay)}
      >
        <div className="modalFormOverlay p-2 mt-5">
          {overLayData && <OverlayContent overLayData={overLayData}/>}
        </div>
      </Overlay>
      {props.editMode !== 'view' && <MDBBtn
        // color={props.btnColor ? props.btnColor : 'primary'}
        disabled={!formIsValidState}
        rounded
        className={['text-center modalFormBtn bgPrimary float-right', props.className].join(' ')}
        onClick={e => submitForm(e)}
      >
        {props.editMode == 'edit' ? 'Save' : props.editMode}
      </MDBBtn>}
      
    </div>
  );
  return formHtml;
};

const mapStateToProps = createStructuredSelector({
  allUsers: makeSelectUsers(),
  foundResults: makeSelectFoundResults(),

  modalOpen: makeSelectModalOpen(),
  alertOpen: makeSelectAlertOpen(),
  statuses: makeSelectGeneralUserStatuses(),
  connectionStatuses: makeSelectConnectionStatuses(),
});

export function mapDispatchToProps(dispatch) {
  return {
    findEntityBy: email => dispatch(findEntityBy(email)),
    toggleAlert: alertData => dispatch(toggleAlert(alertData)),
    toggleModal: () => dispatch(toggleModal()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(form);
