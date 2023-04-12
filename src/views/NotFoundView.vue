<template>
  <div class="notfound">
    <div class="heading">
      <span>{{ this.$store.state.message }}</span>
    </div>
  </div>
</template>

<script>
export default {
  setup() {
    return {};
  },
  created() {
    setTimeout(() => {
      this.$router.push("/login");
    }, 2000);
  },
};
</script>

<style  scoped>
.notfound {
  height: 84vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.heading {
  /* background-color: green; */
  max-width: 25rem;
  text-align: center;
  font-size: 2rem;
}
</style>