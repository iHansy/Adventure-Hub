import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER" actions
function* fetchParks(action) {
    try {
        //request going to router for 3rd party park API search
        let response = yield axios.get(`/api/parks?stateCode=${action.payload}`);
        //this is adding all adventures (response.data) to adventuresReducer
        yield put({ type: 'SET_PARKS', payload: response.data });
    } catch (error) { //catch for any errors
        console.log('ERROR GETTING FEED', error);
    }
};

function* parksSaga() {
  yield takeLatest('FETCH_PARKS', fetchParks);
};

export default parksSaga;
