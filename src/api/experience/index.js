import {Http} from '@/plugins/http';

// 添加经历
export const addExperience = (data) => Http.post('/experience/addExperience', data);
// 删除经历
export const deleteExperience = (data) => Http.post('/experience/deleteExperience', data);
// 编辑经历
export const editExperience = (data) => Http.post('/experience/editExperience', data);
// 获取经历列表
export const getExperienceList = () => Http.get('/experience/experienceList');
