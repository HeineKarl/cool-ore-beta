<template>
  <div v-if="state.templateValidation" class="audio">
    <div class="audio__heading">Audio Synthesis</div>
    <form class="audio__form">
      <div class="audio__tester">
        <v-text-field
          class="audio-input"
          v-model="state.textToSpeech.message"
          variant="outlined"
          clear-icon="mdi-close-circle"
          clearable
          label="Audio Tester"
          type="text"
        >
          <v-btn
            @click="sendMessage"
            elevation="0"
            small
            icon="mdi-volume-high"
          ></v-btn>
        </v-text-field>
      </div>

      <v-select
        :items="state.textToSpeech.accents"
        v-model="state.textToSpeech.accent"
        @update:model-value="setAccent"
        class="audio__accent"
        variant="outlined"
        label="Audio Accent"
        id="accent"
      >
      </v-select>

      <div class="audio__pitch audio__container">
        <span>Audio Pitch</span>
        <v-slider
          show-ticks="always"
          step="0.5"
          tick-size="2"
          v-model="state.textToSpeech.pitch"
          :ticks="state.textToSpeech.pitchTicks"
          :max="2"
        ></v-slider>
      </div>

      <div class="audio__speed audio__container">
        <span>Audio Speed</span>
        <v-slider
          v-model="state.textToSpeech.rate"
          :ticks="state.textToSpeech.rateTicks"
          :max="2"
          :min="0.5"
          step="0.5"
          show-ticks="always"
          tick-size="2"
        ></v-slider>
      </div>

      <div class="audio__volume audio__container">
        <span>Audio Volume</span>
        <v-slider
          v-model="state.textToSpeech.volume"
          :ticks="state.textToSpeech.volumeTicks"
          :max="1"
          step=".25"
          show-ticks="always"
          tick-size="2"
        ></v-slider>
      </div>

      <div class="audio__cta">
        <SolidBtn @click="handleDialogAudio" text="Save Changes" />
      </div>
    </form>

    <v-dialog
      class="audio__dialog"
      persistent
      v-model="state.textToSpeech.isUpdateDialog"
    >
      <v-card>
        <v-card-text>Do you really want to update?</v-card-text>
        <v-card-actions>
          <v-btn color="error" @click="handleDialogAudio">Cancel</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="success" @click="updateAudio">Update</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
    
<script>
import { defineComponent } from "@vue/runtime-core";
import { useStore } from "vuex";
import { useRoute } from "vue-router";

import HollowBtn from "@/components/HollowBtn.vue";
import SolidBtn from "@/components/SolidBtn.vue";

export default defineComponent({
  components: { HollowBtn, SolidBtn },
  setup() {
    const { state, commit, dispatch } = useStore();
    const router = useRoute();

    dispatch("generateToken", { routename: router.name });

    // commit("textToSpeech/getAudio", {
    //   id: parseInt(sessionStorage.getItem("id")),
    // });

    function sendMessage() {
      commit("textToSpeech/textToSpeech");
    }

    function setAccent() {
      commit("textToSpeech/setAccent");
    }

    function handleDialogAudio() {
      commit("textToSpeech/handleUpdateDialog");
    }

    function updateAudio() {
      commit("textToSpeech/updateAudio", { id: state.user.id });
    }

    return {
      state,
      sendMessage,
      setAccent,
      handleDialogAudio,
      updateAudio,
    };
  },
});
</script>
    
<style lang="scss"  >
.v-input,
.audio__container {
  max-width: 40rem;
}

.audio {
  @include flex($dir: column, $gap: 2rem);
  padding: 3rem 2rem;

  &__heading {
    @include font(1.5rem, $weight: 600, $clr: var(--secondary-color));
  }

  &__form {
    @include flex($dir: column, $gap: 2.5rem);
    width: 100%;
  }

  &__tester {
    @include flex();

    .v-field__input {
      @include flex($gap: 1rem, $dir: row-reverse);
    }

    button[type="button"] {
      background-color: transparent;
    }
  }

  &__accent,
  &__pitch,
  &__speed,
  &__volume,
  &__tester {
    width: inherit;

    span {
      @include font(1rem, $weight: 400, $clr: var(--secondary-color));
    }
  }

  &__cta {
    @include flex($gap: 0.25rem, $justify: flex-start);
    width: 100%;
  }
}

@media (min-width: $min-width-tablet) {
  .v-input,
  .audio__container {
    max-width: clamp(20rem, 60vw, 40rem);
  }

  .audio {
    @include flex($dir: column, $gap: 2rem, $align: flex-start);
    padding: 3rem 2rem;

    &__heading {
      margin-left: 2rem;
    }

    &__form {
      @include flex(
        $dir: column,
        $align: flex-start,
        $justify: space-between,
        $gap: 2.5rem
      );

      width: 100%;
    }

    &__tester {
      @include flex($justify: flex-start);
    }

    &__cta {
      @include flex($gap: 0.75rem, $justify: flex-start);
      width: 100%;
    }
  }
}
</style>