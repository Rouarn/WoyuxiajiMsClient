<template>
  <div class="c-hello">
    <h1 class="c-hello__title">{{ msg }}</h1>
    <p class="c-hello__description">
      For a guide and recipes on how to configure / customize this project,<br />
      check out the
      <a class="c-hello__link" href="https://cli.vuejs.org" target="_blank" rel="noopener">vue-cli documentation</a>.
    </p>
    <h3 class="c-hello__subtitle">Installed CLI Plugins</h3>
    <ul class="c-hello__list">
      <li class="c-hello__item">
        <a
          class="c-hello__link"
          href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-babel"
          target="_blank"
          rel="noopener"
          >babel</a
        >
      </li>
      <li class="c-hello__item">
        <a
          class="c-hello__link"
          href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-router"
          target="_blank"
          rel="noopener"
          >router</a
        >
      </li>
      <li class="c-hello__item">
        <a
          class="c-hello__link"
          href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-vuex"
          target="_blank"
          rel="noopener"
          >vuex</a
        >
      </li>
      <li class="c-hello__item">
        <a
          class="c-hello__link"
          href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-typescript"
          target="_blank"
          rel="noopener"
          >typescript</a
        >
      </li>
    </ul>
    <h3 class="c-hello__subtitle">Essential Links</h3>
    <ul class="c-hello__list">
      <li class="c-hello__item"><a class="c-hello__link" href="https://vuejs.org" target="_blank" rel="noopener">Core Docs</a></li>
      <li class="c-hello__item"><a class="c-hello__link" href="https://forum.vuejs.org" target="_blank" rel="noopener">Forum</a></li>
      <li class="c-hello__item"><a class="c-hello__link" href="https://chat.vuejs.org" target="_blank" rel="noopener">Community Chat</a></li>
      <li class="c-hello__item"><a class="c-hello__link" href="https://twitter.com/vuejs" target="_blank" rel="noopener">Twitter</a></li>
      <li class="c-hello__item"><a class="c-hello__link" href="https://news.vuejs.org" target="_blank" rel="noopener">News</a></li>
    </ul>    <h3 class="c-hello__subtitle">Ecosystem</h3>
    <ul class="c-hello__list">
      <li class="c-hello__item"><a class="c-hello__link" href="https://router.vuejs.org" target="_blank" rel="noopener">vue-router</a></li>
      <li class="c-hello__item"><a class="c-hello__link" href="https://vuex.vuejs.org" target="_blank" rel="noopener">vuex</a></li>
      <li class="c-hello__item">
        <a class="c-hello__link" href="https://github.com/vuejs/vue-devtools#vue-devtools" target="_blank" rel="noopener"
          >vue-devtools</a
        >
      </li>
      <li class="c-hello__item"><a class="c-hello__link" href="https://vue-loader.vuejs.org" target="_blank" rel="noopener">vue-loader</a></li>
      <li class="c-hello__item">
        <a class="c-hello__link" href="https://github.com/vuejs/awesome-vue" target="_blank" rel="noopener"
          >awesome-vue</a
        >
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'HelloWorld',
  props: {
    msg: String,
  },
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.c-hello {
  &__subtitle {
    margin: 40px 0 0;
  }
  &__list {
    list-style-type: none;
    padding: 0;
  }
  &__item {
    display: inline-block;
    margin: 0 10px;
  }
  &__link {
    color: #42b983;
  }
}
</style>
