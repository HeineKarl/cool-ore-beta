<template>
  <div class="auth">
    <v-form class="auth__form" ref="form" @submit.prevent="verifyUser">
      <div class="auth__heading">Login</div>
      <span class="auth__reroute">
        Don't have an account?
        <router-link :to="{ name: 'register' }">Register Now</router-link>
      </span>

      <div
        v-if="$store.state.message"
        :class="$store.state.ok ? 'success' : 'fail'"
        class="auth__field auth__message"
      >
        <span>{{ $store.state.message }} </span>
      </div>
      <div class="auth__fields">
        <div class="auth__field">
          <v-text-field
            clearable
            variant="outlined"
            label="Email"
            v-model="$store.state.email"
            :rules="state.rules"
            id="email"
            type="email"
          ></v-text-field>
        </div>
        <div class="auth__field">
          <v-text-field
            clearable
            :append-icon="state.showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :type="state.showPassword ? 'text' : 'password'"
            @click:append="showPassword"
            variant="outlined"
            label="Password"
            v-model="$store.state.password"
            :rules="state.rules"
            id="password"
          ></v-text-field>
        </div>
        <span class="auth__reroute">
          <router-link @click="changeUserBoolean" :to="{ name: 'maintenance' }"
            >Forgot Password?</router-link
          >
        </span>
        <div class="auth__field">
          <v-btn class="auth__btn" variant="tonal" type="submit">Login</v-btn>
        </div>
      </div>
    </v-form>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "LoginView",

  setup() {
    const { state, commit, dispatch } = useStore();
    const form = ref(null);

    commit("resetForm");

    const userId = sessionStorage.getItem("id");
    commit("navigationList/handleAccountList", userId);

    async function verifyUser() {
      const { valid } = await form.value.validate();
      if (valid) {
        dispatch("verifyUser");
      }
    }

    function showPassword() {
      commit("showPassword");
    }

    function changeUserBoolean() {
      commit("changeUserBoolean");
    }

    return {
      state,
      form,
      verifyUser,
      showPassword,
      changeUserBoolean,
    };
  },
});
</script>

<style lang="scss">
// .v-field__field,
// .v-field__overlay,
// .v-input__control {
//   background-color: var(--primary-color);
// }
.auth {
  // For the Navigation Thingy
  margin: var(--header-height) 0 0;

  &__fields {
    margin-top: 0.5rem;
    @include flex($dir: column, $align: flex-start, $gap: 0.35rem);
  }

  &__field {
    input {
      @include font(1rem, $weight: 300, $clr: var(--secondary-color));
    }
  }

  &__field input[type="password"] {
    @include font(1.5rem, $weight: 300, $clr: var(--secondary-color));
  }

  &__reroute {
    a {
      @include font(0.85rem, $weight: 500, $clr: var(--success-color));
    }
  }
}
</style>