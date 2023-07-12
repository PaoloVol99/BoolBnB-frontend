import axios from "axios";

const csrfToken = document
	.querySelector('meta[name="csrf-token"]')
	.getAttribute("content");

axios.defaults.headers["Content-Type"] = "application/json";
axios.defaults.withCredentials = true;

axios.interceptors.request.use(
	function (config) {
		if (config.url.includes("localhost")) {
			config.headers["X-CSRF-TOKEN"] = csrfToken;
		} else {
			delete config.headers["X-CSRF-TOKEN"];
			config.withCredentials = false;
		}
		return config;
	},
	function (error) {
		return Promise.reject(error);
	}
);
