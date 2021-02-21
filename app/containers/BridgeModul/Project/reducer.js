
import produce from 'immer';

// The initial state of the App
export const initialState = {

};

/* eslint-disable default-case, no-param-reassign */
const projectReducer = (state = initialState, action) =>
  produce(state, draft => {
    // console.log(state)
    switch (action.type) {



    }
  });

export default projectReducer;
