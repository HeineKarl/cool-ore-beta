<template>
  <div class="appearance">
    <div class="appearance__heading">Appearance</div>
    <div class="appearance__subheading">Theme Mode</div>
    <div class="appearance__colormode">
      <div
        v-for="color in state.colors.colorMode"
        :key="color.id"
        class="appearance__container"
        :class="
          color.name == state.colors.colorTheme
            ? 'appearance__color--active'
            : null
        "
      >
        <v-btn
          :active="color.name == state.colors.colorTheme"
          @click="chooseColor(color.name)"
          class="appearance__btn"
          elevation="0"
        >
          <img :src="color.img" alt="" />
        </v-btn>
      </div>
    </div>

    <div class="appearance__subheading">Colorblind Specification</div>
    <div class="appearance__colorspecs">
      <div
        v-for="color in state.colors.colorSpecs"
        :key="color.id"
        class="appearance__container"
        :class="
          color.name == state.colors.colorTheme
            ? 'appearance__color--active'
            : null
        "
      >
        <v-btn
          :active="color.name == state.colors.colorTheme"
          @click="chooseColor(color.name)"
          class="appearance__btn"
          elevation="0"
        >
          <img :src="color.img" alt="" />
        </v-btn>
      </div>
    </div>

    <div class="appearance__subheading">Contrast Specification</div>
    <div class="appearance__colorcontrast">
      <div
        v-for="color in state.colors.colorContrast"
        :key="color.id"
        class="appearance__container"
        :class="
          color.name == state.colors.colorTheme
            ? 'appearance__color--active'
            : null
        "
      >
        <v-btn
          :active="color.name == state.colors.colorTheme"
          @click="chooseColor(color.name)"
          class="appearance__btn"
          elevation="0"
        >
          <img :src="color.img" alt="" />
        </v-btn>
      </div>
    </div>
  </div>
</template>
    
  <script>
import { defineComponent, ref } from "@vue/runtime-core";
import { useStore } from "vuex";
import { useRoute } from "vue-router";

export default defineComponent({
  components: {},
  setup() {
    const { state, commit, dispatch } = useStore();
    const router = useRoute();
    // const currentName = ref(state.colors.colorTheme);

    // dispatch("generateToken", { routename: router.name });
    // dispatch("colors/getColor", {
    //   user_id: parseInt(sessionStorage.getItem("id")),
    // });
    // setTimeout(() => {
    //   commit("colors/setColor", state.colors.colorTheme);
    // }, 500);

    function chooseColor(name) {
      commit("colors/setColor", name);

      dispatch("colors/updateColor", {
        user_id: state.user.id,
        color_theme: name,
      });
    }

    return {
      state,
      chooseColor,
    };
  },
});
</script>
    
<style lang="scss" scoped >
.v-btn__content {
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
}
.appearance {
  @include flex($dir: column, $gap: 3rem);

  // For the Navigation Thingy
  margin: var(--header-height) 0 0;
  // For the Navigation Thingy
  padding: 3rem 2rem;
  &__heading {
    @include font(1.5rem, $weight: 600, $clr: var(--secondary-color));
    text-align: center;
  }
  &__subheading {
    @include font(1.15rem, $weight: 400, $clr: var(--secondary-color));
    border-bottom: 1px solid;
    width: 100%;
    text-align: start;
    padding-bottom: 0.5rem;
  }

  &__colormode,
  &__colorspecs,
  &__colorcontrast {
    @include flex($gap: 2rem);
    flex-wrap: wrap;
  }

  &__container {
    width: 12rem;
  }

  &__color--active {
    border: 2px solid var(--success-color);
    border-radius: 3px;
  }

  &__btn {
    width: inherit;
    height: inherit;
    padding: 0;
    margin: 0;
  }
}

@media (min-width: $min-width-tablet) {
  .appearance {
    @include flex($dir: column, $gap: 3rem, $align: flex-start);
    padding: 3rem 4rem;
    &__heading {
      text-align: start;
    }

    &__colormode,
    &__colorspecs,
    &__colorcontrast {
      @include flex($gap: 2rem, $justify: flex-start);
      flex-wrap: wrap;
    }
  }
}
</style>