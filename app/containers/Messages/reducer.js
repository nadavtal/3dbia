
import produce from 'immer';
import { CREATE_MESSAGE } from './constants';

// The initial state of the App
export const initialState = {

};

/* eslint-disable default-case, no-param-reassign */
const messagesReducer = (state = initialState, action) =>
  produce(state, draft => {
    // console.log(state)
    switch (action.type) {
      // case CREATE_MESSAGE:
      //   draft.loading = true;
      //   draft.error = false;
      //   console.log('CREATE_MESSAGE');

      //   break;

      // case CREATE_NEW_PROJECT:
      //   console.log('CREATE_NEW_PROJECT')
      //   draft.loading = false;
      //   draft.currentUser = action.username;
      //   break;


    }
  });

export default messagesReducer;
