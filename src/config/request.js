import API from 'config/api';
import instance from 'config/axiosCore';

export const login = params => {
  return instance.post(API.LOGIN_API, { ...params });
};


export const regist = params => {
  return instance.post(API.REGIST_API, { ...params });
};