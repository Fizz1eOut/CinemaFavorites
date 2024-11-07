<script>
import { defineComponent } from 'vue';
import ActorProfileCard from '@/components/Content/ActorProfileCard.vue';

export default defineComponent({
  name: 'ActorDetails',

  components: {
    ActorProfileCard,
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

});
</script>

<template>
  <div class="actor-info">
    <div class="actor-info__body">
      <actor-profile-card :id="id" :actor="actor" />
    </div>
  </div>
</template>

<style scoped>

</style>
