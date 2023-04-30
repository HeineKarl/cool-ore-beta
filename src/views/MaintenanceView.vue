<template>
  <div class="auth maintenance">
    <v-form ref="form" class="auth__form" @submit.prevent="changeUserPassword">
      <div class="auth__heading">New Password</div>
      <span v-if="isUserId" class="auth__reroute">
        Have an account?
        <router-link :to="{ name: 'login' }">Login Now</router-link>
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
        <div class="auth__field">
          <v-btn class="auth__btn" variant="tonal" type="submit"
            >Set New Password</v-btn
          >
        </div>
      </div>
    </v-form>
  </div>
</template>

<script>
import { defineComponent, ref } from "@vue/runtime-core";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
export default defineComponent({
  setup() {
    const { state, commit, dispatch } = useStore();
    const router = useRouter();
    const form = ref(null);
    const isUserId = ref(!sessionStorage.getItem("id"));

    if (!sessionStorage.getItem("id")) {
      commit("resetForm");
    }

    // if the window loads
    if (
      document.readyState == "interactive" ||
      document.readyState == "complete"
    ) {
      router.push({ name: "maintenance" });
    } else if (!state.fix && !state.user) router.push({ name: "home" });

    function showPassword() {
      commit("showPassword");
    }

    async function changeUserPassword() {
      const { valid } = await form.value.validate();
      if (valid) {
        dispatch("changeUserPassword");
      }
    }

    return { state, form, isUserId, showPassword, changeUserPassword };
  },
});
</script>

<style lang="scss">
.maintenance {
  margin: var(--header-height) 0 0 0;
}

.auth {
  &__fields {
    @include flex($dir: column, $align: flex-start, $gap: 0.35rem);
  }

  &__reroute {
    a {
      @include font(0.85rem, $weight: 500, $clr: var(--success-color));
    }
  }
}
</style>