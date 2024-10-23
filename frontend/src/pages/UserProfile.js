import React, { useState } from 'react';

const UserProfile = () => {
  const [userInfo, setUserInfo] = useState({
    name: '陳以琳',
    phone: '0922-111-333'
  });

  return (
    <div className="profile-container">
      <header className="page-header">
        <h1>個人資訊</h1>
      </header>

      <div className="profile-content">
        <div className="avatar-container">
          <img 
            src="/default-avatar.png" 
            alt="使用者頭像" 
            className="profile-avatar"
          />
        </div>

        <div className="info-container">
          <div className="info-group">
            <label>姓名</label>
            <input 
              type="text" 
              value={userInfo.name}
              onChange={(e) => setUserInfo({...userInfo, name: e.target.value})}
              className="info-input"
            />
          </div>

          <div className="info-group">
            <label>手機</label>
            <input 
              type="tel" 
              value={userInfo.phone}
              onChange={(e) => setUserInfo({...userInfo, phone: e.target.value})}
              className="info-input"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;