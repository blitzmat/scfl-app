<template>
    <div class="container mx-auto">
        <div class="flex justify-center align-center">
            <div class="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div class="max-w-md w-full space-y-8">
                    <div>
                        <img class="mx-auto w-auto" src="~/assets/images/scl-logo.png" alt="Starcheese League" />
                        <h2 class="mt-6 text-center text-3xl font-extrabold text-slate-900">
                            <template v-if="requestSent">
                                Request has been sent to your email<br>
                            </template>
                            <template v-else>
                                Enter your email below to request a password reset
                            </template>
                        </h2>
                    </div>
                    <div v-if="requestSent" class="text-center">
                        <C_Button label="Home" primary="true" link="true" url="/" />
                    </div>
                    <C_Form v-else :form="form">
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
                        </template>
                        <template slot="errors">
                            <p v-for="(error, index) in errors" :key="index" class="text-sm text-red-500 ml-2">{{error.msg}}</p>
                        </template>
                        <template slot="footer">
                            <C_Button
                                type="submit"
                                :disabled="loading"
                                primary="true"
                                class="w-full"
                                label="Resquest password reset"
                            />
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
    name: 'ForgotPassword',
    auth: false,
    components: {
        C_Button,
        C_Form
    },
    data: () => ({
        form: {
            finish: false
        },
        loading: false,
        requestSent: false,
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
                this.requestResetPassword()
                this.form.finish = false
            }
        }
    },
    methods: {
        requestResetPassword() {
            this.loading = true
            this.$store.dispatch('user/requestResetPassword', { email: this.form.email })
                .then(response => {
                    this.$toast.show({
                        message: `Request to reset your password has been emailed to ${this.form.email}. Please also check your spam folder`, 
                        success: true,
                        timer: 5000
                    })
                    this.loading = false
                    this.requestSent = true
                })
        }
    }
}
</script>