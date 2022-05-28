<script lang="ts">
import { defineNuxtComponent } from "#app";

interface StalkEntry {
  link: string;
  entryPic: string;
}

export default defineNuxtComponent({
  setup() {
    const stalkEntries = reactive<StalkEntry[]>(<StalkEntry[]>[]);
    const fetchEntries = async () => {
      const data = [
        'fields entryPic,link;',
        'filter status=1;',
        'sort orderID asc;',
      ];

      /* try {
         await axios
           .post('/stalk/get', data.join(''))
           .then((response) => {
             const entries = response.data as StalkEntry[];
             entries.forEach((entry) => {
               stalkEntries.push(entry);
             });
           })
           .catch((error) => {
             console.log(error.response);
           });
       } catch (error) {
         console.log(error);
       } */
    };
    onMounted(fetchEntries);

    return { stalkEntries, fetchEntries };
  },
});
</script>

<template>
  <div class="stalk-list">
    <h3 class="stalk-list__title">
      Contact me
    </h3>
    <div class="stalk-list__grid">
      <parts-molecules-stalk-entry v-for="entry in stalkEntries" :key="entry.id" :link="entry.link"
        :picture="entry.entryPic" />
    </div>
  </div>
</template>

<style scoped>
.stalk-list {
  border-bottom: none;
  max-width: 50%;
  border-top-left-radius: 60px;
  border-top-right-radius: 60px;
  padding: 30px;
  margin: 0 auto;
  box-shadow: 0 0 3px #c0c1c2;
  background-color: white;
  margin-top: 30px;
  margin-bottom: -10px;
}

.stalk-list__title {
  margin: 0px;
  text-align: center;
  font-family: raleway, Helvetica, Arial, Verdana, sans-serif;
  font-size: 2em;
  font-weight: 200;
  margin-top: 10px;
}

.stalk-list__grid {
  display: flex;
}

@media (--phoneAndTablet) {
  .stalk-list {
    max-width: 100%;
    padding: 6px;
  }
}
</style>
