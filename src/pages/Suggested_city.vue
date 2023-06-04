<template>
    <Default>
        <div class="container py-3">
            <div class="row justify-content-center">
                <div v-for="apartment in apartmentsList " :key="apartment.id" class="col-sm-6 col-md-4 col-lg-3 ms-col">
                    <router-link :to="{ name: 'apartments' }" class="card">
                        <img class="card-img" :src="apartment.cover_path" alt="immagine">
                        <div class="card-description">
                            <h4 class="card-title">{{ apartment.title }}</h4>
                            <p class="card-location">{{ apartment.city }}</p>
                            <div class="icon-info">
                                <div class="card-icon-summary">
                                    <font-awesome-icon class="icon-color" :icon="['fas', 'bed']" />
                                    <p>{{ apartment.beds }}</p>
                                </div>
                                <div class="card-icon-summary">
                                    <font-awesome-icon class="icon-color" :icon="['fas', 'door-closed']" />
                                    <p>{{ apartment.rooms }}</p>
                                </div>
                                <div class="card-icon-summary">
                                    <font-awesome-icon class="icon-color" :icon="['fas', 'shower']" />
                                    <p>{{ apartment.bathrooms }}</p>
                                </div>
                                <div class="card-price-summary ms-3">
                                    <p>{{ apartment.price }}&euro;</p>
                                </div>
                            </div>
                        </div>
                    </router-link>
                </div>
            </div>
        </div>

    </Default>
</template>
<script>
import Default from '../layouts/Default.vue';
import axios from 'axios';
export default {
    data() {
        return {
            city: '',
            apartmentsList: {}
        }
    },
    components: {
        Default
    },
    created() {
        this.city = this.$route.query.city
        console.log("chiamata", this.city)
        axios.get(`http://127.0.0.1:8000/api/apartments/city/${this.city}`)
            .then((res) => {
                console.log("api db", res.data.results)
                this.apartmentsList = res.data.results
            })

    }
}
</script>
<style lang="scss" scoped>
@use '../style/partials/variables.scss' as *;

.card {
    overflow: hidden;
    box-shadow: 0 1px 20px rgba(0, 0, 0, 0.171);
    margin-bottom: 20px;
    color: currentColor;
    text-decoration: none;

    .card:hover {
        .card-img {
            transform: scale(1.1);
            transition-duration: 0.5s;
        }
    }

    img {
        display: block;
    }

    .card-img {
        height: 150px;
        transition-duration: 0.5s;
        object-position: center;
        object-fit: cover;
    }

    .card-description {
        position: relative;
        bottom: 0;
        margin: 0 auto;
        padding: 10px;
        background-color: white;
    }

    .card-title {
        font-size: 20px;
    }

    .card-location {
        font-size: 15px;
        color: black;
    }

    .card-icon-summary {
        display: flex;
        align-items: center;
        gap: 8px;
        color: black;
        font-size: 14px;

        p {
            margin: 0;
        }
    }

    .icon-color {
        color: $primary-color;
    }

    .card-price-summary {

        font-size: 28px;

        p {
            margin: 0;
        }
    }

    .icon-info {
        display: flex;
        gap: 20px;
        align-items: baseline;
    }
}
</style>