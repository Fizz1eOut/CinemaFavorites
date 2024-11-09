<script>
import { defineComponent } from 'vue';
import AppTitle from '@/components/Base/AppTitle.vue';
import IconArrow from '@/components/Icons/IconArrow.vue';
import AppButton from '@/components/Base/AppButton.vue';

export default defineComponent({
  name: 'ActorBiographyCard',

  components: {
    AppTitle,
    IconArrow,
    AppButton,
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
  },

  data() {
    return {
      isExpanded: false,
    };
  },

  computed: {
    // Вычисляемое свойство для отображения сокращенного текста
    truncatedBiography() {
      if (this.actor && this.actor.biography) {
      // Ограничиваем длину текста, если он не развернут
      return this.isExpanded ? this.actor.biography : this.actor.biography.slice(0, 1000) + '...';
      }
      return '';
    }
  },

  methods: {
    // Метод для переключения состояния развернутости текста
    toggleExpand() {
      this.isExpanded = !this.isExpanded;
    }
  },
});
</script>

<template>
  <div class="actor-biography">
    <div class="actor-biography__body">
      <app-title class="actor-biography__title">
        {{ actor.name }}
      </app-title>

      <div class="actor-biography__content">
        <p v-if="truncatedBiography" class="actor-biography__text">{{ truncatedBiography }}</p>

        <app-button class="actor-biography__btn" default @click="toggleExpand">
          {{ isExpanded ? 'Read less' : 'Read more' }}
          <icon-arrow :class="{ 'rotated': isExpanded }" class="icon-arrow" />
        </app-button>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .actor-biography__content {
    margin-top: 20px;
  }
  .actor-biography__text {
    font-weight: 400;
    font-size: 17px;
    color: var(--color-white);
  }
  .actor-biography__btn {
    font-weight: 400;
    font-size: 17px;
    gap: 0;
    color: var( --color-light-blue);
  }
  .icon-arrow {
    width: 20px;
    height: 20px;
    fill: var( --color-light-blue);
    transition: transform 0.3s ease-in-out;
  }
  .icon-arrow.rotated {
    transform: rotate(180deg);
  }
  @media (max-width: 768px) {
    .actor-biography__title {
      display: none;
    }
  }
</style>
