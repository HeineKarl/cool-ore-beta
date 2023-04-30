<template>
  <div class="auth">
    <v-form class="auth__form" ref="form" @submit.prevent="insertUser">
      <div class="auth__heading">Register</div>
      <span class="auth__reroute">
        Have an account?
        <router-link :to="{ name: 'login' }">Login Now</router-link>
      </span>
      <div
        v-if="$store.state.message"
        :class="$store.state.ok ? 'success' : 'fail'"
        class="auth__field auth__message"
      >
        <span>{{ state.message }}</span>
      </div>
      <div class="auth__fields">
        <div class="auth__field">
          <v-text-field
            clearable
            variant="outlined"
            label="Username"
            v-model="state.username"
            :rules="state.rules"
            id="username"
            type="username"
          ></v-text-field>
        </div>
        <div class="auth__field">
          <v-text-field
            clearable
            variant="outlined"
            label="Email"
            v-model="state.email"
            :rules="state.rules"
            id="email"
            type="email"
          ></v-text-field>
        </div>
        <div class="auth__field">
          <v-text-field
            :append-icon="state.showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :type="state.showPassword ? 'text' : 'password'"
            @click:append="showPassword"
            clearable
            variant="outlined"
            label="Password"
            v-model="state.password"
            :rules="state.rules"
            id="password"
          ></v-text-field>
        </div>
        <div class="auth__field">
          <v-btn class="auth__btn" variant="tonal" type="submit"
            >Register</v-btn
          >
        </div>
      </div>
    </v-form>
  </div>
</template>

<script>
import { defineComponent, ref } from "@vue/runtime-core";
import { useStore } from "vuex";

export default defineComponent({
  name: "RegisterView",

  setup() {
    const { state, commit, dispatch } = useStore();
    const form = ref(null);
    commit("resetForm");

    async function insertUser() {
      const { valid } = await form.value.validate();
      if (valid) {
        dispatch("insertUser");
      }
    }

    function showPassword() {
      commit("showPassword");
    }

    return { state, form, insertUser, showPassword };
  },
});
</script>

<style lang="scss">
.auth {
  // For the Navigation Thingy
  margin: var(--header-height) 0 0;

  &__fields {
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