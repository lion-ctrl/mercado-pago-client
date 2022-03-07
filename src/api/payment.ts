import { AxiosResponse } from 'axios';
import { axiosClient } from 'api';

export const createPreference = (amount: number): Promise<AxiosResponse> =>
  axiosClient.post('/payment/create-preference', { amount });

export const refund = (amount: number): Promise<AxiosResponse> =>
  axiosClient.post('/payment/refund', { amount });

export const buy = (amount: number): Promise<AxiosResponse> =>
  axiosClient.put('/payment/buy', { amount });
