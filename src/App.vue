<script>

import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
import Searchbar from './components/Searchbar.vue';
import Suggested_holidays from './components/Suggested_holidays.vue';
import Featured_accommodation from './components/Featured_accommodation.vue';

export default {
  
  components: {
    Footer,
    Header,
    Searchbar,
    Suggested_holidays,
    Featured_accommodation
  },
  }
</script>

<template>

  <Header />

  <Searchbar />

  <Suggested_holidays />

  <Featured_accommodation />

  <Footer />

</template>

<style lang="scss">
@use './style/general.scss' as *;
</style>
