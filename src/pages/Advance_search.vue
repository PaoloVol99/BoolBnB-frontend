<template>
    <Default>

        <section class="advance-search">
            <!-- Titolo della pagina -->
            <div class="container">
                <h1 class="py-3">Ricerca Avanzata</h1>
            </div>
            <!-- Searchbar -->
            <div class="container">
                <div class="ms-filters">
                    <Searchbar class="searchbar"></Searchbar>

                    <label for="beds">Numero di letti</label>
                    <input v-model="bedsFilter" class="input_number display-tablet-desktop" type="number" id="beds"
                        name="beds">

                    <a class="btn ms-button ms-3" data-bs-toggle="offcanvas" href="#offcanvasExample" role="button"
                        aria-controls="offcanvasExample">
                        Altri filtri
                    </a>

                </div>
                <div class="filter-section">
                    <h5>Km</h5>
                    <input v-model="rangeFilter" class="price-filter" type="range" id="price-filter" name="price-filter"
                        min="20" max="150" step="1" @change="rangeMap">
                    <span id="price-label" class="price-label">{{ rangeFilter }}km</span>
                </div>
            </div>

            <!-- Offcanvas per i filtri avanzati -->
            <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasExample"
                aria-labelledby="offcanvasExampleLabel">

                <div class="offcanvas-header">
                    <h3 class="offcanvas-title" id="offcanvasExampleLabel">Filtri avanzati</h3>
                    <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>

                <div class="offcanvas-body">
                    <div class="filters">

                        <div class="filter-section display-only-mobile">
                            <h5>Numero di letti</h5>
                            <input v-model="bedsFilter" class="input_number ms-filter-canvas" type="number" id="beds"
                                name="beds" placeholder="1">
                        </div>

                        <div class="filter-section">
                            <h5>Numero di stanze</h5>
                            <input v-model="roomsFilter" class="input_number ms-filter-canvas" type="number" id="rooms"
                                name="rooms" placeholder="1">
                        </div>

                        <div class="filter-section">
                            <h5>Numero di bagni</h5>
                            <input v-model="bathroomsFilter" class="input_number ms-filter-canvas" type="number"
                                id="bathrooms" name="bathrooms" placeholder="1">
                        </div>

                        <div class="filter-section">
                            <h5>Prezzo minimo a notte</h5>
                            <input v-model="priceFilter" class="price-filter" type="range" id="price-filter"
                                name="price-filter" min="20" max="500" step="1">
                            <span id="price-label" class="price-label">{{ priceFilter }}&euro;</span>
                        </div>



                        <!-- Lista servizi -->
                        <div class="filter-section py-3">
                            <h5>Servizi</h5>
                            <!-- Primi 5 servizi visibili -->
                            <template v-for="(service, index) in services" :key="service.id">
                                <template v-if="index < 5">
                                    <div class="form-check">
                                        <input type="checkbox" name="serviceFilter[]" class="form-check-input"
                                            :value="service.id" :id="service.id" v-model="serviceFilter">
                                        <label for="service" class="form-check-label">{{ service.name }}</label>
                                    </div>
                                </template>
                            </template>
                            <!-- Altri servizi -->
                            <template v-for="(service, index) in services" :key="service.id">
                                <template v-if="index >= 5">
                                    <div :class="[displayService, 'form-check']">
                                        <input type="checkbox" name="serviceFilter[]" class="form-check-input"
                                            :value="service.id" :id="service.id" v-model="serviceFilter">
                                        <label for="service" class="form-check-label">{{ service.name }}</label>
                                    </div>
                                </template>
                            </template>
                            <!-- Bottone per mostrare altri servizi -->
                            <button class="btn ms-button ms-other-services" @click="fetchOtherServices()">{{ displayService
                                == "d-none" ? "mostra altri" : "nascondi" }}</button>
                        </div>

                        <!-- Bottone per applicare i filtri -->
                        <button class="apply-filters ms-button" @click="filterApartments">Applica filtri</button>

                    </div>

                </div>
            </div>




            <!-- Lista appartamenti -->
            <div class="container py-3">
                <div class="row justify-content-center">
                    <div v-for="apartment in this.advanceApartments" :key="apartment.id"
                        class="col-sm-6 col-md-4 col-lg-3 ms-col">
                        <router-link :to="{ name: 'dettaglio-appartamento' }" class="card">
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
        </section>

    </Default>
</template>

<script>
import Default from '../layouts/Default.vue';
import store from '../store';
import Searchbar from '../components/Searchbar.vue';
import axios from 'axios';

export default {
    data() {
        return {
            store,
            displayService: "d-none",
            advanceApartments: [],
            priceFilter: 20,
            services: [],
            serviceFilter: [],
            bedsFilter: 0,
            roomsFilter: 0,
            bathroomsFilter: 0,
            rangeFilter: 20000
        }
    },
    components: {
        Default,
        Searchbar,
    },
    computed:{
        getApartmentsStore(){
            return this.store.filterApartments
        }
    },
    watch: {
        'store.filteredApartments': {
            handler: 'fetchApartmentResults',
            immediate: true
        }
        // getApartmentsStore(newVal, oldVal){
        //     this.fetchApartmentResults()
        // }
    },
    methods: {
        rangeMap() {
            this.store.radius = this.rangeFilter * 1000
            Searchbar.methods.fetchApartments()
            console.log('funziono', this.store.radius)
        },
        fetchOtherServices() {
            if (this.displayService == "d-none") {
                this.displayService = "d-block"
            } else {
                this.displayService = "d-none"
            }
        },
        fetchServices() {
            axios.get("http://127.0.0.1:8000/api/services")
            .then((res) => {
                this.services = res.data.results
            })
        },
        fetchApartmentResults(){
                // se non abbiamo selezionato nessun servizio, stampiamo tutti gli appartamenti che riceviamo dalla ricerca
                if (this.serviceFilter.length == 0) {
                console.log("dentro la funzione")
                console.log("advanceApartments", this.advanceApartments)
                console.log("store.filteredApartments", this.store.filteredApartments)
                this.advanceApartments = this.store.filteredApartments

            }
        },
        filterApartments() {

            // se non abbiamo selezionato nessun servizio, stampiamo tutti gli appartamenti che riceviamo dalla ricerca
            // if (this.serviceFilter.length == 0) {
            //     console.log("dentro la funzione")
            //     console.log("advanceApartments", this.advanceApartments)
            //     console.log("store.filteredApartments", this.store.filteredApartments)
            //     this.advanceApartments = this.store.filteredApartments
            // }

            // filtrare gli appartamenti in base ai filtri
            this.advanceApartments = this.store.filteredApartments.filter((apartment) => {
                let bedsCondition = apartment.beds >= this.bedsFilter
                let roomsCondition = apartment.rooms >= this.roomsFilter
                let bathroomsCondition = apartment.bathrooms >= this.bathroomsFilter
                let priceCondition = parseFloat(apartment.price) >= this.priceFilter
                let servicesCondition = true
                let servicesApartment = apartment.services

                // se abbiamo selezionato dei servizi controlliamo che siano presenti dentro l'appartamento
                if (this.serviceFilter.length !== 0) {

                    servicesCondition = this.serviceFilter.every(value => servicesApartment.some(oggetto => oggetto.id === value));

                    console.log("Appartamenti filtrati per servizi:", servicesCondition);

                }

                // controlliamo i vari filtri
                if (bedsCondition && roomsCondition && bathroomsCondition && priceCondition && servicesCondition) {
                    console.log("entrato")
                    return true
                } else {
                    return false
                }

            })

        }
    },
    created() {
        this.fetchServices(),
        this.fetchApartmentResults()
    }
}
</script>

<style lang="scss" scoped>
@use '../style/partials/variables.scss' as *;

.ms-filters {
    display: flex;
    align-items: center;
    justify-content: center;
}

.price-label {
    display: inline-block;
    width: 50px;
    text-align: center;
    font-size: 14px;
    font-weight: bold;
}

.input_number {
    width: 15%;
    border-radius: 999px;
    border: none;
    padding: 8px 25px;
    background-color: rgb(234, 234, 234);

    &:focus-visible {
        outline: 2px solid $primary-color;
    }
}

.price-filter::-webkit-slider-thumb {
    background-color: red;
}

.offcanvas {
    width: 80%;
}

.display-tablet-desktop {
    display: none;
}

@media screen and (min-width: 576px) {
    .offcanvas {
        width: 50%;
    }
}

@media screen and (min-width: 768px) {
    .offcanvas {
        width: 40%;
    }

    .display-only-mobile {
        display: none;
    }

    .display-tablet-desktop {
        display: block;
    }
}

@media screen and (min-width: 992px) {
    .offcanvas {
        width: 20%;
    }

    .display-only-mobile {
        display: none;
    }

    .display-tablet-desktop {
        display: block;
    }
}

.ms-filter-canvas {
    width: 50%;
    margin-bottom: 20px;
}

.ms-button {
    padding: 10px 20px;
    color: white;
    background-color: $primary-color;
    border: none;
    border-radius: 999px;
}

.ms-other-services {
    color: $primary-color;
    background-color: white;
    border: 1px solid $primary-color;
    border-radius: 10px;
    padding: 5px 10px;
    margin-top: 10px;
}

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