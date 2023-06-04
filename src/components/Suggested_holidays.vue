<template>
    <section class="suggested_holidays_section">

        <div class="container">
            <h2 class="title py-3 text-center text-md-start">Ispirazione per l'estate</h2>
        </div>

        <div class="container">
            <div class="row justify-content-center">

                <div class="col-sm-6 col-md-4 col-lg-3 card-spacer ms-col">
                    <div class="card">
                        <img class="card-img" src="/firenze.png" alt="immagine">
                        <h4 class="card-title">Firenze</h4>
                        <router-link :to="{ name: 'apartments', query: { city: 'firenze' } }">
                            <a href="#" class="card-others text-white">Vedi tutti </a>
                        </router-link>
                    </div>
                </div>



                <div class=" col-sm-6 col-md-4 col-lg-3 card-spacer ms-col">
                    <div class="card">
                        <img class="card-img" src="/venezia.jpg" alt="immagine">
                        <h4 class="card-title">Venezia</h4>
                        <router-link :to="{ name: 'apartments', query: { city: 'venezia' } }">
                            <a href="#" class="card-others text-white">Vedi tutti </a>
                        </router-link>
                    </div>
                </div>

                <div class="col-sm-6 col-md-4 col-lg-3 card-spacer ms-col">
                    <div class="card">
                        <img class="card-img" src="/matera.png" alt="immagine">
                        <h4 class="card-title">Matera</h4>
                        <router-link :to="{ name: 'apartments', query: { city: 'matera' } }">
                            <a href="#" class="card-others text-white">Vedi tutti </a>
                        </router-link>
                    </div>
                </div>

                <div class="col-sm-6 col-md-4 col-lg-3 card-spacer ms-col">
                    <div class="card">
                        <img class="card-img" src="/roma.png" alt="immagine">
                        <h4 class="card-title">Roma</h4>
                        <router-link :to="{ name: 'apartments', query: { city: 'roma' } }">
                            <a href="#" class="card-others text-white">Vedi tutti </a>
                        </router-link>
                    </div>
                </div>

            </div>
        </div>

    </section>
</template>

<script>
import axios from 'axios'
import store from '../store'
export default {

}
</script>

<style lang="scss" scoped>
@use '../style/partials/variables.scss' as *;

.suggested_holidays_section {

    .title {
        font-size: 26px;
    }

    .card-spacer {
        margin-bottom: 20px;
        padding: 0 20px;
    }

    .card {
        overflow: hidden;
        box-shadow: 0 1px 20px rgba(0, 0, 0, 0.171);
        color: white;
        border-radius: 20px;
        height: 100%;

        .card-others {
            font-size: 18px;
            color: currentColor;
            text-decoration: none;
            position: absolute;
            bottom: 20px;
            right: 15px;
        }

        .card-others:hover {
            color: $primary-color;
        }

        .card-title {
            font-size: 30px;
            font-weight: 600;
            border-bottom: 2px solid white;
            position: absolute;
            top: 10px;
            left: 20px;
        }

        .card-img {
            filter: brightness(0.7);
            transition-duration: 0.5s;
            height: 100%;

        }
    }

    .card:hover {
        .card-img {
            transform: scale(1.1);
            transition-duration: 0.5s;
        }

        a {
            text-decoration: underline;
        }
    }

    img {
        display: block;
    }

    .ms-col {
        position: relative;
    }

}
</style>