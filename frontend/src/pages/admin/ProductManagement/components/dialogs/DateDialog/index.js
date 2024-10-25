// src/components/dialogs/DateDialog/index.js
import React, { useState } from 'react';
import { Calendar } from 'lucide-react';
import {
  DialogOverlay,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  Button,
  InputGroup
} from '../common/styles';
import { DateBox } from './styles';

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
            <Calendar size={20} />
            修改結單日期
          </DialogTitle>
        </DialogHeader>

        <div>
          <p className="text-sm text-gray-600 mb-4">
            商品：{product?.name}
          </p>
          
          <DateBox>
            <p className="text-sm text-gray-600">目前結單日期：</p>
            <p className="font-medium">{currentDate}</p>
          </DateBox>

          <InputGroup>
            <label>新結單日期</label>
            <input
              type="date"
              value={newDate}
              onChange={(e) => setNewDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
            />
          </InputGroup>
        </div>

        <DialogFooter>
          <Button variant="secondary" onClick={onClose}>
            取消
          </Button>
          <Button 
            variant="primary" 
            onClick={handleSubmit}
            disabled={!newDate}
          >
            確認修改
          </Button>
        </DialogFooter>
      </DialogContent>
    </DialogOverlay>
  );
};

export default DateDialog;