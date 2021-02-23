
export const getRoleById = (id, roles) => {
  // console.log(id, roles)
  return roles.find(role => role.id == id)
}

export const getUserById = (userId, users) => {
    // console.log(userId, users)
  return users.find(user => user.id === userId)
}
export const getProviderById = (provId, providers) => {

  return providers.find(prov => prov.id === provId)
}
export const getOrganizationUser = (user_id, organization_id, role_id, orgUsers) => {
  // console.log(user_id, organization_id, role_id, orgUsers)
  return orgUsers.find(orgUser => orgUser.user_id === user_id && orgUser.organization_id === organization_id && orgUser.role_id === role_id)
}
export const getOrganizationUsersByProvider = (provider_id, orgUsers) => {
  
  return orgUsers.filter(orgUser => orgUser.from_provider_id === provider_id)
}

export const getAllUsersByProvider = (providersUsers, provider) => {
    
  return providersUsers.filter(connection => connection.provider_id === provider.id)
}
export const getOrgById = (orgId, orgs) => {
    // console.log(orgId, orgs)
  return orgs.find(org => org.id === orgId)
}

export const getOrganizationbyId = (orgId, orgs) => {
  return orgs.find(org => org.id === orgId)
}

export const getAllProvidersUsers = (providers, providersUsers, users)  => {
  // console.log(providers, providersUsers, users)
  let providersUsersObject = {}
  providers.map(provider => {
    // console.log(provider)
    providersUsersObject[provider.name] = []
    const providersUsersConnections = getAllUsersByProvider(providersUsers, provider)
    providersUsersConnections
    .map(userConnection => providersUsersObject[provider.name].push(getUserById(userConnection.user_id, users)))

    
  })
  return providersUsersObject
}
export const addOrganizationToRoles = (orgRoles, orgs)  => {
  // console.log(providers, providersUsers, users)
  orgRoles.forEach(role => {
    role['orgName'] = orgs.find(org => org.id == role.organization_id).name
  })
  return orgRoles
}
export const addProviderToRoles = (roles, providers)  => {
  // console.log('addProviderToRoles', roles)
  // console.log('addProviderToRoles', providers)
  roles.forEach(role => {
    if (role.provider_id) role['provider'] = providers.find(prov => prov.id == role.provider_id).name
    else role['provider'] = 'In-house'
  })
  return roles
}

export const searchBy = (fieldName, value, orgs, provs, usersArray) => {

  const organization = orgs.find(org => org[fieldName] === value);
  const provider = provs.find(prov => prov[fieldName] === value);
  const user = usersArray.find(user => user[fieldName] === value);

  let results = null;
  if (organization || provider || user) {
    results = {
      organization,
      provider,
      user
    }

  }
  return results
}

export const getRolesByUserId = (userId, userRoles, roles)  => {
  console.log('getRolesByUserId', roles)
  userRoles = userRoles.filter(userRole => userRole.user_id == userId)
    .map(userRole => roles.find(role => userRole.role_id == role.id))
  
  return userRoles
}

export const getAvailableRolesByUserId = (allRoles, accupiedRoles)  => {
  // console.log(allRoles, accupiedRoles)
  let availableRoles = allRoles.filter(role => !accupiedRoles.includes(role));
  return availableRoles
}
export const getAvailableUsersByRoleId = (roleId, userRoles)  => {
  // console.log(allRoles, accupiedRoles)
  let availableRoles = userRoles.filter(role => role.role_id !== roleId);
  return availableRoles
}

export const searchAll = (val, data) => {
  // console.log(typeof(val), val)
  let results = []

  data.map(item => {

    Object.keys(item).map(key => {
      if ( typeof(val)  === 'string' 
        && typeof(item[key])  === 'string' 
        && item[key].toLowerCase().includes(val.toLowerCase())) {
          if (!results.includes(item))
          results.push(item)
        }
      if ( typeof(item[key])  === 'number') {
        
        // const strVal = JSON.stringify(val)
        const strKey = JSON.stringify(item[key])
        if (strKey.includes(val)) {
          if (!results.includes(item))
          results.push(item)
        }
      }
    })
  })
  return results
}
export const searchByField = (val, data, field) => {
  console.log(typeof(val), val)
  let results = []

  data.map(item => {
    const strKey = JSON.stringify(item[field])
      if (strKey.includes(val)) {
        // console.log('Found', item[field])
        // console.log(item)
        if (!results.includes(item))
        results.push(item)
      }
    // console.log(item)
    // Object.keys(item).map(key => {
    //   // console.log(key, item[key])
    //   if ( typeof(val)  === 'string' 
    //     && typeof(item[key])  === 'string' 
    //     && item[key].includes(val)) {
    //       console.log('Found string', key)
    //       console.log(item)
    //       if (!results.includes(item))
    //       results.push(item)
    //     }
    //   if ( typeof(item[key])  === 'number') {
        
    //     // const strVal = JSON.stringify(val)
    //     const strKey = JSON.stringify(item[key])
    //     if (strKey.includes(val)) {
    //       console.log('Found number', key)
    //       console.log(item)
    //       if (!results.includes(item))
    //       results.push(item)
    //     }
    //   }
    // })
  })
  return results
}
export const sortBy = (field, data, reverse) => {
  // console.log(field, data)
  if (reverse) {
    data.sort((a,b) => (a[field] < b[field]) ? 1 : ((b[field] < a[field]) ? -1 : 0)); 

  } else {
    data.sort((a,b) => (a[field] > b[field]) ? 1 : ((b[field] > a[field]) ? -1 : 0)); 
    
  }
  // console.log(data)
  return data

}

export function onlyUnique(value, index, self) { 
  return self.indexOf(value) === index;
}

export const getUniqueValuesFromColumn = (field, data) => {
  let uniqueValues = [];
  data.map(row => {
    if(row[field] !=='' && !uniqueValues.includes(row[field])) uniqueValues.push(row[field])

  })
  // console.log(uniqueValues)
  return uniqueValues
}


export const getLatestUpdateditem = (items) => {
  // console.log(items.sort((a,b) => a.updatedAt - b.updatedAt))
  // console.log(items.sort((a,b) => a.id - b.id))
  return items.sort((a,b) => b.updatedAt - a.updatedAt)[0]

}
export const getLastCreateditem = (items) => {
  // console.log(items.sort((a,b) => a.updatedAt - b.updatedAt))
  // console.log(items.sort((a,b) => a.id - b.id))
  return items.sort((a,b) => b.id - a.id)[0]

}

export const getUniqueUsers = array => {
    
  const userIds = array.map(item => item.user_id);
  const uniqueIds = userIds.filter(onlyUnique);
  let uniqueUsers = uniqueIds.map(id => array.find(item => item.user_id == id));
  return uniqueUsers;
};

export const mergeSurveyInfoIntoBridge = (bridges, surveys) => {
  return bridges.map(bridge => {
    const bridgeSurveys = surveys.filter(survey => survey.bid == bridge.bid)
    const lastUpdatedSurvey = getLatestUpdateditem(bridgeSurveys)
    // console.log(item)
    // console.log(bridge)
    if (lastUpdatedSurvey) {
      Object.keys(lastUpdatedSurvey).map(key => {
        if (bridge.hasOwnProperty(key)) {
          bridge['survey_'+key] = lastUpdatedSurvey[key]
        } else {
          bridge[key] = lastUpdatedSurvey[key]
        }
      })

    }
    return bridge
  })
  
}

export const reArrangeObject = (object, firstFields) => {
  let newObject = {}
  firstFields.forEach(field => {
    newObject[field] = object[field]
  })
  Object.keys(object).forEach(key => {
    if (!firstFields.includes(key)) {
      newObject[key] = object[key]
    }
  })
  return newObject
}
export const getFileExtension = (filename) => {
  // return (/[.]/.exec(filename)) ? /[^.]+$/.exec(filename) : undefined;
  return filename.split('.').pop();

}

export  const getFileNameByString = (str, files) => {
  return files.filter(file => file.name.includes(str))
}

export const splitStringToArray = (str, charecter) => {
  return str.split(charecter)
}

export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}


export const is_date = function(input) {
  if ( Object.prototype.toString.call(input) === "[object Date]" ) 
    return true;
  return false;   
    };