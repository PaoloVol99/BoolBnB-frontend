<template>
    <div>
        <div class="container">
            <div class="ms_form-container position-relative">
                <input class="ms_input" v-model="searchBox" @keyup="fetchResults()" type="text">
                <div class="ms_autocomplete-container position-absolute">
                    <div class="autocomplete" v-for="(result, i) in results" @click="selectResult(i)">
                        {{ result.address.freeformAddress }}
                    </div>
                </div>
                <button class="btn btn-primary rounded-pill" @click="fetchApartments()">Cerca</button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
    export default {
        data() {
            return {
                searchBox: '',
                results: [],
                city: ''
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
                console.log(result)
                this.searchBox = result
                this.results = []


            },
            fetchApartments() {
                console.log("chiamata")
                axios.get(`http://127.0.0.1:8000/api/apartments/city/${this.city}`)
                .then ((res) =>{
                    console.log("api db", res.data.results)
                })
            }
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