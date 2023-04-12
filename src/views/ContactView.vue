<template>
  <div class="contact">
    <div class="contact__img">
      <img :src="require('@/assets/img/contact__img.jpg')" alt="" />
    </div>
    <div class="contact__container">
      <h2>Contact Us</h2>
      <v-form class="contact__form" v-model="valid">
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="firstname"
                label="First name"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12">
              <v-text-field
                v-model="lastname"
                label="Last name"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12">
              <v-text-field
                v-model="email"
                label="E-mail"
                required
              ></v-text-field>
            </v-col>
          </v-row>
          <v-btn
            type="submit"
            class="mt-5"
            variant="outlined"
            elevation="0"
            block
            >Submit</v-btn
          >
        </v-container>
      </v-form>
    </div>
  </div>
</template>

<script>
export default {
  setup() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.contact {
  @include flex($justify: space-around);
  height: 30rem;

  &__img {
    display: none;
    width: 20rem;
  }

  &__container {
    @include flex($dir: column);
    h2 {
      @include font(clamp(2rem, 8vw, 2.5rem), $weight: 800);
    }
  }

  &__form {
    @include flex($dir: column, $gap: 2rem);
    width: clamp(20rem, 80vw, 30rem);
  }
}

@media (min-width: $min-width-tablet) {
  .contact {
    @include flex($justify: space-around);
    height: 30rem;

    &__container {
      @include flex($dir: column, $align: flex-start);
      h2 {
        margin-left: 1rem;
      }
    }

    &__img {
      display: block;
      width: 20rem;
    }

    &__form {
      width: 25rem;
    }
  }
}

@media (min-width: $min-width-desktop) {
  .contact {
    &__form {
      width: 35rem;
    }
  }
}
</style>