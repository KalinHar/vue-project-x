<template>
    <div class="container">
        <div class="columns is-multiline">
            <div class="column is-12">
                <h1 class="title">My Account</h1>
            </div>

            <div class="column is-12">
                <button @click="logout()" class="button is-danger">Logout</button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import {toast} from 'bulma-toast'

export default{
    name: 'MyAccount',
    methods: {
        async logout() {
            await axios
                .post('api/token/logout')
                .then(response => {
                    toast({
                             message: 'You logout!',
                             type: 'is-danger',
                             dismissible: true,
                             pauseOnHover: true,
                             duration: 2000,
                             position: 'bottom-right'
                         })
                })
                .catch(error =>{
                    console.log(JSON.stringify(error))
                })
            axios.defaults.headers.common['Authorization'] = ''
            localStorage.removeItem('token')
            this.$store.commit('removeToken')
            this.$router.push('/')

        }
    }
}
</script>
