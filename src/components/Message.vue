<script>
import axios from 'axios';
import store from '../store';
export default {
    data() {
        return {
            name: '',
            email: '',
            text: '',
        }
    },
    props: {
        apartment_id: {
            type: Number,
            required: true,
        }
    },
    methods: {
        sendForm() {
            console.log('funziono')
            const data = {
                name: this.name,
                email: this.email,
                text: this.text,
                apartment_id: this.apartment_id
            }
            console.log(data)
        }
    }
}
</script>
<template>
    <div class="container">
        <form @submit.prevent="sendForm">
            <div>
                <input type="text" v-model="name" name="name">
            </div>
            <div>
                <input type="text" v-model="email" name="email">
            </div>
            <div>
                <textarea type="text" v-model="text" name="text"></textarea>
            </div>
            <button type="submit">Invia</button>
        </form>
    </div>
</template>





<style></style>