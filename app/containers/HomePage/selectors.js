/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';
// console.log(initialState)
const selectHome = state => state.home || initialState;

const makeSelectUsername = () =>
  createSelector(
    selectHome,
    homeState => homeState.username,
  );
const makeSelectFormMode = () =>
  createSelector(
    selectHome,
    homeState => homeState.formMode,
  );
const makeSelectFormType = () =>
  createSelector(
    selectHome,
    homeState => homeState.formMode,
  );


export { selectHome, makeSelectUsername, makeSelectFormMode, makeSelectFormType };
