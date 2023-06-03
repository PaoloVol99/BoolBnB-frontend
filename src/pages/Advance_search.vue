<template>
    <Default>

        <section class="advance-search">
            <!-- Titolo della pagina -->
            <div class="container">
                <h1 class="py-3">Ricerca Avanzata</h1>
            </div>
            <!-- Searchbar e filtri -->
            <div class="container searchbar-section">
                <div class="ms-filters">

                    <!-- searchbar -->
                    <div class="col-12 col-md-5 searchbar-el">
                        <div class="container">
                            <div class="d-flex flex-column gap-2">
                                <h5>Inserisci località</h5>
                                <div class="ms_form-container position-relative">
                                    <input class="ms_input" v-model="searchBox" @keyup="fetchResults()" type="text">
                                    <div class="ms_autocomplete-container position-absolute z-index-2">
                                        <div class="autocomplete z-index-2" v-for="(result, i) in results" @click="selectResult(i)">
                                            {{ result.address.freeformAddress }}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- range km
                    <div class="col-2">              
                        <div class="d-flex flex-column gap-2">
                            <h5>Km</h5>
                            <div class="d-flex align-items-center">
                                <input v-model="rangeFilter" class="price-filter" type="range" id="price-filter" name="price-filter" min="1" max="150" step="1" @change="rangeMap">
                                <span id="price-label" class="price-label">{{ rangeFilter }} km</span>
                            </div>
                        </div>
                    </div> -->

                    <!-- filtro letti -->
                    <div class="col-auto col-md-2">
                        <div class="d-flex flex-column gap-2">
                            <h5 class="display-tablet-desktop">N. letti</h5>
                            <input v-model="bedsFilter" @change="filterApartments" class="bedsFilterSearch input_number display-tablet-desktop" type="number" id="beds" name="beds" placeholder="1">
                        </div>
                    </div>

                    <!-- bottone cerca -->
                    <div class="col-auto">
                        <router-link :to="{ name: 'ricerca-avanzata' }">
                            <button class="btn ms-button rounded-pill" @click="fetchApartments()">Cerca</button>
                        </router-link>
                    </div>

                    <!-- bottone altri filtri -->
                    <div class="col-auto">
                        <a class="d-block btn ms-button-secondary ms-button" data-bs-toggle="offcanvas" href="#offcanvasExample" role="button" aria-controls="offcanvasExample">
                            Altri filtri
                        </a>
                    </div>

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

                        <div class="filter-section price-filter-box">
                            <h5>Prezzo minimo a notte</h5>
                            <div class="d-flex align-items-center">
                                <input v-model="priceFilter" class="price-filter" type="range" id="price-filter" name="price-filter" min="20" max="500" step="1">
                                <span id="price-label" class="price-label">{{ priceFilter }}&euro;</span>
                            </div>
                        </div>

                        <div class="filter-section">
                            <h5>Distanza dal centro</h5>
                            <div class="d-flex align-items-center">
                                <input v-model="rangeFilter" class="price-filter" type="range" id="price-filter" name="price-filter" min="1" max="150" step="1" @change="rangeMap">
                                <span id="price-label" class="price-label">{{ rangeFilter }} km</span>
                            </div>
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
                            <button class="btn ms-button ms-button-secondary ms-other-services" @click="fetchOtherServices()">{{ displayService
                                == "d-none" ? "mostra altri" : "nascondi" }}</button>
                        </div>

                        <!-- Bottone per applicare i filtri -->
                        <div class="d-flex flex-column gap-2">
                            <button class="apply-filters ms-button" @click="filterApartments">Applica filtri</button>
                            <button class="apply-filters ms-button ms-button-secondary" @click="resetFilters">Reset filtri</button>
                        </div>

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
            rangeFilter: 20,
            searchBox: '',
            results: [],
            poiList: [],
            poiListFormatted: [],
            geometryFilter: [],
            city: '',
            radius: '' // cosi possiamo mettere il parametro che vogliamo
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
        fetchResults() {
            if (this.searchBox != '') {
                axios.get(`https://api.tomtom.com/search/2/search/${this.searchBox}.json`,
                    {
                        params: {
                            key: '5yE1GYuQA7WyAdPZ1zAeJtBq8cKtoae3',
                            countrySet: 'IT',
                            language: 'it-IT',
                            limit: 5
                        }
                    })
                    .then((res) => {
                        console.log(res.data.results)
                        this.results = res.data.results
                    })
            } else {
                this.results = []
            }
        },
        selectResult(i) {
            let result = this.results[i].address.freeformAddress
            this.city = this.results[i].address.municipality
            this.store.city = this.city
            console.log(result)
            this.searchBox = result
            // console.log("results", this.results)

            let createFilter = {
                "latitudine": this.results[i].position.lat,
                "longitudine": this.results[i].position.lon,
            }

            this.geometryFilter.push(createFilter)

            this.store.lat = this.results[i].position.lat
            this.store.lon = this.results[i].position.lon

            // console.log("create filter geometry", createFilter)
            this.results = []

        },
        fetchApartments() {
            console.log("chiamata")
            axios.get('http://127.0.0.1:8000/api/apartments')
                .then((res) => {
                    // console.log("api db", res.data.results)
                    this.store.apartments = res.data.results
                    // console.log('apartments', JSON.stringify(this.store.apartments))
                    this.poiList = res.data.results
                    // console.log("poiList", this.poiList)

                    this.poiList.forEach((apartment) => {
                        let apartmentFormatted = {
                            "poi": {
                                "name": apartment.title
                            },
                            "address": {
                                "freeformAddress": apartment.address + ", " + apartment.city
                            },
                            "position": {
                                "lat": apartment.lat,
                                "lon": apartment.lng
                            }

                        }

                        this.poiListFormatted.push(apartmentFormatted)

                    })

                    // console.log("poi formatted", this.poiListFormatted)

                    if (res.data.success) {
                        this.fetchApartmentsRadiusCustom()
                    }
                })

        },
        fetchApartmentsRadiusCustom() {
            // console.log('geometryfilter', this.geometryFilter[0].latitudine);
            // const latCenter = this.geometryFilter[0].latitudine;
            // const lonCenter = this.geometryFilter[0].longitudine;
            const latCenter = this.store.lat;
            const lonCenter = this.store.lon;
            const radius = this.store.radius;


            const filteredApartments = [];
            this.store.apartments.filter((apartment) => {
                // console.log('latcenter', latCenter)
                // console.log('loncenter', lonCenter)
                // console.log('apartment.lat', apartment.lat)
                // console.log('apartment.lon', apartment.lng)
                const distance = this.calculateDistance(latCenter, lonCenter, apartment.lat, apartment.lng);
                // console.log(distance)
                if (distance <= radius) {
                    // console.log('ciao sono dentro lif ed ecco la distance', distance)
                    filteredApartments.push(apartment)
                }
            });
            this.store.filteredApartments = filteredApartments
            console.log("appartamenti filtrati store", this.store.filteredApartments)

            return console.log("Appartamenti filtrati", filteredApartments), filteredApartments;

        },
        calculateDistance(lat1, lon1, lat2, lon2) {
            const earthRadius = 6371 * 1000; // Raggio approssimativo della Terra in chilometri

            // Converti le coordinate in radianti
            const latRad1 = this.degreesToRadians(lat1);
            const lonRad1 = this.degreesToRadians(lon1);
            const latRad2 = this.degreesToRadians(lat2);
            const lonRad2 = this.degreesToRadians(lon2);

            // Calcola la differenza di latitudine e longitudine
            const dlat = latRad2 - latRad1;
            const dlon = lonRad2 - lonRad1;

            // Applica la formula di Harversine per calcolare la distanza tra i due punti
            const a = Math.sin(dlat / 2) ** 2 + Math.cos(latRad1) * Math.cos(latRad2) * Math.sin(dlon / 2) ** 2;
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            const distance = earthRadius * c;
            // console.log(distance, 'distanza')
            return distance;
        },
        degreesToRadians(degrees) {
            // console.log(Math.PI)
            return degrees * (Math.PI / 180);

        },
        rangeMap() {
            this.store.radius = this.rangeFilter * 1000
            this.fetchApartments()
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
            this.advanceApartments = this.store.filteredApartments
            }
        },
        filterApartments() {

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

        },
        resetFilters(){
            // ristampiamo tutti gli appartamenti in base alla città
            this.advanceApartments = this.store.filteredApartments

            // resettiamo i campi di input
            this.bedsFilter = ""
            this.roomsFilter = ""
            this.bathroomsFilter = ""
            this.priceFilter = 20
            this.rangeFilter = 20
            this.serviceFilter = []
            // richiamiamo la funzione per ricercare le case in base al range resettato
            this.rangeMap()
        },
    },
    created() {
        this.fetchServices(),
        this.fetchApartmentResults()
    }
}
</script>

<style lang="scss" scoped>
@use '../style/partials/variables.scss' as *;

.searchbar-section{
    padding: 40px 0 80px 0;
}

.ms-filters {
    display: flex;
    align-items: end;
    justify-content: center;
    flex-wrap: wrap;
    gap: 10px;
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

.price-filter-box{
    margin-bottom: 20px;
}

.offcanvas {
    width: 80%;
}

.display-tablet-desktop {
    display: none;
}

.searchbar-el{
    margin-bottom: 15px;
}

@media screen and (min-width: 576px) {
    .offcanvas {
        width: 50%;
    }
}

@media screen and (min-width: 768px) {
    .searchbar-el{
        margin-bottom: 0;
    }
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
.ms-button:hover{
    background-color: #60d2df;
}
.ms-button-secondary{
    color: $primary-color;
    background-color: white;
    border: 1px solid $primary-color;
}
.ms-button-secondary:hover{
    color: white;
    background-color: $primary-color;
}

.ms-other-services {
    border-radius: 10px;
    padding: 5px 10px;
    margin-top: 10px;
}

.bedsFilterSearch{
    width: 100%;
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

// Searchbar
.ms_form-container {
    display: flex;
    align-items: center;
}

.ms_autocomplete-container {
    width: 90%;
    left: 20px;
    top: 80px;
    margin-top: -18px;
    z-index: 999;
}

.ms_input {
    width: 100%;
    display: block;
    background-color: rgb(234, 234, 234);
    border: none;
    color: black;
    border-radius: 999px;
    padding: 8px 25px;

    &:focus-visible {
        outline: 2px solid $primary-color;
    }
}

.autocomplete {
    display: block;
    cursor: pointer;
    padding: 8px 25px;
    background-color: white;

    &:first-of-type {
        border-top: none;
        border-radius: 10px 10px 0 0;
    }

    &:last-of-type {
        border-bottom: 1px solid rgb(205, 205, 205);
        margin-bottom: 10px;
        border-radius: 0 0 10px 10px;
    }
}

.autocomplete:hover {
    background-color: rgb(235, 235, 235);
    padding-bottom: 8px;
    border: none;

    &+.autocomplete {
        border: none;
    }
}
</style>