import request from '@/utils/request';
import { LoginResponse, LoginForm, UserInfoResponse } from './type';

enum API{
  LOGIN_URL = '/user/login',
  USER_INFO_URL = '/user/info',
}

export const reqLogin = (data: LoginForm) => request.post<any, LoginResponse>(API.LOGIN_URL, data);
export const reqUserInfo = () => request.get<any, UserInfoResponse>(API.USER_INFO_URL);
