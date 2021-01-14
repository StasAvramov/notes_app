import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  loginRequest,
  logoutRequest,
  getCurrentUserRequest,
} from '../redux/auth/auth.actions';

import { RootState } from '../redux/store';
import { UserPayloadType } from '../types/auth';

export default function useAuth() {
  const dispatch = useDispatch();

  const isAuthenticated = useSelector((state: RootState) => !!state.auth.user);
  const isAuthReady = useSelector((state: RootState) => state.auth.isAuthReady);
  const user = useSelector((state: RootState) =>
    state.auth.user ? state.auth.user : { email: '' },
  );

  const getCurrentUser = useCallback(() => dispatch(getCurrentUserRequest()), [
    dispatch,
  ]);
  const onLogin = (params: UserPayloadType) => dispatch(loginRequest(params));
  const onLogout = useCallback(() => dispatch(logoutRequest()), [dispatch]);

  return {
    isAuthenticated,
    isAuthReady,
    getCurrentUser,
    onLogin,
    onLogout,
    user,
  };
}
