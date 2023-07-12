import axios from "axios";
import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
	state: () => {
		if (localStorage.getItem("auth"))
			return JSON.parse(localStorage.getItem("auth"));
		return {
			authUser: null,
			authErrors: {},
		};
	},
	getters: {
		user: (state) => state.authUser,
		errors: (state) => state.authErrors,
	},
	actions: {
		getToken() {
			axios.get("http://localhost:8000/sanctum/csrf-cookie");
		},
		getUser() {
			this.getToken();
			axios.get("http://localhost:8000/api/user").then((res) => {
				console.log(res.data);
				if (res.status === 200) {
					this.authUser = res.data;
				}
			});
		},
		handleLogin(data) {
			this.getToken();

			axios
				.post("http://localhost:8000/login", {
					email: data.email,
					password: data.password,
				})
				.then((res) => {
					if (res.status === 200) {
						this.authUser = res.data.results;
						this.authErrors = {};
						this.router.push("/");
					}
				})
				.catch((err) => {
					if (err.response.status === 422) {
						console.log(err);
						this.authErrors = err.response.data.errors;
						console.log(this.authErrors);
					}
				});
		},
		handleRegister(data) {
			this.getToken();
			axios
				.post("http://localhost:8000/register", {
					first_name: data.first_name,
					last_name: data.last_name,
					date_birth: data.date_birth,
					password_confirmation: data.password_confirmation,
					email: data.email,
					password: data.password,
				})
				.then((res) => {
					//console.log(res);
					if (res.status === 200) {
						this.authUser = res.data.results;
						this.authErrors = {};
						this.router.push("/");
					}
				})
				.catch((err) => {
					if (err.response.status === 422) {
						console.log(err);
						this.authErrors = err.response.data.errors;
						console.log(this.authErrors);
					}
				});
		},
		handleLogout() {
			axios.post("http://localhost:8000/logout").then((res) => {
				this.authUser = null;
			});
			this.router.push("/");
		},
	},
});
