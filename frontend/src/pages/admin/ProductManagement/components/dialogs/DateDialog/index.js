// src/pages/admin/components/DateDialog/index.js
import React, { useState } from 'react';
import { Calendar } from 'lucide-react';
import {
  AdminInput,
  AdminLabel,
  IconWrapper,
  AdminPrimaryButton,
  AdminSecondaryButton
} from '../../../../components/shared/styles';

import {
  DialogOverlay,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DateBox,
  InputGroup
} from './styles';

const DateDialog = ({ isOpen, onClose, onConfirm, product, currentDate }) => {
  const [newDate, setNewDate] = useState('');

  const handleSubmit = () => {
    if (!newDate) return;
    onConfirm(newDate);
  };

  if (!isOpen) return null;

  return (
    <DialogOverlay>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <IconWrapper>
              <Calendar size={20} />
            </IconWrapper>
            修改結單日期
          </DialogTitle>
        </DialogHeader>

        <div>
          <p className="text-sm text-gray-600 mb-4">
            商品：{product?.name}
          </p>
          
          <DateBox>
            <p>目前結單日期：</p>
            <p className="date">{currentDate}</p>
          </DateBox>

          <InputGroup>
            <AdminLabel>新結單日期</AdminLabel>
            <AdminInput
              type="date"
              value={newDate}
              onChange={(e) => setNewDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
            />
          </InputGroup>
        </div>

        <DialogFooter>
          <AdminSecondaryButton onClick={onClose}>
            取消
          </AdminSecondaryButton>
          <AdminPrimaryButton 
            onClick={handleSubmit}
            disabled={!newDate}
          >
            確認修改
          </AdminPrimaryButton>
        </DialogFooter>
      </DialogContent>
    </DialogOverlay>
  );
};

export default DateDialog;