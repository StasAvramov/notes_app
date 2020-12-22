import { useSelector } from 'react-redux';
import { GET_IS_AUTHENTICATED } from '../redux/auth/auth.selectors';

export default function useAuth() {
  const IS_AUTHENTICATED = useSelector(GET_IS_AUTHENTICATED);
  return IS_AUTHENTICATED;
}
