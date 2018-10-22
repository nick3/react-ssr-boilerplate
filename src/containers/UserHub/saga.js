// import { take, call, put, select } from 'redux-saga/effects';
import '@babel/polyfill';
import { http } from '../../utils/request';
import { call, put, takeLatest } from 'redux-saga/effects';
import { userinfoLoaded, userinfoLoadError } from './actions';
import { LOAD_USERINFO } from './constants';

function* getUserinfo() {
  const requestURL = '/v1/students';
  try {
    const userinfo = yield call(http.get, requestURL);
    yield put(userinfoLoaded(userinfo));
  } catch (err) {
    yield put(userinfoLoadError(err));
  }
}

export default function* getCoursesWatcher() {
  // Watches for LOAD_USERINFO actions and calls getUserinfo when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(LOAD_USERINFO, getUserinfo);
}
