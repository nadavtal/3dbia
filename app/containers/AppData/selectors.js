import { createSelector } from 'reselect';
import  {initialState}  from './reducer';


const selectProjects = state =>
  state.appData || initialState
;
// const makeSelectProjects = () =>
//   createSelector(
//     selectProjects,
//     projectsPageState => projectsPageState.projects,
//   );
const makeSelectProject = () =>
  createSelector(
    selectProjects,
    appDataState => appDataState.selectedProject,
  );


export {
  // selectProjects,
  // makeSelectProjects,
  makeSelectProject
};
