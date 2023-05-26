<script>

import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
import Searchbar from './components/Searchbar.vue'

export default {
  
  components: {
    Footer,
    Header,
    Searchbar
  },
  }
</script>

<template>

  <Header />

  <Searchbar />

  <Footer />

</template>

<style lang="scss">
@use './style/general.scss' as *;
</style>
