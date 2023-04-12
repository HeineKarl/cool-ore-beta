<template>
  <div class="account">
    <form class="account__form-change-password">
      <div class="account__heading">Change Password</div>
      <div class="account__change-password account__container">
        <v-text-field
          clearable
          variant="outlined"
          label="Old Password"
          v-model="state.user.username"
          id="oldPassword"
          type="text"
          :focused="!!state.user.username"
        ></v-text-field>
        <v-text-field
          clearable
          variant="outlined"
          label="New Password"
          v-model="state.user.username"
          id="newPassword"
          type="password"
          :focused="!!state.user.username"
        ></v-text-field>
        <v-text-field
          clearable
          variant="outlined"
          label="Confirm Password"
          v-model="state.user.username"
          id="confirmPassword"
          type="password"
          :focused="!!state.user.username"
        ></v-text-field>
      </div>
    </form>

    <form class="account__delete-account account__container">
      <div class="account__heading">Delete Account</div>
      <span>Once you delete your account, it is permanent.</span>
      <HollowBtn text="Delete your Account" />
    </form>
  </div>
</template>
  
<script>
import { defineComponent, ref } from "@vue/runtime-core";
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

    return {
      state,
    };
  },
});
</script>
  
<style lang="scss">
.v-input,
.account__container {
  max-width: 40rem;
}

.account {
  padding: 3rem 2rem;

  &__heading {
    @include font(1.5rem, $weight: 600, $clr: var(--secondary-color));
  }

  &__container {
    width: 100%;
  }

  &__form-change-password {
    @include flex($dir: column, $align: flex-start, $gap: 2.5rem);
    // height: 2rem;
  }

  &__delete-account {
    @include flex($dir: column, $align: flex-start, $gap: 1.5rem);
    height: 15rem;
  }
}

@media (min-width: $min-width-tablet) {
  .v-input,
  .account__container {
    max-width: clamp(20rem, 60vw, 40rem);
  }

  .account {
    padding: 0 2rem;

    &__form-change-password {
      @include flex($dir: column, $align: flex-start, $gap: 2.5rem);
    }

    &__delete-account {
      @include flex($dir: column, $align: flex-start, $gap: 0.75rem);
    }
  }
}
</style>