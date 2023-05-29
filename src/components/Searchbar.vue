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
                <router-link :to="{ name:'ricerca-avanzata'}">
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
                store
            }
        },
        methods: { 
            fetchApartmentsRadius(){
                axios.get("https://api.tomtom.com/search/2/geometryFilter.json",
                {
                    params:{
                        key: '5yE1GYuQA7WyAdPZ1zAeJtBq8cKtoae3',
                        geometryList: JSON.stringify(this.geometryFilter),
                        poiList: JSON.stringify(this.poiList)

                    }
                })
                .then ((res)=>{
                    console.log("risultato", res.data)
                })
                console.log("funzione ok", JSON.stringify(this.geometryFilter))
            },
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
                .then ((res) => {
                    console.log(res.data.results)
                    this.results = res.data.results
                })
            } else {
                this.results = []
            }},
            selectResult(i) {
                let result = this.results[i].address.freeformAddress
                this.city = this.results[i].address.municipality
                this.store.city = this.city
                console.log(result)
                this.searchBox = result
                console.log("results", this.results)

                let createFilter = {
                    "type": "CIRCLE",
                    "position": this.results[i].position.lat + "," + this.results[i].position.lon,
                    "radius": 20000
                }

                this.geometryFilter.push(createFilter)

                console.log("create filter geometry", createFilter)
                this.results = []

            },
            fetchApartments() {
                console.log("chiamata")
                axios.get('http://127.0.0.1:8000/api/apartments')
                .then ((res) =>{
                    // console.log("api db", res.data.results)
                    this.store.apartments = res.data.results

                    this.poiList = res.data.results
                    // console.log("poiList", this.poiList)

                    this.poiList.forEach((apartment)=>{
                        let apartmentFormatted = {
                            "poi":{
                                "name": apartment.title
                            },
                            "address":{
                                "freeformAddress": apartment.address + ", " + apartment.city
                            },
                            "position": {
                                "lat": apartment.lat,
                                "lon": apartment.lng
                            }

                        }

                        this.poiListFormatted.push(apartmentFormatted)

                    })

                    console.log("poi formatted", this.poiListFormatted)

                    if (res.data.success) {
                        this.fetchApartmentsRadius()
                    }
                })

            }
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