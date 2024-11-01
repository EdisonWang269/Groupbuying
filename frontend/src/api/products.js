import axiosInstance from './axiosConfig';

export const productAPI = {
  // 取得所有商品
  getAllProducts: () => {
    return axiosInstance.get('/products');
  },

  // 取得特定商品詳情
  getProductById: (productId) => {
    return axiosInstance.get(`/products/${productId}`);
  },

  // 商家建立商品
  createProduct: (productData) => {
    return axiosInstance.post('/products', productData);
  },

  // 更新商品到貨資訊
  updateArrivalInfo: (productId, arrivalData) => {
    return axiosInstance.put(`/products/${productId}/arrival`, arrivalData);
  },

  // 更新結單日期
  updateStatementDate: (productId, dateData) => {
    return axiosInstance.put(`/products/${productId}/statementdate`, dateData);
  },
};