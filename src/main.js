// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import http from '@/plugins/http';
import store from './store/';
import HeaderTop from '@C/headerTop';
import 'element-ui/lib/theme-chalk/index.css';
import ElementUI from 'element-ui';

Vue.config.productionTip = false;

Vue.use(http.install);

Vue.use(ElementUI);

Vue.component(HeaderTop.name, HeaderTop);

const resizeHandler = () => {
  let html = document.documentElement;
  let clientWidth = html.clientWidth;
  html.style.fontSize = 50 * clientWidth / 1920 + 'px';
};

window.addEventListener('resize', resizeHandler);
window.addEventListener('load', resizeHandler);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});
