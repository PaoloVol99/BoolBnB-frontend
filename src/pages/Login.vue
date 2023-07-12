<template>
    <Default>
        <div class="container p-5">
            <div class="row justify-content-center">
                <div class="col-md-8">
                    <div class="card">
                        <div class="card-header card-hd">Login</div>

                        <div class="card-body">
                            <form @submit.prevent="handleLogin(this.form)">

                                <div class="mb-4 row">
                                    <label for="email" class="col-md-4 col-form-label text-md-right">E-mail<span
                                            class="text-danger">*</span></label>

                                    <div class="col-md-6">
                                        <input id="email" type="email" class="form-control" name="email"
                                            v-model="form.email">
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
                                        <input id="password" type="password" class="form-control" v-model="form.password">
                                        <div v-if="errors">
                                            <span class="text-danger" v-for="error in errors.password">
                                                {{ error }}
                                            </span>
                                        </div>
                                    </div>
                                </div>


                                <div class="mb-4 row mb-0">
                                    <div class="col-md-8 offset-md-4">
                                        <button type="submit" class="nav-link submit-bottom active rounded-3 border-0">
                                            Accedi
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
import { useRouter } from "vue-router";
import { mapActions, mapState } from 'pinia';
import { useAuthStore } from '../stores/auth';

export default {

    components: {
        Default,
        useRouter

    },
    data() {
        return {
            form: {
                email: '',
                password: '',
            },
            authStore: useAuthStore(),
        }
    },
    computed: {
        ...mapState(useAuthStore, { errors: (state) => state.authErrors }),

    },

    methods: {
        ...mapActions(useAuthStore, ["handleLogin"])

        // }
        //     methods: {
        //         // handleLogin() {
        //         //     axios.get('http://localhost:8000/sanctum/csrf-cookie')
        //         //         .then(() => {
        //         //             axios.post('http://localhost:8000/login', {
        //         //                 email: this.email,
        //         //                 password: this.password
        //         //             }).then((res) => {
        //         //                 if (res.status === 200) {
        //         //                     localStorage.setItem('auth', 'true')
        //         //                     //console.log(res)
        //         //                     axios.get('http://localhost:8000/api/user')
        //         //                         .then(res => {
        //         //                             //console.log(res)
        //         //                             if (res.status === 200) {
        //         //                                 const user = res.data
        //         //                                 localStorage.setItem('userName', user.first_name)
        //         //                                 localStorage.setItem('userEmail', user.email)
        //         //                             }
        //         //                         })
        //         //                     this.errors = null
        //         //                     router.push('/');
        //         //                 }
        //         //             }).catch(err => {
        //         //                 this.errors = err.response.data.errors
        //         //             })

        //         //         })


        //     }
    },
    mounted() {
        console.log(this.errors)
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