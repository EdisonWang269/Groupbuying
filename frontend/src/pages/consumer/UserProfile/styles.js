// src/pages/UserProfile/styles.js
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

const moveCircle = keyframes`
  0%, 100% {
    transform: translate(0, 0);
  }
  50% {
    transform: translate(10px, -10px);
  }
`;

export const Container = styled.div`
  min-height: 100vh;
  background: #f0f7f5;
  padding-bottom: 60px;
`;

export const Header = styled.header`
  position: relative;
  background: #6CB7AA;
  padding: ${props => props.theme.spacing.lg} ${props => props.theme.spacing.md};
  margin-bottom: ${props => props.theme.spacing.xl};
  overflow: hidden;
`;

export const HeaderBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  pointer-events: none;

  .circle {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.1);
  }

  .circle-1 {
    width: 100px;
    height: 100px;
    top: -20px;
    right: 10%;
    animation: ${moveCircle} 7s ease-in-out infinite;
  }

  .circle-2 {
    width: 60px;
    height: 60px;
    top: 40px;
    right: 20%;
    animation: ${moveCircle} 5s ease-in-out infinite reverse;
  }

  .circle-3 {
    width: 40px;
    height: 40px;
    top: 60px;
    right: 25%;
    animation: ${moveCircle} 6s ease-in-out infinite;
  }
`;

export const HeaderContent = styled.div`
  position: relative;
  z-index: 1;
  text-align: center;
`;

export const Title = styled.h1`
  color: white;
  font-size: ${props => props.theme.typography.h1.fontSize};
  margin: 0;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
`;

export const ProfileContent = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing.md};
`;

export const AvatarContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: ${props => props.theme.spacing.xl};
`;

export const AvatarWrapper = styled.div`
  position: relative;
  width: 120px;
  height: 120px;
`;

export const Avatar = styled.img`
  width: 120px;
  height: 120px;
  border-radius: ${props => props.theme.borderRadius.full};
  border: 4px solid white;
  box-shadow: ${props => props.theme.shadows.md};
  background-color: ${props => props.theme.colors.placeholder};
  object-fit: cover;
`;

export const CameraButton = styled.button`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 36px;
  height: 36px;
  border-radius: ${props => props.theme.borderRadius.full};
  background: #6CB7AA;
  border: 3px solid white;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all ${props => props.theme.transition.default};

  &:hover {
    background: #5BA99C;
    transform: scale(1.05);
  }
`;

export const InfoContainer = styled.div`
  background: white;
  padding: ${props => props.theme.spacing.xl};
  border-radius: ${props => props.theme.borderRadius.lg};
  box-shadow: ${props => props.theme.shadows.sm};
`;

export const InfoGroup = styled.div`
  margin-bottom: ${props => props.theme.spacing.lg};
`;

export const Label = styled.label`
  display: block;
  color: ${props => props.theme.colors.textLight};
  margin-bottom: ${props => props.theme.spacing.sm};
  font-size: ${props => props.theme.typography.small.fontSize};
`;

export const Input = styled.input`
  width: 100%;
  padding: ${props => props.theme.spacing.md};
  border: 2px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.md};
  font-size: ${props => props.theme.typography.body.fontSize};
  transition: all ${props => props.theme.transition.default};

  &:focus {
    outline: none;
    border-color: #6CB7AA;
    box-shadow: 0 0 0 3px rgba(108, 183, 170, 0.1);
  }

  &::placeholder {
    color: ${props => props.theme.colors.textLight};
  }
`;

export const SaveButton = styled.button`
  width: 100%;
  padding: ${props => props.theme.spacing.md};
  background: #6CB7AA;
  color: white;
  border: none;
  border-radius: ${props => props.theme.borderRadius.full};
  font-size: 1.1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all ${props => props.theme.transition.default};
  margin-top: ${props => props.theme.spacing.xl};
  box-shadow: ${props => props.theme.shadows.sm};

  &:hover {
    background: #5BA99C;
    transform: translateY(-1px);
    box-shadow: ${props => props.theme.shadows.md};
  }
`;