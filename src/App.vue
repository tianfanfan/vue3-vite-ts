<template>
  <div>
    <button @click="changeState">changeState</button>
    <div>state {{ state }}</div>
    <div>state2 {{ state2 }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, isReactive, reactive, readonly, ref } from "vue";
import SetupDemo from "./components/SetupDemo.vue";
export default defineComponent({
  name: "App",
  components: {},
  setup: () => {
    const state = ref({
      name: "John",
    });

    const state2 = reactive(state);
    return {
      state,
      changeState() {
        state.value.name = state.value.name + "1";
      },
      state2,
    };
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
