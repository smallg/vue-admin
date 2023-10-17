import { createApp } from 'vue';
import App from '@/App.vue';
//@ts-expect-error ignore error
import zhCn from 'element-plus/dist/locale/zh-cn.mjs';
// import zhCn from 'element-plus/dist/locale/en.mjs';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import 'virtual:svg-icons-register';
// import SvgIcon from '@/components/SvgIcon/index.vue';
import globalComponent from '@/components';
import '@/styles/index.scss';
import router from './router';

const app = createApp(App);
app.use(ElementPlus, {
  locale: zhCn,
});
// app.component('SvgIcon', SvgIcon);
app.use(globalComponent);
app.use(router);
// console.log(import.meta.env);
app.mount('#app');
