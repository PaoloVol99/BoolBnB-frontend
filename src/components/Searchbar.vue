<template>
    <div>

        <div v-html="searchBoxHTML">
        </div>
    </div>
</template>

<script>
import tt from '@tomtom-international/web-sdk-maps';
import { services } from '@tomtom-international/web-sdk-services';
import SearchBox from '@tomtom-international/web-sdk-plugin-searchbox';

const options = {

    searchOptions: {
    key: "5yE1GYuQA7WyAdPZ1zAeJtBq8cKtoae3",
    language: "it-IT",
    limit: 5,
    countrySet: "IT"
    },
    autocompleteOptions: {
    key: "5yE1GYuQA7WyAdPZ1zAeJtBq8cKtoae3",
    language: "it-IT",
    countrySet: "IT"
    }
}

const ttSearchBox = new SearchBox(services, options);
const searchBoxHTML = ttSearchBox.getSearchBoxHTML();
// document.getElementById('giuppi').append(searchBoxHTML)

// map.addControl(ttSearchBox, 'top-left');

    export default {
        data() {
            return {
            }
        },
        methods: { 
        //     searchBar() {
        //         let options = {
        //         searchOptions: {
        //         key: "5yE1GYuQA7WyAdPZ1zAeJtBq8cKtoae3",
        //         language: "it-IT",
        //         limit: 5,
        //         countrySet: "IT"
        //         },
        //         autocompleteOptions: {
        //         key: "5yE1GYuQA7WyAdPZ1zAeJtBq8cKtoae3",
        //         language: "it-IT",
        //         countrySet: "IT"
        //         },
        //         }
        //     let ttSearchBox = new tt.plugins.SearchBox(tt.services, options)
        //     let searchBoxHTML = ttSearchBox.getSearchBoxHTML()
        //     document.body.append(searchBoxHTML)
        //     console.log(document)
        //     },
        // },
        // mounted() {
        //     this.searchBar()
        // }
        }}
</script>

<style lang="scss" scoped>

</style>