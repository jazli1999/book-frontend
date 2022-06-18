import ApiRepository from './api.repository';

const { AuthApiRepository } = ApiRepository;

const login = (email, password) => {
  return AuthApiRepository.post(
    '/login',
    {
      email,
      password,
    },
  );
};

export default {
  login,
};
