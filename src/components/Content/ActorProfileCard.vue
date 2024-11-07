<script>
import { defineComponent } from 'vue';
import ActorSocialLinks from '@/components/Content/ActorSocialLinks.vue';

export default defineComponent({
  name: 'ActorProfileCard',

  components: {
    ActorSocialLinks
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

    <actor-social-links :id="id" />

    <div class="actor-profile__title">
      Date of birth:
      <div>
        {{ actor.birthday }}
      </div>
    </div>

    <div class="actor-profile__title">
      Full name:
      <div>{{ actor.name }}</div>
    </div>

    <div class="actor-profile__title">
      Place of birth:
      <div>{{ actor.place_of_birth }}</div>
    </div>

    <div class="actor-profile__title">
      Place of birth:
      <div>{{ actor.place_of_birth }}</div>
    </div>

    <div class="actor-profile__title">
      Occupation:
      <div>{{ actor.known_for_department }}</div>
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
  .actor-profile__title {
    font-weight: 600;
    font-size: 20px;
    color: var(--color-white);
    font-family: "Raleway", sans-serif;
  }
  .actor-profile__title div {
    margin-top: 8px;
    font-weight: 400;
    font-size: 17px;
    line-height: 130%;
    color: var(--color-white);
    font-family: "Open Sans", sans-serif;
  }
</style>
