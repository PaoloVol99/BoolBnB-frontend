<template>
    <Default>

        <div class="container">
            <h1 class="mt-3 mb-0">{{ apartment.title }}</h1>
            <span>{{ apartment.address + ', ' + apartment.city }}</span>
            <div class="row ms_row my-3">
                <div class="col-xl-7 col-sm-12 ms_col-5 py-1">
                    <img class="ms_img" :src="apartment.cover_path" alt="">
                </div>
                <div class="col-xl-5 col-sm-12 ms_col-7 d-flex flex-wrap gx-3">
                    <div class="extra-image-container p-1" v-for="image in apartment.images" :class="extraImagesLayout()">
                        <img class="ms_img extra-image" :src="image.image_path" alt="">
                    </div>
                </div>
            </div>
            <div class="icon-info d-flex align-items-center mb-4">
                <div class="specs-icon d-flex align-items-baseline pe-2 fs-5">
                    <font-awesome-icon class="icon-color pe-2" :icon="['fas', 'bed']" />
                    <p class="mb-0">{{ apartment.beds }} posti letto</p>
                </div>
                <div class="specs-icon d-flex align-items-baseline px-2 fs-5">
                    <font-awesome-icon class="icon-color pe-2" :icon="['fas', 'door-closed']" />
                    <p class="mb-0">{{ apartment.rooms }} stanze</p>
                </div>
                <div class="specs-icon d-flex align-items-baseline px-2 fs-5">
                    <font-awesome-icon class="icon-color pe-2" :icon="['fas', 'shower']" />
                    <p class="mb-0">{{ apartment.bathrooms }} bagni</p>
                </div>
            </div>

            <div class="row">
                <div class="col-xl-8 col-sm-12">
                    <h4>Qualcosa in più sull'appartamento:</h4>
                    <p>
                        {{ apartment.description }}
                    </p>
                    <h4 class="mt-3">Dove si trova:</h4>
                    <div class="mb-4" id="map-container">

                    </div>
                </div>
                <div class="col-xl-4 col-sm-12">
                    <div class="aside-container">
                        <div class="info-container">
                            <h3> &euro;{{ apartment.price }} a notte </h3>
                            <span class="fs-4">{{ apartment.sqm }} &#13217;</span>
                        </div>
                        <form class="messages-form" @submit.prevent="sendForm" id="message">
                            <h4>Manda un messaggio al proprietario</h4>
                            <div>
                                <!-- <label for="name">Nome</label> -->
                                <input type="text" v-model="name" id="name" name="name" placeholder="Il tuo nome">
                            </div>
                            <div>
                                <!-- <label for="email">Indirizzo email</label> -->
                                <input type="text" v-model="email" id="email" name="email"
                                    placeholder="Il tuo indirizzo email">
                            </div>
                            <div>
                                <!-- <label for="text">Messaggio</label> -->
                                <textarea type="text" v-model="text" id="text" name="text"
                                    placeholder="Scrivi il tuo messaggio"></textarea>
                            </div>
                            <input class="d-none" type="number" v-model="apartment.id">
                            <button type="submit">Invia</button>
                        </form>

                    </div>
                </div>

            </div>

        </div>
        <!-- <Message :apartment_id="apartment.id"></Message> -->
        <div class="container">
        </div>

    </Default>
</template>

<script>
import Searchbar from '../components/Searchbar.vue';
import Suggested_holidays from '../components/Suggested_holidays.vue';
import Featured_accommodation from '../components/Featured_accommodation.vue';
import axios from 'axios'
import Default from '../layouts/Default.vue';
import tt from '@tomtom-international/web-sdk-maps';
import store from '../store';


export default {
    props: ['slug'],
    data() {
        return {
            apartment: {},
            store,
            name: store.userName,
            email: store.userEmail,
            text: '',
            success: false,
            errors: null,
            apiKey: '5yE1GYuQA7WyAdPZ1zAeJtBq8cKtoae3',
            // mapContainer: this.$refs.mapContainer

        };
    },
    methods: {
        fetchApartment() {
            console.log("slug", this.slug)
            axios.get(`http://127.0.0.1:8000/api/apartments/${this.slug}`)
                .then((res) => {
                    console.log("api", res.data.apartment)
                    this.apartment = res.data.apartment
                    console.log("appartamento", this.apartment)
                    this.fetchMap();
                })

        },
        sendForm() {
            let data = {
                name: this.name,
                email: this.email,
                text: this.text,
                apartment_id: this.apartment.id,
            }
            console.log(data)
            axios.post("http://127.0.0.1:8000/api/messages", data)
                .then((res) => {
                    if (res.data.success) {
                        this.text = ''
                    }
                })
        },
        fetchMap() {
            let lng = parseFloat(this.apartment.lng)
            let lat = parseFloat(this.apartment.lat)
            console.log(lng, lat)
            let center = [lng, lat]
            console.log("center", center)
            const map = tt.map({
                key: '5yE1GYuQA7WyAdPZ1zAeJtBq8cKtoae3',
                container: "map-container",
                center: center,
                zoom: 10,
            })
            console.log(map)
            map.on('load', () => {
                let marker = new tt.Marker().setLngLat(center).addTo(map)
                console.log(marker)

            })
            // let marker = new tt.Marker().setLngLat(center)
            // marker.addTo(map)
        },
        extraImagesLayout() {
            switch (this.apartment.images.length) {
                case 1:
                    return "img-1"
                    break;
                case 2:
                    return "img-2"
                    break;
                case 3:
                    return "img-3"
                    break;
                case 4:
                    return "img-4"
                    break;

                case 5:
                    return "img-5"
                    break;
            }
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
        this.fetchApartment();
    },
    components: { Default }
}
</script>


<style lang="scss" scoped>
@use '../style/partials/variables.scss' as *;

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

.ms_img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    transition: all 300ms cubic-bezier(.64, 0, .28, .98);
    border-radius: 10px;

    &:hover {
        transform: scale(104%);
        box-shadow: 0px 9px 37px 4px rgba(0, 0, 0, 0.55);
        cursor: pointer;
    }
}

.icon-color {
    color: $primary-color;
}

.ms_col-5 {
    max-height: 500px;
}

.ms_col-7 {
    max-height: 500px;
    // margin-left: -0.75rem;
}

.extra-image-container {

    &.img-1 {
        width: 100%;
        height: 100%;
    }

    &.img-2 {
        width: 100%;
        height: 50%;

        // padding-top: 0.25rem;
        &:first-child {
            // padding-bottom: 0.25rem;
            padding-top: 0;
        }
    }

    &.img-3 {
        width: 50%;
        height: 50%;
        // padding-top: 0.25rem;
    }

    &.img-3:first-child {
        width: 100%;
        height: 50%;
        // padding-bottom: 0.25rem;
        padding-top: 0;
    }

    &.img-4 {
        width: 50%;
        height: 50%;

        // padding-top: 0.25rem;
        &:first-child {
            padding-top: 0;

            // padding-bottom: 0.25rem;
            &+div {
                padding-top: 0;
                // padding-bottom: 0.25rem;
            }
        }
    }

    &.img-5 {
        width: 50%;
        height: calc(100% / 3);
        // padding-top: 0.25rem;
    }

    &.img-5:first-child {
        width: 100%;
        height: calc(100% / 3);
        padding-top: 0;
        // padding-bottom: 0.25rem;

        // & + div {
        //     // padding-bottom: 0.25rem;
        //     & + div {
        //         // padding-bottom: 0.25rem;
        //     }
        // }
    }

    .extra-image {
        object-fit: cover;
        object-position: center;
        height: 100%;
    }
}

.specs-icon {
    border: 1px solid $primary-color;
    padding: 8px;
    border-radius: 15px;
    color: $secondary-color;
    margin-right: 10px;
}

.info-container {
    border: 2px solid white;
    padding: 15px;
    border-radius: 15px;
    color: white;
    margin-bottom: 36px;
    // color: $secondary-color;
}

#map-container {
    width: 100%;
    height: 400px;
    border-radius: 15px;
}

.aside-container {
    padding: 10px;
    background-color: $primary-color;
    border-radius: 15px;
    margin-bottom: 50px;
    display: flex;
    flex-direction: column;
}

.messages-form {
    padding: 25px;
    border: 2px solid white;
    border-radius: 15px;
    color: white;


    h4 {
        margin-bottom: 25px;
    }

    input {
        border: none;
        background-color: rgb(226, 226, 226);
        padding: 10px;
        border-radius: 10px;
        width: 100%;
        margin-bottom: 20px;
    }

    textarea {
        border: none;
        background-color: rgb(226, 226, 226);
        padding: 10px;
        border-radius: 10px;
        width: 100%;
        margin-bottom: 20px;
    }

    button {
        border: none;
        background-color: $secondary-color;
        color: white;
        padding: 5px 15px;
        border-radius: 999px;
    }
}
</style>