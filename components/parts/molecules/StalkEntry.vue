<script lang="ts">
import { defineNuxtComponent } from '#app';

export default defineNuxtComponent({
  components: {},
  props: {
    picture: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const imageUrl = computed((): string => (props.picture ? props.picture : 'null'));

    const entryUrl = computed((): string | undefined => (props.link ? `https://${props.link}` : undefined));

    return {
      entryUrl,
      imageUrl,
    };
  },
  methods: {
    method() { },
  },
});
</script>

<template>
  <div v-if="entryUrl" class="stalk-entry">
    <a :href="entryUrl" target="_blank" class="stalk-entry__container">
      <parts-atoms-image
        class="stalk-entry__image"
        :image="imageUrl"
        :mobile-size="100"
        :tablet-size="100"
        :desktop-size="100"
      />
    </a>
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
