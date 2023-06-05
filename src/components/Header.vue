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
                <ul class="navbar-nav align-items-center">

                    <li class="nav-item mx-2">
                        <router-link class="nav-link active" :to="{ name: 'home' }">Home</router-link>
                    </li>

                    <li class="nav-item mx-2">
                        <router-link class="nav-link active" :to="{ name: 'ricerca-avanzata' }">Ricerca
                            avanzata</router-link>
                    </li>

                    <li class="nav-item mx-2">
                        <a class="nav-link submit-bottom active rounded-3" aria-current="page" @click="PresetUser"
                            href="http://127.0.0.1:8000/login">{{ this.store.userName ? this.store.userName : 'Iscriviti'
                            }}</a>
                    </li>

                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
import store from '../store';

export default {
    data() {
        return {
            store
        }
    },
    methods: {
        PresetUser() {
            this.store.userName = '',
                this.store.userEmail = ''
        }
    }
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
</style>