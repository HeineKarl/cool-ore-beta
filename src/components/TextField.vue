<template>
  <v-text-field
    :clearable="clearable"
    :variant="variant"
    :label="label"
    v-model="state.user.age"
    :id="label.lowerCase()"
    :type="type"
    :focused="!!state.user.age"
  >
  </v-text-field>
</template>
        
<script>
import { defineComponent } from "@vue/runtime-core";
import { useStore } from "vuex";

export default defineComponent({
  props: {
    clearable: Boolean,
    variant: String,
    label: String,
    type: String,
  },
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