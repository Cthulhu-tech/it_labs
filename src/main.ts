import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';
import { createVfm } from 'vue-final-modal';

export const pinia = createPinia();
const vfm = createVfm();

createApp(App)
.use(vfm)
.use(router)
.use(pinia)
.mount('#app');
