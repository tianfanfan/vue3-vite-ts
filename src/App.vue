<template>
  <div>
    <button @click="changeUserName">changeUserName</button>
    <SetupDemo :user="user" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import SetupDemo from "./components/SetupDemo.vue";
export default defineComponent({
  name: "App",
  components: {
    SetupDemo,
  },
  setup: () => {
    const user = ref("user");
    const changeUserName = () => {
      user.value = user.value + "1";
    };
    return {
      user,
      changeUserName,
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
