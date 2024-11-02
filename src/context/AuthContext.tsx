import { AuthContextType } from '@/lib/types';
import { useLocalStorage } from '@uidotdev/usehooks';
import React, { createContext,  ReactNode } from 'react';


export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

  const [user, setUser] = useLocalStorage<object | null>('user', null);
  const [accessToken, setAccessToken] = useLocalStorage<string | null>('access_token', null);

  /**
   * Logs in the user by setting the user object and access token.
   * 
   * @param {object} param0 - The login details.
   * @param {object} param0.user - The user object.
   * @param {string} param0.accessToken - The access token.
   */
  const login = ({
    user,
    accessToken,
  }: {
    user: object;
    accessToken: string;
  }) => {
    setUser(user);
    setAccessToken(accessToken);
  };

  /**
   * Logs out the user by clearing the user object and access token.
  */
  const logout = () => {
    setUser(null);
    setAccessToken(null);
  }

  const value = {
    user,
    accessToken,
    login,
    logout,
  };
  
  return (
    <AuthContext.Provider value={ value }>
      {children}
    </AuthContext.Provider>
  );
};