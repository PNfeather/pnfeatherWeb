// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import http from '@/plugins/http';
import store from './store';
import HeaderTop from '@C/headerTop';
import 'element-ui/lib/theme-chalk/index.css';
import ElementUI from 'element-ui';
import VueClipboard from 'vue-clipboard2';

Vue.config.productionTip = false;

Vue.use(http.install);

Vue.use(ElementUI);

Vue.use(VueClipboard);

Vue.component(HeaderTop.name, HeaderTop);

const resizeHandler = () => {
  let html = document.documentElement;
  let clientWidth = html.clientWidth;
  let size = 50 * clientWidth / 1920;
  let result;
  if (size < 30) {
    result = 30;
  } else if (size <= 36) {
    result = size;
  } else {
    result = 36;
  }
  html.style.fontSize = result + 'px';
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
