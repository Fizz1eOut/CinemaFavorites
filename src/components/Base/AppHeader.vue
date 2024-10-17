<script>
import { defineComponent } from 'vue';
import AppContainer from '@/components/Base/AppContainer.vue';
import AppNav from '@/components/Base/AppNav.vue';
import AppSearch from '@/components/Base/AppSearch.vue';
import AppFavorites from '@/components/Base/AppFavorites.vue'

export default defineComponent({
  name: 'AppHeader',
  
  components: {
    AppContainer,
    AppNav,
    AppSearch,
    AppFavorites
  }

});
</script>

<template>
  <div class="header">
    <app-container size="sm">
      <div class="header__body">
        <div class="header__wrapper">
          <div class="header__img">
            <router-link to="/">
              <img src="../../assets/images/logo.png" alt="Logo">
            </router-link>
          </div>

          <app-nav class="nav" />
        </div>

        <div class="header__item">
          <app-search />

          <div class="header__favorites favorites">
            <router-link to="/favorites">
              <app-favorites />
            </router-link>
          </div>
        </div>
      </div>
    </app-container>
  </div>
</template>

<style scoped>
  .header__body {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
  }
  .header__wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: 400px;
    width: 100%;
  }
  .header__img img {
    max-width: 100%;
    width: 92px;
  }
  .header__item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
  }

  .favorites {
    position: relative;
  }
  .icon-favorites {
    width: 24px;
    height: 24px;
    fill: var(--color-white);
  }
  .favorites__quantity {
    position: absolute;
    right: -10px;
    top: -5px;
    border-radius: 100%;
    color: var(--color-white);
    font-size: 13px;
    height: 18px;
    width: 18px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background-color: var(--color-blue);
  }
  @media (max-width: 768px) {
    .header__body {
      gap: 0;
    }
  }
</style>
