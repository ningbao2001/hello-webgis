import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import VueRouter from "vue-router";
import router from "./router/router";
//引入store
import store from './store/store'
//关闭Vue的生产提示
Vue.config.productionTip = false
//应用插件
Vue.use(ElementUI);
Vue.use(VueRouter)
store.dispatch('MapView/setDefaultMapView').then(() => {
  new Vue({
    el: '#app',
    render: h => h(App),
    router,
    store,
  });
})
