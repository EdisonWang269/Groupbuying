import React, { useState, useEffect } from 'react';
import { Calendar, Truck, Package } from 'lucide-react';
import {
  Container,
  ProductCard,
  ProductInfo,
  ProductTitle,
  InfoRow,
  StatusTag,
  SetArrivalButton,
  OrderSummary,
  OrderSummaryTitle,
  OrderSummaryContent,
} from './styles';
import ArrivalDialog from '../dialogs/ArrivalDialog';

const PhaseTwo = () => {
  const [showArrivalDialog, setShowArrivalDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // 模擬數據，實際使用時需要從API獲取
  const products = [
    {
      id: 1,
      name: '香酥芋泥蛋糕',
      price: 240,
      statement_date: '2024/05/15',
      total_orders: 50,
      total_amount: 12000
    },
    {
      id: 2,
      name: '特製泡芙',
      price: 180,
      statement_date: '2024/05/20',
      total_orders: 30,
      total_amount: 5400
    }
  ];

  // 當商品結單時，自動記錄訂購數量
  useEffect(() => {
    const updatePurchaseQuantity = async (productId, quantity) => {
      try {
        await fetch(`/api/products/${productId}/quantity`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            purchase_quantity: quantity
          })
        });
      } catch (error) {
        console.error('更新訂購數量失敗:', error);
      }
    };

    // 在商品進入這個階段時執行
    products.forEach(product => {
      updatePurchaseQuantity(product.id, product.total_orders);
    });
  }, []);

  const handleSetArrival = (product) => {
    setSelectedProduct(product);
    setShowArrivalDialog(true);
  };

  const handleConfirmArrival = async (arrivalData) => {
    try {
      // 調用 API 設定到貨資訊
      await fetch(`/api/products/${selectedProduct.id}/arrival`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          arrival_date: arrivalData.arrivalDate,
          due_days: arrivalData.dueDays
        })
      });

      setShowArrivalDialog(false);
      setSelectedProduct(null);
      // 這裡應該要重新獲取商品列表
    } catch (error) {
      console.error('設定到貨資訊失敗:', error);
    }
  };

  return (
    <Container>
      {products.map(product => (
        <ProductCard key={product.id}>
          <ProductInfo>
            <div className="flex justify-between items-start">
              <ProductTitle>{product.name}</ProductTitle>
              <StatusTag>等待到貨</StatusTag>
            </div>
            
            <InfoRow>
              <span>單價：${product.price}</span>
              <span>總訂購數：{product.total_orders}</span>
              <span>總金額：${product.total_amount}</span>
            </InfoRow>
            
            <InfoRow>
              <div className="flex items-center gap-2">
                <Calendar size={16} />
                <span>結單日期：{product.statement_date}</span>
              </div>
            </InfoRow>

            <OrderSummary>
              <OrderSummaryTitle>
                <Package size={16} />
                訂單摘要
              </OrderSummaryTitle>
              <OrderSummaryContent>
                <div>總訂購數量：{product.total_orders} 件</div>
                <div>總訂購金額：${product.total_amount}</div>
              </OrderSummaryContent>
            </OrderSummary>

            <SetArrivalButton
              onClick={() => handleSetArrival(product)}
            >
              <Truck size={18} />
              設定到貨資訊
            </SetArrivalButton>
          </ProductInfo>
        </ProductCard>
      ))}

      {/* 設定到貨資訊對話框 */}
      <ArrivalDialog
        isOpen={showArrivalDialog}
        onClose={() => setShowArrivalDialog(false)}
        onConfirm={handleConfirmArrival}
        product={selectedProduct}
      />
    </Container>
  );
};

export default PhaseTwo;