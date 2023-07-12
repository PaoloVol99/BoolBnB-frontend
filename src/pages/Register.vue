<template>
    <Default>
        <div class="container p-5">
            <div class="row justify-content-center">
                <div class="col-md-8">
                    <div class="card">
                        <div class="card-hd p-2">Iscriviti</div>

                        <div class="card-body bool-card">
                            <form @submit.prevent="handleRegister(this.form)">

                                <div class="mb-4 row">
                                    <label for="first_name" class="col-md-4 col-form-label text-md-right">Nome <span
                                            class="text-danger">*</span> </label>

                                    <div class="col-md-6">
                                        <input id="first_name" type="text" v-model="form.first_name" class="form-control"
                                            name="first_name">
                                        <div v-if="errors">
                                            <span class="text-danger" v-for="error in errors.first_name" :key="error">
                                                {{ error }}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div class="mb-4 row">
                                    <label for="last_name" class="col-md-4 col-form-label text-md-right">Cognome <span
                                            class="text-danger">*</span></label>

                                    <div class="col-md-6">
                                        <input id="last_name" type="text" v-model="form.last_name" class="form-control"
                                            name="last_name">
                                        <div v-if="errors">
                                            <span class="text-danger" v-for="error in errors.last_name" :key="error">
                                                {{ error }}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div class="mb-4 row">
                                    <label for="date_birth" class="col-md-4 col-form-label text-md-right">Data di
                                        nascita<span class="text-danger">*</span></label>

                                    <div class="col-md-6">
                                        <input type="date" class="form-control" v-model="form.date_birth" id="date_birth"
                                            name="date_birth">
                                        <div v-if="errors">
                                            <span class="text-danger" v-for="error in errors.date_birth" :key="error">
                                                {{ error }}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div class="mb-4 row">
                                    <label for="email" class="col-md-4 col-form-label text-md-right">E-Mail<span
                                            class="text-danger">*</span></label>

                                    <div class="col-md-6">
                                        <input id="email" type="email" v-model="form.email" class="form-control"
                                            name="email">
                                        <div v-if="errors">
                                            <span class="text-danger" v-for="error in errors.email" :key="error">
                                                {{ error }}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div class="mb-4 row">
                                    <label for="password" class="col-md-4 col-form-label text-md-right">Password<span
                                            class="text-danger">*</span></label>

                                    <div class="col-md-6">
                                        <input id="password" type="password" v-model="form.password" class="form-control"
                                            name="password">
                                        <div v-if="errors">
                                            <span class="text-danger" v-for="error in errors.password" :key="error">
                                                {{ error }}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div class="mb-4 row">
                                    <label for="password-confirm" class="col-md-4 col-form-label text-md-right">Conferma
                                        Password<span class="text-danger">*</span></label>

                                    <div class="col-md-6">
                                        <input id="password-confirm" type="password" v-model="form.password_confirmation"
                                            class="form-control" name="password_confirmation">
                                        <div v-if="errors">
                                            <span class="text-danger" v-for="error in errors.password_confirmation"
                                                :key="error">
                                                {{ error }}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div class="mb-4 row mb-0">
                                    <div class="col-md-6 offset-md-4">
                                        <button type="submit" class="nav-link submit-bottom active rounded-3 border-0">
                                            Iscriviti
                                        </button>
                                    </div>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Default>
</template>

<script>
import Default from '../layouts/Default.vue';
import axios from 'axios';
import { useRouter } from "vue-router";
import { router } from '../router';
import { mapActions, mapState } from 'pinia';
import { useAuthStore } from '../stores/auth';

export default {

    components: {
        Default,
        useRouter,

    },
    data() {
        return {
            form: {
                first_name: '',
                last_name: '',
                date_birth: '',
                email: '',
                password: '',
                password_confirmation: '',
            },
            authStore: useAuthStore(),
        }
    },
    computed: {
        ...mapState(useAuthStore, { errors: (state) => state.authErrors }),

    },
    methods: {
        ...mapActions(useAuthStore, ['handleRegister'])

        //register() {

        // axios.get('http://localhost:8000/sanctum/csrf-cookie')
        //     .then(() => {
        //         axios.post('http://localhost:8000/register', {
        //             first_name: this.first_name,
        //             last_name: this.last_name,
        //             date_birth: this.date_birth,
        //             password_confirmation: this.password_confirmation,
        //             email: this.email,
        //             password: this.password
        //         }).then(res => {
        //             console.log(res.data, 'data')
        //             const { success } = res.data

        //             if (success) {
        //                 localStorage.setItem('auth', 'true')

        //                 axios.get('http://localhost:8000/api/user')
        //                     .then(res => {
        //                         //console.log(res)
        //                         if (res.status === 200) {
        //                             const user = res.data
        //                             localStorage.setItem('userName', user.first_name)
        //                             localStorage.setItem('userEmail', user.email)

        //                         }
        //                     })
        //                 router.push('/');
        //                 this.errors = null
        //             }

        //         }).catch(err => {
        //             this.errors = err.response.data.errors
        //             //console.log(this.errors)
        //         })

        //     })


    }
}

</script>

<style lang="scss" scoped>
@use '../style/partials/variables.scss' as *;

.card-hd {
    background-color: $secondary-color;
    color: white;
}

.nav-link:hover {
    color: $primary-color;
}

.submit-bottom {
    padding: 5px 20px;
}

.submit-bottom:hover {
    background-color: $primary-color;
}

.submit-bottom {
    background-color: #177E89;
    color: rgb(247, 247, 247) !important;
}
</style>