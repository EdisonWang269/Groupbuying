// src/pages/admin/PhaseOne/index.js
import React, { useState } from 'react';
import { Edit, Calendar } from 'lucide-react';
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
  ProductInfo,
  ProductTitle,
  InfoRow,
  EditButton,
  OrderAmount,
  OrderCount
} from './styles';
import DateDialog from '../dialogs/DateDialog';

const PhaseOne = () => {
  const [showDateDialog, setShowDateDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // 模擬數據，實際使用時需要從API獲取
  const products = [
    {
      id: 1,
      name: '香酥芋泥蛋糕',
      price: 240,
      launch_date: '2024/05/01',
      statement_date: '2024/05/15',
      current_orders: 25,
      total_amount: 6000
    },
    {
      id: 2,
      name: '特製泡芙',
      price: 180,
      launch_date: '2024/05/03',
      statement_date: '2024/05/20',
      current_orders: 15,
      total_amount: 2700
    }
  ];

  const handleEditDate = (product) => {
    setSelectedProduct(product);
    setShowDateDialog(true);
  };

  const handleUpdateDate = async (newDate) => {
    try {
      // 調用 API 更新結單日期
      await fetch(`/api/products/${selectedProduct.id}/statementdate`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          new_statement_date: newDate
        })
      });

      // 成功後關閉對話框
      setShowDateDialog(false);
      setSelectedProduct(null);
      // 這裡應該要重新獲取商品列表
    } catch (error) {
      console.error('更新結單日期失敗:', error);
    }
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
          <AdminTitle>第一階段商品</AdminTitle>
        </AdminHeaderContent>
      </AdminHeader>

      <AdminContentContainer>
        {products.map(product => (
          <ProductCard key={product.id}>
            <ProductInfo>
              <ProductTitle>{product.name}</ProductTitle>
              <InfoRow>
                <span>單價：${product.price}</span>
                <OrderCount>目前訂購數：{product.current_orders}</OrderCount>
                <OrderAmount>總金額：${product.total_amount}</OrderAmount>
              </InfoRow>
              <InfoRow>
                <IconWrapper>
                  <Calendar size={16} />
                </IconWrapper>
                <span>上架日期：{product.launch_date}</span>
              </InfoRow>
              <InfoRow>
                <IconWrapper>
                  <Calendar size={16} />
                </IconWrapper>
                <span>結單日期：{product.statement_date}</span>
                <EditButton
                  onClick={() => handleEditDate(product)}
                  title="修改結單日期"
                >
                  <Edit size={16} />
                </EditButton>
              </InfoRow>
            </ProductInfo>
            <StatusTag status="active">團購中</StatusTag>
          </ProductCard>
        ))}

        <DateDialog
          isOpen={showDateDialog}
          onClose={() => setShowDateDialog(false)}
          onConfirm={handleUpdateDate}
          product={selectedProduct}
          currentDate={selectedProduct?.statement_date}
        />
      </AdminContentContainer>
    </AdminContainer>
  );
};

export default PhaseOne;