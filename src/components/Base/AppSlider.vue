<script>
import { Splide, SplideTrack } from '@splidejs/vue-splide';
import '@splidejs/vue-splide/css';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'AppSlider',

  components: {
    Splide,
    SplideTrack,
  },

  props: {
    perPage: {
      type: Number,
      default: 6,
    },

    breakpoints: {
      type: Object,
      default: () => ({
        1128: { perPage: 4 },
        768: { perPage: 3, arrows: false, pagination: true },
        590: { perPage: 2 },
        412: { perPage: 1 },
      }),
    },

    arrows: {
      type: Boolean,
      default: true,
    },

    padding: {
      type: String,
      default: '0px',
    },
  },

  computed: {
    slideOptions() {
      return {
        type: 'loop',
        autoplay: true,
        pagination: false,
        arrows: this.arrows,
        paginationKeyboard: true,
        gap: '10px',
        perPage: this.perPage,
        padding: this.padding,
        breakpoints: this.breakpoints,
      };
    },
  },
});
</script>

<template>
  <div class="slider">
    <div class="slider__header">
      <slot name="subtitle" />
      <slot name="link" />
    </div>
    <div class="slider__body">
      <Splide 
        :options="slideOptions" 
        :has-track="false" 
      >
        <SplideTrack>
          <slot />
        </SplideTrack>
      </Splide>
    </div>
  </div>
</template>

<style>
  .slider {
    margin-top: 30px;
  }
  .slider__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
  }
  .slider__body {
    margin-top: 20px;
  }
  /* .slider__body .splide__pagination {
    bottom: -10px;
  }
  .splide__pagination {
    gap: 10px;
  }
  .slider__body .splide__pagination .splide__pagination__page {
    background-color: var(--color-light-blue);
  }

  .slider__body .splide__pagination .splide__pagination__page.is-active {
    background-color: var(--color-blue);
  } */
  .splide__slide {
    display: flex;
    justify-content: center;
  }
  .splide__arrow {
    background-color: transparent;
    transition: all 0.3s ease-in-out;
    top: 40%;
    opacity: 1;
  }
  .splide__arrow svg {
    fill: var(--color-white);
    height: 32px;
    width: 32px;
  }
  .splide__arrow:disabled {
    opacity: 0;
  }
  .splide__arrow--prev {
    left: -1em;
  }
  .splide__arrow--next {
    right: -1em;
  }
  @media (max-width: 768px) {
      .slider__body {
        margin-top: 20px;
      }
  }
  @media (max-width: 499px) {
    .splide__pagination {
      gap: 2px;
    }
  }
</style>
