
import { createSelector } from 'reselect';
import { initialState } from './reducer';

export const selectLeftView = (state) =>
{
  return state.leftView || initialState
};

export const makeSelectLeftViewComponent = () =>
createSelector(
  selectLeftView,
    leftView => leftView.componentName,
  );
export const makeSelectedSelectedTab = () =>
createSelector(
  selectLeftView,
    leftView => leftView.selectedTab,
  );
