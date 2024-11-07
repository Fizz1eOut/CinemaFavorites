<script>
import { defineComponent } from 'vue';
import { getActorDetails } from '@/api/actor/actor';
import ActorDetails from '@/components/Content/ActorDetails.vue';

export default defineComponent({
  name: 'ActorDetailView',

  components: {
    ActorDetails,
  },

  props: {
    title: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      actorDetails: [],
    };
  },

  async created() {
    await this.fetchActorDetails();
  },

  methods: {
    async fetchActorDetails() {
      try {
        // Выполняем запрос для получения данных актера по его id
        const response = await getActorDetails(this.id);

        // Проверяем, что id и title совпадают с данными от API
        if (
          response.id.toString() === this.id &&
          response.name.trim().toLowerCase() === this.title.trim().toLowerCase()
        ) {
          this.actorDetails = response;  // Сохраняем данные актера
          console.log(this.actorDetails)
        } else {
          console.log('Actor not found or mismatch');
        }
      } catch (err) {
        console.log(err, 'Error retrieving actor data')
      }
    },
  },
});
</script>

<template>
  <actor-details :id="id" :actor="actorDetails" />
</template>

<style>

</style>
