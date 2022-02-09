<template>
  <div @click="getUserRepositories">getRes</div>
  <ul>
    <li v-for="item in repositories" :key="item">
      {{ item }}
    </li>
  </ul>
  <div>{{ a }}</div>
</template>

<script lang="ts">
import _ from "lodash";
import { defineComponent, onMounted, ref } from "vue";
export default defineComponent({
  name: "HelloWorld",

  setup: (props) => {
    let repositories = ref<number[]>([]);

    const getUserRepositories = async () => {
      repositories.value = [1];
    };

    onMounted(getUserRepositories); // 在 `mounted` 时调用 `getUserRepositories`

    return {
      repositories,
      getUserRepositories,
    };
  },
  data() {
    return {};
  },
  methods: {},
});
</script>

<style scoped>
a {
  color: #42b983;
}

label {
  margin: 0 0.5em;
  font-weight: bold;
}

code {
  background-color: #eee;
  padding: 2px 4px;
  border-radius: 4px;
  color: #304455;
}
</style>
