
import { createSelector } from 'reselect';
import { initialState } from './reducer';

export const selectResizableLayout = (state) => state.resizableLayout || initialState

export const makeSelectRightViewSize = () =>
    createSelector(
      selectResizableLayout,
      state => state.rightViewSize,
    );

export const makeSelectLeftViewSize = () =>
    createSelector(
      selectResizableLayout,
      state => state.leftViewSize,
    );
export const makeSelectBottomViewSize = () =>
    createSelector(
      selectResizableLayout,
      state => state.bottomViewSize,
    );

