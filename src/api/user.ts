import { AxiosResponse } from 'axios';
import { axiosClient } from 'api';

export const register = (values: any): Promise<AxiosResponse> =>
  axiosClient.post('/user', values);

export const checkWallet = (): Promise<AxiosResponse> =>
  axiosClient.get(`/user/wallet`);
