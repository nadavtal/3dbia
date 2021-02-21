import * as actionTypes from './constants';


/**
 * Changes the input field of the form
 *
 * @param  {string} Providername The new text of the input field
 *
 * @return {object} An action object with a type of CHANGE_ProviderNAME
 */


export function allocateUser(data) {
  // console.log('Provider')
  return {
    type: actionTypes.ALLOCATE_USER_TO_PROVIDER,
    data,
  };
}

export function providerLoaded(data) {
 
  return {
    type: actionTypes.PROVIDER_LOADED,
    data,
  };
}

export function organizationSelected(org) {
//  console.log('bridgeSelected', bid)
  return {
    type: actionTypes.ORGANIZATION_SELECTED,
    org,
  };
}
export function setSelectedComponent(componentName) {
//  console.log('bridgeSelected', bid)
  return {
    type: actionTypes.SET_SELECTED_COMPONENT,
    componentName,
  };
}








