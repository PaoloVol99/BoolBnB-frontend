import { createRouter, createWebHistory } from "vue-router";

import Home from './pages/Home.vue';
import Advance_search from './pages/Advance_search.vue';
import ApartmentDetails from './pages/ApartmentDetails.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/ricerca-avanzata',
            name: 'ricerca-avanzata',
            component: Advance_search
        },
        {
            path: '/dettaglio-appartamento',
            name: 'dettaglio-appartamento',
            component: ApartmentDetails
        }
    ]
})

export { router };