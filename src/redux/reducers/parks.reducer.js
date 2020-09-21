import { combineReducers } from 'redux';

const getParks = (state = [], action) => {
  switch (action.type) {
    case 'SET_PARKS':
      return action.payload;
    default:
      return state;
  }
};

const getParkInputs = (state = [], action) => {
  switch (action.type) {
    case 'SET_PARK_INPUTS':
      return action.payload;
    default:
      return state;
  }
};

const loadingStatus = (state = false, action) => {
  switch (action.type) {
      case 'SET_LOADING_TRUE':
        return true;
      case 'SET_LOADING_FALSE':
        return false;
      default:
        return state;
  }
};

export default combineReducers({
    getParks,
    getParkInputs,
    loadingStatus,
});