import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import OrderModal from '../components/OrderModal';

const ProductDetail = () => {
  const [quantity, setQuantity] = useState(1);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const { id } = useParams();

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  return (
    <div className="product-detail">
      <header className="product-header">
        <button className="back-button">←</button>
        <h2>恩恩的團購</h2>
      </header>
      
      <div className="product-content">
        <img
          src="/images/cake1.jpg"
          alt="商品圖片"
          className="product-image"
        />
        
        <div className="product-info">
          <h3>香酥芋泥蛋糕</h3>
          <p className="price">價格：$ 240 /盒</p>
          
          <div className="quantity-selector">
            <button onClick={() => handleQuantityChange(-1)}>-</button>
            <span>{quantity}</span>
            <button onClick={() => handleQuantityChange(1)}>+</button>
          </div>
          
          <button
            className="order-button"
            onClick={() => setShowOrderModal(true)}
          >
            立即下單
          </button>
          
          <p className="statement-date">結單日期：2024/5/10</p>
          
          <div className="product-description">
            <h4>商品說明：</h4>
            <p>
              香濃芋頭內餡 搭配日本麵粉特製鬆軟蛋糕的完美比例。
              手做★口感扎實 軟綿Q彈蛋糕體，搭配滑順芋泥香醇內餡。
              一口接著一口最對味★無添加糖 無持久性防腐劑的安心選擇。
              完全無人工色素。
            </p>
          </div>
        </div>
      </div>

      {showOrderModal && (
        <OrderModal
          onClose={() => setShowOrderModal(false)}
          quantity={quantity}
        />
      )}
    </div>
  );
};

export default ProductDetail;