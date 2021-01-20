import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  loginRequest,
  logoutRequest,
  getCurrentUserRequest,
  loginGoogleRequest,
  loginGithubRequest,
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

  const onGoogleLogin = () => dispatch(loginGoogleRequest());

  const onGithubLogin = () => dispatch(loginGithubRequest());

  const onLogout = useCallback(() => dispatch(logoutRequest()), [dispatch]);

  return {
    error,
    isAuthenticated: !!user,
    isAuthReady,
    getCurrentUser,
    onLogin,
    onGoogleLogin,
    onGithubLogin,
    onLogout,
    user: user || { email: '' },
  };
}
