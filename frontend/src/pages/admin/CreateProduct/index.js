import React, { useState } from 'react';
import { Upload, Calendar, Package } from 'lucide-react';
import {
  AdminContainer,
  AdminHeader,
  AdminHeaderBackground,
  AdminHeaderContent,
  AdminTitle,
  AdminContentContainer,
  AdminCard,
  AdminInput,
  AdminTextArea,
  AdminLabel,
  AdminErrorMessage,
  AdminPrimaryButton,
  AdminSecondaryButton,
  InputGroup,
  InputWrapper,
  IconWrapper
} from '../components/shared/styles';
import {
  FormSection,
  ImageUpload,
  ImagePreview,
  PriceGroup,
  DateGroup,
  FormActions,
  FormContainer,
  RequiredField,
  CustomInputGroup
} from './styles';

// Cloudinary configuration
const CLOUDINARY_UPLOAD_PRESET = 'ml_default';
const CLOUDINARY_CLOUD_NAME = 'dfowxcfef';

const CreateProduct = () => {
  const [formData, setFormData] = useState({
    product_name: '',
    product_picture: '',
    supplier_name: '',
    price: '',
    unit: '',
    product_describe: '',
    statement_date: '',
    cost: ''
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError('圖片大小不能超過 5MB');
        return;
      }

      setIsUploading(true);
      setError('');

      try {
        // Create preview
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);

        // Upload to Cloudinary
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

        const response = await fetch(
          `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
          {
            method: 'POST',
            body: formData,
          }
        );

        if (!response.ok) {
          throw new Error('圖片上傳失敗');
        }

        const data = await response.json();
        setFormData(prev => ({
          ...prev,
          product_picture: data.secure_url
        }));
      } catch (error) {
        setError('圖片上傳失敗: ' + error.message);
        setImagePreview(null);
      } finally {
        setIsUploading(false);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      if (!formData.product_name.trim()) {
        throw new Error('請輸入商品名稱');
      }
      if (!formData.product_picture) {
        throw new Error('請上傳商品圖片');
      }
      if (parseFloat(formData.price) <= 0) {
        throw new Error('請輸入有效的售價');
      }

      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('上架失敗');
      }

      alert('商品上架成功');
      handleReset();
    } catch (error) {
      setError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      product_name: '',
      product_picture: '',
      supplier_name: '',
      price: '',
      unit: '',
      product_describe: '',
      statement_date: '',
      cost: ''
    });
    setImagePreview(null);
    setError('');
  };

  const minDate = new Date().toISOString().split('T')[0];

  return (
    <AdminContainer>
      <AdminHeader>
        <AdminHeaderBackground>
          <div className="circle circle-1" />
          <div className="circle circle-2" />
          <div className="circle circle-3" />
        </AdminHeaderBackground>
        <AdminHeaderContent>
          <AdminTitle>商品上架</AdminTitle>
        </AdminHeaderContent>
      </AdminHeader>

      <AdminContentContainer>
        <AdminCard>
          {error && <AdminErrorMessage>{error}</AdminErrorMessage>}
          
          <FormContainer onSubmit={handleSubmit}>
            <FormSection>
              <CustomInputGroup>
                <AdminLabel>
                  商品名稱
                  <RequiredField>*</RequiredField>
                </AdminLabel>
                <InputWrapper>
                  <IconWrapper>
                    <Package size={15} />
                  </IconWrapper>
                  <AdminInput
                    type="text"
                    name="product_name"
                    value={formData.product_name}
                    onChange={handleInputChange}
                    placeholder="請輸入商品名稱"
                    required
                  />
                </InputWrapper>
              </CustomInputGroup>

              <ImageUpload>
                <AdminLabel>
                  商品圖片
                  <RequiredField>*</RequiredField>
                </AdminLabel>
                <div className="upload-area">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    id="image-upload"
                    hidden
                  />
                  <label htmlFor="image-upload" className="upload-button">
                    {imagePreview ? (
                      <ImagePreview>
                        <img src={imagePreview} alt="預覽圖片" />
                        <div className="overlay">
                          <Upload size={24} />
                          <span>{isUploading ? '上傳中...' : '更換圖片'}</span>
                        </div>
                      </ImagePreview>
                    ) : (
                      <div className="upload-placeholder">
                        <Upload size={24} />
                        <span>{isUploading ? '上傳中...' : '點擊上傳圖片'}</span>
                        <span className="upload-hint">建議尺寸 800x800 像素，檔案大小不超過 5MB</span>
                      </div>
                    )}
                  </label>
                </div>
              </ImageUpload>

              <CustomInputGroup>
                <AdminLabel>
                  供應商名稱
                  <RequiredField>*</RequiredField>
                </AdminLabel>
                <AdminInput
                  type="text"
                  name="supplier_name"
                  value={formData.supplier_name}
                  onChange={handleInputChange}
                  placeholder="請輸入供應商名稱"
                  required
                />
              </CustomInputGroup>

              <PriceGroup>
                <CustomInputGroup>
                  <AdminLabel>
                    售價
                    <RequiredField>*</RequiredField>
                  </AdminLabel>
                  <InputWrapper className="price-input">
                    <span className="currency">$</span>
                    <AdminInput
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      placeholder="0"
                      min="0"
                      required
                    />
                  </InputWrapper>
                </CustomInputGroup>

                <CustomInputGroup>
                  <AdminLabel>
                    單位
                    <RequiredField>*</RequiredField>
                  </AdminLabel>
                  <AdminInput
                    type="text"
                    name="unit"
                    value={formData.unit}
                    onChange={handleInputChange}
                    placeholder="例：個/盒/組"
                    required
                  />
                </CustomInputGroup>

                <CustomInputGroup>
                  <AdminLabel>
                    成本
                    <RequiredField>*</RequiredField>
                  </AdminLabel>
                  <InputWrapper className="price-input">
                    <span className="currency">$</span>
                    <AdminInput
                      type="number"
                      name="cost"
                      value={formData.cost}
                      onChange={handleInputChange}
                      placeholder="0"
                      min="0"
                      required
                    />
                  </InputWrapper>
                </CustomInputGroup>
              </PriceGroup>

              <DateGroup>
                <CustomInputGroup>
                  <AdminLabel>
                    結單日期
                    <RequiredField>*</RequiredField>
                  </AdminLabel>
                  <InputWrapper>
                    <IconWrapper>
                      <Calendar size={20} />
                    </IconWrapper>
                    <AdminInput
                      type="date"
                      name="statement_date"
                      value={formData.statement_date}
                      onChange={handleInputChange}
                      min={minDate}
                      required
                    />
                  </InputWrapper>
                </CustomInputGroup>
              </DateGroup>

              <CustomInputGroup>
                <AdminLabel>
                  商品說明
                  <RequiredField>*</RequiredField>
                </AdminLabel>
                <AdminTextArea
                  name="product_describe"
                  value={formData.product_describe}
                  onChange={handleInputChange}
                  placeholder="請輸入商品說明"
                  rows="4"
                  required
                />
              </CustomInputGroup>
            </FormSection>

            <FormActions>
              <AdminSecondaryButton type="button" onClick={handleReset}>
                清除表單
              </AdminSecondaryButton>
              <AdminPrimaryButton 
                type="submit"
                disabled={isSubmitting || isUploading}
              >
                {isSubmitting ? '處理中...' : '確認上架'}
              </AdminPrimaryButton>
            </FormActions>
          </FormContainer>
        </AdminCard>
      </AdminContentContainer>
    </AdminContainer>
  );
};

export default CreateProduct;