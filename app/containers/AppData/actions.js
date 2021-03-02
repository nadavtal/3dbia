import * as actionTypes  from './constants';


export function login(user) {
  
  return {
    type: actionTypes.LOGIN,
    user: user
  };
}
export function logout() {
 
  return {
    type: actionTypes.LOGOUT,
    
  };
}
export function getUsers(userIds) {
  
  return {
    type: actionTypes.GET_USERS,
    userIds
  };
}

export function uploadFile(entityType,entity, file) {

  return {
    type: actionTypes.UPLOAD_FILE,
    entityType,
    entity,
    file,
  };
}
export function downLoadFile(bucketName, fileName) {

  return {
    type: actionTypes.DOWNLOAD_FILE,
    bucketName,
    fileName
  };
}

export function updatedUser(user) {
  return {
    type: actionTypes.UPDATE_USER,
    user,
  };
}
export function deleteUser(user) {
  return {
    type: actionTypes.DELETE_USER,
    user,
  };
}
export function getUser(id) {
  console.log(id)
  return {
    type: actionTypes.GET_USER,
    id
  };
}

export function getProviders() {
  
  return {
    type: actionTypes.GET_PROVIDERS,

  };
}


export function getOrganizations() {
  
  return {
    type: actionTypes.GET_ORGANIZATIONS,

  };
}

export function getProjects() {

  return {
    type: actionTypes.GET_PROJECTS,

  };
}

export function getRoles() {

  return {
    type: actionTypes.GET_ROLES,
  };
}

export function getAppInitialData() {

  return {
    type: actionTypes.GET_INITIAL_DATA,
  };
}



export function getprocessTemplatesTasks() {
 
  return {
    type: actionTypes.GET_PROCESS_TEMPLATES,

  };
}

export function getOrganizationbyId(id) {
  
  return {
    type: actionTypes.GET_ORGANIZATION_BY_ID,
    id,
  };
}
export function getProviderbyId(id) {
  
  return {
    type: actionTypes.GET_PROVIDER_BY_ID,
    id,
  };
}
export function getProviderOrganizations(id) {
  
  return {
    type: actionTypes.GET_PROVIDER_ORGANIZATIONS,
    id,
  };
}
export function providerOrganizationsLoaded(data) {
 
  return {
    type: actionTypes.PROVIDER_ORGANIZATIONS_LOADED,
    data,
  };
}


export function updateTask(data, dontShowToast) {

  return {
    type: actionTypes.UPDATE_TASK,
    data,
    dontShowToast
  };
}

export function updateTasks(data) {

  return {
    type: actionTypes.UPDATE_TASKS,
    data,
  };
}



export function getOrgTechnicalInfo(orgId) {
  
  return {
    type: actionTypes.GET_ORG_TECH_INFO,
    orgId,
  };
}
export function getOrgCustomFieldsTemplate(orgId, tableName) {
  
  return {
    type: actionTypes.GET_ORG_CUSTOM_FIELDS_TEMPLATE,
    orgId,
    tableName
  };
}
export function CustomFieldsTemplateLoaded(data) {
  
  return {
    type: actionTypes.CUSTOM_FIELDS_TEMPLATE_LOADED,
    data
  };
}

export function orgTechInfoLoaded(data) {
    
  return {
    type: actionTypes.ORG_TECH_INFO_LOADED,
    data,
  };
}
export function findEntityBy(element, value) {
  console.log(element, value)
  return {
    type: actionTypes.FIND_ENTITY_BY_EMAIL,
    element, 
    value
  };
}


export function registerNewOrgUser(user, company) {
  
  return {
    type: actionTypes.REGISTER_ORG_USER,
    user,
    company
  };
}
export function registerNewProvUser(user, provider, org) {
  
  return {
    type: actionTypes.REGISTER_PROV_USER,
    user,
    provider,
    org
  };
}
export function createUserAndConnection(user, provider, org) {
  
  return {
    type: actionTypes.CREATE_USER_AND_CONNECTION,
    user,
    provider,
    org
  };
}
export function createUserConnection(userConnectionData) {
  
  return {
    type: actionTypes.CREATE_USER_CONNECTION,
    userConnectionData
  };
}
export function updateUserConnection(users) {
  
  return {
    type: actionTypes.UPDATE_USERS_CONNECTION,
    users
  };
}
export function registerUserResponse(data) {
  
  return {
    type: actionTypes.REGISTER_USER_RESPONSE,
    data
  };
}
export function registerProvider(provider) {

  return {
    type: actionTypes.REGISTER_PROVIDER,
    data: provider
  };
}
export function registerOrg(org) {
  
  return {
    type: actionTypes.REGISTER_ORG,
    data: org
  };
}

export function addOrganization(data) {
  
  return {
    type: actionTypes.ADD_ORGANIZATION,
    data,
  };
}
export function updateOrg(data) {
  console.log(data)
  return {
    type: actionTypes.UPDATE_ORGANIZATION,
    data,
  };
}
export function deleteOrganization(data) {
  return {
    type: actionTypes.DELETE_ORGANIZATION,
    data,
  };
}
export function addProvider(provider, organization) {
  
  return {
    type: actionTypes.ADD_PROVIDER,
    provider,
    organization
  };
}
export function updateProvider(data) {
  return {
    type: actionTypes.UPDATE_PROVIDER,
    data,
  };
}
export function deleteProvider(data) {
  return {
    type: actionTypes.DELETE_PROVIDER,
    data,
  };
}

export function getAllData() {
  
  return {
    type: actionTypes.GET_ALL_DATA,
    
  };
}

export function allocateUserToOrg(data) {
  
  return {
    type: actionTypes.ALLOCATE_USER_TO_ORG,
    data
  };
}


export const updateRole = (role) => {

  return {
    type: actionTypes.UPDATE_ROLE,
    role: role
  };
};
export function allocateProviderToOrganization(data) {
  
  return {
    type: actionTypes.ALLOCATE_PROVIDER_TO_ORG,
    data
  };
}

export function getMessages(surveyId) {
  console.log(message)
  return {
    type: actionTypes.GET_MESSAGES,
    surveyId,
  };
}
export function allocateUserToProv(user, prov, role_id, roleName, remarks, provider_id) {
  
  return {
    type: actionTypes.ALLOCATE_USER_TO_PROV,
    user, 
    prov, 
    role_id,
    roleName,
    remarks, 
    provider_id
  };
}

export function createNewRole(data) {
  
  return {
    type: actionTypes.ADD_NEW_ROLE,
    data,
  };
}
export function editRole(data) {
  return {
    type: actionTypes.EDIT_ROLE,
    data,
  };
}
export function deleteRole(data) {
  return {
    type: actionTypes.DELETE_ROLE,
    data,
  };
}

export function createRoleType(data) {
  return {
    type: actionTypes.CREATE_ROLE_TYPE,
    data,
  };
}
export function updateOrgUser(user, role, status) {
  return {
    type: actionTypes.UPDATE_ORG_USER,
    user,
    role,
    status
  };
}
export function updateProvUser(user, role, status) {
  // console.log(user, role, status)
  return {
    type: actionTypes.UPDATE_PROV_USER,
    user,
    role,
    status
  };
}
export function updateProviderOrgConnection(company, status) {
  return {
    type: actionTypes.UPDATE_PROV_ORG_CONNECTION,
    company,
    status
  };
}
export function addProviderUser(data, user) {
  return {
    type: actionTypes.ADD_PROVIDER_USER,
    data,
    user
  };
}
export function addOrganizationUser(data, user) {
  return {
    type: actionTypes.ADD_ORGANIZATTION_USER,
    data,
    user
  };
}
export function createNewProviderUserAndThenAllocateToOrganization(newUser, organization, provider) {
  return {
    type: actionTypes.CREATE_PROV_USER_AND_ALLOCATE_TO_ORGANIZATION_USER,
    newUser, 
    organization, 
    provider
  };
}









