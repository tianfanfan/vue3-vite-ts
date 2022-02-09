<template>
  <SetupDemo />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SetupDemo from "./components/SetupDemo.vue";
export default defineComponent({
  name: "App",
  components: {
    SetupDemo,
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
