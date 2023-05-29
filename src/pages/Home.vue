<template>

<Default>

    <Searchbar />

    <Suggested_holidays />

    <Featured_accommodation />

</Default>


</template>

<script>
import Default from '../layouts/Default.vue';
import Searchbar from '../components/Searchbar.vue';
import Suggested_holidays from '../components/Suggested_holidays.vue';
import Featured_accommodation from '../components/Featured_accommodation.vue';

    export default {
        components:{
            Default,
            Searchbar,
            Suggested_holidays,
            Featured_accommodation
        }
    }
</script>

<style lang="scss" scoped>

</style>