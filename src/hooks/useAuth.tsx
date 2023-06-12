import { useContext } from 'react';
import AuthState from '../store/auth/auth.state';

export default function useAuth() {
  return useContext(AuthState);
}
