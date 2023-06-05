<template>
    <div class="hero-container">
        <div class="black-filter">
            <Searchbar class="searchbar" />

        </div>
    </div>
</template>

<script>
import Searchbar from './Searchbar.vue';
    export default {
        components: {
            Searchbar,
        },
    }
</script>

<style lang="scss" scoped>

.hero-container {
    background-image: url(/foto-sfondo-hero.jpeg);
    height: 88vh;
    background-position: center;
    background-size: cover;
    margin-bottom: 50px;

    .black-filter {
        background-color: rgba($color: #000000, $alpha: 0.3);
        width: 100%;
        height: 100%;
        position: relative;

        .searchbar {
            position: absolute;
            left: 20%;
            right: 20%;
            top: 50%;
            transform: translateY(-50%);
        }

    }
}
</style>