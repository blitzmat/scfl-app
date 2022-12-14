<template>
    <div>
        <C_Modal
            :show="state.delete"
            :loading="state.deleting"
            :disabled="state.deleting"
            title="Delete account"
            message="Are you sure you want to DELETE your account? All of your data will be permanently removed. This action cannot be undone."
        >
            <template v-slot:footer>
                <C_Button
                    @click="deleteUser(user._id)"
                    :loading="loading"
                    label="Delete"
                    class=""
                />
                <C_Button
                    @click="closeDelete"
                    warning="true"
                    label="Cancel"
                />
            </template>
        </C_Modal>
        <div class="container mx-auto">
            <div class="flex flex-row justify-between">
                <div>
                    <p class="text-sm">{{user.firstname}} {{user.lastname}}</p>
                    <h1 class="break-all leading-none mb-3">{{user.username}}</h1>
                    <p class="text-sm" :class="!user.isVerified ? 'text-red-600' : ''">
                        {{user.email}}
                        <template v-if="!user.isVerified"> - 
                            <C_Button
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
                    <C_Button
                        @click="state.isEditing = true"
                        label="Edit Profile"
                        :loading="state.updating"
                        primary="true"
                        class="flex"
                        >
                        <svg slot="icon" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                        </svg>
                    </C_Button>
                </div>
            </div>
            
            <hr class="my-4">
            <template v-if="state.isEditing">
                <C_Form :form="form">
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
                        <C_Button
                            @click="resetPassword"
                            label="Request a password reset"
                            class="my-4"
                            flat="true"
                            :loading="state.resetPasswordSent"
                        />
                    </template>
                    <template v-slot:errors>
                        <p v-for="(error, index) in state.errors" :key="index" class="text-sm text-red-500 ml-2">{{error.msg}}</p>
                    </template>
                    <template v-slot:footer>
                        <div class="flex flex-row gap-2">
                            <C_Button
                                type="submit"
                                :class="classes"
                                class="basis-1/2 w-full"
                                :disabled="state.disabled"
                                :loading="state.updating"
                                label="Update"
                                primary="true"
                            />
                            <C_Button
                                type="button"
                                @click="state.isEditing = false"
                                class="basis-1/2"
                                label="Cancel"
                            />
                        </div>
                        <div class="text-right mt-4 text-sm">
                            <C_Button
                                @click="state.delete = true" 
                                :disabled="state.deleting"
                                :loading="state.deleting"
                                label="Delete account"
                                flat="true"
                                class="text-red-500"
                            />
                        </div>
                    </template>
                </C_Form>
                <hr class="my-4" />
            </template>
            <h3>Active tournaments</h3>
            <div v-for="serie in series" :key="serie.id" class="p-2 mb-5 bg-slate-300 dark:bg-slate-700">
                <nuxt-link :to="`/series/${serie.slug}`">{{serie.league.name}} - {{serie.name}}</nuxt-link>
                <p><b>Your Team</b></p>
                <ul>
                    <li v-for="player in serie.pickedPlayers" :key="player.id">
                        {{player.name}}
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import C_Button from '../../components/C_Button.vue'
import C_Modal from '../../components/C_Modal.vue'

export default {
    name: 'Profile',
    auth: true,
    components: { 
        C_Button,
        C_Modal
    },
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
                deleting: false,
                delete: false,
            },
            loading: false,
            errors: null,
            isEditing: false,
            disabled: true,
            form: {
                finish: false,
            },
            series: []
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
        // tournaments() {
        //     let tournament = []
        //     let allTournaments = async () => await this.$store.dispatch('tournament/fetch')
        //     console.log('shit: ', allTournaments)
        //     // this.user.tournaments.forEach(tournament => {
        //     //     allTournaments.forEach(t => {
        //     //         if (tournament.tournament_id == t.id) tournaments.push(t)
        //     //     })
        //     // });
        //     return tournament
        // }
    },
    async fetch() {
        let allSeries = await this.$store.dispatch('serie/fetch')
        this.user.series.forEach(serie => {
            allSeries.forEach(t => {
                if (serie.serie_id == t.id) {
                    t.pickedPlayers = serie.players
                    this.series.push(t)
                }
            })
        });
        console.log(this.series)
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
                .then(() => {
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
                .then(() => {
                    this.$toast.show({
                        message: `Request to reset your password has been emailed to ${this.user.email}. Please also check your spam folder`, 
                        success: true,
                        timer: 5000
                    })
                    this.state.resetPasswordSent = false
                    this.state.resetPasswordRequested = true
                })
        },
        async deleteUser(id) {
            try {
                this.state.deleting = true
                await this.$store.dispatch('user/delete', {id})
                this.$toast.show({
                    message: 'Account deleted',
                    success: true,
                    timer: 5000
                })
                this.state.deleting = false
                this.$auth.logout()
                this.$router.push('/')
            }
            catch(e) {
                this.errors = e.response.data.errors

            }
        },
        closeDelete() {
            this.state.delete = false
        }
    }
}
</script>