import Vue from 'vue'
import App from './App'

// vuex
import store from './store'

// 引入全局uView
import uView from '@/uni_modules/uview-ui'

import mixin from './common/mixin'
import qs from 'qs'

// import * as echarts from 'echarts/core';
// // 引入柱状图图表，图表后缀都为 Chart
// import { BarChart } from 'echarts/charts';
// // 引入提示框，标题，直角坐标系，数据集，内置数据转换器组件，组件后缀都为 Component
// import {
//   TitleComponent,
//   TooltipComponent,
//   GridComponent,
//   DatasetComponent,
//   TransformComponent
// } from 'echarts/components';
// // 标签自动布局，全局过渡动画等特性
// import { LabelLayout, UniversalTransition } from 'echarts/features';
// // 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
// import { CanvasRenderer } from 'echarts/renderers';

// // 注册必须的组件
// echarts.use([
//   TitleComponent,
//   TooltipComponent,
//   GridComponent,
//   DatasetComponent,
//   TransformComponent,
//   BarChart,
//   LabelLayout,
//   UniversalTransition,
//   CanvasRenderer
// ]);

Vue.prototype.$store = store
Vue.prototype.$qs=qs
Vue.config.productionTip = false

App.mpType = 'app'
Vue.use(uView)

// #ifdef MP
// 引入uView对小程序分享的mixin封装
const mpShare = require('@/uni_modules/uview-ui/libs/mixin/mpShare.js')
Vue.mixin(mpShare)
// #endif

Vue.mixin(mixin)

const app = new Vue({
    store,
    ...App
})

// 引入请求封装
require('./util/request/index')(app)

app.$mount()
