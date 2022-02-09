<template>
  <div>1</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "HelloWorld",
  data() {
    return {
      counter: 0,
    };
  },
  setup: () => {
    return {};
  },
});
</script>

<style scoped>
a {
  color: #42b983;
}

label {
  margin: 0 0.5em;
  font-weight: bold;
}

code {
  background-color: #eee;
  padding: 2px 4px;
  border-radius: 4px;
  color: #304455;
}
</style>
