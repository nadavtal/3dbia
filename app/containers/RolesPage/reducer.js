import * as actionTypes from './constants';
import {toggleModal} from '../App/actions'

export const rolesInitialState = {
  roles: [
    {id: '1', name: 'Admin', permissions: [
      'users restrictions'
    ]},
    {id: '2', name: 'UAV operator', permissions: [
      'upload survey list',
      'download survey list',
      'upload images',
      'download images',
      'upload images',
      'download images',
      'upload flight plans',
      'download flight plans',
    ]},
    {id: '3', name: 'CAD technician', permissions: [
      'upload survey list',
      'download survey list',
      'upload images',
      'download images',
      'upload models',
      'download models',
     ]},
    {id: '4', name: 'Bridge enginner QC', permissions: [
      'create local applications folders'
    ]},
    {id: '5', name: 'Bridge analyzer', permissions: []},
    {id: '6', name: 'DOT user', permissions: []},
    {id: '7', name: 'Survey manager', permissions: []},
  ],
  permissions: [
    {id: '1', name: 'export survey list', roles: ['Admin','UAV operator', 'CAD technician'], iconName: 'file-export'},
    {id: '2', name: 'download survey list', roles: ['Admin','UAV operator', 'CAD technician'], iconName: ''},
    {id: '3', name: 'export images', roles: ['Admin','UAV operator', 'CAD technician'], iconName: ''},
    {id: '4', name: 'download images', roles: ['Admin','UAV operator', 'CAD technician'], iconName: ''},
    {id: '5', name: 'export flight plans', roles: ['Admin','UAV operator'], iconName: ''},
    {id: '6', name: 'download flight plans', roles: ['Admin','UAV operator'], iconName: ''},
    {id: '7', name: 'export models', roles: ['Admin','CAD technician'], iconName: ''},
    {id: '8', name: 'download models', roles: ['Admin','CAD technician'], iconName: ''},
    {id: '9', name: 'create local applications folders', roles: ['Admin','Bridge enginner QC'], iconName: ''},
    {id: '10', name: 'users restrictions', roles: ['Admin','Admin'], iconName: ''},
    {id: '11', name: 'create new project', roles: ['Admin','Survey manager'], iconName: ''},
    {id: '12', name: 'create new survey', roles: ['Admin','Survey manager'], iconName: ''},
    {id: '13', name: 'allocate UAV operators', roles: ['Admin','Survey manager'], iconName: ''},
    {id: '14', name: 'allocate CAD technician', roles: ['Admin','Survey manager', 'UAV operator'], iconName: ''},
  ],
  selectedRole: ''
}

const search = (string, array) => {
  let foundItems = []
  for (let item in array) {
    if (item.includes(string)){
      foundItems.push(item)
    }
  }

  return foundItems
}

const reducer = (state = rolesInitialState, action) => {
    // console.log(state)
    switch (action.type) {
      case actionTypes.ADD_ROLE:

        const newRole = {id: state.roles.length + 1, name: action.newRole, permissions: []}
        console.log(state.roles.concat(newRole))
        return {
          ...state,
          roles: state.roles.concat(newRole)
        };
      case actionTypes.ADD_PERMISSION:
        const newPermission = {id: state.permissions.length + 1, name: action.newPermission, roles: [action.role]}
        return {
          ...state,
          permissions: state.permissions.concat(newPermission)
        };
      case actionTypes.DELETE_ROLE:
        console.log('DELETE_ROLE');
        console.log(action)
        return {
            ...state,
            roles: state.roles.filter(role => {
              return role.name !== action.name
            })
        };
      case actionTypes.DELETE_PERMISSION:
        console.log('DELETE_PERMISSION');
        console.log(action)
        return {
            ...state,
            permissions: state.permissions.filter(permission => {
              return permission.name !== action.name
            })
        };
      case actionTypes.SEARCH_ROLE:
          const foundRoles = search(action.searchTerm, state.roles);
          console.log(foundRoles)
        return {
          ...state,
          roles: [...state.roles].push({id: state.roles.length + 1, name: action.newRole, permissions: []})
        };

      default:
        return state
    }
}



export default reducer
