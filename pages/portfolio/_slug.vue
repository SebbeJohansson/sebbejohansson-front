<script lang="ts">
import { MetaInfo } from "vue-meta";
import {
  defineComponent,
  computed,
  useContext,
  ref,
  useAsync,
  useStatic,
} from "@nuxtjs/composition-api";
import ContentBlock from "~/components/content/ContentBlock.vue";
import axios from "~/plugins/axios";

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
  setup(props) {
    const { route, payload } = useContext();

    const pageSlug = ref(route.value.params.slug);
    const rawPortfolio = useStatic<Portfolio>(
      async (pageSlug) => {
        const data = [
          "fields entryPic,title,description,content,entryPic,duration,code,link,role;",
          `filter slug=${pageSlug};`,
          "limit 1;",
          "sort orderID asc;",
        ];

        let localPortfolio = {} as Portfolio;

        console.log("usestatic");

        try {
          await axios
            .post("/portfolios/get", data.join(""))
            .then((response) => {
              console.log(response);
              localPortfolio = response.data[0] as Portfolio;
            })
            .catch((error) => {});
        } catch (error) {
          console.log(error);
        }

        return localPortfolio;
      },
      pageSlug,
      "portfolio"
    );
    const portfolio = computed<Portfolio>((): Portfolio => {
      return rawPortfolio.value as Portfolio;
    });

    const imageUrl = computed((): string => {
      return portfolio.value?.entryPic
        ? `https://admin.sebbejohansson.com/images/${portfolio.value?.entryPic}`
        : "null";
    });

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
          <div v-if="portfolio.content" v-html="portfolio.content" />
        </div>
        <div class="portfolio__sidebar">
          <img
            v-if="imageUrl"
            class="portfolio__image"
            :src="imageUrl"
            :alt="portfolio.title"
          />
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
}
.portfolio__content {
  flex-grow: 1;
}
.portfolio__content p {
  margin: 0;
  font-size: 16px;
  line-height: 1.618em;
}

.portfolio__sidebar {
  min-width: 25%;
  max-width: 25%;
  padding: 20px 20px 20px 20px;
  background-color: #ececec;
  border-radius: 5px;
}
.portfolio__image {
  max-width: 100%;
  margin: auto;
  display: block;
  border-radius: 6px;

  margin-bottom: 20px;
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
</style>
