import { combineReducers } from 'redux';

const markComplete = (state = false, action) => {
  switch (action.type) {
    case 'SET_MARK_COMPLETE':
      return action.payload;
    default:
      return state;
  }
}

export default combineReducers({
  markComplete,
});