<template>
    <section class="featured_accommodation_section py-4">

        <div class="container">
            <h2 class="title py-3 text-center text-md-start">Alloggi in evidenza</h2>
        </div>

        <div class="container">
            <div class="row justify-content-center">

                <div v-for="apartment in apartmentsSponsored" :key="apartment.id" class="col-sm-6 col-md-4 col-lg-3 card-spacer ms-col">
                    <router-link :to="{ name: 'dettaglio-appartamento' }" class="card">
                        <img class="card-img" src="/firenze.png" alt="immagine">
                        <div class="card-description">

                            <h4 class="card-title">{{ apartment.title }}</h4>

                            <p class="card-location">{{ apartment.city }}</p>

                            <div class="icon-info">
                                <div class="card-icon-summary">
                                    <font-awesome-icon class="icon-color" :icon="['fas', 'bed']" />
                                    <p>{{ apartment.beds }}</p>
                                </div>
                                <div class="card-icon-summary">
                                    <font-awesome-icon class="icon-color" :icon="['fas', 'user']" />
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

    </section>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            apartments: [],
            apartmentsSponsored: []
        }
    },
    created() {
        axios.get('http://127.0.0.1:8000/api/apartments')
            .then((res) => {
                // console.log(res.data.results, 'dentro')
                this.apartments = res.data.results
                this.apartmentsSponsored = []
                this.apartments.forEach(apartment => {
                    if (apartment.sponsorships && apartment.sponsorships.length > 0) {
                        this.apartmentsSponsored.push(apartment)
                    }
                    console.log(this.apartmentsSponsored, 'quelli con lo sponsor')
                })
            })
    }
}
</script>

<style lang="scss" scoped>
@use '../style/partials/variables.scss' as *;

.featured_accommodation_section {

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
        margin-bottom: 20px;
        color: currentColor;
        text-decoration: none;
        height: 300px;

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
            display: flex;
            flex-direction: column;
            height: 100%;
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
            margin-top: auto;
        }
    }

}
</style>