// src/components/dialogs/ArrivalDialog/index.js
import React, { useState } from 'react';
import { Truck, AlertCircle } from 'lucide-react';
import {
  DialogOverlay,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  Button,
  InputGroup
} from '../common/styles';
import { DaysInputGroup, InfoAlert } from './styles';

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
            <Truck size={20} />
            設定到貨資訊
          </DialogTitle>
        </DialogHeader>

        <div>
          <p className="text-sm text-gray-600 mb-4">
            商品：{product?.name}
          </p>

          <InputGroup>
            <label>到貨日期</label>
            <input
              type="date"
              value={arrivalDate}
              onChange={(e) => setArrivalDate(e.target.value)}
            />
          </InputGroup>

          <DaysInputGroup>
            <label>領取期限（天）</label>
            <input
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
            <AlertCircle size={16} />
            <span>設定後將自動通知顧客到貨資訊</span>
          </InfoAlert>
        </div>

        <DialogFooter>
          <Button variant="secondary" onClick={onClose}>
            取消
          </Button>
          <Button
            variant="primary"
            onClick={handleSubmit}
            disabled={!arrivalDate || !dueDays}
          >
            確認設定
          </Button>
        </DialogFooter>
      </DialogContent>
    </DialogOverlay>
  );
};

export default ArrivalDialog;