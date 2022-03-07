/* eslint-disable no-param-reassign */
import axios, { AxiosRequestConfig } from 'axios';

const HOST = process.env.REACT_APP_BASE_URL;
const PATH = process.env.REACT_APP_API_PATH;

export const baseURL = `${HOST}${PATH}`;

const defaultOptions = {
  baseURL,
};

export const axiosClient = axios.create(defaultOptions);

const requestInterceptor = (options: AxiosRequestConfig) => {
  const { accessToken } = JSON.parse(localStorage.getItem('auth') || 'null');
  if (accessToken) {
    options.headers!.Authorization = `Bearer ${accessToken}`;
  }
  return options;
};

axiosClient.interceptors.request.use(requestInterceptor);
