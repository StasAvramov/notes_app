import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  loginRequest,
  logoutRequest,
  getCurrentUserRequest,
} from '../redux/auth/auth.actions';

export default function useAuth() {
  const dispatch = useDispatch();

  const isAuthenticated = useSelector(state => !!state.user);

  const user = useSelector(state => state.user);

  const onGetCurrentUser = useCallback(
    () => dispatch(getCurrentUserRequest()),
    [dispatch],
  );

  const onLogin = params => dispatch(loginRequest(params));

  const onLogout = useCallback(() => dispatch(logoutRequest()), [dispatch]);

  return {
    isAuthenticated,
    onGetCurrentUser,
    onLogin,
    onLogout,
    user,
  };
}
