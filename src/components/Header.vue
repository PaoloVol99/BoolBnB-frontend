<template>
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container">

            <!-- LOGO -->
            <router-link class="navbar-brand ms_navbar-brand" :to="{ name: 'home' }">
                <img class="ms_img" src="/logo-boolbnb-nero.png" alt="Logo">
            </router-link>

            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav align-items-center gap-2">

                    <li class="nav-item mx-2">
                        <router-link class="nav-link active p-0" :to="{ name: 'home' }">Home</router-link>
                    </li>

                    <li class="nav-item mx-2">
                        <router-link class="nav-link active p-0" :to="{ name: 'ricerca-avanzata' }">Ricerca
                            avanzata</router-link>
                    </li>

                    <li class="nav-item">
                        <a v-if="user" class="nav-link submit-bottom active rounded-3 userName" aria-current="page"
                            href="http://localhost:8000/dashboard">{{ user.first_name }}</a>

                        <router-link v-else class="nav-link submit-bottom active rounded-3"
                            :to="{ name: 'login' }">Accedi</router-link>

                        <!-- <a class="nav-link submit-bottom active rounded-3" aria-current="page" @click="PresetUser"
                            href="http://127.0.0.1:8000/register">{{ this.store.userName ? this.store.userName : 'Iscriviti'
                            }}</a> -->
                    </li>

                    <li class="nav-item">
                        <a v-if="user" class="nav-link submit-bottom active rounded-3" aria-current="page" href="#"
                            @click.prevent="handleLogout">Logout</a>

                        <router-link v-else class="nav-link submit-bottom active rounded-3"
                            :to="{ name: 'register' }">Iscriviti</router-link>
                    </li>

                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
import store from '../store';
import { useRouter } from "vue-router";
import { mapActions, mapState } from 'pinia';
import { useAuthStore } from '../stores/auth';

export default {
    data() {
        return {
            store,
            useRouter,
            authStore: useAuthStore()
        }
    },
    computed: {
        ...mapState(useAuthStore, ['user'])
    },

    methods: {
        ...mapActions(useAuthStore, ['handleLogout'])

        //PresetUser() {
        //         this.store.userName = '',
        //             this.store.userEmail = ''
        //     }
        // }
    },

}

</script>

<style lang="scss" scoped>
@use '../style/partials/variables.scss' as *;

.navbar {
    padding: 20px 0;

    .navbar-collapse {
        flex-grow: 0;
    }

    .navbar-toggler:focus {
        box-shadow: 0 0 10px $primary-color;
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

    .ms_navbar-brand {
        width: 120px;
    }

}

.submit-bottom {
    background-color: #177E89;
    color: rgb(247, 247, 247) !important;
}

.userName {
    text-transform: capitalize;
}
</style>