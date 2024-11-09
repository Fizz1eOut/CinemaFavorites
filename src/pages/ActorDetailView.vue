<script>
import { defineComponent } from 'vue';
import { getActorDetails } from '@/api/actor/actor';
import ActorDetails from '@/components/Content/ActorDetails.vue';
import { getActorKnownForMovies } from '@/api/actor/actorKnownForMovies';

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
      knownForMovies: []
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
          await this.fetchKnownForMovies();
        } else {
          console.log('Actor not found or mismatch');
        }
      } catch (err) {
        console.log(err, 'Error retrieving actor data')
      }
    },

    async fetchKnownForMovies() {
      try {
        const response = await getActorKnownForMovies(this.id)
        this.knownForMovies = response.cast;
      } catch (error) {
        console.error('A mistake made during a performance by a famous movie actor:', error);
      }
    },
  },
});
</script>

<template>
  <actor-details :id="id" :actor="actorDetails" :movie="knownForMovies" />
</template>

<style>

</style>
