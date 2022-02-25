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
        <edit-input-item ref="editComponent" @addx="handlerAdd">
          <n-button text type="info" @click="handlerEdit"> Edit </n-button>
        </edit-input-item>
        <n-button text type="error" @click="handlerDelete"> Delete </n-button>
      </n-space>
    </div>
  </div>
</template>

<script lang="ts" setup>
import _ from "lodash";
import { ref, toRefs } from "vue";
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
  check: false,
});
const { id, check, title } = toRefs(props);

const emit = defineEmits<{
  (e: "chose-task", arg: { id: string; check: boolean }): void;
  (e: "edit-task", arg: { id: string; title: string }): void;
  (e: "delete", id: string): void;
}>();

const handlerCheck = (check: boolean) => {
  emit("chose-task", { id: id.value, check });
};
const handlerDelete = () => {
  emit("delete", id.value);
};

const editComponent = ref<EditInputItemRef>();
const handlerEdit = () => {
  editComponent.value?.open(title.value);
};

const handlerAdd = (title: string) => {
  emit("edit-task", { id: id.value, title });
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
