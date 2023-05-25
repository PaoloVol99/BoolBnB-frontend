<script>

import Header from './components/Header.vue';
import Footer from './components/Footer.vue';

export default {
  components: {
    Footer,
    Header

  },
  }
</script>

<template>

  <Header />

<Footer></Footer>

</template>

<style lang="scss">
@use './style/general.scss' as *;
</style>
