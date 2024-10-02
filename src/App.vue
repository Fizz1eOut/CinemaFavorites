<script>
import { defineComponent } from 'vue';
import AppHeader from '@/components/Base/AppHeader.vue';
import AppContainer from '@/components/Base/AppContainer.vue';

export default defineComponent({
  name: 'AppVue',

  components: {
    AppContainer,
    AppHeader
  }
});
</script>

<template>
  <app-header />

  <main>
    <app-container size="sm">
      <router-view />
    </app-container>
  </main>
</template>

<style>

</style>
