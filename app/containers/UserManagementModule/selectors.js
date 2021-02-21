
import { createSelector } from 'reselect';
import { initialState } from './reducer';

export const selectManagementModule = (state) =>
{

  return state.userManagementModule || initialState
};

export const makeSelectSelectedUsers = () =>
  createSelector(
    selectManagementModule,
    userManagementModule => userManagementModule.selectedUsers,
  );

