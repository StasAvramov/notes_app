import { put, takeLatest, all } from 'redux-saga/effects';
import authActions from './auth.actions';
const {
  loginRequest,
  loginSuccess,
  loginError,
  currentUserRequest,
  currentUserSuccess,
  currentUserError,
} = authActions;

function* login(action) {
  try {
    let userData = JSON.stringify(action.payload);
    localStorage.setItem('user', userData);

    yield put(loginSuccess(action.payload));
  } catch (error) {
    console.error(error);
    // yield put(loginError(error));
  }
}
function* watchLogin() {
  yield takeLatest(loginRequest().type, login);
}

function* getCurrentUser(action) {
  try {
    let json = localStorage.getItem('user');
    if (!json) {
      yield put(currentUserSuccess(null));
    } else {
      let userData = JSON.parse(json);

      yield put(currentUserSuccess(userData));
    }
  } catch (error) {
    console.error(error);
    // yield put(currentUserError(error));
  }
}
function* watchGetCurrentUser() {
  yield takeLatest(currentUserRequest().type, getCurrentUser);
}

export default function* rootSaga() {
  yield all([watchLogin(), watchGetCurrentUser()]);
}
