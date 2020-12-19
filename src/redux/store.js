import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';

import { userReducer } from './auth';
import rootSaga from './auth/auth.sagas';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: { user: userReducer },
  middleware: [sagaMiddleware, logger, ...getDefaultMiddleware()],
});

sagaMiddleware.run(rootSaga);

export default store;
