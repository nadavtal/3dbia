
import { createSelector } from 'reselect';
import { initialState } from './reducer';

export const selectMainView = (state) =>
{
  return state.mainView || initialState
};

export const makeSelectMainViewComponent = () =>
createSelector(
  selectMainView,
    mainView => mainView.componentName,
  );
