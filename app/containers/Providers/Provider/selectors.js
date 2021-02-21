
import { createSelector } from 'reselect';
import { initialState } from './reducer';
import {sortBy} from 'utils/dataUtils'
export const selectProvider = (state) =>
{

  return state.provider || initialState
};

export const makeSelectProvider = () =>
  createSelector(
    selectProvider,
    providerState => providerState.provider,
  );
export const makeSelectSelectedOrganization = () =>
  createSelector(
    selectProvider,
    providerState => providerState.selectedOrganization,
  );
export const makeSelectProviderProjects = () =>
  createSelector(
    selectProvider,
    providerState => providerState.projects,
  );
export const makeSelectProviderBridges = () =>
  createSelector(
    selectProvider,
    providerState => providerState.bridges,
  );
export const makeSelectProviderProcessesTemplates = () =>
  createSelector(
    selectProvider,
    providerState => providerState.processesTemplates,
  );
export const makeSelectProviderProcesses = () =>
  createSelector(
    selectProvider,
    providerState => providerState.processes,
  );
export const makeSelectProviderProcessesTasks = () =>
  createSelector(
    selectProvider,
    providerState => providerState.processesTasks,
  );
export const makeSelectProviderOrganizations = () =>
  createSelector(
    selectProvider,
    providerState => providerState.organizations,
  );
export const makeSelectProviderProjectsProcesses = () =>
  createSelector(
    selectProvider,
    providerState => providerState.projectsProcesses,
  );
export const makeSelectProviderMessages = () =>
  createSelector(
    selectProvider,
    providerState => providerState.messages,
  );
export const makeSelectProviderTasks = () =>
  createSelector(
    selectProvider,
    providerState => providerState.tasks,
  );
export const makeSelectProviderSurveys = () =>
  createSelector(
    selectProvider,
    providerState => providerState.surveys,
  );
export const makeSelectUniqueProviderUsers = () =>
  createSelector(
    selectProvider,
    providerState => {
      const users = providerState.providerUsers
      // console.log(users)
      const userIds = [];
      const uniqueUsers = []
      users.forEach(user => {
        if (!userIds.includes(user.user_id)) {
          userIds.push(user.user_id);
          uniqueUsers.push(user)
        }  
      })
      return uniqueUsers
    },
  );
export const makeSelectProviderUsers = () =>
  createSelector(
    selectProvider,
    providerState => sortBy('id', providerState.providerUsers),
  );
export const makeSelectProviderRoles = () =>
  createSelector(
    selectProvider,
    providerState => providerState.providerRoles,
  );
export const makeSelectOrganizationUsers = () =>
  createSelector(
    selectProvider,
    providerState => providerState.organizationUsers,
  );
export const makeSelectSelectedBridgeId = () =>
  createSelector(
    selectProvider,
    providerState => providerState.selectedBridgeId,
  );
export const makeSelectSelectedBridge = () =>
  createSelector(
    makeSelectProviderBridges(), makeSelectSelectedBridgeId(),
    (bridges, selectedBridgeId) => bridges && selectedBridgeId && bridges.find(bridge => bridge.bid == selectedBridgeId),
  );
export const makeSelectSelectedComponent = () =>
  createSelector(
    selectProvider,
    providerState => providerState.selectedComponent,
  );

export const makeSelectOrganizationRoles = () =>
  createSelector(
    selectProvider,
    providerState => providerState.organizationsRoles.filter(role => {
      return role.type !== 'Organization admin' && role.type !== 'General'
    }),
  );
export const makeSelectBridgeSurveys = () =>
  createSelector(
    selectProvider,
    (providerState) => providerState.surveys.filter(
      survey => survey.bid == providerState.selectedBridgeId)
  );
export const makeSelectBridgeTasks = () =>
  createSelector(
    selectProvider,
    (providerState) => providerState.tasks.filter(
      task => task.bid == providerState.selectedBridgeId)
  );
export const makeSelectOrganizationRolesByOrg = () =>
  createSelector(
    selectProvider,
    (providerState) => providerState.organizationsRoles.filter(
      orgRole => orgRole.organization_id == providerState.selectedOrganization.id)
  );
export const makeSelectOrganizationUsersByOrg = () =>
  createSelector(
    selectProvider,
    (providerState) => providerState.organizationUsers.filter(
      orgUser => orgUser.organization_id == providerState.selectedOrganization.id,
    )
  );

// export const getProviderUsersByIds = (ids) => createSelector(
//     [ makeSelectProviderUsers ],
//     (users) => users.filter(user => ids.includes(parseInt(user.user_id))
//     )
//   )
export const getSurveysByBid = createSelector(
    [ makeSelectProviderSurveys(), makeSelectSelectedBridgeId() ],
    (surveys, bid) =>  {
      console.log(surveys, bid)
      return surveys.filter(survey => survey.bid == bid)
    }

  )
export const getUniqueProviderUsers = createSelector(
    [ makeSelectProviderUsers ],
    (users) =>  {
      console.log(users)
      const userIds = [];
      const uniqueUsers = []
      users.forEach(user => {
        if (!userIds.includes(user.id)) {
          userIds.push(user.id);
          uniqueUsers.push(user)
        }  
      })
      return users
    }

  )
// export const getOrganizationRolesByOrg = createSelector(
//     [ makeSelectOrganizationRoles(), makeSelectSelectedOrganization() ],
//     (orgRoles, org) =>  {
//       console.log(orgRoles, org)
//       return orgRoles.filter(orgRole => orgRole.organization_id == org.id)
//     }

//   )


// export { selectProvider, makeSelectProvider, makeSelectProviderProjects, makeSelectProviderBridges,
//   makeSelectProviderProcessesTemplates, makeSelectProviderOrganizations, makeSelectProviderProcessesTasks,
//   makeSelectProviderMessages, makeSelectProviderProcesses, makeSelectProviderProjectsProcesses,
//   makeSelectProviderTasks, makeSelectProviderUsers, makeSelectProviderRoles, makeSelectOrganizationUsers,
//   makeSelectOrganizationRoles, makeSelectProviderSurveys, getProviderUsersByIds, getSurveysByBid };
