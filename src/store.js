import { reactive } from 'vue';

const store = reactive({
    city: "",
    apartments: [],
    filteredApartments: [],
    radius: 20000,
    lat: "",
    lon: ""
})

export default store