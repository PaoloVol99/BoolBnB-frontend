import { reactive } from 'vue';

const store = reactive({
    userName: "",
    userEmail: "",
    city: "",
    apartments: [],
    filteredApartments: [],
    radius: 20000,
    lat: "",
    lon: ""
})

export default store