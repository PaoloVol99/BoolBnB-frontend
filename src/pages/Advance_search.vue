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
                <input class="input_number display-tablet-desktop" type="number" id="beds" name="beds" placeholder="Numero di letti">
                <a class="btn ms-button ms-3" data-bs-toggle="offcanvas" href="#offcanvasExample" role="button" aria-controls="offcanvasExample">
                Altri filtri
                </a>
            </div>
        </div>

        <!-- Offcanvas per i filtri avanzati -->
        <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">

            <div class="offcanvas-header">
                <h3 class="offcanvas-title" id="offcanvasExampleLabel">Filtri avanzati</h3>
                <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>

            <div class="offcanvas-body">
                <div class="filters">

                    <div class="filter-section display-only-mobile">
                        <h5>Numero di letti</h5>
                        <input class="input_number ms-filter-canvas" type="number" id="beds" name="beds" placeholder="1">
                    </div>
                    
                    <div class="filter-section">
                        <h5>Numero di stanze</h5>
                        <input class="input_number ms-filter-canvas" type="number" id="rooms" name="rooms" placeholder="1">
                    </div>

                    <div class="filter-section">
                        <h5>Numero di bagni</h5>
                        <input class="input_number ms-filter-canvas" type="number" id="bathrooms" name="bathrooms" placeholder="1">
                    </div>

                    <div class="filter-section">
                        <h5>Prezzo a notte</h5>
                        <input class="price-filter" type="range" id="price-filter" name="price-filter" min="50" max="500" step="1" v-model="priceFilter">
                        <span id="price-label" class="price-label">{{priceFilter}}&euro;</span>
                    </div>

                    <!-- Lista servizi -->
                    <div class="filter-section py-3">
                        <h5>Servizi</h5>
                        <!-- Primi 5 servizi visibili -->
                        <template v-for="(service, index) in services" :key="service.id">
                            <template v-if="index < 5">
                                <div class="form-check">
                                    <input type="checkbox" name="services[]" class="form-check-input" :value="service.id" :id="service.id">
                                    <label for="service" class="form-check-label">{{ service.name }}</label>
                                </div>
                            </template>
                        </template>
                        <!-- Altri servizi -->
                        <template v-for="(service, index) in services" :key="service.id">
                            <template v-if="index >= 5">
                                <div :class="[displayService,'form-check']">
                                    <input type="checkbox" name="services[]" class="form-check-input" :value="service.id" :id="service.id">
                                    <label for="service" class="form-check-label">{{ service.name }}</label>
                                </div>
                            </template>
                        </template>
                        <!-- Bottone per mostrare altri servizi -->
                        <button class="btn ms-button ms-other-services" @click="fetchOtherServices()">{{displayService == "d-none" ? "mostra altri" : "nascondi"}}</button>
                    </div>

                    <!-- Bottone per applicare i filtri -->
                    <button class="apply-filters ms-button">Applica filtri</button>
                    
                </div>

            </div>
        </div>





        <div class="container py-3">
            <div class="row justify-content-center">
                <div v-for="apartment in store.filteredApartments" :key="apartment.id" class="col-sm-6 col-md-4 col-lg-3 ms-col">
                    <router-link :to="{ name:'home' }" class="card">
                        <img class="card-img" :src="apartment.cover_image" alt="immagine">
                        <div class="card-description">
                            <h4 class="card-title">{{apartment.title}}</h4>
                            <p class="card-location">{{apartment.city}}</p>
                            <div class="icon-info">
                                <div class="card-icon-summary">
                                    <font-awesome-icon class="icon-color" :icon="['fas', 'bed']" />
                                    <p>{{apartment.beds}}</p>
                                </div>
                                <div class="card-icon-summary">
                                    <font-awesome-icon class="icon-color" :icon="['fas', 'user']" />
                                    <p>{{apartment.beds}}</p>
                                </div>
                                <div class="card-icon-summary">
                                    <font-awesome-icon class="icon-color" :icon="['fas', 'shower']" />
                                    <p>{{apartment.bathrooms}}</p>
                                </div>
                                <div class="card-price-summary ms-3">
                                    <p>{{apartment.price}}&euro;</p>
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
    data(){
        return{
            store,
            displayService: "d-none",
            priceFilter: 50,
            services: []
        }
    },
    components: { 
        Default,
        Searchbar,
    },
    methods: {
        fetchOtherServices(){
            if(this.displayService == "d-none"){
                this.displayService = "d-block"
            }else{
                this.displayService = "d-none"
            }
        },
        fetchServices(){
            axios.get("http://127.0.0.1:8000/api/services")
            .then((res)=>{
                this.services = res.data.results
            })
        }
    },
    created() {
        this.fetchServices()
    }
}
</script>

<style lang="scss" scoped>
@use '../style/partials/variables.scss' as *;
.ms-filters{
    display: flex;
    align-items: center;
    justify-content: center;
}
// .searchbar{
//     margin-right: auto;
// }
.price-label {
display: inline-block;
width: 50px;
text-align: center;
font-size: 14px;
font-weight: bold;
}

.input_number{
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
.offcanvas{
    width: 80%;
}

.display-tablet-desktop{
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
    .display-only-mobile{
    display: none;
    }
    .display-tablet-desktop{
    display: block;
    }
}

@media screen and (min-width: 992px) {
    .offcanvas {
    width: 20%;
    }
    .display-only-mobile{
    display: none;
    }
    .display-tablet-desktop{
    display: block;
    }
}
.ms-filter-canvas{
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
.ms-other-services{
    color: $primary-color;
    background-color: white;
    border: 1px solid $primary-color;
    border-radius: 10px;
    padding: 5px 10px;
    margin-top: 10px;
}
.card{
    overflow: hidden;
    box-shadow: 0 1px 20px rgba(0, 0, 0, 0.171);
    margin-bottom: 20px;
    color: currentColor;
    text-decoration: none;
    .card:hover{
        .card-img{
            transform: scale(1.1);
            transition-duration: 0.5s;
        }
    }

    img{
        display: block;
    }
    .card-img{
        height: 150px;
        transition-duration: 0.5s;
        object-position: center;
        object-fit: cover;
    }

    .card-description{
        position: relative;
        bottom: 0;
        margin: 0 auto;
        padding: 10px;
        background-color: white;
    }
    .card-title{
        font-size: 20px;
    }
    .card-location{
        font-size: 15px;
        color: black;
    }
    .card-icon-summary{
        display: flex;
        align-items: center;
        gap: 8px;
        color: black;
        font-size: 14px;

        p{
            margin: 0;
        }
    }
    .icon-color{
        color: $primary-color;
    }
    .card-price-summary{
        
        font-size: 28px;
        p{
            margin: 0;
        }
    }
    .icon-info{
        display: flex;
        gap: 20px;
        align-items: baseline;
    }
}
</style>