// src/pages/admin/components/NotifyDialog/index.js
import React from 'react';
import { Bell, AlertCircle } from 'lucide-react';
import {
  AdminPrimaryButton,
  AdminSecondaryButton,
  IconWrapper
} from '../../../../components/shared/styles';
import {
  DialogOverlay,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  CustomerList,
  CustomerItem,
  NotificationInfo,
  WarningBox
} from './styles';

const NotifyDialog = ({ isOpen, onClose, onConfirm, product }) => {
  if (!isOpen || !product) return null;

  const unreceivedOrders = product.orders.filter(
    order => order.status === 'pending'
  );

  return (
    <DialogOverlay>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <IconWrapper>
              <Bell size={20} />
            </IconWrapper>
            發送取貨通知
          </DialogTitle>
        </DialogHeader>

        <div>
          <NotificationInfo>
            <p className="product-name">
              商品：{product.name}
            </p>
            <p className="count">
              即將發送通知給 {unreceivedOrders.length} 位未領取的顧客
            </p>
          </NotificationInfo>

          <CustomerList>
            {unreceivedOrders.map((order, index) => (
              <CustomerItem key={index}>
                <div className="customer-info">
                  <p className="name">{order.customer_name}</p>
                  <p className="phone">{order.phone}</p>
                </div>
                <div className="order-info">
                  訂購數量：{order.quantity}
                </div>
              </CustomerItem>
            ))}
          </CustomerList>

          <WarningBox>
            <IconWrapper>
              <AlertCircle size={16} />
            </IconWrapper>
            <p>通知內容將包含：商品名稱、應付金額、取貨期限</p>
          </WarningBox>
        </div>

        <DialogFooter>
          <AdminSecondaryButton onClick={onClose}>
            取消
          </AdminSecondaryButton>
          <AdminPrimaryButton 
            onClick={() => onConfirm(unreceivedOrders)}
          >
            確認發送
          </AdminPrimaryButton>
        </DialogFooter>
      </DialogContent>
    </DialogOverlay>
  );
};

export default NotifyDialog;