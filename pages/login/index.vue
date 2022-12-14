<template>
    <div class="container mx-auto">
        <div class="flex justify-center align-center">
            <div class="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div class="max-w-md w-full space-y-8">
                    <div>
                        <img class="mx-auto w-auto" src="~/assets/images/scl-logo.png" alt="Starcheese League" />
                        <h2 class="mt-6 text-center text-3xl font-extrabold text-slate-900">Log in to your account</h2>
                    </div>
                    <C_Form :form="form">
                        <template slot="inputs">
                            <FormulateInput 
                                v-model="form.email"
                                id="email"
                                name="email"
                                type="email"
                                autocomplete="email"
                                validation="required|email"
                                placeholder="Email Address" 
                                class="my-2"          
                            />
                            <FormulateInput 
                                v-model="form.password"
                                id="password"
                                name="password"
                                type="password"
                                autocomplete="password"
                                validation="required"
                                placeholder="Password"
                                class="my-2"          
                            />
                        </template>
                        <template slot="errors">
                            <p v-for="(error, index) in errors" :key="index" class="text-sm text-red-500 ml-2">{{error.msg}}</p>
                        </template>
                        <template slot="footer">
                            <C_Button
                                type="submit"
                                class="w-full mt-4"
                                :disabled="loading"
                                :loading="loading"
                                label="Login"
                                primary="true"
                            >
                                <span slot="icon" class="absolute left-0 inset-y-0 flex items-center pl-3">
                                    <svg class="h-5 w-5 text-white group-hover:text-blue-400" x-description="Heroicon name: solid/lock-closed" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd"></path>
                                    </svg>
                                </span>
                            </C_Button>
                            <div class="text-right my-2">
                                <nuxt-link to="/forgot-password" class="underline hover:no-underline">Forgot Password?</nuxt-link>
                            </div>
                        </template>
                    </C_Form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import C_Button from '../../components/C_Button.vue'
import C_Form from '../../components/C_Form.vue'

export default {
    name: 'Login',
    components: {
        C_Button,
        C_Form
    },
    data: () => ({
        form: {
            finish: false
        },
        loading: false,
        errors: '',
    }),
    computed: {
        finish () {
            return this.form.finish
        }
    },
    watch: {
        finish (newVal) {
            if (newVal) {
                this.login()
                this.form.finish = false
            }
        }
    },
    methods: {
        async login () {
            this.loading = true
            try {
                await this.$auth.loginWith('local', {
                    data: {
                        email: this.form.email,
                        password: this.form.password
                    }
                })
                this.$router.push('/profile')
            } catch (error) {
                if (error) {
                    this.loading = false
                    this.errors = error.response.data.errors
                }
            }
        }
    }
}
</script>