<template>
  <div class="about">
    <section class="about__intro">
      <div class="about__content">
        <h2>Carefully Programmed to help better Color Vision</h2>
        <p>
          A Capstone Research Project implemented in used to support and spread
          awareness to Color Vision Deficiency. Cool-ore guides and provides
          color parameters to see betterment for Website users.
        </p>
      </div>
    </section>
    <section class="about__trivia">
      <h3>Daltonism</h3>
      <p>
        Daltonism derives from the name of chemist and physicist John Dalton
        (1766-1844). Dalton's reputation is largely based on his groundbreaking
        Atomic Theory. Because he rarely went out, his only source of
        entertainment was a game of bowls. His first scientific paper in terms
        of Colorblind was based on his brother's colorblindness, with impaired
        perception of red and green. It occurs when a person sees colors
        differently than the majority of people, with the inability to
        distinguish between red, green, and blue light.
      </p>
    </section>
    <section class="about__banner">
      <span>Types of Color blindness</span>
    </section>
    <section class="about__types">
      <div class="about__color-types" v-for="typeClr in state.colorblind.types">
        <h3>{{ typeClr.name }}</h3>
        <p>{{ typeClr.desc }}</p>
        <ul class="about__subtypes">
          <li v-for="subType in typeClr.subtypes">
            <h4>{{ subType.name }}</h4>
            <p>{{ subType.desc }}</p>
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>

<script>
import { defineComponent, ref } from "@vue/runtime-core";
import { useStore } from "vuex";
import { useRoute } from "vue-router";

export default defineComponent({
  setup() {
    const { state, commit, dispatch } = useStore();
    const router = useRoute();
    dispatch("generateToken", { routename: router.name });
    return {
      state,
    };
  },
});
</script>


<style lang="scss" scoped>
.about {
  // margin: 2rem 2rem 0;
  @include flex(
    $dir: column,
    $align: flex-start,
    $justify: space-between,
    $gap: 4rem
  );

  &__intro {
    // height: 25rem;
    margin: 4rem 2rem 0;

    @include flex($dir: column, $gap: 1rem);
  }

  &__content {
    max-width: 45rem;
    @include flex(
      $dir: column,
      $align: flex-start,
      $justify: space-between,
      $gap: 2rem
    );

    h2 {
      @include font(
        clamp(1.75rem, 6vw, 3.5rem),
        $weight: 800,
        $clr: var(--secondary-color)
      );
    }

    p {
      @include font(
        clamp(0.95rem, 1.5vw, 1rem),
        $weight: 400,
        $clr: var(--secondary-color)
      );
      line-height: 1.5;
    }
  }

  &__trivia {
    margin: 2rem 2rem 0;
    max-width: 60rem;

    @include flex($dir: column, $align: flex-start, $gap: 1rem);
    h3 {
      @include font(
        clamp(1.25rem, 6vw, 1.75rem),
        $weight: 800,
        $clr: var(--secondary-color)
      );
    }

    p {
      @include font(
        clamp(0.95rem, 1.5vw, 1rem),
        $weight: 400,
        $clr: var(--secondary-color)
      );
      line-height: 1.5;
    }
  }

  &__banner {
    @include flex();
    @include font(
      clamp(1.5rem, 5vw, 3rem),
      $weight: 400,
      $clr: var(--primary-color)
    );
    background-color: var(--secondary-color);
    margin: 0;
    width: 100%;
    height: 10rem;
    text-align: center;
  }

  &__types {
    @include flex($align: flex-start, $dir: column, $gap: 4rem);
    margin: 1rem 2rem 2rem;
    max-width: 45rem;
  }

  &__color-types {
    @include flex($align: flex-start, $dir: column, $gap: 1rem);

    h3 {
      @include font(
        clamp(1.15rem, 6vw, 1.5rem),
        $weight: 800,
        $clr: var(--secondary-color)
      );
    }

    p {
      @include font(
        clamp(0.95rem, 1.5vw, 1rem),
        $weight: 400,
        $clr: var(--secondary-color)
      );
      line-height: 1.5;
    }
  }

  &__subtypes {
    @include flex($dir: column, $gap: 1rem);
    list-style-type: circle;
    margin-left: 1rem;

    h3 {
      @include font(
        clamp(1rem, 6vw, 1.15rem),
        $weight: 800,
        $clr: var(--secondary-color)
      );
    }

    p {
      @include font(
        clamp(0.95rem, 1.5vw, 1rem),
        $weight: 400,
        $clr: var(--secondary-color)
      );
      line-height: 1.5;
    }
  }
}

@media (min-width: $min-width-desktop) {
  .about {
    &__intro,
    &__trivia,
    &__types {
      margin-inline: 4rem;
    }
  }
}
</style>
