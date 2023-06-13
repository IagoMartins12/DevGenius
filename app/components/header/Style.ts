import styled, { DefaultTheme } from 'styled-components';
import { colors, fonts } from '@/styles/style';

interface ThemeProps {
  theme?: string;
  display?: boolean;
}

export const Header = styled.div<ThemeProps>`
  background-color: ${props =>
    props.theme === 'light' ? colors.primaryColor : colors.secondaryColor};
  font-size: ${fonts.mediumSize2};
  color: ${props =>
    props.theme === 'light' ? colors.secondaryColor : colors.primaryColor};
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: space-around;
  height: 7vh;
`;

export const CategoryDiv = styled.div`
  width: 50%;
  display: flex;
  gap: 10px;

  @media (max-width: 620px) {
    display: none;
  }
`;

export const IconsDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  cursor: pointer;
`;

export const SearchDiv = styled.div<ThemeProps>`
  display: flex;
  justify-content: center;
  align-items: center;

  input {
    cursor: ${props => (props.display ? 'text' : 'auto')};
    opacity: ${props => (props.display ? '1' : '0')};
    transition: opacity 0.5s ease, width 0.5s ease;
    background-color: transparent;
    border: none;
    border-bottom: 1px solid
      ${props =>
        props.theme === 'light' ? colors.secondaryColor : colors.primaryColor};
    color: ${props =>
      props.theme === 'light' ? colors.secondaryColor : colors.primaryColor};

    outline: none;
  }
`;
