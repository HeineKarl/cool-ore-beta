<template>
  <v-list density="compact" active-class="header__nav-active" nav>
    <v-list-item
      class="header__lists"
      v-for="(list, i) in lists"
      :key="list.id"
      :to="list.name ? { name: list.name } : null"
    >
      <template v-slot:prepend>
        <v-icon :icon="list.icon"></v-icon>
      </template>

      <v-list-item-title v-text="list.text"></v-list-item-title>
    </v-list-item>
  </v-list>
</template>

<script>
import { defineComponent, ref } from "@vue/runtime-core";

export default defineComponent({
  name: "NavigationList",
  props: {
    lists: {
      type: Array,
      required: true,
    },
  },
  setup({ user, lists }) {},
});
</script>

<style lang="scss" scoped>
.loo {
  background: green;
}
</style>