import { createApp } from 'vue';
import App from '@/App.vue';
//@ts-expect-error ignore error
import zhCn from 'element-plus/dist/locale/zh-cn.mjs';
// import zhCn from 'element-plus/dist/locale/en.mjs';
import ElementPlus from 'element-plus';
import 'virtual:svg-icons-register';

const app = createApp(App);
app.use(ElementPlus, {
  locale: zhCn,
});
// console.log(import.meta.env);
app.mount('#app');
