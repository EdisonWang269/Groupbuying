import axiosInstance from './axiosConfig';

export const userAPI = {
  // 更新用戶資料
  updateUserInfo: (userId, userData) => {
    return axiosInstance.put(`/users/${userId}`, userData);
  },

  // 更新用戶黑名單狀態（商家用）
  updateBlacklist: (userId, operation) => {
    return axiosInstance.put(`/users/${userId}/blacklist`, { operation });
  },
  
  // 取得用戶資料
  getUserInfo: (userId) => {
    return axiosInstance.get(`/users/${userId}`);
  },
};
