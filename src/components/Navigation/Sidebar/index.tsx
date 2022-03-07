import React, { useState, useContext, useEffect } from 'react';
import { Layout, Menu, message } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import authContext from 'context/auth/authContext';
import appContext from 'context/app/appContext';
import { privateRoutes } from 'router/routes';

const { Sider } = Layout;

export const Sidebar = () => {
  const { user, logOutAction } = useContext(authContext);
  const { appCollapsedSidebar } = useContext(appContext);
  const location = useLocation();
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  const getSelectedKeys = () => {
    const currentPath = location.pathname;
    const splitedPath = currentPath.split('/').filter((x) => x.length);
    return splitedPath.map(
      (s, is) => `/${splitedPath.filter((a, i) => i <= is).join('/')}`
    );
  };

  useEffect(() => {
    const selected = getSelectedKeys();
    setSelectedKeys(selected);
    document.title = 'DEMO';
    setTimeout(() => {
      message.destroy();
    });
    // eslint-disable-next-line
  }, [location]);

  return (
    <SiderContainer
      id='sider'
      width={250}
      trigger={null}
      collapsible
      collapsed={appCollapsedSidebar}
    >
      <LogoContainer>
        <LogoHeader to='/'>
          <>{appCollapsedSidebar ? 'D' : 'DEMO'}</>
        </LogoHeader>
        <Divider />
        <UserInfoContainer>
          {appCollapsedSidebar ? null : (
            <PrimaryText>{user.username}</PrimaryText>
          )}
        </UserInfoContainer>
      </LogoContainer>
      <Divider />
      <Menu mode='inline' selectedKeys={selectedKeys}>
        {privateRoutes.map((route) => {
          return (
            <MenuItem key={route.path} icon={route.Icon && <route.Icon />}>
              <LabelNameLink to={route.path}>{route.title}</LabelNameLink>
            </MenuItem>
          );
        })}
      </Menu>
      <Menu style={{ position: 'relative', marginTop: '60px', width: '100%' }}>
        <MenuItem
          key='logout'
          onClick={logOutAction}
          style={{ cursor: 'pointer' }}
          icon={<LogoutOutlined />}
        >
          <LabelNameLink to=''>Cerrar sesión</LabelNameLink>
        </MenuItem>
      </Menu>
    </SiderContainer>
  );
};

const SiderContainer = styled(Sider)`
  overflow-y: auto;
  overflow-x: hidden;
  height: 100vh;
  position: fixed;
  left: 0;
  box-shadow: 1px 0 8px 0 rgba(125, 140, 166, 0.08);
  border: solid 1px #d8dde6;
  background-color: #fff;
  z-index: 2;

  .ant-message {
    padding-left: 250px;
    transition: padding-left 0.3s cubic-bezier(0.2, 0, 0, 1) 0s;
  }

  &.ant-layout-sider-collapsed {
    .ant-message {
      padding-left: 80px;
    }
  }
`;

const LogoContainer = styled.div``;

const LogoHeader = styled(Link)`
  height: 55px;
  margin: 14px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  font-size: 35px;
  font-weight: bold;
`;

const UserInfoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PrimaryText = styled.h2`
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji',
    'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
  font-size: 14px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.57;
  letter-spacing: normal;
  color: @primary-text;
  margin: 0;
  text-align: center;
`;

const LabelNameLink = styled(Link)`
  height: 22px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji',
    'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
  font-size: 14px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  color: #2d3f5d;
  /* margin-left: 18px; */
`;

const MenuItem = styled(Menu.Item)`
  display: flex;
  align-items: center;
`;

const Divider = styled.div`
  border-bottom-color: #d8dde6;
  border-bottom-width: 1px;
  border-bottom-style: solid;
  margin: 10px 24px 10px 24px;
`;
