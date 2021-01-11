import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  loginRequest,
  logoutRequest,
  getCurrentUserRequest,
} from '../redux/auth/auth.actions';

export default function useAuth() {
  const dispatch = useDispatch();

  const isAuthenticated = useSelector(state => !!state.auth.user);
  const isAuthReady = useSelector(state => state.auth.isAuthReady);

  const user = useSelector(state => state.auth.user);

  const getCurrentUser = useCallback(() => dispatch(getCurrentUserRequest()), [
    dispatch,
  ]);

  const onLogin = params => dispatch(loginRequest(params));

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
