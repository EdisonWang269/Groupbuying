// src/components/dialogs/ReceiveDialog/index.js
import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import {
  DialogOverlay,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  Button
} from '../common/styles';
import {
  OrderDetails,
  DetailItem,
  TotalAmount
} from './styles';

const ReceiveDialog = ({ isOpen, onClose, onConfirm, order }) => {
  if (!isOpen || !order) return null;

  return (
    <DialogOverlay>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <CheckCircle2 size={20} />
            確認商品領取
          </DialogTitle>
        </DialogHeader>

        <OrderDetails>
          <DetailItem>
            <span className="label">顧客姓名</span>
            <span className="value">{order.customer_name}</span>
          </DetailItem>

          <DetailItem>
            <span className="label">手機號碼</span>
            <span className="value">{order.phone}</span>
          </DetailItem>

          <DetailItem>
            <span className="label">購買數量</span>
            <span className="value">{order.quantity} 件</span>
          </DetailItem>

          <TotalAmount>
            <span className="label">應付金額</span>
            <span className="value highlight">
              ${order.total_price}
            </span>
          </TotalAmount>
        </OrderDetails>

        <DialogFooter>
          <Button variant="secondary" onClick={onClose}>
            取消
          </Button>
          <Button variant="primary" onClick={onConfirm}>
            確認領取
          </Button>
        </DialogFooter>
      </DialogContent>
    </DialogOverlay>
  );
};

export default ReceiveDialog;