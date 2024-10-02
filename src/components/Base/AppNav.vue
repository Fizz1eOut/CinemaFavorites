<script>
import { defineComponent } from 'vue';
import AppLink from '@/components/Base/AppLink.vue';

export default defineComponent({
  name: 'AppNav',

  components: {
    AppLink
  }
});
</script>

<template>
  <div class="nav">
    <div class="nav__body">
      <div class="nav__item">
        <router-link to="/movies">
          <app-link>
            Movies
          </app-link>
        </router-link>
      </div>

      <div class="nav__item">
        <router-link to="/series">
          <app-link>
            Series
          </app-link>
        </router-link>
      </div>

      <div class="nav__item">
        <router-link to="/cartoons">
          <app-link>
            Cartoons
          </app-link>
        </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .nav__body {
    display: flex;
    align-items: center;
    gap: 30px;
  }

  @media (max-width: 768px) {
    .nav {
      display: none;
    }
  }
</style>
