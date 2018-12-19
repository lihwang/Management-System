import API from 'config/api';
import instance from 'config/axiosCore';

export const login = params => {
  return instance.post(API.LOGIN_API, { ...params });
};
