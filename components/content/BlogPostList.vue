<script lang="ts">
import { defineNuxtComponent } from "#app";


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

interface BlogCategories {
  entries: BlogCategory[];
}

interface BlogEntries {
  entries: BlogEntry[];
}

export default defineNuxtComponent({
  setup() {
    const pageId = ref('default');
    const rawBlogEntries = useState<BlogEntries>(
      'rawBlogEntries',
      () => {
        const blogEntriesLocal: BlogEntries = {
          entries: [],
        };
        const data = [
          'fields id,title,slug,content,author,date,cat;',
          'filter status=1;',
          'sort date desc;',
        ];

        try {
          /*await axios
            .post('/blogs/get', data.join(''))
            .then((response) => {
              const entries = response.data as BlogEntry[];
              entries.forEach((entry) => {
                blogEntriesLocal.entries.push(entry);
              });
            })
            .catch((error) => {
              console.log(error.response);
            });
        } catch (error) {
          console.log(error);
        }*/
          return blogEntriesLocal;
        }
    );
    const blogEntries = computed<BlogEntry[]>((): BlogEntry[] => rawBlogEntries.value?.entries as BlogEntry[]);

    const unselectedCategories = ref(<string[]>[]);

    const rawBlogCategories = useState<BlogCategories>(
      'rawBlogCategories',
      () => {
        const blogCategoriesLocal: BlogCategories = {
          entries: [],
        };
        const data = ['fields name,about;'];

        /*try {
          await axios
            .post('/blogcats/get', data.join(''))
            .then((response) => {
              const entries = response.data as BlogCategory[];
              entries.forEach((entry) => {
                blogCategoriesLocal.entries.push(entry);
              });
            })
            .catch((error) => {
              console.log(error.response);
            });
        } catch (error) {
          console.log(error);
        }*/
        return blogCategoriesLocal;
      },
    );

    const blogCategories = computed<BlogCategory[]>((): BlogCategory[] => rawBlogCategories.value?.entries as BlogCategory[]);

    const unselectedCategoriesStyling = computed((): string => {
      let style = '';
      unselectedCategories.value.forEach((category) => {
        style += `.blog-post-list__entry.blog-post-list__entry--${category} { display: none; }`;
      });
      return style;
    });

    function isCategoryChecked(category: string): boolean {
      return !(unselectedCategories.value.includes(category));
    }

    function toggleCategory(category: string) {
      if (isCategoryChecked(category)) {
        unselectedCategories.value.push(category);
      } else {
        const index = unselectedCategories.value.indexOf(category);
        if (index > -1) {
          unselectedCategories.value.splice(index, 1);
        }
      }

      unselectedCategories.value = unselectedCategories.value.filter(
        (item, index) => unselectedCategories.value.indexOf(item) === index,
      );
    }

    return {
      blogEntries,
      blogCategories,
      unselectedCategories,
      unselectedCategoriesStyling,
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
          <blog-entry-component v-for="entry in blogEntries" :key="entry.id" class="blog-post-list__entry"
            :class="`blog-post-list__entry--` + entry.cat" :title="entry.title" :content="entry.content || null"
            :slug="entry.slug" :date="entry.date" />
        </div>
        <div class="blog-post-list__categories">
          <h2 class="blog-post-list__categories-title">
            Categories
          </h2>
          <div v-for="entry in blogCategories" :key="entry.id" class="blog-post-list__category-line"
            @click="toggleCategory(entry.name)">
            <input class="blog-post-list__category-line-box" type="checkbox" :checked="isCategoryChecked(entry.name)">
            <span class="blog-post-list__category-line-text">
              {{ entry.about }}
            </span>
          </div>
        </div>
      </div>
    </content-with-title>
    <component :is="'style'" v-if="unselectedCategoriesStyling != ''" type="text/css">
      {{ unselectedCategoriesStyling }}
    </component>
  </div>
</template>

<style scoped>
.blog-post-list__content {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
}

.blog-post-list__list {
  margin-right: 0.5rem;
  flex-grow: 1;
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

@media (--phoneAndTablet) {
  .blog-post-list__content {
    flex-direction: column-reverse;
    align-items: normal;
  }

  .blog-post-list__categories {
    margin: 0;
    width: 100%;
    padding: 10px 4em;
  }

  .blog-entry__content img {
    width: 100%;
    height: auto;
  }
}
</style>
