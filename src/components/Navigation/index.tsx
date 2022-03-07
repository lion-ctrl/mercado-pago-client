import React, { useContext, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import { Layout as AntLayout } from 'antd';
import styled from 'styled-components';
import authContext from 'context/auth/authContext';

// routes
import { guessRoutes, privateRoutes } from '../../router/routes';

// components
import { Sidebar } from './Sidebar';
import { ContentLayout } from './ContentLayout';
import { AuthtLayout } from './AuthLayout';

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => (
  <AntLayout>
    <Sidebar />
    <ContentLayout>{children}</ContentLayout>
  </AntLayout>
);

const Navigation = () => {
  const { isAuthenticated, walletAction } = useContext(authContext);

  useEffect(() => {
    const queryApi = async () => {
      if (isAuthenticated) {
        walletAction();
      }
    };
    queryApi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  const GuessRoutes = () => (
    <AuthtLayout>
      <Switch>
        {guessRoutes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            component={route.Component}
            exact
          />
        ))}
        <Redirect to='/auth/login' />
      </Switch>
    </AuthtLayout>
  );

  const PrivateRoutes = () => (
    <Layout>
      <Switch>
        {privateRoutes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            component={route.Component}
            exact
          />
        ))}
        <Redirect to='/productos' />
      </Switch>
    </Layout>
  );

  return (
    <AppContainer>
      <Router>
        <Switch>
          <Route
            path='/auth'
            component={(props: any) =>
              !isAuthenticated ? (
                <GuessRoutes {...props} />
              ) : (
                <Redirect to='/' />
              )
            }
          />
          <Route
            path='/'
            component={(props: any) =>
              isAuthenticated ? (
                <PrivateRoutes {...props} />
              ) : (
                <Redirect to='/auth/login' />
              )
            }
          />
        </Switch>
      </Router>
    </AppContainer>
  );
};

const AppContainer = styled.div`
  height: 100vh;
  width: 100vw;
`;

export default Navigation;
