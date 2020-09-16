import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER" actions
function* fetchFeed() {
    try {
        let response = yield axios.get(`/api/feed`);
        //this is adding all adventures (response.data) to adventuresReducer
        yield put({ type: 'SET_FEED', payload: response.data })
    } catch (error) { //catch for any errors
        console.log('ERROR GETTING FEED', error);
    }
};

function* addLike(action) {
    try {
        yield axios.post(`api/feed/like/${action.payload}`)
        //calling get route to get updated likes
        yield fetchFeed();
    } catch (error) {
        console.log('ERROR ADDING LIKE', error);
    }
};


function* feedSaga() {
  yield takeLatest('FETCH_FEED', fetchFeed);
  yield takeLatest('ADD_LIKE', addLike);
};

export default feedSaga;
