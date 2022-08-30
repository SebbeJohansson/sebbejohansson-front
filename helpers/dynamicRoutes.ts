import axios from 'axios';

/**
 * since we can't use imports here we just fetch
 * all our routes from a custom API endpoint where we can use imports
 */

// export default async () => await $fetch('/api/sitemap_routes', {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// export default async () => axios.post('http://localhost:3000/api/sitemap_routes', {
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

export default (storyblokApiToken) => {
  console.log(storyblokApiToken);
  console.log(`https://api.storyblok.com/v2/cdn/stories?token=${storyblokApiToken}&version=published`);
  console.log(axios.get(`https://api.storyblok.com/v2/cdn/stories?token=${storyblokApiToken}&version=published`).then((res) => res.data.stories.map((story) => `/${story.full_slug}`)));
  return axios.get(`https://api.storyblok.com/v2/cdn/stories?token=${storyblokApiToken}&version=published`).then((res) => res.data.stories.map((story) => `/${story.full_slug}`));
};

// export default async () => ['/route'];
