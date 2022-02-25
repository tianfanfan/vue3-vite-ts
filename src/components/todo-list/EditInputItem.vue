<template>
  <div class="input-task">
    <n-input
      v-model:value="input"
      size="large"
      type="textarea"
      rows="2"
      placeholder=""
    />
    <div class="right">
      <n-button class="comfirmAdd" type="primary" @click="comfirmAdd">
        OK
      </n-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import _ from "lodash";
import { defineEmits, defineExpose, reactive, ref, toRaw, toRefs } from "vue";

const emit = defineEmits<{
  (e: "add", arg: string): void;
  (e: "delete", id: string): void;
}>();

const input = ref("");
const comfirmAdd = () => {
  if (input.value) {
    emit("add", input.value);
  }
};

const open = () => {};

defineExpose({
  open,
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
  .comfirmAdd {
    height: 100%;
  }
}
</style>
