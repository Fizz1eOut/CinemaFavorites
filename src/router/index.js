import { createRouter, createWebHashHistory} from 'vue-router';
import HomeView from '@/pages/HomeView.vue';

export const router = createRouter({
  history: createWebHashHistory('/CinemaFavorites'),
  routes: [
    { path: '/', component: HomeView, name: 'HomeView'},
  ],

});
