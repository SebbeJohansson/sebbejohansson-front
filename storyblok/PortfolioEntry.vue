<script setup lang="ts">
const props = defineProps({ blok: Object, raw: Object });

const imageUrl = computed((): string => (props.blok.cover?.filename ? props.blok.cover?.filename : 'null'));
const title = computed((): string => props.blok.title || props.raw.name);
const duration = computed((): string | null => props.blok.duration);
const role = computed((): string | null => props.blok.role);
const link = computed((): string => props.blok.link?.url || props.blok.link?.cached_url || null);
const code = computed((): string | null => props.blok.code?.url || props.blok.code?.cached_url || null);
const content = computed((): [] | string => (props.blok.content && Array.isArray(props.blok.content) && props.blok.content.length > 0 ? props.blok.content : props.blok.description));

useJsonld(() => ({
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: title.value,
  image: {
    '@type': 'ImageObject',
    url: imageUrl.value,
    caption: title.value,
  },
  articleBody: content.value,
}));
</script>

<template>
  <div v-editable="blok">
    <content-block>
      <div v-if="blok" class="portfolio">
        <div class="portfolio__content-wrapper">
          <h3 v-if="title" class="portfolio__title">
            {{ title }}
          </h3>
          <div class="portfolio__sidebar">
            <parts-atoms-image
              class="portfolio__image"
              :image="imageUrl"
              :alt="title"
              :mobile-size="300"
              :tablet-size="157"
              :desktop-size="270"
              loading="eager"
            />
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
                <NuxtLink :href="link" target="_blank" class="portfolio__sidebar-line-link">
                  Click here to look at {{ title }}
                </NuxtLink>
              </div>
              <div v-if="code" class="portfolio__sidebar-line">
                <span class="portfolio__sidebar-line-title">Code</span>
                <NuxtLink :href="code" target="_blank" class="portfolio__sidebar-line-link">
                  Click here for the code to {{ title }}
                </NuxtLink>
              </div>
            </div>
          </div>
          <div class="portfolio__content">
            <component
              :is="$resolveStoryBlokComponent(block)"
              v-for="block in blok.content"
              v-if="blok.content && Array.isArray(blok.content) && blok.content.length > 0"
              :key="block._uid"
              :blok="block"
            />
            <div v-else v-html="content" />
          </div>
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

.portfolio__content-wrapper {
  flex-grow: 1;
  display: grid;
  grid-template-rows: auto;
  grid-template-columns: repeat(4, 1fr);
}

.portfolio__content-wrapper p {
  margin: 0 0 10px 0;
  font-size: 16px;
  line-height: 1.618em;
}

.portfolio__content {
  grid-column: 1 / 4;
  grid-row: 2/5;
  margin-right: 30px;
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

  .portfolio__content {
    grid-column: 1/5;
    grid-row: 3;
    margin-right: 0;
  }

  .portfolio__sidebar {
    grid-column: 1/5;
    grid-row: 2;
    margin-bottom: 10px;
  }

  .portfolio__info-box {
    margin-top: -10px;
    margin-left: 10px;
  }
}
</style>
