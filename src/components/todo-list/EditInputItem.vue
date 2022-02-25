<template>
  <n-popconfirm
    :show="showPopover"
    :show-icon="false"
    :width="300"
    placement="bottom"
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
      :rows="3"
      :autosize="{ minRows: 3, maxRows: 3 }"
      show-count
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
