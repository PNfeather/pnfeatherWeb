import {Http} from '@/plugins/http';

// 登录
export const login = data => Http.post('/users/login', data);
