import React, { useContext } from 'react';
import { Layout } from 'antd';
import styled from 'styled-components';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import appContext from 'context/app/appContext';

const { Header, Content } = Layout;
const HEADER_HEIGHT = 65;

interface Props {
  children: React.ReactNode;
}

export const ContentLayout = ({ children }: Props) => {
  const { appToggleSidebarAction, appCollapsedSidebar } =
    useContext(appContext);
  return (
    <LayoutContainer style={{ marginLeft: appCollapsedSidebar ? 80 : 250 }}>
      <HeaderContainer>
        <CollapseTrigger onClick={appToggleSidebarAction}>
          {appCollapsedSidebar ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </CollapseTrigger>
      </HeaderContainer>
      <ContentContainer>{children}</ContentContainer>
    </LayoutContainer>
  );
};

const CollapseTrigger = styled.div`
  height: 100%;
  .anticon {
    font-size: 22px;
    cursor: pointer;
  }
`;

const HeaderContainer = styled(Header)`
  width: 100%;
  height: ${HEADER_HEIGHT}px;
  box-shadow: 0 -1px 8px 0 rgba(125, 140, 166, 0.08);
  border: solid 1px #d8dde6;
  background-color: #ffffff;
  display: flex;
`;

const ContentContainer = styled(Content)`
  margin: 24px 24px 24px 34px;
  height: calc(100vh - ${HEADER_HEIGHT}px);
  overflow-y: auto;
  background-color: #ffffff;
  padding: 20px;
`;

const LayoutContainer = styled(Layout)`
  height: 100vh;
  transition: margin-left 0.3s cubic-bezier(0.2, 0, 0, 1) 0s;
`;
