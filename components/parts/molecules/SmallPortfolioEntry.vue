<script setup lang="ts">
import { defineComponent, PropType, computed } from "@nuxtjs/composition-api";

export default defineComponent({
  components: {},
  props: {
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
    },
  },
  setup(props) {
    const entryUrl = computed((): string | undefined => {
      return props.slug ? `portfolio/${props.slug}` : undefined;
    });

    return {
      entryUrl,
    };
  },
  methods: {
    method() {},
  },
});
</script>

<template>
  <div class="small-portfolio-entry">
    <nuxt-link
      v-if="entryUrl"
      :to="entryUrl"
      class="
        small-portfolio-entry__container small-portfolio-entry__container--link
      "
    >
      <span class="small-portfolio-entry__title">
        {{ title }}
      </span>
    </nuxt-link>
    <div v-else class="small-portfolio-entry__container">
      <span class="small-portfolio-entry__title">
        {{ title }}
      </span>
    </div>
  </div>
</template>

<style scoped>
.small-portfolio-entry {
  padding: 0.2em;
}
.small-portfolio-entry__title {
  text-align: center;
  font-family: Roboto, Helvetica, Arial, Verdana, sans-serif;
  font-weight: 400;
  margin: 0 0 5px;
}

.small-portfolio-entry__container--link {
  color: black;
  text-decoration: none;
}
.small-portfolio-entry__container--link:hover,
.small-portfolio-entry__container--link:focus {
  color: #1084ff;
  text-decoration: underline;
}
</style>