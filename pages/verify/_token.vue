<template>
    <div class="container mx-auto flex flex-col items-center w-full h-full">
        <template v-if="state.expired">
            <template v-if="state.resendSuccess">
                <div class="text-sky-600">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-20 w-20" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                    </svg>
                </div>
                <h5 class="text-center">We have sent a verification code to {{form.email}}</h5>
                <p class="text-center">please also check your spam folder</p>
            </template>
            <template v-else>
                <h5 class="text-center ml-2">
                    Your verification code has expired
                </h5>
                <hr class="my-4 border-gray-200 dark:border-gray-700">
                <Form :form="form" class="w-full sm:w-1/2">
                    <template slot="inputs">
                        <FormulateInput 
                            v-model="form.email"
                            id="email"
                            name="email"
                            type="email"
                            autocomplete="email"
                            validation="required"
                            placeholder="Email Address" 
                            class="my-2"          
                        />
                    </template>
                    <template slot="errors">
                        <p v-for="(error, index) in state.errors" :key="index" class="text-sm text-red-500 ml-2">{{error.msg}}</p>
                    </template>
                    <template slot="footer">
                        <FormulateInput
                            type="submit"
                            name="verification"
                            class="mt-4"
                            :disabled="state.loading"
                            input-class="relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            <template v-if="!state.loading">
                                Re-send verification code
                            </template>
                            <template v-else>
                                <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle class="opacity-50" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                    <path class="opacity-100" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            </template>
                        </FormulateInput>
                    </template>
                </Form>
            </template>
        </template>
        <template v-else>
            <div class="text-center">
                <h1 class="mb-4">Verifying account</h1>
            </div>
            <div class="animate-spin border-sky-600 border-t-4 rounded-full w-16 h-16"></div>
        </template>
    </div>
</template>

<script>
export default {
    name: 'verify',
    auth: false,
    computed: {
        finish () {
            return this.form.finish
        }
    },
    watch: {
        finish (newVal) {
            if (newVal) {
                this.sendVerification()
                this.form.finish = false
            }
        }
    },
    data() {
        return {
            state: {
                expired: null,
                errors: [],
                loading: false,
                resendSuccess: false,
                verifySuccess: false,
            },
            form: {
                finish: false,
                email: ''
            }
        }
    },
    async asyncData({params}) {
        const token = params.token
        return { token }
    },
    mounted() {
        if (this.token) {
            this.$axios.post('/auth/verify', {token: this.token})
                .then((response) => {
                    this.$auth.setUser(response.data.user)
                    this.$router.push('/profile')
                })
                .catch(error => {
                    this.state.expired = error.response.data.message
                })
        }
    },
    methods: {
        sendVerification() {
            this.state.loading = true
            const verification = this.$axios.post('/auth/resendVerification', this.form)
            verification.then(() => {
                this.state.resendSuccess = true
                this.state.loading = false
            })
            .catch(error => {
                this.state.errors = error.response.data.errors
                this.state.loading = false
            })
        }
    }
}
</script>