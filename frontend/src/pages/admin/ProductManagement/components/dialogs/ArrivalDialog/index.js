// src/pages/admin/components/ArrivalDialog/index.js
import React, { useState } from 'react';
import { Truck, AlertCircle } from 'lucide-react';
import {
  AdminInput,
  AdminPrimaryButton,
  AdminSecondaryButton,
  AdminLabel,
  IconWrapper
} from '../../../../components/shared/styles';
import {
  DialogOverlay,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DaysInputGroup,
  InfoAlert,
  InputGroup
} from './styles';

const ArrivalDialog = ({ isOpen, onClose, onConfirm, product }) => {
  const [arrivalDate, setArrivalDate] = useState('');
  const [dueDays, setDueDays] = useState('');

  const handleSubmit = () => {
    if (!arrivalDate || !dueDays) return;
    onConfirm({
      arrivalDate,
      dueDays: parseInt(dueDays)
    });
  };

  if (!isOpen) return null;

  return (
    <DialogOverlay>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <IconWrapper>
              <Truck size={20} />
            </IconWrapper>
            設定到貨資訊
          </DialogTitle>
        </DialogHeader>

        <div>
          <p className="product-name">
            商品：{product?.name}
          </p>

          <InputGroup>
            <AdminLabel>到貨日期</AdminLabel>
            <AdminInput
              type="date"
              value={arrivalDate}
              onChange={(e) => setArrivalDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
            />
          </InputGroup>

          <DaysInputGroup>
            <AdminLabel>領取期限（天）</AdminLabel>
            <AdminInput
              type="number"
              min="1"
              max="30"
              value={dueDays}
              onChange={(e) => setDueDays(e.target.value)}
              placeholder="請輸入領取天數"
            />
            <div className="helper-text">
              設定顧客可領取商品的天數
            </div>
          </DaysInputGroup>

          <InfoAlert>
            <IconWrapper>
              <AlertCircle size={16} />
            </IconWrapper>
            <span>設定後將自動通知顧客到貨資訊</span>
          </InfoAlert>
        </div>

        <DialogFooter>
          <AdminSecondaryButton onClick={onClose}>
            取消
          </AdminSecondaryButton>
          <AdminPrimaryButton
            onClick={handleSubmit}
            disabled={!arrivalDate || !dueDays}
          >
            確認設定
          </AdminPrimaryButton>
        </DialogFooter>
      </DialogContent>
    </DialogOverlay>
  );
};

export default ArrivalDialog;