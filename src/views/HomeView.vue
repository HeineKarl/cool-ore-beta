<template>
  <div class="home">
    <section class="home__intro">
      <div class="home__content">
        <h2>Carefully Programmed to help better Color Vision</h2>
        <p>
          A Capstone Research Project implemented in used to support and spread
          awareness to Color Vision Deficiency. Cool-ore guides and provides
          color parameters to see betterment for Website users.
        </p>
      </div>
      <div class="home__design">
        <img :src="require('@/assets/design/color_fountain.png')" />
      </div>
    </section>
    <section class="home__info">
      <h3>Want to test and understand all colors more clearly?</h3>
      <p>
        Use the website to change colors that are hard to figure out into colors
        you can easily distinguish. It'll be as easy for you to spot an orange
        bloom in a green field as it is for everyone else!
      </p>
    </section>

    <section class="home__video">
      <v-card class="home__video-card">
        <div class="home__video-container">
          <iframe
            src="https://drive.google.com/file/d/1_ubgEdoyopREBV-ZRIUpS_wJBl18r1VK/preview"
            allow="autoplay"
            allowfullscreen
          ></iframe>
        </div>

        <div class="home__video-content">
          <v-card-title class="ma-0 pa-0" style="font-size: 1rem"
            >Color Design</v-card-title
          >
          <v-spacer></v-spacer>
          <v-btn icon elevation="0">
            <v-icon>mdi-information</v-icon>
          </v-btn>
        </div>
      </v-card>
    </section>

    <section class="home__info">
      <h3>What is Cool-ore?</h3>
      <p>
        An easy navigational website that shows how people with color vision
        deficiency locks into their vision and must comprehend better with it.
      </p>
    </section>

    <section class="home__faq">
      <h3>Frequently Asked Question</h3>
      <div class="home__vision-types">
        <span class="home__title">Vision Types</span>
        <v-expansion-panels class="home__panels" variant="inset">
          <v-expansion-panel
            v-for="(typeClr, i) in state.colorblind.visionTypes"
            :key="i"
            :title="typeClr.name"
            :text="typeClr.desc"
          >
          </v-expansion-panel>
        </v-expansion-panels>
      </div>
      <div class="home__vision-subtypes">
        <span class="home__title">Vision Subtypes</span>
        <v-expansion-panels class="home__panels" variant="inset">
          <v-expansion-panel
            v-for="(subTypeClr, i) in state.colorblind.visionSubtypes"
            :key="i"
            :title="subTypeClr.name"
            :text="subTypeClr.desc"
          >
          </v-expansion-panel>
        </v-expansion-panels>
      </div>
    </section>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";

// Components

export default defineComponent({
  name: "HomeView",

  components: {},

  setup() {
    const { state, commit, dispatch } = useStore();
    const router = useRoute();
    // dispatch("generateToken", { routename: router.name });

    function textToSpeech(e) {
      commit("textToSpeech/textToSpeech", {
        event: e,
      });
    }

    function handleDialog(e) {
      commit("textToSpeech/handleDialog", { event: e });
    }

    return {
      textToSpeech,
      handleDialog,
      state,
    };
  },
});
</script>

<style lang="scss">
.v-expansion-panel {
  background-color: var(--primary-color-200);
  color: var(--secondary-color);
}
.home {
  // For the Navigation Thingy
  padding-top: var(--header-height);
  margin: 2rem 2rem 1rem;
  @include flex($dir: column, $gap: 3rem);

  &__intro {
    height: var(--main-height);
    display: grid;
    grid-template-rows: 25rem 1fr;
    grid-template-columns: 1fr;
    align-items: center;
    justify-items: center;
  }

  &__design {
    align-self: end;
    justify-self: end;
    grid-column: 1;
    grid-row: 1;
    width: 15rem;
    opacity: 0.15;
  }

  &__video {
    @include flex($dir: column);
    width: 100%;
    height: clamp(15rem, 60vw, 26rem);

    &-card {
      @include flex($dir: column);
      width: clamp(15rem, 70vw, 100rem);
      max-width: 40rem;
    }

    &-container {
      width: 100%;
      iframe {
        width: 100%;
        height: clamp(10rem, 50vw, 20rem);
      }
    }

    &-content {
      @include flex($justify: space-between);
      width: 100%;
      padding: 0 2rem;
    }
  }

  &__faq {
    @include flex($dir: column, $gap: 3rem, $align: space-between);
    padding: 1rem 0;

    h3 {
      @include font(1.5rem, $weight: 600, $clr: var(--secondary-color));
      text-align: center;
    }
  }

  &__vision-types,
  &__vision-subtypes {
    @include flex($dir: column, $gap: 1rem, $align: space-between);
    span {
      @include font(1rem, $weight: 600, $clr: var(--secondary-color));
    }
  }

  &__panels {
    background-color: var(--primary-color);
    color: var(--secondary-color);
  }

  &__content {
    max-width: 30rem;

    grid-row: 1 / 3;
    grid-column: 1;
    // align-self: start;
    justify-self: start;
    h2 {
      @include font(
        clamp(2rem, 10vw, 3rem),
        $weight: 700,
        $clr: var(--secondary-color)
      );
    }

    @include flex(
      $dir: column,
      $align: flex-start,
      $justify: space-between,
      $gap: 1rem
    );

    span {
      @include font(
        clamp(0.95rem, 2vw, 1rem),
        $weight: 300,
        $clr: var(--secondary-color)
      );
    }

    h1 {
      @include font(
        clamp(2.5rem, 5vw, 4rem),
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

  &__info {
    background-color: var(--primary-color-200);
    border-radius: 0.5rem;
    padding: 2rem;
  }

  &__img {
    width: 14rem;
    width: clamp(15rem, 35vw, 20rem);
  }

  &__dialog {
    width: 25rem;
  }
}

@media (min-width: $min-width-tablet) {
  .home {
    &__intro {
      grid-template-columns: 1fr 1fr;
      grid-template-rows: 1fr;
    }

    &__content {
      max-width: 40rem;
      grid-row: 1 / 3;
      align-self: center;
      h2 {
        @include font(
          clamp(2.5rem, 5vw, 3.5rem),
          $weight: 700,
          $clr: var(--secondary-color)
        );
      }
    }

    &__faq {
      h3 {
        text-align: start;
      }
    }

    &__info {
      padding: 3rem;
    }

    &__design {
      grid-row: 1 / 3;

      align-self: center;
      justify-self: center;
      grid-column: auto;
      // width: 24rem;
      width: clamp(18rem, 40vw, 24rem);
      opacity: 0.75;
    }
  }
}
// @media (min-width: $min-width-desktop) {
//   .home {
//   }
// }
</style>
