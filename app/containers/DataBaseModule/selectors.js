
import { createSelector } from 'reselect';
import { initialState } from './reducer';

export const selectDataBaseModule = (state) =>
{
  return state.dataBaseModule || initialState
};

export const makeSelectData = () =>
createSelector(
  selectDataBaseModule,
    dataBaseModule => dataBaseModule.data,
  );

