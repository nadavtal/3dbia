/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';
// console.log(initialState)
const selectConfirmation = state => state.confirmation || initialState;

const makeSelectStatus = () =>
  createSelector(
    selectConfirmation,
    confirmationState => confirmationState.status,
  );



export { selectConfirmation, makeSelectStatus };
