import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER" actions
function* fetchAdventures(action) {
    try {
        let response = yield axios.get(`/api/adventures`);
        //this is adding all adventures (response.data) to adventuresReducer
        yield put({ type: 'SET_ADVENTURES', payload: response.data })
    } catch (error) {
        console.log('error getting adventures', error);
    }
}

function* adventuresSaga() {
  yield takeLatest('FETCH_ADVENTURES', fetchAdventures);
} 

export default adventuresSaga;
