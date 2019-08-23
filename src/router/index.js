import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const login = r => require.ensure([], () => r(require('@P/login/login')), 'login');
const home = r => require.ensure([], () => r(require('@P/home/home')), 'home');

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
    component: home
  }
];

const router = new Router({
  routes,
  strict: process.env.NODE_ENV !== 'production'
});

export default router;
