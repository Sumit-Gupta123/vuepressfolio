import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Preview from '../views/Preview.vue';

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/preview', name: 'Preview', component: Preview }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
