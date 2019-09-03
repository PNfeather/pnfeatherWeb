import {Http} from '@/plugins/http';

// 获取收藏分类列表
export const getClassifyList = () => Http.get('/collect/classifyList');
// 添加收藏分类
export const addClassify = (data) => Http.post('/collect/addClassify', data);
// 删除收藏分类
export const deleteClassify = (data) => Http.post('/collect/deleteClassify', data);
// 添加收藏
export const addCollection = (data) => Http.post('/collect/addCollection', data);
// 编辑收藏
export const editCollection = (data) => Http.post('/collect/editCollection', data);
// 获取收藏列表
export const getCollectionList = (data) => Http.get('/collect/collectionList', data);
