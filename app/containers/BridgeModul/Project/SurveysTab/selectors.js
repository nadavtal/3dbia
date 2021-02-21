
import { createSelector } from 'reselect';
import { initialState } from './reducer';

export const selectBridgeForm = (state) =>
{
  return state.infoTab || initialState
};

export const makeSelectSelectedTab = () =>
createSelector(
  selectBridgeForm,
    infoTab => infoTab.selectedTab
);
