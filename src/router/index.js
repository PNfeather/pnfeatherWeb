import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const login = r => require.ensure([], () => r(require('@P/login/login')), 'login');

const routes = [
  {
    path: '*',
    redirect: '/login'
  },
  {
    path: '/',
    component: login
  }
  // {
  //   path: '/manage',
  //   component: manage,
  //   name: '',
  //   children: [
  //     {
  //       path: '',
  //       component: home,
  //       meta: []
  //     }, {
  //       path: '/teachers',
  //       component: teachers,
  //       meta: ['账号管理', '教师用户']
  //     }, {
  //       path: '/patriarch',
  //       component: patriarch,
  //       meta: ['账号管理', '家长用户']
  //     }, {
  //       path: '/students',
  //       component: students,
  //       meta: ['账号管理', '学生用户']
  //     }, {
  //       path: '/service',
  //       component: service,
  //       meta: ['账号管理', '客户用户']
  //     }, {
  //       path: '/classList',
  //       component: classList,
  //       meta: ['班级管理', '班级列表']
  //     }, {
  //       path: '/resourceList',
  //       component: resourceList,
  //       meta: ['资源管理', '资源列表']
  //     }, {
  //       path: '/resourceDetail',
  //       component: resourceDetail,
  //       meta: ['资源管理', '资源列表', '资源详情']
  //     }, {
  //       path: '/schoolDictionary',
  //       component: schoolDictionary,
  //       meta: ['字典管理', '学校字典']
  //     }, {
  //       path: '/tickling',
  //       component: tickling,
  //       meta: ['反馈信息', '反馈列表']
  //     }, {
  //       path: '/ticklingDetail',
  //       component: ticklingDetail,
  //       meta: ['反馈信息', '反馈列表', '反馈详情']
  //     }, {
  //       path: '/appManage',
  //       component: appManage,
  //       meta: ['app管理', '版本列表']
  //     }
  //   ]
  // }
];

const router = new Router({
  routes,
  strict: process.env.NODE_ENV !== 'production'
});

export default router;
