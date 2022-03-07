import { AxiosResponse } from 'axios';
import { axiosClient } from 'api';

export const login = (values: any): Promise<AxiosResponse> =>
  axiosClient.post('/auth/login', values);
