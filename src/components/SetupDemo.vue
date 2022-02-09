<template>
  <div @click="getUserRepositories">getRes</div>
  <ul>
    <li v-for="item in repositories" :key="`${item}`">
      {{ item.a }}
    </li>
  </ul>
</template>

<script lang="ts">
import _ from "lodash";
import { defineComponent, onMounted, ref } from "vue";
export default defineComponent({
  name: "SetupDemo",

  setup: (props) => {
    let repositories = ref<
      {
        a: number;
      }[]
    >([]);

    const getUserRepositories = async () => {
      await new Promise((resolve) => {
        setTimeout(() => {
          resolve(1);
        }, 3000);
      });
      repositories.value = [{ a: 1 }];
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

<style scoped></style>
