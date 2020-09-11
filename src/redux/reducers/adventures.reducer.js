import { combineReducers } from 'redux';

const getAdventures = (state = [], action) => {
  switch (action.type) {
    case 'SET_ADVENTURES':
      return action.payload;
    default:
      return state;
  }
};

export default combineReducers({
  getAdventures,
});