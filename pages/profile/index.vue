<template>
    <div class="container mx-auto">
        <div class="flex flex-row justify-between">
            <div>
                <p class="text-sm text-gray-400">{{user.firstname}} {{user.lastname}}</p>
                <h1 class="break-all leading-none mb-3">{{user.username}}</h1>
                <p class="text-sm text-gray-400" :class="!user.isVerified ? 'text-red-600' : ''">
                    {{user.email}}
                    <template v-if="!user.isVerified"> - 
                        <Button
                            @click="verifyEmail" 
                            :disabled="state.verifying"
                            :loading="state.verifying"
                            label="Verify email"
                            flat="true"
                        />
                    </template>
                </p>
            </div>
            <div v-if="!state.isEditing">
                <Button
                    @click="state.isEditing = true"
                    label="Edit Profile"
                    :loading="state.updating"
                    primary="true"
                    class="flex"
                    >
                    <svg slot="icon" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                </Button>
            </div>
        </div>
        
        <hr class="my-4">
        <template v-if="state.isEditing">
            <Form :form="form">
                <template v-slot:inputs>
                    <FormulateInput
                        v-model="form.username"
                        id="username"
                        name="username"
                        type="text"
                        autocomplete="username"
                        :placeholder="user.username"
                        label="Username"
                        class="my-2"
                    />
                    <FormulateInput 
                        v-model="form.firstname"
                        id="firstname"
                        name="firstname"
                        type="text"
                        autocomplete="firstname"
                        :placeholder="user.firstname"
                        label="Firstname"
                        class="my-2"          
                    />
                    <FormulateInput 
                        v-model="form.lastname"
                        id="lastname"
                        name="lastname"
                        type="text"
                        autocomplete="lastname"
                        :placeholder="user.lastname"
                        label="Lastname"
                        class="my-2"          
                    />
                    <FormulateInput 
                        v-model="form.email"
                        id="email"
                        name="email"
                        type="email"
                        autocomplete="email"
                        :placeholder="user.email"
                        label="Email Address"
                        class="my-2"          
                    />
                    <template v-if="!state.resetPasswordRequested">
                        <label for="">Password</label>
                        <Button @click="resetPassword" label="Request Reset Password" primary="true" class="my-4" :loading="state.resetPasswordSent" />
                    </template>
                </template>
                <template v-slot:errors>
                    <p v-for="(error, index) in state.errors" :key="index" class="text-sm text-red-500 ml-2">{{error.msg}}</p>
                </template>
                <template v-slot:footer>
                    <div class="flex flex-row gap-2">
                        <Button
                            type="submit"
                            :class="classes"
                            class="basis-1/2 w-full"
                            :disabled="state.disabled"
                            :loading="state.updating"
                            label="Update"
                            primary="true"
                        />
                        <Button
                            type="button"
                            @click="state.isEditing = false"
                            class="basis-1/2"
                            label="Cancel"
                        />
                    </div>
                </template>
            </Form>
        </template>
        
    </div>   
</template>

<script>
import Button from '../../components/Button.vue'
export default {
    name: 'users',
    auth: true,
    components: { Button },
    data() {
        return {
            state: {
                updating: false,
                verifying: false,
                passwordreset: false,
                errors: null,
                isEditing: false,
                disabled: false,
                resetPasswordRequested: false,
                resetPasswordSent: false,
            },
            loading: false,
            errors: null,
            isEditing: false,
            disabled: true,
            form: {
                finish: false,
            }
        }
    },
    computed: {
        user() {
            return this.$auth.user
        },
        finish() {
            return this.form.finish
        },
        classes() {
            return {
                'opacity-50': this.state.disabled
            }
        },
    },
    watch: {
        finish (newVal) {
            if (newVal) {
                this.updateUser()
                this.form.finish = false
            }
        },
        form: {
            handler: function (val) {
                if (val.username || val.firstname || val.lastname || val.email || val.password) this.state.disabled = false
                else this.state.disabled = true
            },
            deep: true
        }
    },
    mounted() {
        this.form = this.resetUser()
    },
    methods: {
        updateUser() {
            this.state.updating = true
            const updatedUser = this.$store.dispatch('user/update', this.form)
            updatedUser.then((response) => {
                this.$auth.setUser(response.data.user)
                this.state.updating = false
                this.state.isEditing = false
                this.$toast.show({
                    message: 'Profile updated succesfully!', 
                    success: true,
                    timer: 5000
                })
                this.form = this.resetUser()
            }).catch(error =>{
                this.state.updating = false
                this.errors = error.response.data.errors
            })
        },
        resetUser() {
            return {
                id: this.user._id,
                finish: false
            }
        },
        verifyEmail() {
            this.state.verifying = true
            this.$store.dispatch('user/verifyEmail', {email: this.user.email})
                .then(response => {
                    this.$toast.show({
                        message: `Verification email has been sent to ${this.user.email}. Please also check your spam folder`, 
                        success: true,
                        timer: 5000
                    })
                    this.state.verifying = false
                })
                .catch(error => {
                    this.errors = error.response.data.errors
                })
        },
        resetPassword() {
            this.state.resetPasswordSent = true
            this.$store.dispatch('user/requestResetPassword', { email: this.user.email })
                .then(response => {
                    this.$toast.show({
                        message: `Request to reset your password has been emailed to ${this.user.email}. Please also check your spam folder`, 
                        success: true,
                        timer: 5000
                    })
                    this.state.resetPasswordSent = false
                    this.state.resetPasswordRequested = true
                })
        }
    }
}
</script>