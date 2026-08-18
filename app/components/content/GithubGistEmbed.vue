<script setup lang="ts">
  const props = withDefaults(defineProps<{
    gistId: string;
    file?: string;
    fetchKey?: string;
  }>(), {
    file: '',
    fetchKey: '',
  });

  const gistUrl = 'https://gist.github.com/';

  // A failing gist must never take the prerender down with it, so the error is swallowed
  // and rendered as a placeholder instead.
  const { data: gistData, error: gistError } = await useAsyncData(
    `gist-${props.gistId}-${props.file}-${props.fetchKey}`,
    () => {
      const params = props.file.length > 0 ? `?file=${props.file}` : '';
      return $fetch<{ div: string }>(`${gistUrl}${props.gistId}.json${params}`).then(res => res.div);
    },
    { default: () => '' },
  );
</script>

<template>
  <div :id="`gist-${gistId}-${file}-${fetchKey}`">
    <div v-if="gistError">
      <img
        id="notFound"
        height="100%"
        width="100%"
        src="https://user-images.githubusercontent.com/883233/102043641-d4817580-3d89-11eb-885d-2786373932d4.png"
        alt="404"
      >
    </div>
    <!-- eslint-disable-next-line vue/no-v-html -- gist markup comes straight from GitHub -->
    <div v-else class="gist" v-html="gistData" />
  </div>
</template>

<style scoped lang="scss">
@import url("https://github.githubassets.com/assets/gist-embed-4ac6018bcc05457cde2f66d2e7299d11.css");
@import url("https://fonts.googleapis.com/icon?family=Material+Icons");
</style>
