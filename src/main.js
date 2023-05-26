import { createApp } from "vue";
import App from "./App.vue";

import "bootstrap/dist/css/bootstrap.css";

import "bootstrap/dist/js/bootstrap.js";

import "@tomtom-international/web-sdk-plugin-searchbox/dist/SearchBox.css";

// router
import {router} from './router'

createApp(App).use(router).mount('#app')