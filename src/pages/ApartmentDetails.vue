<template>
    <Default>

        <div class="container">
            <h1>{{ apartment.title }}</h1>
            <span>{{ apartment.address + ', ' + apartment.city }}</span>
            <div class="row">
                <div class="col-7">
                    <img :src="apartment.cover_image" alt="">
                </div>
                <div class="col-5">
                    ALTRE IMMAGINI
                </div>
            </div>
            <div class="specifications d-flex">
                <span class="spec">
                    {{ apartment.beds }} posti letto
                </span>
                <span class="spec">
                    {{ apartment.rooms }} stanze
                </span>
                <span class="spec">
                    {{ apartment.bathrooms }} bagni
                </span>
            </div>
            <div class="row">
                <div class="col-8">
                    <p>
                        {{ apartment.description }}
                    </p>
                </div>
                <div class="col-4">
                    <div class="info-container">
                        <h3> {{ apartment.price }} /notte </h3>
                        <span>{{ apartment.sqm }} &#13217;</span>
                    </div>
                </div>

                <div id="map-container">

                </div>
            </div>

        </div>
        <Message :apartment_id="apartment.id"></Message>

    </Default>
</template>

<script>
import Searchbar from '../components/Searchbar.vue';
import Suggested_holidays from '../components/Suggested_holidays.vue';
import Featured_accommodation from '../components/Featured_accommodation.vue';
import axios from 'axios'
import Default from '../layouts/Default.vue';
import tt from '@tomtom-international/web-sdk-maps'
import Message from '../components/Message.vue'

export default {
    data() {
        return {
            apartment: {
                "id": 2,
                "user_id": 18,
                "title": "Villa di Lusso con Vista Mare e Piscina Privata",
                "rooms": 15,
                "beds": 8,
                "bathrooms": 5,
                "sqm": 180,
                "address": "Borgo Brigitta 8 Appartamento 16",
                "city": "Roma",
                "lat": -2.49216,
                "lng": 167.54753,
                "visibility": 1,
                "price": "324.00",
                "description": "Sint vel sed non pariatur cumque. Aut et eos aspernatur rerum quas. Velit consequatur placeat aut voluptas laboriosam iure voluptates. Qui iste iste dolor aut. Tempora sequi ducimus eum. Nesciunt nisi minima inventore aut quaerat.",
                "cover_image": "https://via.placeholder.com/640x480.png/009955?text=est",
                "slug": "villa-di-lusso-con-vista-mare-e-piscina-privata"
            },
            apiKey: '5yE1GYuQA7WyAdPZ1zAeJtBq8cKtoae3',
            // mapContainer: this.$refs.mapContainer

        };
    },
    methods: {
        fetchMap() {

            let center = [9.093420, 45.274068]
            const map = tt.map({
                key: '5yE1GYuQA7WyAdPZ1zAeJtBq8cKtoae3',
                container: "map-container",
                center: center,
                zoom: 10,
            })
            console.log(map)
            map.on('load', ()=> {
                let marker = new tt.Marker().setLngLat(center).addTo(map)
                console.log(marker)

            })
            // let marker = new tt.Marker().setLngLat(center)
            // marker.addTo(map)
        }
        //     axios.get('https://api.tomtom.com/map/1/tile/basic/main/0/0/0.png',
        //         {
        //             params: {
        //                 key: '5yE1GYuQA7WyAdPZ1zAeJtBq8cKtoae3',
        //                 tileSize: 256,
        //                 view: 'Unified',
        //                 language: 'it-IT'
        //             }
        //         })
        //         .then((res) => {
        //             console.log(res.data)
        //             this.map = res.data
        //         })
        // }
        // // fetchApartment() {
        // //     axios.get('http://127.0.0.1:8000/api/apartments/attico-moderno-con-vista-mozzafiato')
        // //         .then((res) => {
        // //             this.apartment = res.data.results
        // //             console.log(this.apartment)
        // //             console.log(res)
        // //             this.apartmentAddress
        // //         })
        // // }

    },
    mounted() {
        this.fetchMap();
    },
    components: { Default, Message }
}
</script>


<style lang="scss" scoped>

// TEMPORANEO
.spec {
    &::after {
        content: '';
        display: inline-block;
        width: 2px;
        height: 13px;
        background-color: black;
        margin-right: 8px;
        margin-left: 3px;
    }
    
    &:last-child::after {
        display: none;
    }
    
    
}

#map-container {
    width: 400px;
    height: 400px;

}

</style>