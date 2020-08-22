import Vue from 'vue'
import App from './App'

import BaiduMap from 'vue-baidu-map'

// import router from './router'
// import { RouterMount } from 'uni-simple-router';

App.mpType = 'app'
Vue.config.productionTip = false;
const app = new Vue({
  ...App
});

// //Vue.use(Router);
Vue.use(BaiduMap, {
  // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key /
  ak: 'gCuNjb9QKbzQvpKsNGafij4GbI1fmkfL',
});

// //v1.3.5起 H5端 你应该去除原有的app.$mount();使用路由自带的渲染方式
// // #ifdef H5
// RouterMount(app,'#app');
// // #endif

// // #ifndef H5
// 	app.$mount(); //为了兼容小程序及app端必须这样写才有效果
// // #endif

app.$mount()
