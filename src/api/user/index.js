import {Http} from '@/plugins/http';

// 登录
export const login = data => Http.post('/users/login', data);
// 登出
export const logout = data => Http.post('/users/logout', data);
