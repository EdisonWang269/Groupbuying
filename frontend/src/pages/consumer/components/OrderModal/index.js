// src/components/OrderModal/index.js
import React, { useState } from 'react';
import {
  Overlay,
  Content,
  Title,
  OrderDetails,
  PhoneInput,
  ButtonGroup,
  Button
} from './styles';

const OrderModal = ({ onClose, quantity }) => {
  const [phone, setPhone] = useState('');
  const [showPhoneInput, setShowPhoneInput] = useState(false);

  const handleSubmit = () => {
    // 這裡之後會串接 API
    console.log('提交訂單');
    onClose();
  };

  return (
    <Overlay>
      <Content>
        <Title>訂單確認</Title>
        <OrderDetails>
          <p>商品：香酥芋泥蛋糕</p>
          <p>數量：{quantity}</p>
        </OrderDetails>
        
        {showPhoneInput && (
          <PhoneInput>
            <input
              type="tel"
              placeholder="請輸入手機號碼"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </PhoneInput>
        )}
        
        <ButtonGroup>
          <Button onClick={onClose}>取消</Button>
          <Button primary onClick={handleSubmit}>確定</Button>
        </ButtonGroup>
      </Content>
    </Overlay>
  );
};

export default OrderModal;