import { createContext, useContext, useState } from 'react';
import authService from '../services/auth.service';

let AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  let [user, setUser] = useState(authService.getCurrentUser());

  let signin = async (loginData, callback) => {
    const userData = await authService.login(loginData);
    setUser(userData);
    callback();
  };

  let signout = async (callback) => {
    await authService.logout();
    setUser(null);
    callback();
  };

  let value = { user, signin, signout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  return useContext(AuthContext);
};
