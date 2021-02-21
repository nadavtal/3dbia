import { createSelector } from 'reselect';
import { initialState } from './reducer';
// console.log(initialState)
const selectUser = state =>
  state.user || initialState
;
const makeSelectUser = () =>
  createSelector(
    selectUser,
    state => state.user,
  );

export { selectUser, makeSelectUser };
