import { JWT_TOKEN_KEY } from "../constants";

export const isAuthenticated = () => {
  return localStorage.getItem(JWT_TOKEN_KEY) != null;
};

export const logout = () => {
  localStorage.removeItem(JWT_TOKEN_KEY);
};

export const setToken = (token: string) => {
  localStorage.setItem(JWT_TOKEN_KEY, token);
};
