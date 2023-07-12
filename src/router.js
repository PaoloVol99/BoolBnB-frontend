import { createRouter, createWebHistory } from "vue-router";

import Home from "./pages/Home.vue";
import Advance_search from "./pages/Advance_search.vue";
import ApartmentDetails from "./pages/ApartmentDetails.vue";
import Suggested_city from "./pages/Suggested_city.vue";
import Login from "./pages/Login.vue";
import Register from "./pages/Register.vue";

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: "/",
			name: "home",
			component: Home,
		},
		{
			path: "/ricerca-avanzata",
			name: "ricerca-avanzata",
			component: Advance_search,
		},
		{
			path: "/dettaglio-appartamento/:slug",
			name: "dettaglio-appartamento",
			component: ApartmentDetails,
			props: true,
		},
		{
			path: "/ispirazione-estiva",
			name: "apartments",
			component: Suggested_city,
		},
		{
			path: "/login",
			name: "login",
			component: Login,
		},
		{
			path: "/register",
			name: "register",
			component: Register,
		},
	],
});

export { router };
