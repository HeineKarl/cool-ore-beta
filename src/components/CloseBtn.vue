<template>
  <v-btn class="header__close" elevation="0" small icon>
    <v-icon>mdi-close</v-icon>
  </v-btn>
</template>
        
<script>
import { defineComponent } from "@vue/runtime-core";
import { useStore } from "vuex";

export default defineComponent({
  setup() {
    const { state, commit } = useStore();

    return {
      state,
    };
  },
});
</script>
        
  <style lang="scss" scoped>
</style>