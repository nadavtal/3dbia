import { call, put, select, takeLatest } from 'redux-saga/effects';
import * as actionTypes from './constants';
import request from 'utils/request';
import * as actions from './actions';



import { apiUrl } from '../App/constants';


function* createMessage(action) {
  console.log('createmessage', action)
  let message = action.message;
  console.log(message);
  const url = apiUrl + 'messages';
  const args = {
    method: 'POST',
    body: JSON.stringify(message),
  }
  try {
    // Call our request helper (see 'utils/request')
    
    const message = yield call(request, url, args);
    console.log(message)
    // yield put(usersLoaded(users));
  } catch (err) {
    yield put(console.log(err));
  }


}
function* sendEmail(action) {
  console.log(action)
  const emailData = {
    name: 'Nadav',
    company: 'Manam',
    message: 'this is the first email'
  }
  const args = {
    method: 'POST',
    body: JSON.stringify(emailData),
  }
  //  
  
  try {
    // Call our request helper (see 'utils/request')
    
    const email = yield call(request, apiUrl + 'email/send', args);
    console.log(email)
    // yield put(usersLoaded(users));
  } catch (err) {
    yield put(console.log(err));
  }
  


}


export default function* messagesSaga() {

  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount

  // yield takeLatest(actionTypes.CREATE_MESSAGE, createMessage);
  // yield takeLatest(SEND_EMAIL, sendEmail);
}
