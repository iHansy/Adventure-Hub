import { combineReducers } from 'redux';

const getFeed = (state = [], action) => {
  switch (action.type) {
    case 'SET_FEED':
      return action.payload;
    default:
      return state;
  }
};

const getLikes = (state = [], action) => {
  switch (action.type) {
    case 'SET_LIKES':
      return action.payload;
    default: 
      return state;
  }
};

export default combineReducers({
    getFeed,
    getLikes,
});