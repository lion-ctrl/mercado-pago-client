import React from 'react';
import { useLocation } from 'react-router-dom';
import { Layout } from 'antd';
import styled from 'styled-components';

const { Header, Content } = Layout;

interface Props {
  children?: React.ReactNode;
}

export const AuthtLayout = ({ children }: Props) => {
  const location = useLocation();
  return (
    <LayoutContainer>
      <HeaderContainer>
        {location.pathname.split('/').at(-1) === 'registro'
          ? 'Registrarse'
          : 'Iniciar Sesión'}
      </HeaderContainer>
      <Content>{children}</Content>
    </LayoutContainer>
  );
};

const HeaderContainer = styled(Header)`
  width: 100%;
  background-color: transparent;
  height: 200px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  font-size: 35px;
  font-weight: bold;
`;

const LayoutContainer = styled(Layout)`
  height: 100vh;
  background-color: #ffffff;

  @media (min-width: 768px) {
    padding-top: 20px;
  }
`;
