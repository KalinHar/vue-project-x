<template>
    <div class="container">
        <div class="columns is-multiline">
            <div class="column is-12">
                <h1 class="title">Plans</h1>
            </div>

            <div class="column is-4">
                <div class="box">
                    <h2 class="subtitle">Free</h2>
                    <h4 class="is-size-3">$0</h4>

                    <p>Max 5 clients</p>
                    <p>Max 5 leads</p>

                    <button @click="subscribe('free')" class="button is-primary">Subscribe</button>
                </div>
            </div>

            <div class="column is-4">
                <div class="box">
                    <h2 class="subtitle">Small</h2>
                    <h4 class="is-size-3">$5</h4>

                    <p>Max 10 clients</p>
                    <p>Max 10 leads</p>

                    <button @click="subscribe('small')" class="button is-primary">Subscribe</button>
                </div>
            </div>

            <div class="column is-4">
                <div class="box">
                    <h2 class="subtitle">Big</h2>
                    <h4 class="is-size-3">$10</h4>

                    <p>Max 50 clients</p>
                    <p>Max 50 leads</p>

                    <button @click="subscribe('big')" class="button is-primary">Subscribe</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { toast } from 'bulma-toast'
 
export default {
    name: 'Plans',
    data() {
        return {
            pub_key: '',
            stripe: null,
        }
    },
    async mounted() {
        await this.getPubKey()
        this.stripe = Stripe(this.pub_key)
    },
    methods: {
        async getPubKey() {
            this.$store.commit('setIsLoading', true)

            await axios
                .get(`/api/stripe/get_stripe_pub_key/`)
                .then(response => {
                    this.pub_key = response.data.pub_key
                })
                .catch(error => {
                    console.log(error)
                })
            
            this.$store.commit('setIsLoading', false)
        },
        async subscribe(plan_type) {
            this.$store.commit('setIsLoading', true)

            const data = {
                plan: plan_type
            }

            await axios
                .post('/api/stripe/create_checkout_session/', data)
                .then(response => {
                    console.log(response)
                    return this.stripe.redirectToCheckout({sessionId: response.data.sessionId})
                })
                .catch(error => {
                    console.log('Error:', error)
                })

            this.$store.commit('setIsLoading', true)
        }
    }
}
</script>