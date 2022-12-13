<template>
    <div>
        <Loading v-if="loading" />
        <template v-else>
            
            <h5 class="border-b-2">Pick your team - {{playerLimit - playersPicked.length}} players left</h5>
            <Button v-if="joined" :warning="true" label="Cancel Tournament" @click="cancelTournament" class="my-3"></Button>
            
            <div class="mt-2">
                <div v-for="player in tournament.rosters" :key="player.id" class="flex align-center justify-between my-2">
                    <template v-if="playersPicked.find(el => el.id == player.id) ? true : false">
                        <b class="text-green-500">{{player.name}}</b>
                        <span class="text-green-500">Picked!</span>
                        <Button v-if="!joined" :warning="true" label="Remove" @click="removePlayer(player)"></Button>
                    </template>
                    <template v-else>
                        {{player.name}}
                        <Button v-if="!joined" :primary="true" label="Pick" @click="playersPicked.push(player)" :disabled="(playersPicked.length >= playerLimit)"></Button>
                    </template>
                </div>
            </div>
            <div v-for="match in tournament.matches" :key="match.id">
                <p>{{match.name}} - {{(match.status)}}</p>
            </div>
            <Transition name="slide-y-transition">
                <span v-if="(playersPicked.length == playerLimit && !joined)" class="fixed bottom-2 right-2">
                    <Button :primary="true" label="Join Tournament" @click="joinTournament" :disabled="!$auth.loggedIn"></Button>
                </span>
            </Transition>

        </template>

    </div>
</template>
<script>
    import Loading from './Loading.vue'
    import Button from './Button.vue'

    export default {
        name: 'Tournament',
        auth: false,
        components: [
            Loading,
            Button
        ],
        props: {
            tournament: Object,
        },
        data() {
            return {
                joined: false,
                playersPicked: [],
                playerLimit: 0,
            }
        },
        computed: {
            loading() {
                return this.tournament ? false : true
            }
        },
        mounted() {
            console.log(this.tournament)
            this.playerLimit = Math.round(this.tournament.rosters.length / 5)
            if (this.$auth.loggedIn) {
                this.mapPlayersPicked()
            }
        },

        methods: {
            async joinTournament() {
                try {
                    await this.$store.dispatch('user/joinTournament', {_id: this.$auth.user._id, tournament_id: this.tournament.id, players: this.playersPicked})
                    this.joined = true
                } catch (e) {
                    throw e
                }
            },
            async cancelTournament() {
                try {
                    await this.$store.dispatch('user/cancelTournament', {_id: this.$auth.user._id, tournament_id: this.tournament.id})
                    this.playersPicked = []
                    this.joined = false
                } catch (e) {
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