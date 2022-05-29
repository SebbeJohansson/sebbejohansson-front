<script setup lang="ts">
const route = useRoute()
const props = defineProps({ blok: Object, rawBlog: Object });
const nuxtApp = useNuxtApp();

const imageUrl = computed((): string => (props.blok.cover?.filename
  ? nuxtApp.$toMediaUrl(props.blok.cover?.filename, {})
  : 'null'));
const title = computed((): string => props.blok.title || props.rawBlog.name);
const duration = computed((): string | null => null);
const role = computed((): string | null => null);
const link = computed((): string => props.blok.link?.url || props.blok.link?.url || null);
const code = computed((): string | null => null);
const content = computed((): string => props.blok.description);
</script>

<template>
  <div v-editable="blok">
    {{ blok }}
    <content-block>
      <div v-if="blok" class="portfolio">
        <div class="portfolio__content">
          <h3 v-if="title" class="portfolio__title">
            {{ title }}
          </h3>
          <div class="portfolio__sidebar">
            <img v-if="imageUrl" class="portfolio__image" :src="imageUrl" :alt="title">
            <div class="portfolio__info-box">
              <div v-if="duration" class="portfolio__sidebar-line">
                <span class="portfolio__sidebar-line-title">Duration</span>
                {{ duration }}
              </div>
              <div v-if="role" class="portfolio__sidebar-line">
                <span class="portfolio__sidebar-line-title">Role</span>
                {{ role }}
              </div>
              <div v-if="link" class="portfolio__sidebar-line">
                <span class="portfolio__sidebar-line-title">View</span>
                <a :href="link" target="_blank" class="portfolio__sidebar-line-link">
                  Click Here
                </a>
              </div>
              <div v-if="code" class="portfolio__sidebar-line">
                <span class="portfolio__sidebar-line-title">Code</span>
                <a :href="code" target="_blank" class="portfolio__sidebar-line-link">
                  Click Here
                </a>
              </div>
            </div>
          </div>
          <div v-if="content" class="portfolio__text" v-html="content" />
        </div>
      </div>
    </content-block>
  </div>
</template>

<style>
.portfolio {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  gap: 20px;
  width: 100%;
}

.portfolio__title {
  font-family: Roboto, Helvetica, Arial, Verdana, sans-serif;
  font-size: 2em;
  font-weight: 400;
  margin: 0 0 10px;
  grid-column: 1 / 4;
  grid-row: 1;
}

.portfolio__content {
  flex-grow: 1;
  display: grid;
  grid-template-rows: auto;
  grid-template-columns: repeat(4, 1fr);
}

.portfolio__content p {
  margin: 0;
  font-size: 16px;
  line-height: 1.618em;
}

.portfolio__text {
  grid-column: 1 / 4;
  grid-row: 2/5;
}

.portfolio__sidebar {
  padding: 20px;
  background-color: #ececec;
  border-radius: 5px;
  grid-column: 4 / 5;
  grid-row: 1 / 8;
}

.portfolio__image {
  max-width: 100%;
  margin: auto;
  display: block;
  border-radius: 6px;

  margin-bottom: 20px;
}

.portfolio__info-box {}

.portfolio__sidebar-line {
  margin-top: 10px;
}

.portfolio__sidebar-line-title {
  font-weight: bold;
  margin-right: 10px;
}

.portfolio__sidebar-line-link {
  color: black;
  text-decoration: none;
}

.portfolio__sidebar-line-link:hover,
.portfolio__sidebar-line-link:focus {
  color: #1084ff;
  text-decoration: underline;
}

@media (--phone) {
  .portfolio__title {
    grid-column: 1/5;
  }

  .portfolio__text {
    grid-column: 1/5;
    grid-row: 3;
  }

  .portfolio__sidebar {
    grid-column: 1/5;
    grid-row: 2;
    display: flex;
    margin-bottom: 10px;
  }

  .portfolio__image {
    max-width: 31%;
  }

  .portfolio__info-box {
    margin-top: -10px;
    margin-left: 10px;
  }
}
</style>
