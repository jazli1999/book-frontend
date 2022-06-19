import axios from 'axios';
import config from '../config';

const AuthApiRepository = axios.create({
  baseURL: `${config.BACKEND_URL}/auth`,
  timeout: 1500,
});

export default {
  AuthApiRepository,
};
