import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

export const LoginModal = ({ onClose }) => {
  const [store_id, setStoreId] = useState('');
  const [userid, setUserid] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!store_id || !userid) {
      setError('請填寫所有必填欄位');
      return;
    }

    const result = await login(store_id, userid);
    if (result.success) {
      onClose();
    } else {
      setError(result.error);
    }
  };

  return (
    <div className="modal">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={store_id}
          onChange={(e) => setStoreId(e.target.value)}
          placeholder="商店ID"
        />
        <input
          type="text"
          value={userid}
          onChange={(e) => setUserid(e.target.value)}
          placeholder="用戶ID"
        />
        {error && <div className="error">{error}</div>}
        <button type="submit">登入</button>
        <button type="button" onClick={onClose}>取消</button>
      </form>
    </div>
  );
};