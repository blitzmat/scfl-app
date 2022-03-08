<template>
    <div class="container mx-auto flex flex-col items-center w-full h-full">
        <h1 class="mb-4">Reset your password</h1>
        <hr class="my-4 border-gray-200 dark:border-gray-700">
        <Form :form="form" class="w-full sm:w-1/2">
            <template slot="inputs">
                <FormulateInput 
                    v-model="form.password"
                    id="password"
                    name="password"
                    type="password"
                    autocomplete="password"
                    validation="required|min:5"
                    placeholder="New Password"
                    class="my-2"          
                />
                <FormulateInput
                    id="confirm-password"
                    name="password_confirm"
                    type="password"
                    validation="required|confirm"
                    validation-name="Password confirmation"
                    placeholder="Confirm Password"
                    class="my-2"          
                />
            </template>
            <template slot="errors">
                <p v-for="(error, index) in state.errors" :key="index" class="text-sm text-red-500 ml-2">{{error.msg}}</p>
            </template>
            <template slot="footer">
                <FormulateInput
                    type="submit"
                    name="reset"
                    class="mt-4"
                    :disabled="state.loading"
                    input-class="relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                    <template v-if="!state.loading">
                        Reset password
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
    </div>
</template>

<script>
export default {
    name: 'reset',
    auth: false,
    computed: {
        finish () {
            return this.form.finish
        },
        user() {
            return this.$auth.user
        }
    },
    watch: {
        finish (newVal) {
            if (newVal) {
                this.resetPassword()
                this.form.finish = false
            }
        }
    },
    data() {
        return {
            state: {
                errors: null,
                loading: false,
            },
            form: {
                finish: false,
            }
        }
    },
    async asyncData({params}) {
        const token = params.token ? params.token : ''
        return { token }
    },
    methods: {
        resetPassword() {
            this.state.loading = true
            this.$store.dispatch('user/resetPassword', {token: this.token, password: this.form.password})
                .then(() => {
                    this.state.loading = false
                    this.$toast.show({
                            message: `Your password has successfully been updated.`, 
                            success: true,
                            timer: 5000
                        })
                    this.$auth.logout()
                })
                .catch(error => {
                    this.state.errors = error.response.data.errors
                    this.state.loading = false
                })
        }
    }
}
</script>