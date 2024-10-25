import React, { useState } from 'react';
import { Calendar, AlertCircle, Package, UserX } from 'lucide-react';
import {
  Container,
  ProductCard,
  ProductHeader,
  ProductInfo,
  ProductTitle,
  InfoRow,
  CompletionStats,
  StatItem,
  UnreceivedSection,
  UnreceivedHeader,
  UnreceivedList,
  UnreceivedItem,
  BlacklistButton,
} from './styles';

import BlacklistDialog from '../dialogs/BlacklistDialog';

const PhaseFour = () => {
  const [showBlacklistDialog, setShowBlacklistDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // 模擬數據，實際使用時需要從API獲取
  const products = [
    {
      id: 1,
      name: '香酥芋泥蛋糕',
      price: 240,
      arrival_date: '2024/05/20',
      due_date: '2024/05/27',
      completion_date: '2024/05/28',
      total_orders: 50,
      received_orders: 45,
      total_amount: 12000,
      unreceived_orders: [
        {
          userid: 'user123',
          customer_name: '王小明',
          phone: '0912345678',
          quantity: 2,
          total_price: 480
        },
        {
          userid: 'user124',
          customer_name: '李小華',
          phone: '0923456789',
          quantity: 1,
          total_price: 240
        }
      ]
    }
  ];

  const handleUpdateBlacklist = async (product) => {
    setSelectedProduct(product);
    setShowBlacklistDialog(true);
  };

  const confirmUpdateBlacklist = async () => {
    try {
      // 對每個未領取的顧客更新黑名單狀態
      const updatePromises = selectedProduct.unreceived_orders.map(order =>
        fetch(`/api/users/${order.userid}/blacklist`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ operation: 1 }) // 增加黑名單次數
        })
      );

      await Promise.all(updatePromises);
      setShowBlacklistDialog(false);
      setSelectedProduct(null);
      // 顯示成功訊息
    } catch (error) {
      console.error('更新黑名單狀態失敗:', error);
      // 顯示錯誤訊息
    }
  };

  return (
    <Container>
      {products.map(product => (
        <ProductCard key={product.id}>
          <ProductHeader>
            <ProductTitle>{product.name}</ProductTitle>
            <CompletionStats>
              <StatItem>
                <Package size={16} />
                <span>總訂單：{product.total_orders}</span>
              </StatItem>
              <StatItem success>
                已領取：{product.received_orders}
              </StatItem>
              <StatItem error>
                未領取：{product.unreceived_orders.length}
              </StatItem>
            </CompletionStats>
          </ProductHeader>

          <ProductInfo>
            <InfoRow>
              <span>單價：${product.price}</span>
              <span>總營業額：${product.total_amount}</span>
            </InfoRow>
            <InfoRow>
              <div className="flex items-center gap-2">
                <Calendar size={16} />
                <span>到貨日期：{product.arrival_date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={16} />
                <span>領取期限：{product.due_date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={16} />
                <span>完成日期：{product.completion_date}</span>
              </div>
            </InfoRow>

            {product.unreceived_orders.length > 0 && (
              <UnreceivedSection>
                <UnreceivedHeader>
                  <div className="flex items-center gap-2 text-red-600">
                    <AlertCircle size={20} />
                    <h3>未領取顧客名單</h3>
                  </div>
                  <BlacklistButton
                    onClick={() => handleUpdateBlacklist(product)}
                  >
                    <UserX size={16} />
                    更新黑名單
                  </BlacklistButton>
                </UnreceivedHeader>

                <UnreceivedList>
                  {product.unreceived_orders.map((order, index) => (
                    <UnreceivedItem key={index}>
                      <div>
                        <div className="font-medium">{order.customer_name}</div>
                        <div className="text-sm text-gray-500">{order.phone}</div>
                      </div>
                      <div className="text-right">
                        <div>訂購數量：{order.quantity}</div>
                        <div className="text-sm text-red-600">
                          未取金額：${order.total_price}
                        </div>
                      </div>
                    </UnreceivedItem>
                  ))}
                </UnreceivedList>
              </UnreceivedSection>
            )}
          </ProductInfo>
        </ProductCard>
      ))}

      {/* 黑名單更新確認對話框 */}
      <BlacklistDialog
        isOpen={showBlacklistDialog}
        onClose={() => setShowBlacklistDialog(false)}
        onConfirm={confirmUpdateBlacklist}
        product={selectedProduct}
      />
    </Container>
  );
};

export default PhaseFour;