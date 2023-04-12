<template>
  <v-btn class="solid-btn" variant="tonal">{{ text }}</v-btn>
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
.solid-btn {
  background-color: var(--success-color);
  color: var(--light-color);
}
</style>