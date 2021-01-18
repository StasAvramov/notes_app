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

  const { isAuthReady, error, user } = useSelector(
    (state: RootState) => state.auth,
  );

  const getCurrentUser = useCallback(
    user => dispatch(getCurrentUserRequest(user)),
    [dispatch],
  );

  const onLogin = (params: UserPayloadType) => dispatch(loginRequest(params));

  const onLogout = useCallback(() => dispatch(logoutRequest()), [dispatch]);

  return {
    error,
    isAuthenticated: !!user,
    isAuthReady,
    getCurrentUser,
    onLogin,
    onLogout,
    user: user || { email: '' },
  };
}
