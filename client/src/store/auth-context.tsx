import { ReactNode, createContext, useState } from "react";
import { isAuthenticated } from "../utils/auth";

export const AuthContext = createContext({
  isAuth: false,
  setAuthenticated: () => {},
  setUnauthenticated: () => {},
});

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [isAuth, setIsAuth] = useState(isAuthenticated());

  const ctxValue = {
    isAuth,
    setAuthenticated: () => {
      setIsAuth(true);
    },
    setUnauthenticated: () => {
      setIsAuth(false);
    },
  };
  return (
    <AuthContext.Provider value={ctxValue}>{children}</AuthContext.Provider>
  );
};
