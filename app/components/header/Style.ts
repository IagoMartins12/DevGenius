import styled from 'styled-components';
import { colors, fonts } from '@/styles/style';

export const Header = styled.div`
  background-color: ${colors.primaryColor};
  font-size: ${fonts.mediumSize2};
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: space-around;
`;

export const categoryDiv = styled.div`
  width: 50%;
  display: flex;
  gap: 10px;
`;

export const iconsDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  cursor: pointer;
`;
