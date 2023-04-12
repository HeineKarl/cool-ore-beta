<template>
  <div class="article">
    <v-icon class="icon">mdi-close-octagon</v-icon>
    <h1>Article View is currently closed</h1>
  </div>
</template>

<script>
import { defineComponent } from "@vue/runtime-core";
import { useStore } from "vuex";
import { useRoute } from "vue-router";

export default defineComponent({
  setup() {
    const { state, dispatch } = useStore();
    const router = useRoute();
    dispatch("generateToken", { routename: router.name });
    return {
      state,
    };
  },
});
</script>

<style lang="scss" scoped>
.article {
  @include flex($dir: column);
  height: 30rem;
}

.icon {
  font-size: 10rem;
}
</style>