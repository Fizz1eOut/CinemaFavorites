import { createRouter, createWebHashHistory} from 'vue-router';
import HomeView from '@/pages/HomeView.vue';
import MoviesView from '@/pages/MoviesView.vue'

export const router = createRouter({
  history: createWebHashHistory('/CinemaFavorites'),
  routes: [
    { path: '/', component: HomeView, name: 'HomeView'},
    { path: '/movies', component: MoviesView, name: 'MoviesView'},
  ],

});
