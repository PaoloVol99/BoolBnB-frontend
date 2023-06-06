<template>
    <div class="hero-container">
        <div class="black-filter">
            <h1 class="text-white custom">La tua finestra sull'Italia</h1>
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
.custom {
    margin: 0 auto;
    display: block;
    text-align: center;
    font-size: calc(40px + 1vw);
}

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
        padding-top: 215px;

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