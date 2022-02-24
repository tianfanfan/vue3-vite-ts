<template>
  <div class="task-card">
    <n-checkbox
      class="checkbox"
      :checked="check"
      @update:checked="handlerCheck"
    >
    </n-checkbox>
    <div class="content">
      {{ title }}
    </div>
    <div class="operation">
      <n-space>
        <n-button text type="info"> Edit </n-button>
        <n-button text type="error" @click="handlerDelete"> Delete </n-button>
      </n-space>
    </div>
  </div>
</template>

<script lang="ts">
import _ from "lodash";
import { defineComponent, onMounted, ref, toRaw, toRefs } from "vue";

export default defineComponent({
  name: "TodoListItem",
  components: {},
  props: {
    title: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
    check: {
      type: Boolean,
      required: true,
    },
  },
  emits: { delete: null, "chose-task": null },
  setup: (props, content) => {
    const { id } = toRefs(props);
    return {
      handlerCheck(check: boolean) {
        content.emit("chose-task", { id: id.value, check });
      },
      handlerDelete() {
        content.emit("delete", id.value);
      },
    };
  },
});
</script>

<style scoped lang="less">
.task-card {
  display: flex;
  align-items: center;
  min-width: 0;
  .checkbox {
    padding-right: 10px;
  }
  .content {
    flex: 1 1 auto;
    min-width: 0;
    overflow: hidden;
    line-height: 25px;
    text-overflow: ellipsis;
    color: #3f91ba;
    word-break: break-all;
  }

  .operation {
    flex: 0 0 auto;
  }
}
</style>
