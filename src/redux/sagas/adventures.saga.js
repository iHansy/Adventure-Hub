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

function* updateMarkComplete(action) {
    try {
        yield axios.put(`/api/adventures/mark-complete/${action.payload.id}`, action.payload);
        //reloading DOM
        yield fetchAdventures();
    } catch (error) {
        console.log('ERROR MARKING ADVENTURE COMPLETE', error);
    }
}

function* fetchAdventureInputs(action) {
    try {
        let response = yield axios.get(`/api/adventures/${action.payload}`);
        //sending adventure input details to reducer
        yield put ({ type: 'SET_ADVENTURE_INPUTS', payload: response.data[0] });
    } catch (error) {
        console.log('ERROR FETCHING ADVENTURE INPUTS', error);
    }
}

function* updateAdventure(action) {
    try {
        yield axios.put(`/api/adventures/edit-adventure/${action.payload.id}`, action.payload);
        //reloading DOM
        yield fetchAdventures();
    } catch (error) {
        console.log('ERROR EDITING ADVENTURE');
    }
}

function* adventuresSaga() {
  yield takeLatest('FETCH_ADVENTURES', fetchAdventures);
  yield takeLatest('DELETE_ADVENTURE', deleteAdventure);
  yield takeLatest('POST_ADVENTURE', postAdventure);
  yield takeLatest('UPDATE_MARK_COMPLETE', updateMarkComplete);
  yield takeLatest('FETCH_ADVENTURE_INPUTS', fetchAdventureInputs);
  yield takeLatest('UPDATE_ADVENTURE', updateAdventure);
} 

export default adventuresSaga;
