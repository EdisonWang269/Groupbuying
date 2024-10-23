import React, { useState } from 'react';

const OrderModal = ({ onClose, quantity }) => {
  const [phone, setPhone] = useState('');
  const [showPhoneInput, setShowPhoneInput] = useState(false);

  const handleSubmit = () => {
    // 這裡之後會串接 API
    console.log('提交訂單');
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>訂單確認</h3>
        <div className="order-details">
          <p>商品：香酥芋泥蛋糕</p>
          <p>數量：{quantity}</p>
        </div>
        
        {showPhoneInput && (
          <div className="phone-input">
            <input
              type="tel"
              placeholder="請輸入手機號碼"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
        )}
        
        <div className="modal-buttons">
          <button onClick={onClose}>取消</button>
          <button onClick={handleSubmit}>確定</button>
        </div>
      </div>
    </div>
  );
};

export default OrderModal;