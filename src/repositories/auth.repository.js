import ApiRepository from './api.repository';

const { AuthApiRepository } = ApiRepository;

const login = (email, password) => AuthApiRepository.post(
  '/login',
  {
    email,
    password,
  },
);

const register = (email, password) => AuthApiRepository.post(
  '/register',
  {
    email,
    password,
  },
);

export default {
  login,
  register,
};
