<script>

import store from './store';
import axios from 'axios';

export default {
  data(){
    return{
      store
    }
  },
  methods:{
    fetchUser() {
      console.log("chiamata")
      axios.get('http://127.0.0.1:8000/api/user_email')
      .then((res) => {
        this.store.userName = res.data.results.first_name
        this.store.userEmail = res.data.results.email
      })
    }                    

  }
  ,
  mounted(){
    this.fetchUser()
  }
  }
</script>

<template>

  <router-view />

</template>

<style lang="scss">
@use './style/general.scss' as *;
</style>
