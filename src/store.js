import {reactive} from 'vue';

const store = reactive({
    city: "",
    apartments: [],
    filteredApartments : []
})

export default store