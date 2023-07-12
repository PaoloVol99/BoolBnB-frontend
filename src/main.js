import { createApp, markRaw, watch } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";

import "bootstrap/dist/css/bootstrap.css";

import "bootstrap/dist/js/bootstrap.js";

import "@tomtom-international/web-sdk-plugin-searchbox/dist/SearchBox.css";

/* import the fontawesome core */
import { library } from "@fortawesome/fontawesome-svg-core";

/* import font awesome icon component */
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

/* import specific icons */
import { faCircleCheck } from "@fortawesome/free-regular-svg-icons";
import {
	faUser,
	faBed,
	faShower,
	faDoorClosed,
} from "@fortawesome/free-solid-svg-icons";
// import {  } from '@fortawesome/free-brands-svg-icons'

/* add icons to the library */
library.add(faUser, faBed, faShower, faDoorClosed, faCircleCheck);

// router
import { router } from "./router";

//axios
import "./axios";

const pinia = createPinia();
pinia.use(({ store }) => {
	store.router = markRaw(router);
});

watch(
	pinia.state,
	(state) => {
		localStorage.setItem("auth", JSON.stringify(state.auth));
	},
	{ deep: true }
);

createApp(App)
	.component("font-awesome-icon", FontAwesomeIcon)
	.use(pinia)
	.use(router)
	.mount("#app");
