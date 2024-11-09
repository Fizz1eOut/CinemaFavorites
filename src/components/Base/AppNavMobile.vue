<script>
import { defineComponent } from 'vue';
import AppLink from '@/components/Base/AppLink.vue';
import IconHome from '@/components/Icons/IconHome.vue';
import IconMovie from '@/components/Icons/IconMovie.vue';
import IconSeries from '@/components/Icons/IconSeries.vue';
import IconCartoons from '@/components/Icons/IconCartoons.vue';
import AppFavorites from '@/components/Base/AppFavorites.vue';
import AppUnderlay from '@/components/Base/AppUnderlay.vue';

export default defineComponent({
  name: 'AppNavMobile',

  components: {
    AppLink,
    IconHome,
    IconMovie,
    IconSeries,
    IconCartoons,
    AppUnderlay,
    AppFavorites
  }
});
</script>

<template>
  <div class="nav-mobile">
    <app-underlay class="nav-mobile__underlay">
      <div class="nav-mobile__wrapper">
        <div class="nav-mobile__body">
          <div class="nav-mobile__item">
            <router-link to="/">
              <app-link class="nav-mobile__link">
                <icon-home class="icon-home" />
                Home
              </app-link>
            </router-link>
          </div>

          <div class="nav-mobile__item">
            <router-link to="/movies">
              <app-link class="nav-mobile__link">
                <icon-movie class="icon-movie" />
                Movies
              </app-link>
            </router-link>
          </div>

          <div class="nav-mobile__item">
            <router-link to="/series">
              <app-link class="nav-mobile__link">
                <icon-series class="icon-series" />
                Series
              </app-link>
            </router-link>
          </div>

          <div class="nav-mobile__item">
            <router-link to="/cartoons">
              <app-link class="nav-mobile__link">
                <icon-cartoons class="icon-cartoons" />
                Cartoons
              </app-link>
            </router-link>
          </div>

          <div class="nav-mobile__item">
            <router-link to="/favorites">
              <app-link class="nav-mobile__link">
                <app-favorites />
                Favorites
              </app-link>
            </router-link>
          </div>
        </div>
      </div>
    </app-underlay>
  </div>
</template>

<style scoped>
  .nav-mobile__underlay {
    border-radius: 0;
  }
  .nav-mobile {
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 10;
  }
  .nav-mobile__wrapper {
    display: flex;
    justify-content: center;
  }
  .nav-mobile__body {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    max-width: 400px;
    width: 100%;
    text-align: center;
    padding: 7px;
  }
  .nav-mobile__link {
    font-size: 13px;
    font-weight: 400;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .icon-home,
  .icon-movie,
  .icon-series,
  .icon-cartoons,
  .icon-favorites {
    width: 20px;
    height: 20px;
    fill: var(--color-white);
  }
  .router-link-active .nav-mobile__link {
    color: var(--color-yellow-disabled);
  }
  .router-link-active svg {
    fill: var(--color-yellow-disabled);
  }
</style>
