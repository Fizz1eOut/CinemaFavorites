<script>
import { defineComponent } from 'vue';
import AppTitle from '@/components/Base/AppTitle.vue';
import AppRating from '@/components/Base/AppRating.vue';
import IconStar from '@/components/Icons/IconStar.vue';
import AppUnderlay from '@/components/Base/AppUnderlay.vue';

export default defineComponent({
  name: 'MovieInfoHeader',

  components: {
    AppTitle,
    AppRating,
    IconStar,
    AppUnderlay,
  },

  props: {
    movie: {
      type: Object,
      required: true,
    },
  },
});
</script>

<template>
  <div class="header-movie">
    <div class="header-movie__group">
      <app-title>
        {{ movie.title }}
      </app-title>
      <div class="header-movie__release">Release date: {{ movie.release_date }}</div>
    </div>
    <div class="header-movie__content">
      <app-underlay class="header-movie__underlay">
        <icon-star class="icon-star" />
        <app-rating class="header-movie__rating" :rating="movie.vote_average">
          /10
        </app-rating>
      </app-underlay>

      <div class="header-movie__button">
        <slot />
      </div>
    </div>
  </div>
</template>

<style>
  .header-movie {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 10px;
  }
  .header-movie__content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
  }
  .header-movie__underlay {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 11.5px 14px;
  }
  .header-movie__rating {
    font-weight: 400;
    font-size: 17px;
    line-height: 130%;
    color: var(--color-white);
  }
  .header-movie__release {
    margin-top: 4px;
    font-weight: 400;
    font-size: 17px;
    line-height: 130%;
    color: var(--color-white);
  }
  .icon-star {
    width: 24px;
    height: 24px;
    fill: var(--color-yellow);
  }
  @media (max-width: 768px) {
    .header-movie__content {
      flex-direction: column;
      align-items: end;
    }
    .header-movie__underlay {
      order: 1;
    }
  }
  @media (max-width: 599px) {
    .icon-star {
      width: 20px;
      height: 20px;
      fill: var(--color-yellow);
    }
    .header-movie__underlay {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 10px 12px;
    }
    .header-movie__button {
      display: none;
    }
  } 
  @media (max-width: 399px) {
    .header-movie {
      flex-direction: column;
    }
  }
</style>
