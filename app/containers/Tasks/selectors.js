
import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectTasks = (state) => state.tasks || initialState

export const makeSelectBridgeIds = () =>
  createSelector(
    selectTasks,
    tasksState => tasksState.bridgeIds,
  );
export const makeSelectCurrentTaskOrder = () =>
  createSelector(
    selectTasks,
    tasksState => tasksState.currentTaskOrder,
  );


