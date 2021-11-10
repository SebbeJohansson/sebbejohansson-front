<script setup lang="ts">
import {
  defineComponent,
  onMounted,
  reactive,
  ref,
  computed,
  useFetch,
  useStatic,
} from "@nuxtjs/composition-api";
import axios from "~/plugins/axios";
import blog from "~/plugins/blog";
import ContentWithTitle from "~/components/content/ContentWithTitle.vue";
import BlogEntry from "~/components/parts/molecules/BlogEntry.vue";

interface BlogEntry {
  id: string;
  title: string;
  slug: string;
  content: string;
  author: string;
  date: string;
  cat: string;
}

interface BlogCategory {
  name: string;
  about: string;
}

interface Dictionary<T> {
  [Key: string]: T;
}

interface BlogEntries {
  entries: BlogEntry[];
}

export default defineComponent({
  components: {
    ContentWithTitle,
    BlogEntry,
  },
  setup() {
    const id = ref();
    const rawBlogEntries = useStatic<BlogEntries>(
      async (id) => {
        const blogEntriesLocal: BlogEntries = {
          entries: [],
        };
        // console.log("fetch");
        const data = [
          "fields id,title,slug,content,author,date,cat;",
          "filter status=1;",
          "sort date desc;",
        ];

        try {
          await axios
            .post("/blogs/get", data.join(""))
            .then((response) => {
              const entries = response.data as BlogEntry[];
              entries.forEach((entry) => {
                blogEntriesLocal.entries.push(entry);
              });
            })
            .catch((error) => {
              // console.log(error.response);
            });
        } catch (error) {
          // console.log(error);
        }
        return blogEntriesLocal;
      },
      id,
      "blogentries"
    );
    const blogEntries = computed<BlogEntry[]>((): BlogEntry[] => {
      // console.log(rawBlogEntries.value);
      return rawBlogEntries.value?.entries as BlogEntry[];
    });

    /*const { fetch, fetchState } = useFetch(async () => {
      // console.log("fetch");
      const data = [
        "fields id,title,slug,content,author,date,cat;",
        "filter status=1;",
        "sort date desc;",
      ];

      try {
        await axios
          .post("/blogs/get", data.join(""))
          .then((response) => {
            const entries = response.data as BlogEntry[];
            entries.forEach((entry) => {
              blogEntries.push(entry);
            });
          })
          .catch((error) => {
            // console.log(error.response);
          });
      } catch (error) {
        // console.log(error);
      }
    });

    fetch();*/

    const fetchEntries = async () => {
      /*const data = [
        "fields id,title,slug,content,author,date,cat;",
        "filter status=1;",
        "sort date desc;",
      ];

      try {
        await axios
          .post("/blogs/get", data.join(""))
          .then((response) => {
            const entries = response.data as BlogEntry[];
            entries.forEach((entry) => {
              blogEntries.push(entry);
            });
          })
          .catch((error) => {
            // console.log(error.response);
          });
      } catch (error) {
        // console.log(error);
      }*/
    };
    onMounted(fetchEntries);

    let blogCategories = reactive<BlogCategory[]>(<BlogCategory[]>[]);
    const fetchCategories = async () => {
      const data = ["fields name,about;"];

      try {
        await axios
          .post("/blogcats/get", data.join(""))
          .then((response) => {
            const entries = response.data as BlogCategory[];
            entries.forEach((entry) => {
              blogCategories.push(entry);
            });
          })
          .catch((error) => {
            // console.log(error.response);
          });
      } catch (error) {
        // console.log(error);
      }
    };
    onMounted(fetchCategories);

    let unselectedCategories = ref(<string[]>[]);
    /*|const unselectedCategories = computed((): string[] => {
      const query: string[] = [];
      if ("categories" in route.value.query) {
        const categories = (route.value.query.categories as string).split(",");
        query.push(...categories);
      }
      return query;
    });*/

    const unselectedCategoriesStyling = computed((): string => {
      let style = "";
      // console.log(unselectedCategories);
      unselectedCategories.value.forEach((category, index) => {
        style += `.blog-post-list__entry.blog-post-list__entry--${category} { display: none; }`;
      });
      return style;
    });

    function isCategoryChecked(category: string): boolean {
      return unselectedCategories.value.indexOf(category) >= 0;
    }

    function toggleCategory(category: string) {
      if (isCategoryChecked(category)) {
        const index = unselectedCategories.value.indexOf(category);
        if (index > -1) {
          unselectedCategories.value.splice(index, 1);
        }
      } else {
        unselectedCategories.value.push(category);
      }

      unselectedCategories.value = unselectedCategories.value.filter(
        (item, index) => {
          return unselectedCategories.value.indexOf(item) == index;
        }
      );
    }

    return {
      blogEntries,
      blogCategories,
      unselectedCategories,
      unselectedCategoriesStyling,
      fetchEntries,
      fetchCategories,
      isCategoryChecked,
      toggleCategory,
    };
  },
});
</script>

<template>
  <div class="blog-post-list">
    <content-with-title :title="'Blog'">
      <div class="blog-post-list__content">
        <div class="blog-post-list__list">
          <blog-entry
            class="blog-post-list__entry"
            v-for="entry in blogEntries"
            :class="`blog-post-list__entry--` + entry.cat"
            :key="entry.id"
            :title="entry.title"
            :content="entry.content || null"
            :slug="entry.slug"
            :date="entry.date"
          />
        </div>
        <div class="blog-post-list__categories">
          <h2 class="blog-post-list__categories-title">Categories</h2>
          <div
            class="blog-post-list__category-line"
            v-for="entry in blogCategories"
            :key="entry.id"
            @click="toggleCategory(entry.name)"
          >
            <input
              class="blog-post-list__category-line-box"
              type="checkbox"
              :checked="isCategoryChecked(entry.name)"
            />
            <span class="blog-post-list__category-line-text">
              {{ entry.about }}
            </span>
          </div>
        </div>
      </div>
    </content-with-title>
    <component
      :is="'style'"
      type="text/css"
      v-if="unselectedCategoriesStyling != ''"
    >
      {{ unselectedCategoriesStyling }}
    </component>
  </div>
</template>

<style scoped>
.blog-post-list__content {
  display: flex;
  flex-direction: row;
}
.blog-post-list__list {
  margin-right: 0.5rem;
}
.blog-post-list__entry {
  padding: 0.5em 0;
  display: block;
}
.blog-post-list__categories {
  margin: 0.5rem 0 0 0.5rem;
  padding: 10px;
  background: #fff;
  border: 1px solid #ddd;
  box-shadow: 0 0 5px #ddd;
  text-decoration: none;
  color: black;
}
.blog-post-list__categories-title {
  margin: 1rem 0;
  font-family: raleway, Helvetica, Arial, Verdana, sans-serif;
  font-weight: 200;
  text-align: center;
}

.blog-post-list__category-line {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  cursor: pointer;
}
.blog-post-list__category-line-box {
  margin-right: 0.5rem;
}
.blog-post-list__category-line-text {
  overflow-wrap: unset;
  white-space: nowrap;
}
</style>