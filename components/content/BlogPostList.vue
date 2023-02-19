<script async setup lang="ts">
  interface BlogEntry {
    id: string;
    title: string;
    slug: string;
    content: {};
    author: string;
    date: string;
    cat: string;
    classes: [];
  }

  interface BlogCategory {
    name: string;
    about: string;
  }

  interface BlogCategories {
    entries: BlogCategory[];
  }

  const route = useRoute();

  const isPreview = !!(route.query._storyblok && route.query._storyblok !== '');
  const version = isPreview ? 'draft' : 'published';

  const rawBlogEntries: BlogEntry[] = [];

  await useStoryblokFetch('', {
    starts_with: 'blog/',
    version,
    content_type: 'blog-entry',
    resolve_relations: 'blog-entry.categories',
    sort_by: 'content.date:desc',
  }).then((response) => {
    response.stories.forEach((story) => {
      rawBlogEntries.push({
        ...story,
        classes: story.content.categories.map(category => `blog-post-list__entry--${category.uuid}`),
      });
    });
  });

  const blogEntries = computed<BlogEntry[]>(
    (): BlogEntry[] => rawBlogEntries as BlogEntry[],
  );

// const unselectedCategories = ref(<string[]>[]);

// const rawBlogCategories = useState<BlogCategories>(
//   'rawBlogCategories',
//   () => {
//     const blogCategoriesLocal: BlogCategories = {
//       entries: [],
//     };
//     const data = ['fields name,about;'];

//     /*try {
//       await axios
//         .post('/blogcats/get', data.join(''))
//         .then((response) => {
//           const entries = response.data as BlogCategory[];
//           entries.forEach((entry) => {
//             blogCategoriesLocal.entries.push(entry);
//           });
//         })
//         .catch((error) => {
//           console.log(error.response);
//         });
//     } catch (error) {
//       console.log(error);
//     }*/
//     return blogCategoriesLocal;
//   },
// );

// const blogCategories = computed<BlogCategory[]>((): BlogCategory[] => rawBlogCategories.value?.entries as BlogCategory[]);

// const unselectedCategoriesStyling = computed((): string => {
//   let style = '';
//   unselectedCategories.value.forEach((category) => {
//     style += `.blog-post-list__entry.blog-post-list__entry--${category} { display: none; }`;
//   });
//   return style;
// });

// function isCategoryChecked(category: string): boolean {
//   return !(unselectedCategories.value.includes(category));
// }

// function toggleCategory(category: string) {
//   if (isCategoryChecked(category)) {
//     unselectedCategories.value.push(category);
//   } else {
//     const index = unselectedCategories.value.indexOf(category);
//     if (index > -1) {
//       unselectedCategories.value.splice(index, 1);
//     }
//   }

//   unselectedCategories.value = unselectedCategories.value.filter(
//     (item, index) => unselectedCategories.value.indexOf(item) === index,
//   );
// }
</script>

<template>
  <div class="blog-post-list">
    <content-with-title title="Blog">
      <div class="blog-post-list__content">
        <div class="blog-post-list__list">
          <component
            :is="$resolveStoryBlokComponent(entry)"
            v-for="entry in blogEntries"
            :key="entry.id"
            class="blog-post-list__entry"
            :class="entry.classes"
            :blok="entry.content"
            :raw="entry"
          />
        </div>
        <!--div class="blog-post-list__categories">
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
        </div-->
      </div>
    </content-with-title>
    <!--component :is="'style'" v-if="unselectedCategoriesStyling != ''" type="text/css">
      {{ unselectedCategoriesStyling }}
    </!--component-->
  </div>
</template>

<style scoped lang="scss">
.blog-post-list__content {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
}

.blog-post-list__list {
  margin-right: 0.5rem;
  flex-grow: 1;
  max-width: 100%;
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
  color: $text-color;
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

  .blog-post-list__list {
    margin-right: 0;
  }

  .blog-entry__content img {
    width: 100%;
    height: auto;
  }
}
</style>
