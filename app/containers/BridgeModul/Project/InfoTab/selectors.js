
import { createSelector } from 'reselect';
import { initialState } from './reducer';

export const selectInfoTab = (state) =>
{
  return state.infoTab || initialState
};

export const makeSelectSelectedTab = () =>
         createSelector(
           selectInfoTab,
           infoTab => infoTab.selectedTab,
         );
export const makeSelectIsUpdating = () =>
         createSelector(
           selectInfoTab,
           infoTab => infoTab.isUpdating,
         );
