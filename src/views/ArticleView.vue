<template>
  <div class="article">
    <div class="article__heading">Articles</div>
    <div class="article__cards">
      <v-card
        class="article__card"
        v-for="article in state.article.articles"
        :key="article.id"
        :title="article.article.title"
        :subtitle="article.author + ' | ' + article.date"
        variant="tonal"
      >
        <v-card-text class="article__text">{{
          article.article.intro.desc.slice(0, 100) + " ......"
        }}</v-card-text>
        <v-card-actions class="article__actions">
          <v-btn
            :to="{
              name: 'article_detail',
              params: { id: article.id },
            }"
            variant="outlined"
            block=""
            >View</v-btn
          >
        </v-card-actions>
      </v-card>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "@vue/runtime-core";
import { useStore } from "vuex";

export default defineComponent({
  name: "articles",
  setup() {
    const { state } = useStore();
    return {
      state,
    };
  },
});
</script>

<style lang="scss" scoped>
.article {
  // For the Navigation Thingy
  @include flex($dir: column, $gap: 1rem);
  margin: calc(var(--header-height) + 2rem) 0;
  // height: 30rem;

  &__heading {
    @include font(2rem, $weight: 600, $clr: var(--secondary-color));
  }

  &__cards {
    @include flex($dir: column, $gap: 1rem);
  }

  &__card {
    width: clamp(15rem, 50vw, 30rem);
    // height: 30rem;
  }
}

.icon {
  font-size: 10rem;
}
</style>