/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';
import { rolesInitialState } from './reducer';

// console.log(rolesInitialState)
// console.log(rolesInitialState.roles)

const selectRoles = state =>
  state.roles || rolesInitialState
;
const selectPermissions = state =>
  state.permissions || rolesInitialState;

const selectSelectedRole = state =>
  state.selectedRole || rolesInitialState;


const makeSelectRoles = () =>
  createSelector(
    selectRoles,
    rolesState => rolesState.roles,
  );
const makeSelectPermissions = () =>
  createSelector(
    selectPermissions,
    rolesState => rolesState.permissions,
  );
const makeSelectSelectedRole = () =>
  createSelector(
    selectSelectedRole,
    rolesState => rolesState.selectedRole,
  );

export { selectRoles, makeSelectRoles, makeSelectPermissions, selectPermissions, makeSelectSelectedRole, selectSelectedRole};
