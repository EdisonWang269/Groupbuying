import axiosInstance from './axiosConfig';

export const orderAPI = {
  // 創建訂單
  createOrder: (orderData) => {
    return axiosInstance.post('/orders', orderData);
  },

  // 根據用戶ID獲取訂單
  getUserOrders: (userId) => {
    return axiosInstance.get(`/users/${userId}/orders`);
  },

  // 根據手機號碼查詢訂單（商家用）
  getOrdersByPhone: (phone) => {
    return axiosInstance.get(`/users/orders?phone=${phone}`);
  },

  // 根據商家ID獲取訂單
  getStoreOrders: () => {
    return axiosInstance.get('/orders');
  },

  // 更新訂單領取狀態
  updateOrderStatus: (orderId) => {
    return axiosInstance.patch(`/orders/${orderId}/receive`);
  },

  // 通知未取貨的顧客
  notifyCustomers: (productId) => {
    return axiosInstance.post(`/products/${productId}/orders/notify`);
  },
};
