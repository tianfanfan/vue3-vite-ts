<template>
  <div>
    {{ users }}
    {{ user }}
    <div @click="getUsertasks">getRes</div>
    <ul>
      <li v-for="item in tasks" :key="`${item}`">
        {{ item.content }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import _ from "lodash";
import { defineComponent, onMounted, ref, toRaw, toRefs } from "vue";

type Task = {
  content: string;
};

export default defineComponent({
  name: "SetupDemo",
  props: {
    user: {
      type: String,
      required: true,
    },
  },
  setup: (props) => {
    let tasks = ref<Task[]>([]);

    const { user } = toRaw(props);

    const getUsertasks = async () => {
      await new Promise((resolve) => {
        setTimeout(() => {
          resolve(1);
        }, 3000);
      });
      tasks.value = [{ content: "1" }];
    };

    onMounted(getUsertasks); // 在 `mounted` 时调用 `getUsertasks`

    return {
      tasks,
      // 因为 prop 使用了 user 的名字，这里得换个单词
      users: user,
      getUsertasks,
    };
  },
  methods: {},
});
</script>

<style scoped></style>
