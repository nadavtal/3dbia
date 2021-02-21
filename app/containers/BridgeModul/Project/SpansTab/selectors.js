
import { createSelector } from 'reselect';
import { initialState } from './reducer';

export const selectSpansTab = (state) =>
{
  return state.spansTab || initialState
};

export const makeSelectSelectedTab = () =>
createSelector(
  selectSpansTab,
    spansTab => spansTab.selectedTab
);
export const makeSelectFocusedElement = () =>
createSelector(
  selectSpansTab,
    spansTab => spansTab.focusedElement
);
