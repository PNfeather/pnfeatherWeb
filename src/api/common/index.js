import {Http} from '@/plugins/http';

// 获取收藏分类列表
export const getServiceTime = () => Http.get('/common/time');
