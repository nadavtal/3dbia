
import { createSelector } from 'reselect';
import { initialState } from './reducer';

export const selectBridgeForm = (state) =>
{
  return state.bridgeForm || initialState
};


export const makeSelectBridgeFormUpdating = () =>
createSelector(
  selectBridgeForm,
    bridgeForm => bridgeForm.updatading,
  );
