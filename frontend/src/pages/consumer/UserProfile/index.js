// src/pages/UserProfile/index.js
import React, { useState } from 'react';
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
  SaveButton
} from './styles';

const UserProfile = () => {
  const [userInfo, setUserInfo] = useState({
    name: '陳以琳',
    phone: '0922-111-333'
  });

  const handleChange = (field, value) => {
    setUserInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    // 這裡之後會串接 API
    console.log('儲存用戶資料:', userInfo);
  };

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
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/default-avatar-placeholder.png';
              }}
            />
          </AvatarWrapper>
        </AvatarContainer>

        <InfoContainer>
          <InfoGroup>
            <Label>姓名</Label>
            <Input 
              type="text" 
              value={userInfo.name}
              onChange={(e) => handleChange('name', e.target.value)}
              placeholder="請輸入姓名"
            />
          </InfoGroup>

          <InfoGroup>
            <Label>手機</Label>
            <Input 
              type="tel" 
              value={userInfo.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              placeholder="請輸入手機號碼"
            />
          </InfoGroup>

          <SaveButton primary onClick={handleSave}>
            儲存變更
          </SaveButton>
        </InfoContainer>
      </ProfileContent>
    </Container>
  );
};

export default UserProfile;