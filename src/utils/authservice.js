import decode from 'jwt-decode';

const AUTH_TOKEN_KEY = 'token';

export const setToken = token => localStorage.setItem(AUTH_TOKEN_KEY, token);

export const getToken = () => localStorage.getItem(AUTH_TOKEN_KEY);

export const clearToken = () => localStorage.removeItem(AUTH_TOKEN_KEY);

const getTokenExpirationDate = encodedToken => {
    const token = decode(encodedToken);
    if (!token.exp) return null;
    const date = new Date(0);
    return date.setUTCSeconds(token.exp);
  };

  const isTokenExpired = token => getTokenExpirationDate(token) < new Date();

  export const isLoggedIn = () => {
    const token = getToken();
    return !!token && !isTokenExpired(token);
  };

  export const getTokenConfig = () => ({headers: {'x-access-token': getToken()}});

  export const signout = () => clearToken();

  