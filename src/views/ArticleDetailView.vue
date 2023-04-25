<template>
  <div class="article-detail">
    <div class="article-detail__heading">{{ article.article.title }}</div>
    <div class="article-detail__intro">
      <h3>{{ article.article.intro.title }}</h3>
      <p>{{ article.article.intro.desc }}</p>
    </div>
    <div
      class="article-detail__conflicts"
      v-for="conflict in article.article.conflicts"
      :key="conflict.title"
    >
      <h4>{{ conflict.title }}</h4>
      <p>{{ conflict.desc }}</p>
    </div>
    <div
      class="article-detail__stats"
      v-for="stat in article.article.stats"
      :key="stat.title"
    >
      <h4>{{ stat.title }}</h4>
      <p>{{ stat.desc }}</p>
    </div>
    <div class="article-detail__references">
      <h4>References</h4>
      <div
        class="article-detail__reference"
        v-for="ref in article.article.references"
        :key="ref.title"
      >
        <span>{{ ref.ref }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { useRoute } from "vue-router";
import { useStore } from "vuex";
export default {
  setup() {
    const { params } = useRoute();
    const { state } = useStore();

    let article = state.article.articles.find(
      (sarticle) => sarticle.id == parseInt(params.id)
    );

    return { article };
  },
};
</script>

<style lang="scss" >
.article-detail {
  @include flex($dir: column, $gap: 2rem);
  // For the Navigation Thingy
  margin: calc(var(--header-height) + 2rem) 0;
  padding: 0 1rem;
  &__heading {
    @include font(2rem, $weight: 700, $clr: var(--secondary-color));
    border-bottom: 1px solid;
    padding: 0.75rem 1.75rem;
  }

  &__stats {
    background-color: var(--primary-color-200);
    border-radius: 0.5rem;
    padding: 2rem;
  }

  &__intro,
  &__conflicts,
  &__stats,
  &__references,
  &__reference {
    @include flex($align: flex-start, $dir: column, $gap: 1rem);
    h3 {
      @include font(1.5rem, $weight: 600, $clr: var(--secondary-color));
    }
    h4 {
      @include font(1.25rem, $weight: 600, $clr: var(--secondary-color));
    }
    span {
      max-width: 50rem;
    }
    padding: 1rem;
    width: 100%;
  }

  @media (min-width: $min-width-tablet) {
    .article-detail {
      padding: 0 3rem;
    }
  }
}
</style>