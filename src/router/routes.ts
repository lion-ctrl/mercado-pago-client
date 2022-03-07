import React from 'react';
import { HomeOutlined, WalletOutlined } from '@ant-design/icons';

// components
import { LoginRegister } from 'screens/LoginRegister';
import { Dashboard } from 'screens/Dashboard';
import { Wallet } from 'screens/Wallet';

export interface Route {
  path: string;
  title: string;
  Component: React.ComponentType;
  Icon?: React.ReactNode;
}

export const guessRoutes: Route[] = [
  {
    title: 'Iniciar Sesión',
    Component: LoginRegister,
    path: '/auth/login',
  },
  {
    title: 'Registro',
    Component: LoginRegister,
    path: '/auth/registro',
  },
];

export const privateRoutes: Route[] = [
  {
    path: '/productos',
    title: 'Productos',
    Component: Dashboard,
    Icon: HomeOutlined,
  },
  {
    path: '/cartera',
    title: 'cartera',
    Component: Wallet,
    Icon: WalletOutlined,
  },
];
