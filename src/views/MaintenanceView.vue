<template>
  <div class="auth maintenance">
    <form class="auth__form" @submit.prevent="changeUserPassword">
      <div class="auth__heading">New Password</div>
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
            :append-icon="state.showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :type="state.showPassword ? 'text' : 'password'"
            @click:append="showPassword"
            variant="outlined"
            label="Password"
            v-model="$store.state.password"
            id="password"
          ></v-text-field>
        </div>
        <div class="auth__field">
          <v-btn class="auth__btn" variant="tonal" type="submit"
            >Set New Password</v-btn
          >
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { useRouter } from "vue-router";
export default {
  setup() {
    const { state, commit, dispatch } = useStore();
    const router = useRouter();
    if (!state.fix && !state.user) router.push({ name: "home" });

    function showPassword() {
      commit("showPassword");
    }

    function changeUserPassword() {
      dispatch("changeUserPassword");
    }

    return { state, showPassword, changeUserPassword };
  },
};
</script>

<style lang="scss">
.maintenance {
  margin: var(--header-height) 0 0 0;
}
</style>