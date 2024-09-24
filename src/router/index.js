import { createRouter, createWebHashHistory} from 'vue-router';
import HomeView from '@/pages/HomeView.vue';
import MoviesView from '@/pages/MoviesView.vue';
import SeriesView from '@/pages/SeriesView.vue';
import CartoonsView from '@/pages/CartoonsView.vue';

export const router = createRouter({
  history: createWebHashHistory('/CinemaFavorites'),
  routes: [
    { path: '/', component: HomeView, name: 'HomeView'},
    { path: '/movies', component: MoviesView, name: 'MoviesView'},
    { path: '/series', component: SeriesView, name: 'SeriesView'},
    { path: '/cartoons', component: CartoonsView, name: 'CartoonsView'},
  ], 
});
