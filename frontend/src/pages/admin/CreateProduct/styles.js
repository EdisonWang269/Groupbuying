// src/pages/admin/CreateProduct/styles.js
import styled from '@emotion/styled';
import { InputGroup } from '../components/shared/styles';

export const FormContainer = styled.form`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
`;

export const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.md}; // 將 xl 改為 md，減少間距
  padding: ${props => props.theme.spacing.xl} 0;
`;

export const RequiredField = styled.span`
  color: ${props => props.theme.colors.primary};
  margin-left: ${props => props.theme.spacing.xs};
`;

export const CustomInputGroup = styled(InputGroup)`
  margin-bottom: ${props => props.theme.spacing.md}; // 將 lg 改為 md，減少間距
  
  &:last-child {
    margin-bottom: 0;
  }

  ${props => props.theme.typography.label};

  input {
    padding-left: ${props => props.theme.spacing.xxl}; // 增加左邊內邊距，讓圖標和文字間距更大
  }

  // 調整圖標位置，讓其與輸入框有更好的間距
  .icon-wrapper {
    left: ${props => props.theme.spacing.md};
  }
`;

export const ImageUpload = styled(CustomInputGroup)`
  .upload-area {
    border: 2px dashed ${props => props.theme.colors.border};
    border-radius: ${props => props.theme.borderRadius.lg};
    transition: all ${props => props.theme.transition.default};
    margin-top: ${props => props.theme.spacing.sm};
    
    &:hover {
      border-color: ${props => props.theme.colors.primary};
      background-color: rgba(108, 183, 170, 0.05);
    }

    // 修改focus時的邊框顏色為主題綠色
    &:focus-within {
      outline: none;
      border-color: ${props => props.theme.colors.primary};
      box-shadow: 0 0 0 2px rgba(108, 183, 170, 0.2);
    }

    .upload-button {
      display: block;
      cursor: pointer;
      padding: ${props => props.theme.spacing.xl};
      text-align: center;
    }
  }

  .upload-placeholder {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: ${props => props.theme.spacing.md};
    color: ${props => props.theme.colors.textLight};
    padding: ${props => props.theme.spacing.xl};
    
    .upload-hint {
      font-size: ${props => props.theme.typography.small.fontSize};
      color: ${props => props.theme.colors.textLight};
      text-align: center;
      margin-top: ${props => props.theme.spacing.sm};
    }
  }
`;

export const ImagePreview = styled.div`
  position: relative;
  width: 200px;
  height: 200px;
  margin: ${props => props.theme.spacing.md} auto;
  border-radius: ${props => props.theme.borderRadius.md};
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: ${props => props.theme.spacing.sm};
    color: white;
    opacity: 0;
    transition: opacity ${props => props.theme.transition.default};

    &:hover {
      opacity: 1;
    }

    span {
      font-size: ${props => props.theme.typography.small.fontSize};
      font-weight: 500;
    }
  }
`;

export const PriceGroup = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${props => props.theme.spacing.lg}; // 將 xl 改為 lg，減少間距
  margin: ${props => props.theme.spacing.lg} 0; // 將 xl 改為 lg，減少間距

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: repeat(2, 1fr);
    gap: ${props => props.theme.spacing.md};
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    gap: ${props => props.theme.spacing.sm};
  }

  .currency {
    position: absolute;
    left: ${props => props.theme.spacing.md};
    top: 50%;
    transform: translateY(-50%);
    color: ${props => props.theme.colors.textLight};
    z-index: 1;
  }

  input {
    padding-left: ${props => props.theme.spacing.xl};
  }
`;

export const DateGroup = styled.div`
  margin: ${props => props.theme.spacing.lg} 0; // 將 xl 改為 lg，減少間距
`;

export const FormActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${props => props.theme.spacing.md};
  margin-top: ${props => props.theme.spacing.lg}; // 將 xl 改為 lg，減少間距
  padding-top: ${props => props.theme.spacing.lg};
  border-top: 1px solid ${props => props.theme.colors.border};

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    flex-direction: column-reverse;
    gap: ${props => props.theme.spacing.md};

    button {
      width: 100%;
    }
  }
`;