<template>
  <v-btn class="hollow-btn" variant="outlined">{{ text }}</v-btn>
</template>
          
<script>
import { defineComponent } from "@vue/runtime-core";
import { useStore } from "vuex";

export default defineComponent({
  props: {
    text: String,
    variant: String,
  },
  setup() {
    const { state, commit } = useStore();

    return {
      state,
    };
  },
});
</script>
          
<style lang="scss" >
.hollow-btn {
  color: var(--alert-color);
}
</style>