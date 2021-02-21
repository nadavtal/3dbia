import { createSelector } from 'reselect';
import  {initialState}  from './reducer';


const selectResium = state =>
  state.resium || initialState
;
// const makeSelectProjects = () =>
//   createSelector(
//     selectProjects,
//     projectsPageState => projectsPageState.projects,
//   );
export const makeSelectZoomElement = () =>
  createSelector(
    selectResium,
    resium => resium.zoomElement,
  );
export const makeSelectDestroy = () =>
  createSelector(
    selectResium,
    resium => resium.destroy,
  );

