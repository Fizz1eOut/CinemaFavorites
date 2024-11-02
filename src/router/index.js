import { createRouter, createWebHashHistory} from 'vue-router';
import HomeView from '@/pages/HomeView.vue';
import MoviesView from '@/pages/MoviesView.vue';
import SeriesView from '@/pages/SeriesView.vue';
import CartoonsView from '@/pages/CartoonsView.vue';
import SearchResultView from '@/pages/SearchResultView.vue';
import FavoritesView from '@/pages/FavoritesView.vue';
import MovieDetailView from '@/pages/MovieDetailView.vue';

export const router = createRouter({
  history: createWebHashHistory('/CinemaFavorites'),
  routes: [
    { path: '/', component: HomeView, name: 'HomeView'},
    { path: '/movies', component: MoviesView, name: 'MoviesView'},
    { path: '/series', component: SeriesView, name: 'SeriesView'},
    { path: '/cartoons', component: CartoonsView, name: 'CartoonsView'},
    { path: '/search-result', component: SearchResultView, name: 'SearchResult'},
    { path: '/favorites', component: FavoritesView, name: 'FavoritesView'},
    { path: '/movie/:id/:title', component: MovieDetailView, name: 'MovieDetailView', props: true },
  ],

  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else if (to.path !== from.path) {
      return { top: 0 };
    }
    return {};
  },
});
