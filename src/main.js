import { createApp } from "vue";
import App from "./App.vue";

import "bootstrap/dist/css/bootstrap.css";

import "bootstrap/dist/js/bootstrap.js";

// router
import {router} from './router'

createApp(App).use(router).mount('#app')