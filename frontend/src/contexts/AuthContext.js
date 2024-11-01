// src/contexts/AuthContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import { authAPI } from '../api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 自動登入函數
  const autoLogin = async () => {
    try {
      const defaultCredentials = {
        store_id: "STORE001",
        userid: "c001"
      };

      const response = await authAPI.login(
        defaultCredentials.store_id,
        defaultCredentials.userid
      );

      const { access_token, role } = response;
      
      const userData = {
        store_id: defaultCredentials.store_id,
        userid: defaultCredentials.userid,
        role,
      };

      localStorage.setItem('token', access_token);
      localStorage.setItem('user', JSON.stringify(userData));
      
      setUser(userData);
    } catch (error) {
      console.error('Auto login error:', error);
    } finally {
      setLoading(false);
    }
  };

  // 在組件載入時檢查認證狀態
  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    
    if (token && storedUser) {
      setUser(JSON.parse(storedUser));
      setLoading(false);
    } else {
      // 如果沒有存儲的認證信息，執行自動登入
      autoLogin();
    }
  }, []);

  const login = async (store_id, userid) => {
    try {
      const response = await authAPI.login(store_id, userid);
      const { access_token, role } = response;
      
      const userData = {
        store_id,
        userid,
        role,
      };

      localStorage.setItem('token', access_token);
      localStorage.setItem('user', JSON.stringify(userData));
      
      setUser(userData);
      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      return { 
        success: false, 
        error: error.message || '登入失敗，請稍後再試' 
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    // 登出後自動重新登入預設帳號
    autoLogin();
  };

  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'merchant',
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};