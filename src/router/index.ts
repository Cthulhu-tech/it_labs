import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import SideElements from '@/views/SideElements.vue';
import { FilterEnum } from './type';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    redirect: {name: 'card', params: {
      filter: FilterEnum.no_filters,
    }},
    children: [{
      path: ':filter',
      name: 'card',
      component: SideElements,
    }],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: 'active-filter',
});

export default router;
