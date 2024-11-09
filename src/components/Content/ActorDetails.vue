<script>
import { defineComponent } from 'vue';
import ActorProfileCard from '@/components/Content/ActorProfileCard.vue';
import ActorBiographyCard from '@/components/Content/ActorBiographyCard.vue';
import AppContentSlider from '@/components/Base/AppContentSlider.vue';

export default defineComponent({
  name: 'ActorDetails',

  components: {
    ActorProfileCard,
    ActorBiographyCard,
    AppContentSlider
  },

  props: {
    actor: {
      type: Object,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
    movie: {
      type: Object,
      default: null
    },
  },

  data() {
    return {
    };
  },

});
</script>

<template>
  <div class="actor-info">
    <div class="actor-info__body">
      <actor-profile-card :id="id" :actor="actor" />
      <actor-biography-card :id="id" :actor="actor" />
    </div>

    <app-content-slider v-if="movie" :movies="movie">
      <template #subtitle>
        Filmography
      </template>
    </app-content-slider>
  </div>
</template>

<style scoped>
  .actor-info {
    margin-top: 30px;
  }
  .actor-info__body {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 20px;
  }

  @media (max-width: 768px) {
    .actor-info__body {
      flex-wrap: wrap;
      justify-content: center;
    }
    .actor-info {
      margin-top: 20px;
    }
  }
</style>
