
import { createSelector } from 'reselect';
import { initialState } from './reducer';

export const selectBottomView = (state) =>
{
  return state.bottomView || initialState
};

export const makeSelectBottomViewComponent = () =>
createSelector(
  selectBottomView,
    bottomView => bottomView.componentName,
  );
export const makeSelectShowBottomView = () =>
createSelector(
  selectBottomView,
    bottomView => bottomView.showBottomView,
  );
