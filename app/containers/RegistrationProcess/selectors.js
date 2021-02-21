import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectRegistrationProcess = state => {
  
  return state.registrationProcess || initialState;
}
const makeSelectProviderOrganizations = () => {
  
  return createSelector(
    selectRegistrationProcess,
    registrationProcess => registrationProcess.providerOrganizations,
  );
}
const makeSelectMessage = () => {
  
  return createSelector(
    selectRegistrationProcess,
    registrationProcess => registrationProcess.msg,
  );
}

  export { selectRegistrationProcess, makeSelectProviderOrganizations, makeSelectMessage };