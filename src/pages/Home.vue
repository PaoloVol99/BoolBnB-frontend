<template>
    <Default>

        <Hero />

        <Suggested_holidays />

        <Featured_accommodation />

    </Default>
</template>

<script>
import Default from '../layouts/Default.vue';
import Searchbar from '../components/Searchbar.vue';
import Suggested_holidays from '../components/Suggested_holidays.vue';
import Featured_accommodation from '../components/Featured_accommodation.vue';
import Hero from '../components/Hero.vue';
import { mapActions, mapState } from 'pinia';
import { useAuthStore } from '../stores/auth';

export default {
    components: {
        Default,
        Searchbar,
        Suggested_holidays,
        Featured_accommodation,
        Hero
    },
    data() {
        return {
            authStore: useAuthStore()
        }
    },
    computed: {
        ...mapState(useAuthStore, ['user'])
    },
    methods: {
        ...mapActions(useAuthStore, ['getUser'])
    },
    mounted() {
        if (!this.user) {
            this.getUser();
        }
    }

}
</script>

<style lang="scss" scoped></style>