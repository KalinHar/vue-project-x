<template>
    <div class="container">
        <div class="columns is-multiline">
            <div class="column is-12">
                <h1 class="title">Clients</h1>
                <router-link to="/dashboard/clients/add">Add client</router-link>
            </div>

            <div class="column is-12">
                <table class="table is-fullwidth">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Contact person</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="client in clients" v-bind:key="client.id">
                            <td>{{ client.name }}</td>
                            <td>{{ client.contact_person }}</td>
                            <td>
                                <router-link :to="{ name: 'client', params: {id: client.id} }">Deatils</router-link>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <div class="buttons">
                    <button class="button is-light is-small" @click="goToPreviousPage()" v-if="showPreviousButton">Previous</button>
                    <button class="button is-light is-small" @click="goToNextPage()" v-if="showNextButton">Next</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default{
    name: 'Clients',
    data() {
        return {
            clients: [],
            showNextButton: false,
            showPreviousButton: false,
            currentPage: 1,
        }
    },
    mounted() {
        this.getClients()
    },
    methods: {
        goToNextPage() {
            this.currentPage += 1
            this.getClients()
        },
        goToPreviousPage() {
            this.currentPage -= 1
            this.getClients()
        },
        async getClients() {
            this.$store.commit('setIsLoading', true)

            await axios
                .get(`/api/clients/?page=${this.currentPage}`)
                .then(response => {
                    this.clients = response.data.results

                    this.showNextButton = response.data.next ? true : false
                    this.showPreviousButton = response.data.previous ? true : false
                })
                .catch(error => {
                    console.log(error)
                })


            this.$store.commit('setIsLoading', false)
        }
    }
}
</script>