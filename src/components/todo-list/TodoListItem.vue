<template>
  <div class="task-card">
    <n-checkbox
      class="checkbox"
      :checked="check"
      @update:checked="handlerCheck"
    >
    </n-checkbox>
    <div class="content" @click="handlerCheck(!check)">
      {{ title }}
    </div>

    <div class="operation">
      <n-space>
        <n-button text type="info" @click="handlerEdit"> Edit </n-button>
        <n-button text type="error" @click="handlerDelete"> Delete </n-button>
      </n-space>
    </div>
  </div>
  <edit-input-item :ref="editComponent" @add="handlerAdd"></edit-input-item>
</template>

<script lang="ts" setup>
import _ from "lodash";
import {
  defineEmits,
  ref,
  defineProps,
  withDefaults,
  toRefs,
  toRaw,
} from "vue";
import EditInputItem from "./EditInputItem.vue";
type EditInputItemRef = InstanceType<typeof EditInputItem>;

interface Props {
  id: string;
  title: string;
  check: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  id: "",
  title: "",
});
const { id, check } = toRaw(props);

const emit = defineEmits<{
  (e: "chose-task", arg: { id: string; check: boolean }): void;
  (e: "delete", id: string): void;
}>();

const editComponent = ref<EditInputItemRef>();

const handlerCheck = (check: boolean) => {
  emit("chose-task", { id, check });
};
const handlerDelete = () => {
  emit("delete", id);
};
const handlerEdit = () => {
  console.log(id);
};
const handlerAdd = () => {
  // content.emit("delete", id.value);
  console.log(id);
};
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
