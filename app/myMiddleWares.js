import { convertToMySqlDateFormat } from './utils/dateTimeUtils';
export const httpMiddleware = (store) => (next) => (action) => {
    // console.log('handle http request', action); 
    // Object.keys(action).map(key => {
    //     if (key !== 'type') {
    //         typeof(action[key])
    //         if (typeof(action[key]) == 'string') {

    //         }
    //     }
    // })
    // if (action.data && action.data.hasOwnProperty('created_by')) {
    //     // console.log('Has created by!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
    //     // const currentUser = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')) : null
    //     // const fullName = currentUser.userInfo.first_name + ' ' + currentUser.userInfo.last_name;
    //     // action.data.created_by = fullName
    //     // console.log('RESULT', action.data)
    // }
    // if (action.data && action.data.hasOwnProperty('due_date')) {
    //     // console.log('date!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
        
    //     action.data.due_date = convertToMySqlDateFormat(action.data.due_date)
    //     // console.log('RESULT', action.data)
    // }
    next(action)
  }

  const checkIfObjectContainsString = (obj) => {
    for (const [key, value] of Object.entries(obj)) {
        console.log(`${key}: ${value}`);
        if (typeof(value) == 'string') return key        
      }
  }