<template>

<Default>

    <section class="advance-search">
        <div class="container">
            <h1 class="py-3">Ricerca Avanzata</h1>
        </div>
        <div class="container">
            <p>Elenco risultati</p>
            <p>{{ store.city}}</p>

            <div v-for="apartment in store.apartments" :key="apartment.id" class="card" style="width: 18rem;">
                <img class="card-img-top" :src="apartment.cover_image" alt="Card image cap">
                <div class="card-body">
                    <h5 class="card-title">{{apartment.title}}</h5>
                    <p class="card-text">{{apartment.description}}</p>
                </div>
            </div>
        </div>
    </section>

</Default>

</template>

<script>
import Default from '../layouts/Default.vue';
import store from '../store';

    export default {
    data(){
        return{
            store,
        }
    },
    components: { 
        Default 
    },
    mounted() {
        
    }
}
</script>

<style lang="scss" scoped>

</style>