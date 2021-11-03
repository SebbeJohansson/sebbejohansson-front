<script setup lang="ts">
import { defineComponent, PropType, computed } from "@nuxtjs/composition-api";

export default defineComponent({
  components: {},
  props: {
    picture: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const imageUrl = computed((): string => {
      return props.picture
        ? `https://admin.sebbejohansson.com/images/${props.picture}`
        : "null";
    });

    const entryUrl = computed((): string | undefined => {
      return props.slug ? `portfolio/${props.slug}` : undefined;
    });

    return {
      entryUrl,
      imageUrl,
    };
  },
  methods: {
    method() {},
  },
});
</script>

<template>
  <div class="stalk-entry">
    <nuxt-link v-if="entryUrl" :to="entryUrl" class="stalk-entry__container">
      <img :src="imageUrl" class="stalk-entry__image" />
    </nuxt-link>
  </div>
</template>

<style scoped>
.stalk-entry {
  width: 5em;
  margin: 0.8em;
}
.stalk-entry__container {
  width: 100%;
  height: 100%;
  display: block;
}
.stalk-entry__image {
  border-radius: 100%;
  width: 100%;
  height: auto;
}
</style>