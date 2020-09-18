import { combineReducers } from 'redux';

const getParks = (state = [], action) => {
  switch (action.type) {
    case 'SET_PARKS':
      return action.payload;
    default:
      return state;
  }
};

export default combineReducers({
    getParks
});