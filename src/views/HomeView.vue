<template>
  <div class="home">
    <section class="home__intro">
      <div class="home__intro-content">
        <h2>Carefully Programmed to help better Color Vision</h2>
        <p>
          A Capstone Research Project implemented in used to support and spread
          awareness to Color Vision Deficiency. Cool-ore guides and provides
          color parameters to see betterment for Website users.
        </p>
      </div>
      <div class="home__intro-design">
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
            src="https://youtube.com/embed/xtwsqPjKkLo"
            allowfullscreen
            allow="0"
          ></iframe>
        </div>

        <div class="home__video-content">
          <v-card-title class="ma-0 pa-0" style="font-size: 1rem"
            >Color Design</v-card-title
          >
          <!-- <v-spacer></v-spacer> -->
          <!-- <v-btn icon elevation="0">
            <v-icon>mdi-information</v-icon>
          </v-btn> -->
        </div>
      </v-card>

      <div class="home__video-design-right">
        <img :src="require('@/assets/design/color_stripe.png')" />
      </div>
      <div class="home__video-design-left">
        <img :src="require('@/assets/design/color_stripe.png')" />
      </div>
    </section>

    <section class="home__info">
      <h3>What is Cool-ore?</h3>
      <p>
        An easy navigational website that shows how people with color vision
        deficiency locks into their vision and must comprehend better with it.
      </p>
    </section>

    <v-carousel
      class="home__carousel"
      cycle
      show-arrows="hover"
      hide-delimiters
    >
      <v-carousel-item
        v-for="text in state.colorblind.testimonials"
        class="home__carousel-item"
        cover
      >
        <span class="home__carousel-quote-left">"</span>
        <span class="home__carousel-heading">{{ text.heading }}</span>
        <span class="home__carousel-testimonial">{{ text.testimonial }} </span>
        <span class="home__carousel-credential"
          >From {{ text.credential }}</span
        >
        <span class="home__carousel-quote-right">"</span>
      </v-carousel-item>
    </v-carousel>

    <section class="home__faq">
      <h3>Frequently Asked Questions</h3>
      <div class="home__faq-vision-types">
        <span class="home__faq-title">Vision Types</span>
        <v-expansion-panels class="home__faq-panels" variant="inset">
          <v-expansion-panel
            v-for="(typeClr, i) in state.colorblind.visionTypes"
            :key="i"
            :title="typeClr.name"
            :text="typeClr.desc"
          >
          </v-expansion-panel>
        </v-expansion-panels>
      </div>
      <div class="home__faq-vision-subtypes">
        <span class="home__faq-title">Vision Subtypes</span>
        <v-expansion-panels class="home__faq-panels" variant="inset">
          <v-expansion-panel
            v-for="(subTypeClr, i) in state.colorblind.visionSubtypes"
            :key="i"
            :title="subTypeClr.name"
            :text="subTypeClr.desc"
          >
          </v-expansion-panel>
        </v-expansion-panels>
      </div>

      <div class="home__faq-design-left">
        <img :src="require('@/assets/design/color_stripe_horizontal.png')" />
      </div>
      <div class="home__faq-design-right">
        <img :src="require('@/assets/design/color_stripe_horizontal.png')" />
      </div>
    </section>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { useStore } from "vuex";

// Components

export default defineComponent({
  name: "HomeView",

  components: {},

  setup() {
    const { state, commit } = useStore();

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
  @include flex($dir: column, $gap: 5rem);
  margin: calc(var(--header-height) + 0.5rem) 1.25rem;

  &__intro {
    display: grid;
    gap: 2rem;
    grid-template-rows: 25rem 1fr;
    grid-template-columns: 1fr;
    align-items: center;
    justify-items: center;

    &-content {
      max-width: 30rem;
      grid-row: 1 / 3;
      grid-column: 1;
      justify-self: start;

      h1 {
        @include font(
          clamp(2.5rem, 5vw, 4rem),
          $weight: 800,
          $clr: var(--secondary-color)
        );
      }

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

      p {
        @include font(
          clamp(0.95rem, 1.5vw, 1rem),
          $weight: 400,
          $clr: var(--secondary-color)
        );
        line-height: 1.5;
      }
    }

    &-design {
      align-self: end;
      justify-self: end;
      grid-column: 1;
      grid-row: 1;
      width: 15rem;
      opacity: 0.15;
    }
  }

  &__info {
    @include flex($dir: column, $gap: 1rem);
    background-color: var(--primary-color-200);
    border-radius: 0.5rem;
    padding: 1rem;

    h3,
    p {
      text-align: center;
      max-width: 50rem;
    }

    h3 {
      @include font(
        clamp(1.35rem, 5vw, 2.25rem),
        $weight: 700,
        $clr: var(--secondary-color)
      );
    }
  }

  &__video {
    @include flex($dir: column);
    @include position(relative);
    z-index: 5;
    width: 100%;
    height: clamp(15rem, 60vw, 26rem);

    &-card {
      @include flex($dir: column);
      @include position(relative);
      z-index: 5;
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
      padding: 0.5rem 2rem;
    }

    &-design-left,
    &-design-right {
      z-index: 1;
      width: clamp(5rem, 40vw, 15rem);
      opacity: 0.15;
    }

    &-design-left {
      @include position(absolute, $bl: true, $x: -1rem, $y: -1rem);
      animation: slide-design-vertical 5s linear 2s infinite alternate;
    }

    &-design-right {
      @include position(absolute, $tr: true, $x: -1rem, $y: -1rem);
      animation: slide-design-vertical 5s linear 2s infinite alternate-reverse;
    }
  }
  .v-btn {
    opacity: 0.95;
    background-color: var(--primary-color-200);
    color: var(--secondary-color-200);
  }

  &__carousel {
    max-width: 60rem;
    background-color: var(--primary-color-600);
    border-radius: 0.5rem;
    padding: 2rem;

    &-item {
      @include flex();
    }

    &-heading {
      @include font(
        clamp(1.75rem, 5vw, 3rem),
        $weight: 700,
        $clr: var(--secondary-color)
      );
      display: block;
      padding: 1rem 0;
    }
    &-testimonial {
      @include font(
        clamp(0.5rem, 5vw, 1rem),
        $weight: 400,
        $clr: var(--secondary-color)
      );
      display: block;
    }

    &-credential {
      margin-bottom: 2rem;
      @include font(
        clamp(0.5rem, 5vw, 1rem),
        $weight: 100,
        $clr: var(--secondary-color)
      );
      display: block;
      margin-top: 2rem;
    }

    &-quote-left {
      @include font(
        clamp(10rem, 5vw, 14rem),
        "Space Grotesk",
        700,
        $clr: var(--secondary-color)
      );
      @include position(absolute, $tl: true);
    }
    &-quote-right {
      @include font(
        clamp(10rem, 5vw, 14rem),
        "Space Grotesk",
        700,
        $clr: var(--secondary-color)
      );
      @include position(absolute, $br: true, $x: 3rem, $y: -1rem);
    }
  }

  &__faq {
    @include flex($dir: column, $gap: 3rem, $align: space-between);
    @include position(relative);
    z-index: 5;
    padding: 1rem 0;
    max-width: 50rem;

    h3 {
      @include font(1.75rem, $weight: 600, $clr: var(--secondary-color));
      text-align: center;
    }

    &-vision-types,
    &-vision-subtypes {
      @include flex($dir: column, $gap: 1rem, $align: space-between);
      @include position(relative);
      z-index: 5;
      span {
        @include font(1rem, $weight: 600, $clr: var(--secondary-color));
      }
    }

    &-panels {
      background-color: var(--primary-color);
      color: var(--secondary-color);
    }

    &-design-left,
    &-design-right {
      z-index: 1;
      width: clamp(5rem, 40vw, 15rem);
      opacity: 0.15;
    }

    &-design-left {
      @include position(absolute, $bl: true, $x: -4rem, $y: -2rem);
      animation: slide-design-horizontal 5s linear 2s infinite alternate;
    }

    &-design-right {
      @include position(absolute, $tr: true, $x: -4rem, $y: 6rem);
      animation: slide-design-horizontal 5s linear 2s infinite alternate-reverse;
    }
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
    margin: calc(var(--header-height) + 0.5rem) 3rem;

    &__intro {
      grid-template-columns: 1fr 1fr;
      grid-template-rows: 1fr;

      &-content {
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

      &-design {
        grid-row: 1 / 3;
        align-self: center;
        justify-self: center;
        grid-column: auto;
        width: clamp(18rem, 40vw, 24rem);
        opacity: 0.75;
      }
    }

    &__video {
      &-design-left,
      &-design-right {
        opacity: 0.75;
      }
    }

    &__carousel {
      &-item {
        padding: 2rem 6rem;
      }
    }

    &__faq {
      &-design-left,
      &-design-right {
        opacity: 0.75;
      }
    }

    &__info {
      padding: 3rem;
    }
  }
}
// @media (min-width: $min-width-desktop) {
//   .home {
//   }
// }
</style>
