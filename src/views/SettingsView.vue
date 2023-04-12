<template>
  <div>Here is the setting</div>
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
</style>