<script lang="ts">
import { MetaInfo } from 'vue-meta';
import {
  defineComponent,
  computed,
  useContext,
  ref,
  useStatic,
} from '@nuxtjs/composition-api';
import ContentBlock from '~/components/content/ContentBlock.vue';
import axios from '~/plugins/axios';

interface Portfolio {
  title: string;
  description: string;
  content: string;
  entryPic: string;
  code: string;
  link: string;
  role: string;
}

export default defineComponent({
  components: {
    ContentBlock,
  },
  setup() {
    const { route, payload } = useContext();

    const pageSlug = ref(route.value.params.slug);
    const rawPortfolio = useStatic<Portfolio>(
      async () => {
        const data = [
          'fields entryPic,title,description,content,entryPic,duration,code,link,role;',
          `filter slug=${pageSlug.value};`,
          'limit 1;',
          'sort orderID asc;',
        ];

        let localPortfolio = {} as Portfolio;

        try {
          await axios
            .post('/portfolios/get', data.join(''))
            .then((response) => {
              localPortfolio = response.data[0] as Portfolio;
            });
        } catch (error) {
          console.log(error);
        }

        return localPortfolio;
      },
      pageSlug,
      'portfolio',
    );
    const portfolio = computed<Portfolio>((): Portfolio => rawPortfolio.value as Portfolio);

    const imageUrl = computed((): string => (portfolio.value?.entryPic
      ? `https://admin.sebbejohansson.com/images/${portfolio.value?.entryPic}`
      : 'null'));

    return {
      pageSlug,
      portfolio,
      imageUrl,
      payload,
    };
  },
  head(): MetaInfo {
    return {
      title: `${this.portfolio?.title} - SebbeJohansson`,
    };
  },
});
</script>

<template>
  <div>
    <content-block>
      <div v-if="portfolio" class="portfolio">
        <div class="portfolio__content">
          <h3 v-if="portfolio.title" class="portfolio__title">
            {{ portfolio.title }}
          </h3>
          <div class="portfolio__sidebar">
            <img
              v-if="imageUrl"
              class="portfolio__image"
              :src="imageUrl"
              :alt="portfolio.title"
            >
            <div class="portfolio__info-box">
              <div v-if="portfolio.duration" class="portfolio__sidebar-line">
                <span class="portfolio__sidebar-line-title">Duration</span>
                {{ portfolio.duration }}
              </div>
              <div v-if="portfolio.role" class="portfolio__sidebar-line">
                <span class="portfolio__sidebar-line-title">Role</span>
                {{ portfolio.role }}
              </div>
              <div v-if="portfolio.link" class="portfolio__sidebar-line">
                <span class="portfolio__sidebar-line-title">View</span>
                <a
                  :href="portfolio.link"
                  target="_blank"
                  class="portfolio__sidebar-line-link"
                >
                  Click Here
                </a>
              </div>
              <div v-if="portfolio.code" class="portfolio__sidebar-line">
                <span class="portfolio__sidebar-line-title">Code</span>
                <a
                  :href="portfolio.code"
                  target="_blank"
                  class="portfolio__sidebar-line-link"
                >
                  Click Here
                </a>
              </div>
            </div>
          </div>
          <div v-if="portfolio.content" class="portfolio__text" v-html="portfolio.content" />
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
.portfolio__info-box {

}
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
