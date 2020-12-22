import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { all, spawn } from 'redux-saga/effects';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';

import { userReducer } from './auth';
import { notesReducer } from './notes';
import userSaga from './auth/auth.sagas';
import notesSaga from './notes/notes.sagas';

function* rootSaga() {
  yield all([spawn(userSaga), spawn(notesSaga)]);
}

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: { user: userReducer, notes: notesReducer },
  middleware: [sagaMiddleware, logger, ...getDefaultMiddleware()],
});

sagaMiddleware.run(rootSaga);

export default store;
