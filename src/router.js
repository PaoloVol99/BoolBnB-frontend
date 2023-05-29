import { createRouter, createWebHistory } from "vue-router";

import Home from './pages/Home.vue';
import Advance_search from './pages/Advance_search.vue';

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
        }
    ]
})

export { router };