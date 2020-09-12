import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER" actions
function* fetchAdventures(action) {
    try {
        let response = yield axios.get(`/api/adventures`);
        //this is adding all adventures (response.data) to adventuresReducer
        yield put({ type: 'SET_ADVENTURES', payload: response.data })
    } catch (error) { //catch for any errors
        console.log('ERROR GETTING ADVENTURES', error);
    }
}

//dispatch coming from component, send request to router
function* deleteAdventure(action) {
    try {
        yield axios.delete(`/api/adventures/${action.payload}`);
        //this yield is reloading DOM
        yield fetchAdventures();
    } catch (error) { //catch for any errors
        console.log('ERROR DELETING ADVENTURE', error);
    }
}

//sending new adventure to server router
function* postAdventure(action) {
    try {
        yield axios.post('/api/adventures', action.payload);
        //reloading DOM
        yield fetchAdventures();
    } catch (error) {
        console.log('ERROR POSTING ADVENTURE', error);
    }
}

function* adventuresSaga() {
  yield takeLatest('FETCH_ADVENTURES', fetchAdventures);
  yield takeLatest('DELETE_ADVENTURE', deleteAdventure);
  yield takeLatest('POST_ADVENTURE', postAdventure)
} 

export default adventuresSaga;
