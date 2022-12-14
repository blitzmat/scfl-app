<template>
    <div>
        <C_Loading v-if="loading" />
        <div v-else>
            <div class="flex flex-wrap">
                <div class="w-1/2">
                    <b>{{tournament.league.name}} - {{tournament.id}}</b>
                    <h1>{{tournament.name}}</h1>
                    <p>Date: {{ $moment(tournament.begin_at).format('DD MMM YYYY') }} - {{ $moment(tournament.end_at).format('DD MMM YYYY')}}</p>
                    <ul class="mt-2">
                        <li v-for="match in tournament.matches" :key="match.id">
                            <p>{{match.name}}</p>
                            <ul class="list-disc pl-10">
                                <li>Type: {{match.match_type}} {{match.number_of_games}}</li>
                                <li>Status: {{match.status}}</li>
                            </ul>
                        </li>
                    </ul>
                </div>
                <div class="w-1/2" v-if="tournament.league.image_url">
                    <img :src="tournament.league.image_url" :alt="tournament.full_name" class="w-full">

                    <div v-if="$auth.loggedIn">
                        <h5 class="border-b-2">Pick your team - {{playerLimit - playersPicked.length}} players left</h5>
                        <C_Button v-if="joined" :warning="true" label="Cancel Tournament" @click="cancelTournament" class="my-3"/>
                        
                        <ul class="mt-2">
                            <li v-for="player in tournament.rosters" :key="player.id" class="flex align-center justify-between my-2">
                                <template v-if="playersPicked.find(el => el.id == player.id) ? true : false">
                                    <b>{{player.name}}</b>
                                    <span class="text-green-600">Picked!</span>
                                    <C_Button v-if="!joined" :warning="true" label="Remove" @click="removePlayer(player)"/>
                                </template>
                                <template v-else>
                                    {{player.name}}
                                    <C_Button v-if="!joined" :primary="true" label="Pick" @click="playersPicked.push(player)" :disabled="(playersPicked.length >= playerLimit)"/>
                                </template>
                            </li>
                        </ul>
                        <Transition name="slide-y-transition">
                            <span v-if="(playersPicked.length == playerLimit && !joined)" class="fixed bottom-2 right-2">
                                <C_Button :primary="true" label="Join Tournament" @click="joinTournament" :disabled="!$auth.loggedIn"/>
                            </span>
                        </Transition>
                    </div>
                    <div v-else class="text-center py-3">
                        <p class="mb-2"><nuxt-link to="/login">Login</nuxt-link> to join the tournament</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import C_Loading from '../../components/C_Loading.vue'
    import C_Button from '../../components/C_Button.vue'

    export default {
        name: 'TournamentDetail',
        auth: false,
        components: {
            C_Loading,
            C_Button
        },
        data() {
            return {
                loading: true,
                tournament: null,
                joined: false,
                playersPicked: [],
                playerLimit: 0,
            }
        },
        async fetch() {
            this.tournament = await this.$store.dispatch('tournament/fetchOne', {slug: this.$route.params.slug})
            this.playerLimit = Math.round(this.tournament.rosters.length / 5)
            if (this.$auth.loggedIn) {
                this.mapPlayersPicked()
            }
            this.loading = false
        },

        methods: {
            async joinTournament() {
                try {
                    await this.$store.dispatch('user/joinTournament', {_id: this.$auth.user._id, tournament_id: this.tournament.id, players: this.playersPicked})
                    this.joined = true
                } catch (e) {
                    console.log(e)
                    throw e
                }
            },
            async cancelTournament() {
                try {
                    await this.$store.dispatch('user/cancelTournament', {_id: this.$auth.user._id, tournament_id: this.tournament.id})
                    this.playersPicked = []
                    this.joined = false
                } catch (e) {
                    console.log(e)
                    throw e
                }
            },
            mapPlayersPicked() {
                const currentTournament = this.$auth.user.tournaments.find(tournament => tournament.tournament_id == this.tournament.id)
                this.joined = currentTournament ? true : false
                if (currentTournament && currentTournament.players.length > 0) {
                    this.tournament.rosters.forEach(roster => {
                        currentTournament.players.forEach(player => {
                            if (player.id == roster.id) this.playersPicked.push(roster)
                        })
                    })
                }
            },
            removePlayer(player) {
                const idx = this.playersPicked.findIndex(p => p.id == player.id)
                this.playersPicked.splice(idx, 1)
            }
        }
    }
</script>