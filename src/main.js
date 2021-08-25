import { createApp } from 'vue';
import { rtdbPlugin } from 'vuefire';
import './firebaseConfig';
import BaseBadge from './components/ui/BaseBadge.vue';
import BaseButton from './components/ui/BaseButton.vue';
import BaseCard from './components/ui/BaseCard.vue';
import BaseDialog from './components/ui/BaseDialog.vue';
import BaseSpinner from './components/ui/BaseSpinner';

import App from './App.vue';
import router from './router';
import store from './store';

const app = createApp(App);
app.component('base-badge', BaseBadge);
app.component('base-button', BaseButton);
app.component('base-card', BaseCard);
app.component('base-dialog', BaseDialog);
app.component('base-spinner', BaseSpinner);
app.use(store);
app.use(rtdbPlugin);
app.use(router);
app.mount('#app');
