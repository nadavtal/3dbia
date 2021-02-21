
import produce from 'immer';


export const initialState = {
  componentName: 'projectData'
};

/* eslint-disable default-case, no-param-reassign */
const bottomViewReducer = (state = initialState, action) =>

  produce(state, draft => {

    switch (action.type) {

       
      default:
        return state
    }
  // }
  });

export default bottomViewReducer;
