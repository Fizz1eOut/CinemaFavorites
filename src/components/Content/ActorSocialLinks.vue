<script>
import { defineComponent } from 'vue';
import { getActorSocialLinks } from '@/api/actor/actorSocialLinks';
import IconFacebook from '@/components/Icons/IconFacebook.vue';
import IconInstagram from '@/components/Icons/IconInstagram.vue';
import IconTwitter from '@/components/Icons/IconTwitter.vue';
import IconYoutube from '@/components/Icons/IconYoutube.vue';
import IconTiktok from '@/components/Icons/IconTiktok.vue';

export default defineComponent({
  name: 'ActorSocialLinks',

  components: {
    IconFacebook,
    IconInstagram,
    IconTwitter,
    IconYoutube,
    IconTiktok,
  },

  props: {
    id: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      socialLinks: null,
    };
  },

  async created() {
    await this.fetchSocialLinks();
  },

  methods: {
    async fetchSocialLinks() {
      try {
        const response = await getActorSocialLinks(this.id);
        this.socialLinks = response;
        console.log(this.socialLinks)
      } catch (err) {
        console.log(err, 'Failed to load social links') 
      }
    },
  },
});
</script>

<template>
  <div v-if="socialLinks" class="social-links">
    <a
      v-if="socialLinks.facebook_id"
      :href="`https://facebook.com/${socialLinks.facebook_id}`"
      target="_blank"
      aria-label="Facebook"
    >
      <IconFacebook class="icon" />
    </a>
    <a
      v-if="socialLinks.instagram_id"
      :href="`https://instagram.com/${socialLinks.instagram_id}`"
      target="_blank"
      aria-label="Instagram"
    >
      <IconInstagram class="icon" />
    </a>
    <a
      v-if="socialLinks.twitter_id"
      :href="`https://twitter.com/${socialLinks.twitter_id}`"
      target="_blank"
      aria-label="Twitter"
    >
      <IconTwitter class="icon" />
    </a>
    <a
      v-if="socialLinks.youtube_id"
      :href="`https://www.youtube.com/@${socialLinks.youtube_id}`"
      target="_blank"
      aria-label="YouTube"
    >
      <IconYoutube class="icon" />
    </a>
    <a
      v-if="socialLinks.tiktok_id"
      :href="`https://www.tiktok.com/@${socialLinks.tiktok_id}`"
      target="_blank"
      aria-label="TikTok"
    >
      <IconTiktok class="icon" />
    </a>
  </div>
</template>

<style scoped>
.social-links {
  display: flex;
  align-items: flex-start;
  gap: 20px;
}
.icon {
  width: 38px;
  height: 38px;
}
</style>
