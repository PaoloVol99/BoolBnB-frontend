import { createApp } from "vue";
import App from "./App.vue";

import "bootstrap/dist/css/bootstrap.css";

import "bootstrap/dist/js/bootstrap.js";

import "@tomtom-international/web-sdk-plugin-searchbox/dist/SearchBox.css";

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
// import { } from '@fortawesome/free-regular-svg-icons'
import {faUser, faBed, faShower, faDoorClosed} from '@fortawesome/free-solid-svg-icons'
// import {  } from '@fortawesome/free-brands-svg-icons'

/* add icons to the library */
library.add(
    faUser,
    faBed,
    faShower,
    faDoorClosed
)


// router
import {router} from './router'

createApp(App)
.component('font-awesome-icon', FontAwesomeIcon)
.use(router)
.mount('#app')