// src/pages/admin/CreateProduct/styles.js
import styled from '@emotion/styled';
import { InputGroup } from '../components/shared/styles';

export const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.xl};
`;

export const ImageUpload = styled(InputGroup)`
  .upload-area {
    border: 2px dashed ${props => props.theme.colors.border};
    border-radius: ${props => props.theme.borderRadius.lg};
    transition: all ${props => props.theme.transition.default};
    
    &:hover {
      border-color: #6CB7AA;
      background-color: rgba(108, 183, 170, 0.05);
    }

    .upload-button {
      display: block;
      cursor: pointer;
      padding: ${props => props.theme.spacing.xl};
    }
  }

  .upload-placeholder {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: ${props => props.theme.spacing.md};
    color: ${props => props.theme.colors.textLight};
    
    .upload-hint {
      font-size: ${props => props.theme.typography.small.fontSize};
      color: ${props => props.theme.colors.textLight};
      text-align: center;
    }
  }
`;

export const ImagePreview = styled.div`
  position: relative;
  width: 200px;
  height: 200px;
  margin: 0 auto;
  border-radius: ${props => props.theme.borderRadius.md};
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
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
    }
  }
`;

export const PriceGroup = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${props => props.theme.spacing.lg};

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

export const DateGroup = styled.div``;

export const FormActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${props => props.theme.spacing.md};
  margin-top: ${props => props.theme.spacing.xl};
  padding-top: ${props => props.theme.spacing.lg};
  border-top: 1px solid ${props => props.theme.colors.border};

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    flex-direction: column-reverse;
  }
`;