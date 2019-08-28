import {Http} from '@/plugins/http';

// 获取收藏分类列表
export const getClassifyList = () => Http.get('/collect/classifyList');
// 添加收藏分类
export const addClassify = (data) => Http.post('/collect/addClassify', data);
// 删除收藏分类
export const deleteClassify = (data) => Http.post('/collect/deleteClassify', data);
