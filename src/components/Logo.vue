<template>
  <div class="header__logo">
    <router-link class="header__logolink" :to="{ name: 'home' }">
      <div class="header__img">
        <img :src="require('@/assets/img/logo.png')" alt="Cool-ore Logo" />
      </div>
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
.header {
}
</style>