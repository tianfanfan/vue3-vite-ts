<template>
  <div class="input-task">
    <input v-model="input" class="input" />
    <div class="right">
      <n-button class="confirmAdd" type="primary" @click="confirmAdd">
        Add
      </n-button>
    </div>
  </div>
</template>

<script lang="ts">
import _ from "lodash";
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "InputTask",
  emits: ["add"],

  setup: (props, context) => {
    const input = ref("");
    return {
      input,
      confirmAdd() {
        if (input.value) {
          context.emit("add", input.value);
          input.value = "";
        }
      },
    };
  },
});
</script>

<style scoped lang="less">
@color: #18a058;
.input-task {
  display: flex;
  align-items: stretch;
}
.input {
  display: block;
  width: 100%;
  height: 40px;
  text-align: center;
  color: @color;
  border-radius: 0;
  border: 3px solid @color;
  &:focus-visible {
    // outline-color: rgb(178, 194, 35);
    border: 3px solid rgb(178, 194, 35);
  }
  outline: none;
}

.right {
  margin-left: 10px;
  .confirmAdd {
    height: 100%;
  }
}
</style>
