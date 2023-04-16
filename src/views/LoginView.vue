<template>
  <div class="auth">
    <form class="auth__form" @submit.prevent="verifyUser">
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
            id="email"
            type="email"
          ></v-text-field>
        </div>
        <div class="auth__field">
          <v-text-field
            clearable
            variant="outlined"
            label="Password"
            v-model="$store.state.password"
            id="password"
            type="password"
          ></v-text-field>
        </div>
        <div class="auth__field">
          <v-btn class="auth__btn" variant="tonal" type="submit">Login</v-btn>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
// import { mapActions, mapMutations } from "vuex";
import { defineComponent } from "@vue/runtime-core";
import { useStore } from "vuex";

export default defineComponent({
  name: "LoginView",
  setup() {
    const { state, commit, dispatch } = useStore();

    commit("resetForm");

    const userId = sessionStorage.getItem("id");
    commit("navigationList/handleAccountList", userId);

    function verifyUser() {
      dispatch("verifyUser");
    }
    return {
      state,
      verifyUser,
    };
  },
});
</script>

<style lang="scss">
.auth {
  // For the Navigation Thingy
  margin: var(--header-height) 0 0;
}
</style>