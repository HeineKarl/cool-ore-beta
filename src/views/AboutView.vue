<template>
  <div class="about">
    <section class="about__intro">
      <div class="about__content">
        <h2>About Cool-ore</h2>
        <p>
          A Capstone Research Project designed to support and spread awareness
          to Color Vision Deficiency. Cool-ore guides and provides color
          parameters to see betterment for Website users.
        </p>
      </div>
    </section>
    <section class="about__trivia">
      <h3>Trivia</h3>
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
    <section class="about__colorblind">
      <h3>Color Blindness</h3>
      <p>
        Color blindness is a condition that affects a significant portion of the
        population worldwide. It is a hereditary disorder that affects the way
        an individual perceives colors, making it difficult for them to
        distinguish between certain colors, especially red and green. According
        to Colour Blind Awareness (2023), color blind people face many
        difficulties in everyday life which normally sighted people just are not
        aware of.
      </p>
      <h4>Problems with Color Vision Deficiency</h4>
      <p>
        Problems can arise in even the simplest of activities including choosing
        and preparing food, gardening, sport, driving a car and selecting which
        clothes to wear. Color blind people can also find themselves in trouble
        because they have not properly understood information in the workplace
        or not noticed themselves/their child getting sunburnt. This means that
        the condition can have a significant impact on an individual's daily
        life, including their ability to perform tasks that require color
        perception.
      </p>
      <h4>Encounter with Color Vision Deficiency</h4>
      <p>
        The researchers encountered people with color blindness and were
        experiencing a great challenge in everyday life. A student of St. Mary’s
        College of Meycauayan is one of the subjects of the researchers. Based
        on his experience it is hard for him to perceive colors especially with
        red and green pigments. The experiences of the subject has caught the
        attention of the researchers and they decided to conduct research about
        color blindness and come up with the goal of making a website that will
        aim to spread awareness about color blindness and help the people with
        color blindness access websites easily and with comfortability.
      </p>
      <h4>Types of Colorblind</h4>
      <ul>
        <li>Protan</li>
        <li>Deutan</li>
        <li>Tritan</li>
        <li>Achromat</li>
      </ul>
    </section>

    <section class="about__inspire">
      <h3>What does this tell for the future?</h3>
      <p>
        It is without a doubt a critical aspect of deficiency that is not only
        pertaining to normal vision, but people with color vision deficiency
        sacrifices half of the experience on the internet as well as in the
        enviroment. With this, more research and awareness should be attained
        for the betterment of the digital engagement as well as the user
        experience across platforms.
      </p>
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
    // dispatch("generateToken", { routename: router.name });
    return {
      state,
    };
  },
});
</script>


<style lang="scss" scoped>
.about {
  // For the Navigation Thingy
  margin: var(--header-height) 0 4rem;

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

  &__colorblind {
    @include flex($dir: column, $align: flex-start, $gap: 1rem);
    margin: 2rem 2rem 0;
    max-width: 60rem;

    h3 {
      @include font(
        clamp(1.25rem, 6vw, 1.75rem),
        $weight: 800,
        $clr: var(--secondary-color)
      );
    }
    h4 {
      @include font(
        clamp(0.75rem, 6vw, 1rem),
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
    ul {
      margin-left: 1rem;
    }
  }

  &__inspire {
    @include flex($dir: column, $align: flex-start, $gap: 1rem);
    margin: 2rem 2rem 0;
    max-width: 60rem;

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

  // &__banner {
  //   @include flex();
  //   @include font(
  //     clamp(1.5rem, 5vw, 3rem),
  //     $weight: 400,
  //     $clr: var(--primary-color)
  //   );
  //   background-color: var(--secondary-color);
  //   margin: 0;
  //   width: 100%;
  //   height: 10rem;
  //   text-align: center;
  // }

  // &__types {
  //   @include flex($align: flex-start, $dir: column, $gap: 4rem);
  //   margin: 1rem 2rem 2rem;
  //   max-width: 45rem;
  // }

  // &__color-types {
  //   @include flex($align: flex-start, $dir: column, $gap: 1rem);

  //   h3 {
  //     @include font(
  //       clamp(1.15rem, 6vw, 1.5rem),
  //       $weight: 800,
  //       $clr: var(--secondary-color)
  //     );
  //   }

  //   p {
  //     @include font(
  //       clamp(0.95rem, 1.5vw, 1rem),
  //       $weight: 400,
  //       $clr: var(--secondary-color)
  //     );
  //     line-height: 1.5;
  //   }
  // }

  // &__subtypes {
  //   @include flex($dir: column, $gap: 1rem);
  //   list-style-type: circle;
  //   margin-left: 1rem;

  //   h3 {
  //     @include font(
  //       clamp(1rem, 6vw, 1.15rem),
  //       $weight: 800,
  //       $clr: var(--secondary-color)
  //     );
  //   }

  //   p {
  //     @include font(
  //       clamp(0.95rem, 1.5vw, 1rem),
  //       $weight: 400,
  //       $clr: var(--secondary-color)
  //     );
  //     line-height: 1.5;
  //   }
  // }
}

@media (min-width: $min-width-desktop) {
  .about {
    &__intro,
    &__trivia,
    &__types,
    &__colorblind,
    &__inspire {
      margin-inline: 4rem;
    }
  }
}
</style>
