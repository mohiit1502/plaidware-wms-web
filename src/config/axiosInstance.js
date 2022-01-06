import axios from 'axios';
import urls from '../constants/urls';

const axiosInstance = axios.create({
  baseURL: urls.baseURL,
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
});

export default axiosInstance;
