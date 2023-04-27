<template>
  <div class="notfound">
    <div class="notfound__heading">
      <span>{{ state.message }}</span>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";

export default {
  name: "Message",
  setup() {
    const { state } = useStore();

    return { state };
  },

  created() {
    setTimeout(() => {
      this.$router.push({ name: "login" });
    }, 2000);
  },
};
</script>

<style lang="scss" scoped>
.notfound {
  //  For the Navigation Thingy
  margin: var(--header-height) 0 0;

  height: 84vh;
  display: flex;
  align-items: center;
  justify-content: center;

  &__heading {
    max-width: 24rem;
    text-align: center;
    font-size: 2rem;
  }
}
</style>