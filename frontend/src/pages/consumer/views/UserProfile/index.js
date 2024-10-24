// src/pages/UserProfile/index.js
import React, { useState } from 'react';
import {
  Container,
  Header,
  Title,
  ProfileContent,
  AvatarContainer,
  Avatar,
  InfoContainer,
  InfoGroup,
  Label,
  Input
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

  return (
    <Container>
      <Header>
        <Title>個人資訊</Title>
      </Header>

      <ProfileContent>
        <AvatarContainer>
          <Avatar 
            src="/default-avatar.png" 
            alt="使用者頭像"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = '/default-avatar-placeholder.png';
            }}
          />
        </AvatarContainer>

        <InfoContainer>
          <InfoGroup>
            <Label>姓名</Label>
            <Input 
              type="text" 
              value={userInfo.name}
              onChange={(e) => handleChange('name', e.target.value)}
            />
          </InfoGroup>

          <InfoGroup>
            <Label>手機</Label>
            <Input 
              type="tel" 
              value={userInfo.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
            />
          </InfoGroup>
        </InfoContainer>
      </ProfileContent>
    </Container>
  );
};

export default UserProfile;