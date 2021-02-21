/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectTableFilters = (state) =>
{

  // console.log(state);
  // console.log(initialState);
  return state.TableFilters || initialState
};

const makeSelectDisaplayedData = () =>
  createSelector(
    selectTableFilters,
    TableFilters => TableFilters.displayedData,
  );

export { selectTableFilters, makeSelectDisaplayedData };
