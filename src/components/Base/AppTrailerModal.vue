<script>
import { defineComponent } from 'vue';
import IconPlay from '@/components/Icons/IconPlay.vue';
import AppButton from '@/components/Base/AppButton.vue';
import { fetchMovieTrailer } from '@/api/trailer/trailer';
import AppModal from '@/components/Base/AppModal.vue';
import TrailerMovie from '@/components/Content/TrailerMovie.vue';

export default defineComponent({
  name: 'AppTrailerModal',

  components: {
    IconPlay,
    AppButton,
    AppModal,
    TrailerMovie,
  },

  props: {
    movie: {
      type: Object,
      required: true,
    },
    displayMode: {
      type: String,
      default: 'modal', // По умолчанию трейлер будет открываться в модальном окне
    },
  },

  data() {
    return {
      trailerUrl: null, // Ссылка на трейлер
      showModal: false, // Состояние для отображения модалки
    };
  },

  async created() {
    try {
      const url = await fetchMovieTrailer(this.movie.id);
      if (url) {
        this.trailerUrl = url; // Сохраняем URL трейлера, если найден
      }
    } catch (error) {
      console.log('Trailer not found or another error occurred.', this.movie.title);
    }
  },

  methods: {
    openModal() {
      if (this.trailerUrl) {
        this.showModal = true; // Открываем модалку
      }
    },

    closeModal() {
      this.showModal = false; // Закрываем модалку и сбрасываем состояние
    },
  },
});
</script>

<template>
  <!-- Условный рендеринг на основе displayMode -->
  <div v-if="displayMode === 'inline'">
    <!-- При displayMode="inline" показываем трейлер сразу -->
    <trailer-movie v-if="trailerUrl" :trailer-url="trailerUrl" class="trailer-movie" />
  </div>

  <div v-else>
    <!-- При displayMode="modal" показываем кнопку для открытия модального окна -->
    <app-button
      yellow
      :disabled="!trailerUrl"
      :class="{ 'disabled-button': !trailerUrl }"
      @click="openModal"
    >
      {{ trailerUrl ? 'Watch Trailer' : 'Trailer Not Found' }}
      <icon-play v-if="trailerUrl" class="icon-play" />
    </app-button>

    <!-- Модальное окно -->
    <app-modal :model-value="showModal" @update:model-value="closeModal">
      <trailer-movie v-if="trailerUrl" :trailer-url="trailerUrl" class="trailer-movie" />
    </app-modal>
  </div>
</template>

<style scoped>
  .icon-play {
    width: 20px;
    height: 20px;
    fill: var(--color-black);
  }
  .disabled-button {
    background: rgba(247, 178, 0, 0.5);
    color: rgba(3, 12, 23, 0.4);
    cursor: not-allowed;
  }
  .trailer-movie {
    width: 100%;
  }
</style>
