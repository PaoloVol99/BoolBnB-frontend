<template>
    <div>
        <div class="container">
            <div class="ms_form-container position-relative">
                <input class="ms_input" v-model="searchBox" @keyup="fetchResults()" type="text">
                <div class="ms_autocomplete-container position-absolute z-index-2">
                    <div class="autocomplete z-index-2" v-for="(result, i) in results" @click="selectResult(i)">
                        {{ result.address.freeformAddress }}
                    </div>
                </div>
                <!-- <button class="btn btn-primary rounded-pill" @click="fetchApartments()">Cerca</button> -->
                <router-link :to="{ name: 'ricerca-avanzata' }">
                    <button class="btn btn-primary rounded-pill" @click="fetchApartments()">Cerca</button>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import store from '../store'
export default {
    data() {
        return {
            searchBox: '',
            results: [],
            poiList: [],
            poiListFormatted: [],
            geometryFilter: [],
            city: '',
            store,
            radius: '' // cosi possiamo mettere il parametro che vogliamo 
        }
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
        pippo() {
            console.log('funziona')
        },
        fetchApartmentsRadiusCustom() {
            // console.log('geometryfilter', this.geometryFilter[0].latitudine);
            const latCenter = this.geometryFilter[0].latitudine;
            const lonCenter = this.geometryFilter[0].longitudine;
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
        // ,
        // fetchApartments() {
        //     console.log("chiamata")
        //     axios.get(`http://127.0.0.1:8000/api/apartments/city/${this.city}`)
        //     .then ((res) =>{
        //         console.log("api db", res.data.results)
        //         this.store.apartments = res.data.results
        //     })
        // }
    }
}
</script>

<style lang="scss" scoped>
@use '../style/partials/variables.scss' as *;

.ms_form-container {
    display: flex;
    align-items: center;
    margin: 0 auto;
}

.ms_autocomplete-container {
    width: 90%;
    left: 20px;
    top: 80px;
    margin-top: -18px;
    z-index: 999;
}

.ms_input {
    width: 90%;
    margin: 20px;
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
    // width: 90%;
    // margin: 0 auto;
    display: block;
    // border-radius: 10px;
    // border-top: 1px solid rgb(205, 205, 205);
    cursor: pointer;
    padding: 8px 25px;
    background-color: white;
    // &::after {
    //     content: '';
    //     display: block;
    //     background-color: rgb(205, 205, 205);
    //     width: 70%;
    //     height: 1px;
    //     margin: 8px auto 0;
    // }

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
    // border-radius: 10px;
    background-color: rgb(235, 235, 235);
    padding-bottom: 8px;
    border: none;

    &+.autocomplete {
        border: none;
    }

    // &::after {
    //     display: none;
    // }
}
</style>