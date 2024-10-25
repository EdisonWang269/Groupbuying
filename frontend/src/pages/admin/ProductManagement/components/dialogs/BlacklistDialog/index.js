// src/components/dialogs/BlacklistDialog/index.js
import React from 'react';
import { UserX, AlertTriangle } from 'lucide-react';
import {
  DialogOverlay,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  Button
} from '../common/styles';
import {
  WarningSection,
  CustomerList,
  CustomerItem,
  InfoSection
} from './styles';

const BlacklistDialog = ({ isOpen, onClose, onConfirm, product }) => {
  if (!isOpen || !product) return null;

  return (
    <DialogOverlay>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <UserX size={20} />
            更新黑名單狀態
          </DialogTitle>
        </DialogHeader>

        <div>
          <InfoSection>
            <p className="product-name">商品：{product.name}</p>
            <p className="count">共有 {product.unreceived_orders.length} 位顧客未領取商品</p>
          </InfoSection>

          <WarningSection>
            <AlertTriangle size={20} />
            <div>
              <h4>注意事項</h4>
              <p>這些顧客的黑名單次數將增加 1 次</p>
            </div>
          </WarningSection>

          <CustomerList>
            <div className="list-header">未領取顧客名單：</div>
            {product.unreceived_orders.map((customer, index) => (
              <CustomerItem key={index}>
                <div className="customer-info">
                  <p className="name">{customer.customer_name}</p>
                  <p className="phone">{customer.phone}</p>
                </div>
                <div className="order-info">
                  <p>訂購數量：{customer.quantity}</p>
                  <p className="amount">未取金額：${customer.total_price}</p>
                </div>
              </CustomerItem>
            ))}
          </CustomerList>
        </div>

        <DialogFooter>
          <Button variant="secondary" onClick={onClose}>
            取消
          </Button>
          <Button 
            variant="primary"
            onClick={onConfirm}
          >
            確認更新
          </Button>
        </DialogFooter>
      </DialogContent>
    </DialogOverlay>
  );
};

export default BlacklistDialog;