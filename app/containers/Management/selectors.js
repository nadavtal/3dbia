
import { createSelector } from 'reselect';
import { initialState } from './reducer';

export const selectManagementModule = (state) =>
{

  return state.managementModule || initialState
};

export const makeSelectComponentName = () =>
  createSelector(
    selectManagementModule,
    managementModule => managementModule.componentName,
  );

