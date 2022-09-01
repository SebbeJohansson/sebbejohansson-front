<script setup lang="ts">
const props = defineProps({
  gistId: {
    type: String,
    required: true,
  },
  file: {
    type: String,
    required: false,
    default: '',
  },
});

const gistUrl: string = 'https://gist.github.com/';
const gistErr: boolean = false;

const { data: gistData = 'Loading...' } = await useAsyncData(
  `gist-${props.gistId}-${props.file}`,
  // eslint-disable-next-line require-await
  async () => {
    const params = props.file.length > 0 ? `?file=${props.file}` : '';
    return $fetch(`${gistUrl}${props.gistId}.json${params}`).then(res => res.div);
  },
);
</script>

<template>
  <div>
    <div v-if="gistErr">
      <img
        id="notFound"
        height="100%"
        width="100%"
        src="https://user-images.githubusercontent.com/883233/102043641-d4817580-3d89-11eb-885d-2786373932d4.png"
        alt="404"
      >
    </div>
    <div v-else v-html="gistData" />
  </div>
</template>

<style scoped>
@import url("https://github.githubassets.com/assets/gist-embed-4ac6018bcc05457cde2f66d2e7299d11.css");
@import url("https://fonts.googleapis.com/icon?family=Material+Icons");
</style>
