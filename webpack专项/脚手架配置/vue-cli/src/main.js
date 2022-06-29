import { createApp } from 'vue';
import APP from './APP';
import router from './route';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
createApp(APP).use(router).use(ElementPlus).mount(document.getElementById("app"));