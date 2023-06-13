import { styled } from 'styled-components';
import { colors, fonts } from '@/styles/style';

interface ContainerDisplay {
  display?: boolean;
  theme?: string;
}

export const Container = styled.div<ContainerDisplay>`
  display: ${props => (props.display === true ? 'flex' : 'none')};
  background-color: #fafafa;
  position: absolute;
  z-index: 999;
  width: 200px;
  top: 7vh;
  flex-direction: column;
  border-radius: 16px;

  :hover {
    background-color: ${props =>
      props.theme === 'light' ? 'rgb(245 245 245)' : '#191919'};
  }
`;

export const MenuOption = styled.div<ContainerDisplay>`
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: ${props =>
    props.theme === 'light' ? colors.primaryColor : colors.secondaryColor};
  color: ${props =>
    props.theme === 'light' ? colors.secondaryColor : colors.primaryColor};
  p {
    padding: 10px 20px;
    margin: 0;
  }
`;
