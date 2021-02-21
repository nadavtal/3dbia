/**
 * The global state selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';
// import memoize from 'lodash.memoize'
export const selectGlobal = state => state ? state.global : initialState;

export const selectRouter = state => state.router;

export const makeSelectCurrentUser = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.currentUser,
  );
export const makeSelectCurrentCompany = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.currentCompany,
  );
export const makeSelectCurrentUserRole = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.currentUserRole,
  );

export const makeSelectUsers = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.users,
  );
export const makeSelectOrganizations = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.organizations,
  );
export const makeSelectProviders = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.providers,
  );
export const makeSelectProjects = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.projects,
  );
export const makeSelectProcesses = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.processes,
  );
export const makeSelectTasks = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.tasks,
  );
export const makeSelectRoles = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.roles,
  );
export const makeSelectRoleTypes = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.roleTypes,
  );

export const makeSelectLoading = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.loading,
  );
export const makeSelectLoadingMessage = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.loadingMessage,
  );

export const makeSelectError = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.error,
  );

export const makeSelectRepos = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.userData.repositories,
  );

export const makeSelectLocation = () =>
  createSelector(
    selectRouter,
    routerState => routerState.location,
  );

export const makeSelectModalOpen = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.modalOpen,
  );
export const makeSelectModalData = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.modalData,
    );
export const makeSelectAlertOpen = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.alertOpen,
  );
export const makeSelectAlertData = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.alertData,
    );
export const makeSelectQuickPanelOpen = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.quickPanelOpen,
  );
export const makeSelectQuickPanelBody = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.quickPanelBody,
    );

export const makeSelectShowNotification = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.showNotification,
    );

export const makeSelectNotificationData = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.notificationData,
    );
export const makeSelectShowMessages = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.notificationData,
  );

export const makeSelectProvider = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.selectedProvider,
  );
export const makeSelectprocessTemplatesTasks = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.processTemplatesTasks,
  );
export const makeSelectKeyPressed = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.geyPressed,
  );
export const makeSelectNewOrg = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.newOrg,
  );
export const makeSelectOrganizationsAllUsers = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.organizationsUsers,
  );
export const makeSelectOrganizationProviders = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.organizationProviders,
  );
export const makeSelectProvidersUsers = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.providersUsers,
  );
export const makeSelectFoundResults = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.foundResults,
  );
export const makeSelectAllStatuses = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.statuses,
  );
export const makeSelectGeneralUserStatuses = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.statuses.filter(status => status.type == 'generalUser'),
  );
export const makeSelectSurveyStatuses = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.statuses.filter(status => status.type == 'survey'),
  );
export const makeSelectConnectionStatuses = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.statuses.filter(status => status.type == 'connection'),
  );
export const makeSelectTaskStatuses = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.statuses.filter(status => status.type == 'task'),
  );
export const makeSelectShowChat = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.showChat,
  );
export const makeSelectChatUsers = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.chatUsers,
  );
export const makeSelectMenuItem = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.menuItem,
  );

export const getStatuses = createSelector(
     selectGlobal ,
    (selectGlobal) => selectGlobal.statuses
  )
export const getModalOpen = createSelector(
     selectGlobal ,
    (selectGlobal) => selectGlobal.modalOpen
  )
export const getAlertOpen = createSelector(
     selectGlobal ,
    (selectGlobal) => selectGlobal.alertOpen
  )
export const getKeyPressed = createSelector(
     selectGlobal ,
    (selectGlobal) => selectGlobal.keyPressed
  )
export const getCurrentUserFullName = createSelector(
     selectGlobal ,
    (selectGlobal) => selectGlobal.currentUser.userInfo.first_name + ' ' + selectGlobal.currentUser.userInfo.last_name 
  )


// export {
//   selectGlobal,
//   makeSelectCurrentUser,
//   makeSelectLoading,
//   makeSelectError,
//   makeSelectRepos,
//   makeSelectLocation,
//   makeSelectModalOpen,
//   makeSelectModalData,
//   makeSelectUsers,
//   makeSelectShowMessages,
//   makeSelectProjects,
//   makeSelectShowNotification,
//   makeSelectNotificationData,
//   makeSelectProviders,
//   makeSelectRoles,
//   makeSelectRoleTypes,
//   makeSelectOrganizations,
//   makeSelectProvider,
//   makeSelectprocessTemplatesTasks,
//   makeSelectKeyPressed,
//   makeSelectAlertOpen,
//   makeSelectAlertData,
//   makeSelectProcesses,
//   makeSelectTasks,
//   makeSelectNewOrg,
//   makeSelectOrganizationsAllUsers,
//   makeSelectProvidersUsers,
//   getModalOpen,
//   getKeyPressed,
// };
