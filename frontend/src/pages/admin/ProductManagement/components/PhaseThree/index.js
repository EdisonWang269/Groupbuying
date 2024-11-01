// src/pages/admin/PhaseThree/index.js
import React, { useState } from 'react';
import { Calendar, Bell, CheckCircle2 } from 'lucide-react';
import {
  AdminContainer,
  AdminHeader,
  AdminHeaderBackground,
  AdminHeaderContent,
  AdminTitle,
  AdminContentContainer,
  StatusTag,
  IconWrapper
} from '../../../components/shared/styles';
import {
  ProductCard,
  ProductHeader,
  ProductInfo,
  ProductTitle,
  InfoRow,
  ProgressBar,
  ProgressText,
  OrdersTable,
  TableHeader,
  TableRow,
  ActionButton,
  NotifyButton,
  TableContainer
} from './styles';

import ReceiveDialog from '../dialogs/ReceiveDialog';
import NotifyDialog from '../dialogs/NotifyDialog';

const PhaseThree = () => {
  const [showReceiveDialog, setShowReceiveDialog] = useState(false);
  const [showNotifyDialog, setShowNotifyDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);

  // 模擬數據，實際使用時需要從API獲取
  const products = [
    {
      id: 1,
      name: '香酥芋泥蛋糕',
      price: 240,
      arrival_date: '2024/05/20',
      due_date: '2024/05/27',
      total_orders: 30,
      received_orders: 15,
      orders: [
        {
          id: 1,
          customer_name: '王小明',
          phone: '0912345678',
          quantity: 2,
          total_price: 480,
          status: 'pending'
        },
        {
          id: 2,
          customer_name: '李小華',
          phone: '0923456789',
          quantity: 1,
          total_price: 240,
          status: 'received'
        },
        {
          id: 1,
          customer_name: '王小明',
          phone: '0912345678',
          quantity: 2,
          total_price: 480,
          status: 'pending'
        },
        {
          id: 1,
          customer_name: '王小明',
          phone: '0912345678',
          quantity: 2,
          total_price: 480,
          status: 'pending'
        },
        {
          id: 1,
          customer_name: '王小明',
          phone: '0912345678',
          quantity: 2,
          total_price: 480,
          status: 'pending'
        }
      ]
    },
    {
      id: 1,
      name: '香酥芋泥蛋糕',
      price: 240,
      arrival_date: '2024/05/20',
      due_date: '2024/05/27',
      total_orders: 30,
      received_orders: 15,
      orders: [
        {
          id: 1,
          customer_name: '王小明',
          phone: '0912345678',
          quantity: 2,
          total_price: 480,
          status: 'pending'
        },
        {
          id: 2,
          customer_name: '李小華',
          phone: '0923456789',
          quantity: 1,
          total_price: 240,
          status: 'received'
        },
        {
          id: 1,
          customer_name: '王小明',
          phone: '0912345678',
          quantity: 2,
          total_price: 480,
          status: 'pending'
        },
        {
          id: 1,
          customer_name: '王小明',
          phone: '0912345678',
          quantity: 2,
          total_price: 480,
          status: 'pending'
        },
        {
          id: 1,
          customer_name: '王小明',
          phone: '0912345678',
          quantity: 2,
          total_price: 480,
          status: 'pending'
        }
      ]
    },
    {
      id: 1,
      name: '香酥芋泥蛋糕',
      price: 240,
      arrival_date: '2024/05/20',
      due_date: '2024/05/27',
      total_orders: 30,
      received_orders: 15,
      orders: [
        {
          id: 1,
          customer_name: '王小明',
          phone: '0912345678',
          quantity: 2,
          total_price: 480,
          status: 'pending'
        },
        {
          id: 2,
          customer_name: '李小華',
          phone: '0923456789',
          quantity: 1,
          total_price: 240,
          status: 'received'
        },
        {
          id: 1,
          customer_name: '王小明',
          phone: '0912345678',
          quantity: 2,
          total_price: 480,
          status: 'pending'
        },
        {
          id: 1,
          customer_name: '王小明',
          phone: '0912345678',
          quantity: 2,
          total_price: 480,
          status: 'pending'
        },
        {
          id: 1,
          customer_name: '王小明',
          phone: '0912345678',
          quantity: 2,
          total_price: 480,
          status: 'pending'
        }
      ]
    }
  ];

  const handleReceive = (product, order) => {
    setSelectedProduct(product);
    setSelectedOrder(order);
    setShowReceiveDialog(true);
  };

  const handleNotify = (product) => {
    setSelectedProduct(product);
    setShowNotifyDialog(true);
  };

  const handleConfirmReceive = async () => {
    try {
      await fetch(`/api/orders/${selectedOrder.id}/receive`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      setShowReceiveDialog(false);
      setSelectedOrder(null);
      setSelectedProduct(null);
      // 這裡應該要重新獲取商品列表
    } catch (error) {
      console.error('更新領取狀態失敗:', error);
    }
  };

  const handleConfirmNotify = async (unreceivedOrders) => {
    try {
      await fetch(`/api/products/${selectedProduct.id}/orders/notify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      setShowNotifyDialog(false);
      setSelectedProduct(null);
      // 這裡可以顯示通知成功訊息
    } catch (error) {
      console.error('發送通知失敗:', error);
    }
  };

  const calculateProgress = (received, total) => {
    return (received / total) * 100;
  };

  return (
    <AdminContainer>
      <AdminHeader>
        <AdminHeaderBackground>
          <div className="circle circle-1" />
          <div className="circle circle-2" />
          <div className="circle circle-3" />
        </AdminHeaderBackground>
        <AdminHeaderContent>
          <AdminTitle>取貨中商品</AdminTitle>
        </AdminHeaderContent>
      </AdminHeader>

      <AdminContentContainer>
        {products.map(product => (
          <ProductCard key={product.id}>
            <ProductHeader>
              <div>
                <ProductTitle>{product.name}</ProductTitle>
                <InfoRow>
                  <span>單價：${product.price}</span>
                  <div className="date-info">
                    <IconWrapper>
                      <Calendar size={16} />
                    </IconWrapper>
                    <span>到貨日期：{product.arrival_date}</span>
                  </div>
                  <div className="date-info">
                    <IconWrapper>
                      <Calendar size={16} />
                    </IconWrapper>
                    <span>領取期限：{product.due_date}</span>
                  </div>
                </InfoRow>
              </div>
              <NotifyButton
                onClick={() => handleNotify(product)}
                title="通知未領取顧客"
              >
                <Bell size={20} />
              </NotifyButton>
            </ProductHeader>

            <ProductInfo>
              <div className="progress-section">
                <ProgressText>
                  領取進度：{product.received_orders} / {product.total_orders}
                </ProgressText>
                <ProgressBar 
                  progress={calculateProgress(product.received_orders, product.total_orders)} 
                />
              </div>

              <TableContainer>
                <OrdersTable>
                  <thead>
                    <TableHeader>
                      <th>顧客姓名</th>
                      <th>電話</th>
                      <th>數量</th>
                      <th>金額</th>
                      <th>狀態</th>
                      <th>操作</th>
                    </TableHeader>
                  </thead>
                  <tbody>
                    {product.orders.map(order => (
                      <TableRow key={order.id}>
                        <td>{order.customer_name}</td>
                        <td>{order.phone}</td>
                        <td>{order.quantity}</td>
                        <td>${order.total_price}</td>
                        <td>
                          <StatusTag status={order.status === 'received' ? 'success' : 'error'}>
                            {order.status === 'received' ? '已領取' : '未領取'}
                          </StatusTag>
                        </td>
                        <td>
                          {order.status === 'pending' && (
                            <ActionButton
                              onClick={() => handleReceive(product, order)}
                            >
                              標記已領取
                            </ActionButton>
                          )}
                        </td>
                      </TableRow>
                    ))}
                  </tbody>
                </OrdersTable>
              </TableContainer>
            </ProductInfo>
          </ProductCard>
        ))}

        <ReceiveDialog
          isOpen={showReceiveDialog}
          onClose={() => setShowReceiveDialog(false)}
          onConfirm={handleConfirmReceive}
          order={selectedOrder}
        />

        <NotifyDialog
          isOpen={showNotifyDialog}
          onClose={() => setShowNotifyDialog(false)}
          onConfirm={handleConfirmNotify}
          product={selectedProduct}
        />
      </AdminContentContainer>
    </AdminContainer>
  );
};

export default PhaseThree;