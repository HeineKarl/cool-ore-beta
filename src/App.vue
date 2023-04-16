<template>
  <v-app>
    <v-main>
      <header class="header app-bar">
        <div class="header__inner">
          <Logo @mouseover="textToSpeech" />
          <h1 class="header__logo-name">Cool-ore</h1>
          <v-spacer></v-spacer>

          <div class="header__collection">
            <v-btn
              @mouseover="textToSpeech"
              v-if="!state.user"
              class="header__login"
              elevation="0"
              :to="{ name: 'login' }"
            >
              Login
            </v-btn>

            <v-btn
              @mouseover="textToSpeech"
              v-if="state.user"
              class="header__vision"
              elevation="0"
              :to="{ name: 'vision-test' }"
            >
              Vision Test
            </v-btn>

            <v-app-bar-nav-icon
              @click="navigation"
              class="header__burger"
              elevation="0"
            ></v-app-bar-nav-icon>
          </div>
        </div>
        <v-progress-linear
          v-if="state.progressShow"
          class="header__progress"
          :model-value="state.progressVal"
        ></v-progress-linear>
      </header>

      <v-navigation-drawer
        class="header__navigation"
        v-model="isNavOpen"
        location="right"
        temporary
      >
        <v-card v-if="state.user" variant="outlined" class="header__profile">
          <div class="header__profile-inner">
            <v-card-title class="header__profile-name">{{
              state.user.user_name
            }}</v-card-title>
            <v-card-text class="header__profile-text">{{
              state.user.bio.slice(0, 30) + "..."
            }}</v-card-text>
          </div>
          <v-avatar size="50">
            <img :src="state.user.profile_image" />
          </v-avatar>
        </v-card>

        <div v-else class="header__subheader">
          <Logo @mouseover="textToSpeech" />
          <CloseBtn @click="navigation" />
        </div>

        <div class="header__links">
          <ul class="header__pages">
            <div class="header__pages__title">
              <span>Pages</span>
            </div>
            <NavigationList :lists="state.navigationList.navigationLists" />
          </ul>

          <ul v-if="state.user" class="header__settings">
            <div class="header__settings__title">
              <span>Settings</span>
            </div>
            <NavigationList :lists="state.navigationList.settingsLists" />
          </ul>

          <ul class="header__account">
            <div class="header__account__title">
              <span>Account</span>
            </div>
            <v-list density="compact" active-class="header__nav-active" nav>
              <v-list-item
                v-if="!state.user"
                class="header__lists header__login"
                value="login"
                :to="{ name: state.navigationList.login.name }"
              >
                <template v-slot:prepend>
                  <v-icon :icon="state.navigationList.login.icon"></v-icon>
                </template>

                <v-list-item-title
                  v-text="state.navigationList.login.text"
                ></v-list-item-title>
              </v-list-item>
              <v-list-item
                v-else
                class="header__lists header__logout"
                value="logout"
                :to="{ name: state.navigationList.logout.name }"
                @click="state.navigationList.logout.func()"
              >
                <template v-slot:prepend>
                  <v-icon :icon="state.navigationList.logout.icon"></v-icon>
                </template>

                <v-list-item-title
                  v-text="state.navigationList.logout.text"
                ></v-list-item-title>
              </v-list-item>
            </v-list>
          </ul>
        </div>
      </v-navigation-drawer>

      <router-view v-if="state.templateValidation" />

      <footer v-if="state.templateValidation">
        Design and Created 2023 | Cool-ore
      </footer>

      <v-dialog
        class="home__dialog"
        persistent
        v-model="state.textToSpeech.dialog"
        width="400"
      >
        <v-card>
          <v-card-text> Do you want to read it for you? </v-card-text>
          <v-card-actions>
            <v-btn color="error" @click="handleDialog">No, thank you</v-btn>
            <v-spacer></v-spacer>
            <v-btn color="success" @click="allowSpeaking">Yes, please</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-main>
  </v-app>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useStore } from "vuex";
import Logo from "./components/Logo.vue";
import CloseBtn from "./components/CloseBtn.vue";
import NavigationList from "./components/NavigationList.vue";
// import Speech from "@/utils/Speech";

export default defineComponent({
  name: "App",
  components: { Logo, CloseBtn, NavigationList },
  setup() {
    const appBarElevation = ref(0);

    window.addEventListener("scroll", (e) => {
      if (document.querySelector("html").scrollTop === 0) {
        document.querySelector(".app-bar").classList.remove("elevated");
      } else {
        document.querySelector(".app-bar").classList.add("elevated");
      }
    });

    // Initialize Store and Ref
    const { state, commit, dispatch } = useStore();
    const isNavOpen = ref(false);

    dispatch("generateToken");

    // Get the voices of the Audio Synthesis
    let voices, accents, accent, pitch, rate, volume, defaultVoice;
    voices = window.speechSynthesis.getVoices();

    window.addEventListener("load", () => {
      voices = window.speechSynthesis.getVoices();
      accents = voices.map((voice) => voice.name);
      accent =
        state.textToSpeech.accent ||
        voices.find((voice) => voice.default == true);
      pitch = state.textToSpeech.pitch || 1;
      rate = state.textToSpeech.rate || 1;
      volume = state.textToSpeech.volume || 1;

      defaultVoice = accents.findIndex((elaccent) => elaccent === accent);

      commit("textToSpeech/setValue", {
        voices,
        accents,
        accent: accent.name,
        pitch,
        rate,
        volume,
        defaultVoice,
      });
    });

    // If user is not log in
    if (!sessionStorage.getItem("id")) commit("setTemplateValidation");

    function textToSpeech(e) {
      commit("textToSpeech/textToSpeech", {
        event: e,
      });
    }

    function navigation() {
      isNavOpen.value = !isNavOpen.value;
    }

    function allowSpeaking() {
      commit("textToSpeech/allowSpeaking");
      commit("textToSpeech/textToSpeech", {
        event: state.textToSpeech.event,
      });
    }

    function handleDialog(e) {
      commit("textToSpeech/handleDialog", { event: e });
    }

    return {
      textToSpeech,
      navigation,
      allowSpeaking,
      handleDialog,
      state,
      isNavOpen,
      appBarElevation,
    };
  },
});
</script>

<style lang="scss">
@include reset();
@import "./sass/_auth";

.v-progress-linear__determinate {
  background-color: var(--success-color);
}

.app-bar {
  // @include flex($justify: space-between);
  background-color: var(--primary-color);
  opacity: 0.99;
  width: 100%;
  // height: var(--header-height);
  min-height: var(--header-height);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  box-shadow: 0 0px 1px 0 var(--secondary-color);
  transition: all 200ms ease;
}

.app-bar.elevated {
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.5);
}

.header {
  width: 100%;
  // height: var(--header-height);

  &__inner {
    @include flex($justify: space-between);
    margin: 0 2rem;
  }

  &__logo-name {
    display: none;
  }

  &__navigation {
    // @include flex($dir: column, $gap: 1rem);
    background-color: var(--primary-color);
    color: var(--secondary-color);
  }

  &__nav-active {
    @include font(1.25rem, $weight: 900, $clr: var(--secondary-color));
  }

  &__close {
    @include position(absolute, $tl: true, $x: 0.5rem, $y: 0.5rem);
    background-color: var(--primary-color);
    color: var(--secondary-color);
  }

  &__burger {
    background-color: var(--primary-color);
  }

  &__login,
  &__vision {
    background-color: var(--success-color);
    color: var(--light-color);
  }

  &__vision {
    display: none;
  }

  &__profile {
    @include flex($gap: 1rem, $dir: row-reverse);
    background-color: var(--primary-color);
    border: 1px solid var(--secondary-color);
    margin: 1.5rem 1rem;
    padding: 0.5rem 0;
    // padding: 1rem 2rem 1rem 1rem;

    &-inner {
      @include flex($dir: column, $align: flex-start);
      // height: 2rem;
    }

    &-name {
      @include font(1rem, $weight: 600, $clr: var(--secondary-color));
      margin: 0;
      padding: 0;
    }

    &-text {
      @include font(0.75rem, $weight: 400, $clr: var(--secondary-color));
      margin: 0;
      padding: 0;
    }
    // height: 6rem;
  }

  &__subheader {
    @include position(relative);
    @include flex();
    height: 8rem;
  }

  &__logo {
    width: 4rem;
  }

  &__pages__title,
  &__settings__title,
  &__account__title {
    @include position(relative);
    margin-left: 1rem;
    padding-bottom: 0.5rem;

    &::after {
      @include position(absolute, $bl: true);
      content: "";
      width: 90%;
      height: 1px;
      background-color: black;
    }
  }

  &__lists {
    text-decoration: none;
  }

  &__links {
    @include flex($dir: column, $justify: space-between, $gap: 1rem);
    margin-bottom: 1rem;

    ul {
      width: 100%;
    }
  }

  &__login {
    background-color: var(--success-color);
    color: var(--light-color);
  }

  &__logout {
    background-color: var(--alert-color);
    color: var(--light-color);
  }

  &__collection {
    @include flex($justify: space-between, $gap: 1rem);
  }
}

footer {
  color: var(--secondary-color);
}

@media (min-width: $min-width-tablet) {
  .header {
    &__logo-name,
    &__vision {
      @include flex();
    }
  }
}

// @media (min-width: $min-width-tablet) {
//   .header {
//     &__nav {
//       @include flex($dir: row, $justify: space-around);
//       margin-right: 1rem;
//       box-shadow: none;
//       width: 25rem;
//       position: relative;
//       transform: translateX(0);
//     }

//     // &__burger,
//     // &__close,
//     // &__subheader {
//     //   display: none;
//     // }

//     &__links {
//       @include flex($dir: row, $justify: space-around);
//       width: 100%;
//       margin-bottom: 0;
//       height: auto;
//     }
//   }
// }

// @media (min-width: $min-width-desktop) {
//   .header {
//     &__inner {
//       margin: 0 4.25rem;
//     }
//   }
// }
</style>
