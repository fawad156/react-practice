import {call, put, takeEvery } from 'redux-saga/effects';
import {getCatsSuccess} from './catState';

const getCatsApi = () => {
    return fetch('https://api.thecatapi.com/v1/breeds').then(
         
          response=> response.json()
      );
    };

function* workGetCatsFetch(){
    const formattedCats = yield call(getCatsApi);
    const formattedCatsShortend = formattedCats.slice(0,10);
    yield put(getCatsSuccess(formattedCatsShortend));
};

function* catSaga(){
    yield takeEvery('cats/getCatsFetch', workGetCatsFetch);
};



export default catSaga;