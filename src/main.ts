import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';
import { createVfm } from 'vue-final-modal';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

export const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

const vfm = createVfm();

const app = createApp(App)

app.use(vfm);
app.use(router);
app.use(pinia);
app.mount('#app');
