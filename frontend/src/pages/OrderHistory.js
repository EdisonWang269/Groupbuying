import React, { useState } from 'react';

const OrderHistory = () => {
  const [selectedFilter, setSelectedFilter] = useState('所有訂單');
  const [orders] = useState([
    {
      id: 1,
      productName: '香酥芋泥蛋糕',
      statement_date: '2024/1/28',
      delivery_date: '2024/2/10',
      status: '待領取',
      image: '/cake1.jpg'
    },
    {
      id: 2,
      productName: '可頌黑糖馬告',
      statement_date: '2024/1/26',
      delivery_date: '2024/2/8',
      status: '已領取',
      image: '/cake2.jpg'
    },
    {
      id: 3,
      productName: '特選蛋糕',
      statement_date: '2024/1/25',
      delivery_date: '2024/2/7',
      status: '已結單',
      image: '/cake3.jpg'
    }
  ]);

  const filterOrders = (filter) => {
    switch (filter) {
      case '代領清單':
        return orders.filter(order => order.status === '待領取');
      case '歷史訂單':
        return orders.filter(order => order.status === '已領取');
      default:
        return orders;
    }
  };

  const filteredOrders = filterOrders(selectedFilter);

  return (
    <div className="order-history-container">
      <header className="page-header">
        <h1>歷史訂單</h1>
        <select 
          value={selectedFilter}
          onChange={(e) => setSelectedFilter(e.target.value)}
          className="filter-select"
        >
          <option value="所有訂單">所有訂單</option>
          <option value="代領清單">代領清單</option>
          <option value="歷史訂單">歷史訂單</option>
        </select>
      </header>

      <div className="orders-list">
        {filteredOrders.map(order => (
          <div key={order.id} className="order-card">
            <div className="order-info">
              <img 
                src={order.image} 
                alt={order.productName} 
                className="order-image"
              />
              <div className="order-details">
                <h3>{order.productName}</h3>
                <p>結單日期：{order.statement_date}</p>
                <p>取貨日期：{order.delivery_date}</p>
                <span className={`status-tag ${order.status}`}>
                  {order.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderHistory;