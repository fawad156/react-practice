import {takeEvery, call, put} from 'redux-saga/effects';
import {GET_USERS_FETCH,GET_USERS_SUCCESS} from './actions';
import {getUsers} from './users'

function* workGetUsersFetch(){
    const users = yield call(getUsers);

    console.log("users",users);
    yield put({type: GET_USERS_SUCCESS, users})
}


function* mySaga(){
    yield takeEvery(GET_USERS_FETCH, workGetUsersFetch);

}


export default mySaga;
