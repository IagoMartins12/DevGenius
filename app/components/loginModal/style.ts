import { styled } from 'styled-components';
import { colors, fonts } from '@/styles/style';

interface isActive {
  display?: string;
  theme?: string;
}

interface SocialBtns {
  background?: string;
  image?: string;
}

export const Container = styled.div<isActive>`
  display: ${props => props.display};

  background-color: ${props =>
    props.theme === 'light' ? colors.primaryColor : colors.secondaryColor};
  color: ${props =>
    props.theme === 'light' ? colors.secondaryColor : colors.primaryColor};

  width: 500px;
  border-radius: 24px;
  position: fixed;
  top: calc(8%);
  left: calc(35%);
  flex-direction: column;
  z-index: 99999;

  @media (max-width: 912px) {
    width: 90%;
  }

  @media (max-width: 700px) {
    top: calc(6%);

    left: 1.5rem;
  }
`;

export const Header = styled.div`
  display: flex;
  width: 50%;
  align-items: center;
  justify-content: space-between;
  margin: 0px 1.5rem;
`;

export const InputDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const InputWrapper = styled.div<isActive>`
  margin-top: 20px;
  position: relative;

  label {
    font-weight: 600;
    font-size: ${fonts.mediumSize1};
    color: ${props =>
      props.theme === 'light' ? colors.secondaryColor : colors.primaryColor};
    display: flex;
    margin-bottom: 8px;
  }

  input {
    font-size: ${fonts.mediumSize1};
    width: 250px;
    color: #344054;
    border: 1px solid #344054;
    box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
    border-radius: 8px;
    padding: 10px 14px;
  }

  input::placeholder {
    font-size: ${fonts.minSize3};
    font-weight: 400;
    color: #667085;
  }

  .error {
    color: #db4437;
    font-size: ${fonts.minSize3};
    margin: 0;
  }
`;

export const ButtonDiv = styled.div<isActive>`
  width: 80%;
  margin: 0 auto;
  margin-top: 40px;
  color: ${props =>
    props.theme === 'light' ? colors.secondaryColor : colors.primaryColor};

  button {
    margin: 0 auto;
    width: 172px;
    height: 46px;
    display: flex;
    border-radius: 14px;
    align-items: center;
    justify-content: center;
    font-size: ${fonts.mediumSize1};
    cursor: pointer;
    border: 1px solid black;
  }
`;

export const Social = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

export const SocialButton = styled.button<SocialBtns>`
  width: 172px;
  height: 46px;
  border-radius: 14px;
  border: none;
  cursor: pointer;
  background-color: ${props => props.background};
  color: #fff;
  font-size: 14px;
  font-weight: 800;
  margin-bottom: 15px;
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 20px;

  svg {
    margin-left: 15px;
  }

  @media (max-width: 500px) {
    width: 150px;
    height: 40px;
    background-size: 25px;
  }
`;

export const FooterDiv = styled.div`
  margin: 15px 0;

  p {
    text-align: center;
  }

  span {
    cursor: pointer;
    text-decoration: underline;
  }
`;
