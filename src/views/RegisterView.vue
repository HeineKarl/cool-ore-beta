<template>
  <div class="auth">
    <form class="auth__form" @submit.prevent="insertUser">
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
            id="email"
            type="email"
            :rules="[(v) => !!v || 'This field is required']"
          ></v-text-field>
        </div>
        <div class="auth__field">
          <v-text-field
            clearable
            variant="outlined"
            label="Password"
            v-model="state.password"
            id="password"
            type="password"
          ></v-text-field>
        </div>
        <div class="auth__field">
          <v-btn class="auth__btn" variant="tonal" type="submit"
            >Register</v-btn
          >
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { defineComponent } from "@vue/runtime-core";
import { useStore } from "vuex";

export default defineComponent({
  name: "RegisterView",

  setup() {
    const { state, commit, dispatch } = useStore();

    commit("resetForm");

    function insertUser() {
      dispatch("insertUser");
    }

    return { state, insertUser };
  },
});
</script>

<style lang="scss">
</style>