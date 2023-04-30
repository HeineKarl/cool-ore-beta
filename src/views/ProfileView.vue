<template >
  <div v-if="state.templateValidation" class="profile">
    <div class="profile__heading">Profile</div>
    <v-form ref="form" class="profile__form">
      <div class="profile__pic">
        <v-btn x-small class="profile__file" icon>
          <v-icon class="profile__camera" aria-hidden="false">
            mdi-camera</v-icon
          >
          <input @change="selectedFile" type="file" />
        </v-btn>
        <div class="profile__img">
          <img
            :src="
              state.user?.profile_image ||
              state.profile?.profile_image ||
              require('@/assets/img/default_profile.png')
            "
            :alt="state.user?.user_name"
          />
        </div>
      </div>

      <div class="profile__fields">
        <v-text-field
          clearable
          variant="outlined"
          label="Username"
          v-model="state.user.user_name"
          :rules="state.rules"
          id="username"
          type="text"
          hint="12 characters only"
          maxlength="12"
        >
        </v-text-field>
        <v-text-field
          clearable
          variant="outlined"
          label="First Name"
          v-model="state.user.first_name"
          :rules="state.rules"
          id="firstname"
          type="text"
        >
        </v-text-field>
        <v-text-field
          clearable
          variant="outlined"
          label="Last Name"
          v-model="state.user.last_name"
          :rules="state.rules"
          id="lastname"
          type="text"
        >
        </v-text-field>

        <div class="profile__container">
          <v-text-field
            class="profile__age"
            clearable
            variant="outlined"
            label="Age"
            v-model="state.user.age"
            id="age"
            type="number"
          >
            <!-- :focused="!!state.user.age" -->
          </v-text-field>

          <v-select
            class="profile__gender"
            variant="outlined"
            :items="['Male', 'Female', 'Prefer Not to say']"
            label="Gender"
            v-model="state.user.gender"
            id="gender"
          >
          </v-select>
        </div>
        <v-select
          class="profile__cvt"
          variant="outlined"
          :items="[
            'Normal Vision',
            'Protan',
            'Deutan',
            'Tritan',
            'Achromatopsia',
            'Red Green Deficient / Undetermined',
            'Prefer Not to say',
          ]"
          label="Color Vision Type"
          v-model="state.user.vision_type"
          id="cvt"
        >
        </v-select>

        <v-textarea
          clearable
          variant="outlined"
          label="Bio"
          v-model="state.user.bio"
          id="bio"
          type="text"
        >
        </v-textarea>
        <div class="profile__cta">
          <SolidBtn @click="handleUpdateDialog" text="Update Profile" />
        </div>
      </div>
    </v-form>

    <v-dialog
      class="profile__dialog"
      persistent
      v-model="state.profile.isUpdateDialog"
      width="400"
    >
      <v-card>
        <v-card-text>Do you really want to update your account?</v-card-text>
        <v-card-actions>
          <v-btn color="error" @click="handleUpdateDialog">Cancel</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="success" @click="updateProfile">Update</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
  
<script>
import { defineComponent, ref } from "@vue/runtime-core";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";

import HollowBtn from "@/components/HollowBtn.vue";
import SolidBtn from "@/components/SolidBtn.vue";

export default defineComponent({
  components: {
    HollowBtn,
    SolidBtn,
  },
  setup() {
    const { state, commit, dispatch } = useStore();
    const router = useRouter();
    const form = ref(null);

    const userId = sessionStorage.getItem("id");
    commit("navigationList/handleAccountList", userId);

    // if(route.fullPath)
    // dispatch("generateToken");

    async function updateProfile() {
      // console.log("Update Profile");

      const { valid } = await form.value.validate();
      if (!valid) return;

      const userProfile = {
        id: state.user.id,
        profile_image: state.user.profile_image || state.profile.profile_image,
        user_name: state.user.user_name,
        first_name: state.user.first_name,
        last_name: state.user.last_name,
        age: state.user.age,
        gender: state.user.gender,
        vision_type: state.user.vision_type,
        bio: state.user.bio,
      };

      commit("profile/updateProfile", userProfile);

      function updateDelay() {
        router.push({ name: "home" });
        dispatch("generateToken");
      }

      setTimeout(updateDelay, 5 * state.duration);
    }

    function handleUpdateDialog() {
      commit("profile/handleUpdateDialog");
    }

    function selectedFile(e) {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.addEventListener("load", () => {
        commit("profile/selectedFile", reader.result);
      });

      reader.readAsDataURL(file);
    }

    return {
      state,
      form,
      updateProfile,
      handleUpdateDialog,
      selectedFile,
    };
  },
});
</script>
  
  <style lang="scss">
.v-input,
.profile__container {
  max-width: 40rem;
}

.profile {
  @include flex($dir: column, $gap: 2rem);

  // For the Navigation Thingy
  margin: var(--header-height) 0 0;
  padding: 3rem 2rem;

  &__pic {
    @include position(relative);
    max-width: 12rem;
  }

  &__file {
    @include position(absolute, $br: true);
    @include flex();
    overflow: hidden;
    z-index: 100;

    background-color: var(--primary-color);
    color: var(--secondary-color);

    input {
      position: absolute;
      opacity: 0;
    }
  }

  &__heading {
    @include font(1.5rem, $weight: 600, $clr: var(--secondary-color));
  }

  &__form {
    @include flex($dir: column, $gap: 2.5rem);
    width: 100%;
  }

  &__img {
    @include position(relative);
    --area: 10rem;
    border-radius: 50%;
    overflow: hidden;
    width: var(--area);
    height: var(--area);

    img {
      pointer-events: none;
    }
  }

  &__fields {
    // @include flex($dir: column, $gap: 2.5rem);
    display: grid;
    gap: 1rem;
    width: 100%;
  }

  &__container {
    @include flex($gap: 1rem);
  }

  &__age {
    width: 2rem;
  }

  &__gender {
    width: 3rem;
  }

  &__cta {
    @include flex($gap: 1rem, $justify: flex-start);
  }
}

@media (min-width: $min-width-tablet) {
  .v-input,
  .profile__container {
    max-width: clamp(25rem, 50vw, 40rem);
  }

  .profile {
    @include flex($dir: column, $gap: 2rem, $align: flex-start);
    padding: 3rem 2rem 3rem 2rem;

    &__heading {
      margin-left: 2rem;
    }

    &__form {
      @include flex(
        $dir: row-reverse,
        $align: flex-start,
        $justify: space-between,
        $gap: 1rem
      );
      padding-right: clamp(2rem, 10vw, 8rem);
      width: 100%;
    }

    &__img {
      --area: 12rem;
      margin-right: 4rem;
    }

    &__fields {
      width: 60%;
    }
  }
}
</style>