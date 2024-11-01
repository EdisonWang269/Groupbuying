import axiosInstance from './axiosConfig';

export const authAPI = {
  login: (store_id, userid) => {
    return axiosInstance.post('/auth/login', { store_id, userid });
  },
};