import { combineReducers } from 'redux';

const getAllAdventures = (state = [], action) => {
  switch (action.type) {
    case 'SET_ADVENTURES':
      return action.payload;
    default:
      return state;
  }
};

const getAdventureInputs = (state = {}, action) => {
  switch (action.type) {
    case 'SET_ADVENTURE_EDITS':
      return {
          ...state,
          [action.payload.key]: action.payload.value,
      };
    case 'SET_ADVENTURE_INPUTS':
      return action.payload;
    case 'CLEAR_ADVENTURE_INPUTS':
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
  getAllAdventures,
  completeStatus,
  getAdventureInputs,
});