import config from './config';

const getJWT = () => {
  const authCookie = document.cookie
    .split(';')
    .filter((item) => item.includes(config.AUTH_KEY));
  if (authCookie.length) return authCookie[0].split('=')[1];
  return null;
};

const setJWT = (token) => {
  document.cookie = `${config.AUTH_KEY}=${token};max-age=${config.JWT_AGE}`;
};

const clearJWT = () => {
  document.cookie = `${config.AUTH_KEY}=; Path=/`;
};

export default {
  getJWT,
  setJWT,
  clearJWT,
};
