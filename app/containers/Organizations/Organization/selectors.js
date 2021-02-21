
import { createSelector } from 'reselect';
import { initialState } from './reducer';
import {sortBy, reArrangeObject} from 'utils/dataUtils';

export const selectOrganization = (state) =>
{

  return state.organization || initialState
};

export const makeSelectOrganization = () =>
  createSelector(
    selectOrganization,
    organizationState => organizationState.organization,
  );
export const makeSelectOrganizationProjects = () =>
  createSelector(
    selectOrganization,
    organizationState => organizationState.projects,
  );
export const makeSelectBridgeTypes = () =>
  createSelector(
    selectOrganization,
    organizationState => organizationState.bridgeTypes
  );
export const makeSelectOrganizationSurveys = () =>
  createSelector(
    selectOrganization,
    organizationState => organizationState.surveys,
  );
export const makeSelectOrganizationBridges = () =>
  createSelector(
    selectOrganization,
    organizationState => sortBy('bid', organizationState.bridges),
  );
export const makeSelectSelectedBridgeId = () =>
  createSelector(
    selectOrganization,
    organizationState => organizationState.selectedBridgeId,
  );
export const makeSelectSelectedBridge = () =>
  createSelector(
    makeSelectOrganizationBridges(), makeSelectSelectedBridgeId(),
    (bridges, selectedBridgeId) => bridges.find(bridge => bridge.bid == selectedBridgeId),
  );
export const makeSelectSelectedComponent = () =>
  createSelector(
    selectOrganization,
    organizationState => organizationState.selectedComponent,
  );
export const makeSelectSelectedProvider = () =>
  createSelector(
    selectOrganization,
    organizationState => organizationState.selectedProvider,
  );
export const makeSelectOrganizationProcessesTemplates = () =>
  createSelector(
    selectOrganization,
    organizationState => organizationState.processesTemplates,
  );
export const makeSelectOrganizationProcesses = () =>
  createSelector(
    selectOrganization,
    organizationState => organizationState.processes,
  );
export const makeSelectOrganizationProcessesTasks = () =>
  createSelector(
    selectOrganization,
    organizationState => organizationState.processesTasks,
  );
export const makeSelectOrganizationProviders = () =>
  createSelector(
    selectOrganization,
    organizationState => organizationState.providers,
  );
export const makeSelectOrganizationProjectsProcesses = () =>
  createSelector(
    selectOrganization,
    organizationState => organizationState.projectsProcesses,
  );
export const makeSelectOrganizationMessages = () =>
  createSelector(
    selectOrganization,
    organizationState => organizationState.messages,
  );
export const makeSelectOrganizationTasks = () =>
  createSelector(
    selectOrganization,
    organizationState => organizationState.tasks,
  );
export const makeSelectOrganizationUsers = () =>
  createSelector(
    selectOrganization,
    organizationState => sortBy('id', organizationState.organizationUsers).map(user => reArrangeObject(user, 
      ['first_name', 'last_name', 'roleName', 'description', 'provider']))
  );
export const makeSelectOrganizationRoles = () =>
  createSelector(
    selectOrganization,
    organizationState => organizationState.organizationRoles,
  );
export const makeSelectProvidersRoles = () =>
  createSelector(
    selectOrganization,
    organizationState => organizationState.providersRoles,
  );

  export const makeSelectUniqueOrganizationUsers = () =>
  createSelector(
    selectOrganization,
    organizationState => {
      const users = organizationState.organizationUsers
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
