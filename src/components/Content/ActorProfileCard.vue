<script>
import { defineComponent } from 'vue';
import ActorSocialLinks from '@/components/Content/ActorSocialLinks.vue';
import AppTitle from '@/components/Base/AppTitle.vue';

export default defineComponent({
  name: 'ActorProfileCard',

  components: {
    ActorSocialLinks,
    AppTitle
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
    };
  },

  computed: {
    imageUrl() {
      const baseImageUrl = 'https://image.tmdb.org/t/p/w500';
      return this.actor.profile_path ? `${baseImageUrl}${this.actor.profile_path}` : '';
    },
  }
});
</script>

<template>
  <div class="actor-profile">
    <div class="actor-profile__image">
      <img :src="imageUrl" alt="">
    </div>

    <app-title class="actor-profile__title">
      {{ actor.name }}
    </app-title>

    <actor-social-links :id="id" />


    <div class="actor-profile__group">
      <div class="actor-profile__text">
        Date of birth:
        <div>
          {{ actor.birthday }}
        </div>
      </div>

      <div class="actor-profile__text actor-profile__row">
        Full name:
        <div>{{ actor.name }}</div>
      </div>

      <div class="actor-profile__text">
        Place of birth:
        <div>{{ actor.place_of_birth }}</div>
      </div>

      <div class="actor-profile__text">
        Place of birth:
        <div>{{ actor.place_of_birth }}</div>
      </div>

      <div class="actor-profile__text">
        Occupation:
        <div>{{ actor.known_for_department }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .actor-profile {
    max-width: 289px;
  }
  .actor-profile >*:not(:last-child) {
    margin-bottom: 20px;
  }
  .actor-profile__image {
    width: 289px;
  }
  .actor-profile__image img {
    width: 100%;
    border-radius: 15px;
  }
  .actor-profile__group {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    column-gap: 10px;
    row-gap: 20px;
    flex-wrap: wrap;
  }
  .actor-profile__text {
    font-weight: 600;
    font-size: 20px;
    color: var(--color-white);
    font-family: "Raleway", sans-serif;
  }
  .actor-profile__text div {
    margin-top: 8px;
    font-weight: 400;
    font-size: 17px;
    line-height: 130%;
    color: var(--color-white);
    font-family: "Open Sans", sans-serif;
  }
  .actor-profile__title {
    display: none;
  }
  @media (max-width: 768px) {
    .actor-profile {
      max-width: 100%;
    }
    .actor-profile__image {
      max-width: 300px;
      width: 100%;
    }
    .actor-profile__title {
      display: block;
      text-align: center;
    }
    .actor-profile__text.actor-profile__row {
      display: none;
    }
    .actor-profile {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 100%;
    }
    .actor-profile__text {
      display: flex;
      align-items: flex-end;
      gap: 10px;
      flex: 1 1 50%;
      justify-content: center;
    }
    .actor-info__body {
      gap: 10px;
    }
  }
  @media (max-width: 499px) {
    .actor-profile__title {
      font-size: 32px;
    }
  } 
  @media (max-width: 370px) {
    .actor-profile__text {
      flex: none;
      flex-wrap: wrap;
      width: 100%;
      justify-content: flex-start;
    }
  }
</style>
