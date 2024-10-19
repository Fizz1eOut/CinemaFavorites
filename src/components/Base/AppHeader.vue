<script>
import { defineComponent } from 'vue';
import AppContainer from '@/components/Base/AppContainer.vue';
import AppNav from '@/components/Base/AppNav.vue';
import AppSearch from '@/components/Base/AppSearch.vue';
import AppFavorites from '@/components/Base/AppFavorites.vue';
import AppNavMobile from '@/components/Base/AppNavMobile.vue';

const mediaQueryList = window.matchMedia('(max-width: 768px)');

export default defineComponent({
  name: 'AppHeader',
  
  components: {
    AppContainer,
    AppNav,
    AppSearch,
    AppFavorites,
    AppNavMobile,
  },

  data() {
    return {
      isMobile: false,
    };
  },

  mounted() {
    // Подписываемся на событие изменения медиазапроса при монтировании компонента
    this.handleMediaChange(mediaQueryList); // Инициализация значения isMobile при монтировании компонента
    mediaQueryList.addEventListener('change', this.handleMediaChange);
  },

  beforeUnmount() {
    // Отписываемся от события изменения медиазапроса при размонтировании компонента
    mediaQueryList.removeEventListener('change', this.handleMediaChange);
  },

  methods: {
    // Обработчик изменения состояния медиазапроса
    handleMediaChange(event) {
      // Обновляем флаг isMobile в соответствии с состоянием медиазапроса
       this.isMobile = event.matches;
    }
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

          <app-nav v-if="!isMobile" class="nav" />
          <app-nav-mobile v-if="isMobile" class="nav-mobile" />
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
  @media (max-width: 768px) {
    .header__body {
      gap: 0;
    }
    .header__wrapper {
      max-width: 100%;
    }
    .header__favorites {
      display: none;
    }
  }
</style>
