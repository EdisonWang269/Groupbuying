// src/pages/consumer/UserProfile/index.js
import React, { useState, useEffect } from 'react';
import { userAPI } from '../../../api';
import { useAuth } from '../../../contexts/AuthContext';
import LoadingSpinner from '../../../components/LoadingSpinner';
import {
  Container,
  Header,
  HeaderBackground,
  HeaderContent,
  Title,
  ProfileContent,
  AvatarContainer,
  AvatarWrapper,
  Avatar,
  InfoContainer,
  InfoGroup,
  Label,
  Input,
  ButtonGroup,
  EditButton,
  SaveButton,
  CancelButton,
  ErrorMessage,
  SuccessMessage,
  FormError,
  StaticInfo
} from './styles';

const UserProfile = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    phone: ''
  });
  const [originalData, setOriginalData] = useState({
    name: '',
    phone: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // 載入用戶資料
  useEffect(() => {
    const fetchUserInfo = async () => {
      // 如果已經初始化過，就不要再重複請求
      if (isInitialized) return;
      
      try {
        setLoading(true);
        setError(null);
        const response = await userAPI.getUserInfo(user.userid);
        const userInfo = {
          name: response.user_name || '',
          phone: response.phone || ''
        };
        setFormData(userInfo);
        setOriginalData(userInfo);
        setIsInitialized(true);
      } catch (err) {
        setError('無法載入用戶資料，請稍後再試');
        console.error('Error fetching user info:', err);
      } finally {
        setLoading(false);
      }
    };

    if (user?.userid) {
      fetchUserInfo();
    }
  }, [user?.userid, isInitialized]); // 只依賴 userid 和初始化狀態

  // 表單驗證
  const validateForm = () => {
    const errors = {};
    const phoneRegex = /^09\d{8}$/;  // 台灣手機號碼格式

    if (!formData.name.trim()) {
      errors.name = '請輸入姓名';
    } else if (formData.name.length > 50) {
      errors.name = '姓名不能超過50個字元';
    }

    if (!formData.phone.trim()) {
      errors.phone = '請輸入手機號碼';
    } else if (!phoneRegex.test(formData.phone)) {
      errors.phone = '請輸入有效的手機號碼（例：0912345678）';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // 處理輸入變更
  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    setFormErrors(prev => ({
      ...prev,
      [field]: ''
    }));
    setError(null);
    setSuccess(false);
  };

  // 處理開始編輯
  const handleEdit = () => {
    setIsEditing(true);
    setError(null);
    setSuccess(false);
    setFormErrors({});
  };

  // 處理取消編輯
  const handleCancel = () => {
    setIsEditing(false);
    setFormData(originalData);
    setFormErrors({});
    setError(null);
    setSuccess(false);
  };

  // 處理表單提交
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      setSaving(true);
      setError(null);
      setSuccess(false);

      await userAPI.updateUserInfo(user.userid, {
        user_name: formData.name,
        phone: formData.phone
      });

      setSuccess(true);
      setOriginalData(formData);
      setIsEditing(false);
    } catch (err) {
      setError(err.message || '更新資料失敗，請稍後再試');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <Container>
      <Header>
        <HeaderBackground>
          <div className="circle circle-1" />
          <div className="circle circle-2" />
          <div className="circle circle-3" />
        </HeaderBackground>
        <HeaderContent direction="column" justify="center">
          <Title>個人資料</Title>
        </HeaderContent>
      </Header>

      <ProfileContent>
        <AvatarContainer>
          <AvatarWrapper>
            <Avatar 
              src="/default-avatar.png" 
              alt="使用者頭像"
              // onError={(e) => {
              //   e.target.onerror = null;
              //   e.target.src = '/default-avatar-placeholder.png';
              // }}
            />
          </AvatarWrapper>
        </AvatarContainer>

        <form onSubmit={handleSubmit}>
          <InfoContainer>
            <InfoGroup>
              <Label>姓名</Label>
              {isEditing ? (
                <>
                  <Input 
                    type="text" 
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    placeholder="請輸入姓名"
                    error={formErrors.name}
                    disabled={saving}
                  />
                  {formErrors.name && <FormError>{formErrors.name}</FormError>}
                </>
              ) : (
                <StaticInfo>{formData.name || '尚未設定'}</StaticInfo>
              )}
            </InfoGroup>

            <InfoGroup>
              <Label>手機</Label>
              {isEditing ? (
                <>
                  <Input 
                    type="tel" 
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    placeholder="請輸入手機號碼"
                    error={formErrors.phone}
                    disabled={saving}
                  />
                  {formErrors.phone && <FormError>{formErrors.phone}</FormError>}
                </>
              ) : (
                <StaticInfo>{formData.phone || '尚未設定'}</StaticInfo>
              )}
            </InfoGroup>

            {error && <ErrorMessage>{error}</ErrorMessage>}
            {success && <SuccessMessage>資料更新成功！</SuccessMessage>}

            <ButtonGroup>
              {isEditing ? (
                <>
                  <SaveButton 
                    type="submit"
                    disabled={saving}
                    primary
                  >
                    {saving ? '儲存中...' : '儲存變更'}
                  </SaveButton>
                  <CancelButton 
                    type="button"
                    onClick={handleCancel}
                    disabled={saving}
                  >
                    取消
                  </CancelButton>
                </>
              ) : (
                <EditButton 
                  type="button"
                  onClick={handleEdit}
                  primary
                >
                  編輯資料
                </EditButton>
              )}
            </ButtonGroup>
          </InfoContainer>
        </form>
      </ProfileContent>
    </Container>
  );
};

export default UserProfile;