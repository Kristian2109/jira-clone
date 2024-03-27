import { JWT_TOKEN_KEY } from "../constants";

export const isAuthenticated = () => {
  return sessionStorage.getItem(JWT_TOKEN_KEY) != null;
};

export const logout = () => {
  sessionStorage.removeItem(JWT_TOKEN_KEY);
};

export const setToken = (token: string) => {
  sessionStorage.setItem(JWT_TOKEN_KEY, token);
};
