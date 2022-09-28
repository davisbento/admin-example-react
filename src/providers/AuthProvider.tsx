import { clearStorage, saveToken } from 'facades/localStorage';
import { IUser } from 'interfaces/user';
import { createContext, FC, ReactNode, useState } from 'react';

export const AuthContext = createContext<{
  user: IUser;
  login: (user: IUser, token: string) => void;
  setUser: (user: IUser) => void;
  logout: () => void;
}>({
  user: null,
  login: () => ({}),
  setUser: () => ({}),
  logout: () => ({})
});

interface IAuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: FC<IAuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<IUser>(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        login: (user: IUser, token: string) => {
          setUser(user);
          saveToken(token);
        },
        setUser: (user: IUser) => {
          setUser(user);
        },
        logout: () => {
          setUser(null);
          clearStorage();
        }
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
