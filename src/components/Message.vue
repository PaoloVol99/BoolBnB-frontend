<script>
import axios from 'axios';
import store from '../store';
export default {
    data() {
        return {
            name: '',
            email: '',
            text: '',
            success: false,
            errors: null
        }
    },
    props: {
        apartment_id: {
            type: Number,
            required: true,
        }
    },
    methods: {
        // sendForm() {
        //     let data = {
        //         name: this.name,
        //         email: this.email,
        //         text: this.text,
        //         apartment_id: this.apartment_id,
        //     }
        //     console.log(data)
        //     axios.post("http://127.0.0.1:8000/api/messages", data)
        //         .then((res) => {
        //             console.log(data, 'sono data')
        //         })
        // }
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