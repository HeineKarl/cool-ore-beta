<template>
  <div class="header__logo">
    <router-link :to="{ name: 'home' }">
      <img :src="require('@/assets/img/logo.png')" alt="Cool-ore Logo" />
    </router-link>
  </div>
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