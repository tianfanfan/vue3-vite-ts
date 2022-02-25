<template>
  <n-popconfirm
    :show="showPopover"
    :show-icon="false"
    @positive-click="handlePositiveClick"
    @negative-click="handleNegativeClick"
    @clickoutside="showPopover = false"
  >
    <template #trigger>
      <slot></slot>
    </template>
    <n-input
      v-model:value="input"
      size="large"
      type="textarea"
      placeholder=""
    />
  </n-popconfirm>
</template>

<script lang="ts" setup>
import _ from "lodash";
import { ref } from "vue";

const showPopover = ref(false);

const emit = defineEmits<{
  (e: "addx", arg: string): void;
  (e: "delete", id: string): void;
}>();

const input = ref("");

const open = (_input: string) => {
  showPopover.value = true;
  input.value = _input;
};

const handlePositiveClick = () => {
  showPopover.value = false;
  emit("addx", input.value);
  input.value = "";
};
const handleNegativeClick = () => {
  showPopover.value = false;
  console.info("并不");
};

defineExpose({
  open,
});
</script>

<style scoped lang="less">
@color: #18a058;
</style>
