import { combineReducers } from 'redux';

const getAdventures = (state = [], action) => {
  switch (action.type) {
    case 'SET_ADVENTURES':
      return action.payload;
    default:
      return state;
  }
};

const completeStatus = (state = false, action) => {
  switch (action.type) {
    case 'SET_COMPLETE_STATUS':
      return action.payload;
    default:
      return state;
  }
};

export default combineReducers({
  getAdventures,
  completeStatus,
});