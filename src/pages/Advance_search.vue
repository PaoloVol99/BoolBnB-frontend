<template>

<Default>

    <section class="advance-search">
        <div class="container">
            <h1 class="py-3">Ricerca Avanzata</h1>
        </div>
        <div class="container">
            <div class="ms-filters">
                <Searchbar class="searchbar"></Searchbar>
                <input class="input_number" type="number" id="num_ospiti" name="num_ospiti" placeholder="Numero di ospiti">
                <a class="btn ms-other-filters ms-3" data-bs-toggle="offcanvas" href="#offcanvasExample" role="button" aria-controls="offcanvasExample">
                Altri filtri
                </a>
            </div>
        </div>


        <div>


            <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
                <div class="offcanvas-header">
                    <h5 class="offcanvas-title" id="offcanvasExampleLabel">Filtri avanzati</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div class="offcanvas-body">
                    cercati l'appartamento nella lista
                </div>
            </div>
        </div>





        <div class="container py-3">
            <div class="row justify-content-center">
                <div v-for="apartment in store.apartments" :key="apartment.id" class="col-sm-6 col-md-4 col-lg-3 ms-col">
                    <div class="card">
                        <img class="card-img" :src="apartment.cover_image" alt="immagine">
                        <div class="card-description">
                            <h4 class="card-title">{{apartment.title}}</h4>
                            <p class="card-location">{{apartment.city}}</p>
                            <div class="icon-info">
                                <div class="card-icon-summary">
                                    <font-awesome-icon :icon="['fas', 'bed']" />
                                    <p>{{apartment.beds}}</p>
                                </div>
                                <div class="card-icon-summary">
                                    <font-awesome-icon :icon="['fas', 'user']" />
                                    <p>{{apartment.beds}}</p>
                                </div>
                                <div class="card-icon-summary">
                                    <font-awesome-icon :icon="['fas', 'shower']" />
                                    <p>{{apartment.bathrooms}}</p>
                                </div>
                                <div class="card-price-summary ms-3">
                                    <p>{{apartment.price}}euro;</p>
                                </div>
                            </div>
                        </div>

                    </div>
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

    export default {
    data(){
        return{
            store,
        }
    },
    components: { 
        Default,
        Searchbar,
    },
    mounted() {
        
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
.ms-other-filters{
    background-color: $primary-color;
    color: white;
    border-radius: 999px;
}
.card{
    overflow: hidden;
    box-shadow: 0 1px 20px rgba(0, 0, 0, 0.171);
    margin-bottom: 20px;
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