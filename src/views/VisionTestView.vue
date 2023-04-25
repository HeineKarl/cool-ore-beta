<template>
  <div class="vision-test">
    <div v-if="!state.visionTest.end" class="vision-test__card">
      <div class="vision-test__frame">
        <span>{{ state.visionTest.imageIndex + 1 }} / 25</span>
        <div class="vision-test__ishihara">
          <img
            :src="
              state.visionTest.ishihara_red_green[state.visionTest.imageIndex]
                .img
            "
            alt=""
          />
        </div>
      </div>

      <form class="vision-test__form">
        <v-text-field
          class="vision-test__answer"
          clearable
          variant="outlined"
          label="First Number"
          v-model="state.visionTest.answer1"
          id="answer"
          type="text"
          v-if="state.visionTest.imageIndex >= 21"
        ></v-text-field>
        <v-text-field
          class="vision-test__answer"
          clearable
          variant="outlined"
          label="Second Number"
          v-model="state.visionTest.answer2"
          id="answer"
          type="text"
          v-if="state.visionTest.imageIndex >= 21"
        ></v-text-field>

        <v-text-field
          class="vision-test__answer"
          clearable
          variant="outlined"
          label="Answer"
          v-model="state.visionTest.answer"
          id="answer"
          type="text"
          v-else
        ></v-text-field>

        <div class="vision-test__btn">
          <v-btn
            @click.prevent="visionEval"
            class="vision-test__submit"
            variant="tonal"
            block
            type="submit"
            >Submit</v-btn
          >
          <v-btn
            @click.prevent="visionNothing"
            class="vision-test__nothing"
            variant="tonal"
            block
            type="submit"
            >Nothing</v-btn
          >
        </div>
      </form>
    </div>

    <section v-else class="vision-test__info">
      <h3>{{ state.visionTest.result.vision }}</h3>
      <p>
        {{ state.visionTest.result.desc }}
      </p>

      <div class="vision-test__result">
        <HollowBtn @click="takeVisionTestAgain" text="Take Vision Test again" />
        <SolidBtn :to="{ name: 'profile' }" text="Go to Profile" />
      </div>
    </section>
  </div>
</template>

<script>
import { useStore } from "vuex";

import SolidBtn from "@/components/SolidBtn.vue";
import HollowBtn from "@/components/HollowBtn.vue";
export default {
  components: { SolidBtn, HollowBtn },
  setup() {
    const { state, commit, dispatch } = useStore();

    function visionEval() {
      commit("visionTest/nextIshihara");
      console.log(!!state.visionTest.result.vision);
      if (!!state.visionTest.result.vision) {
        dispatch("visionTest/updateUserVision");
      }
    }

    function visionNothing() {
      commit("visionTest/nextIshihara", "Nothing");
    }

    function takeVisionTestAgain() {
      location.reload();
    }

    return { state, visionEval, visionNothing, takeVisionTestAgain };
  },
};
</script>

<style lang="scss">
.vision-test {
  // For the Navigation Thingy
  margin: calc(var(--header-height)) 0 0;
  height: var(--main-height);

  @include flex();
  padding: 1rem;

  &__card {
    @include flex($dir: column, $justify: space-between, $gap: 2rem);
    margin-bottom: 4rem;
  }

  &__frame {
    @include flex($dir: column, $justify: space-between);
  }

  &__info {
    background-color: var(--primary-color-200);
    margin: auto;
    padding: 2rem;
    max-width: 40rem;
  }

  &__result {
    @include flex($justify: flex-start, $gap: 1rem);
    padding: 1rem 0 0.5rem;
  }

  &__ishihara {
    margin: 1.5rem 0;
    width: clamp(12rem, 30vw, 18rem);
  }

  &__form {
    @include flex($dir: column);
    max-width: 30rem;
    padding: 0 1rem;
    width: 100%;
  }

  &__btn {
    @include flex($gap: 1rem);
    width: clamp(7rem, 20vw, 12rem);
  }

  &__answer {
    width: 100%;
  }

  &__submit {
    background-color: var(--success-color);
    color: var(--light-color);
  }
  &__nothing {
    background-color: var(--alert-color);
    color: var(--light-color);
  }

  @media (min-width: $min-width-tablet) {
    .vision-test {
      @include flex();
      &__card {
        padding-top: 5rem;
        @include flex($dir: row, $gap: 3rem);
      }

      &__form {
        padding: 0 1rem;
        width: clamp(15rem, 40vw, 25rem);
      }
    }
  }
}
</style>