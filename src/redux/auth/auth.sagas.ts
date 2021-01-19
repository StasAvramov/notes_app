import { put, takeLatest, all, call } from 'redux-saga/effects';

import {
  loginRequest,
  loginSuccess,
  loginError,
  logoutRequest,
  logoutSuccess,
  logoutError,
  getCurrentUserRequest,
  getCurrentUserSuccess,
  getCurrentUserError,
} from './auth.actions';

import {
  onFirebaseLogin,
  onFirebaseLogout,
  onFirebaseRegister,
} from '../../services/firebase.auth.service';

function* login(action: ReturnType<typeof loginRequest>) {
  try {
    //Если была создана новая учетная запись,
    //пользователь входит в систему(ЛОГИНИТСЯ) автоматически
    const newUser = yield call(onFirebaseRegister, action.payload);

    if (newUser) {
      console.log('New user created and logged in');
      return yield put(loginSuccess());
    }
    //В противном случае пользователь уже зарегистрирован. просто логиним его
    console.log('User login');
    yield call(onFirebaseLogin, action.payload);

    yield put(loginSuccess());
  } catch (error) {
    yield put(loginError(error));
  }
}

function* logout() {
  try {
    yield call(onFirebaseLogout);
    yield put(logoutSuccess());
  } catch (error) {
    yield put(logoutError(error));
  }
}

function* getCurrentUser(action: ReturnType<typeof getCurrentUserRequest>) {
  try {
    yield put(getCurrentUserSuccess(action.payload));
  } catch (error) {
    yield put(getCurrentUserError(error));
  }
}

export default function* userSaga() {
  yield all([
    yield takeLatest(loginRequest.type, login),
    yield takeLatest(logoutRequest.type, logout),
    yield takeLatest(getCurrentUserRequest.type, getCurrentUser),
  ]);
}
