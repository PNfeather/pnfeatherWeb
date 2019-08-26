import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const login = r => require.ensure([], () => r(require('@P/login/login')), 'login');
const home = r => require.ensure([], () => r(require('@P/home/home')), 'home');
const homeContent = r => require.ensure([], () => r(require('@P/homeContent/homeContent')), 'homeContent');
const experience = r => require.ensure([], () => r(require('@P/experience/experience')), 'experience');
const collect = r => require.ensure([], () => r(require('@P/collect/collect')), 'collect');

const routes = [
  {
    path: '*',
    redirect: '/'
  },
  {
    path: '/',
    component: login
  }, {
    path: '/home',
    component: home,
    children: [
      {
        path: '',
        component: homeContent
      }, {
        path: '/experience',
        component: experience
      }, {
        path: '/collect',
        component: collect
      }
    ]
  }
];

const router = new Router({
  routes,
  strict: process.env.NODE_ENV !== 'production'
});

export default router;
