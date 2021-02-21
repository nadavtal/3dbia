
import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectProvider = (state) =>
{

  return state.provider || initialState
};

const makeSelectProvider = () =>
  createSelector(
    selectProvider,
    providerState => providerState.provider,
  );

export { selectProvider, makeSelectProvider };
