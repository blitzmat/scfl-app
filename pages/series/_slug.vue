<template>
    <div>
        <C_Loading v-if="loading" />
        <div v-else>
            <div class="flex">
                <img v-if="serie.league.image_url" :src="serie.league.image_url" :alt="serie.full_name" class="w-1/5" />
                <div class="pl-3">
                    <b>{{serie.league.name}} - {{serie.id}}</b>
                    <h1>{{serie.full_name}}</h1>
                    <p>{{ $moment(serie.begin_at).format('DD MMM YYYY') }} - {{ $moment(serie.end_at).format('DD MMM YYYY') }}</p>
                    <p>Players: {{playerCount}}</p>
                </div>
            </div>
            <template v-if="hasStarted">
                <div class="flex flex-wrap">
                    <div v-for="tournament in tournaments" :key="tournament.id" class="w-1/2 mb-3">
                        <div v-for="match in tournament.matches" :key="match.id">
                            {{match.name}} - {{(match.status)}}
                            <p v-for="player in tournament.rosters" :key="player.id">
                                <template v-if="(player.id == match.winner_id)">Winner: {{player.name}}</template>
                            </p>
                        </div>
                    </div>
                </div>
            </template>
            <template v-else>
                <div v-if="playersPicked.length < playerLimit" class="text-center my-4 bg-slate-500">
                    <h4>Pick your team of {{playerLimit }} players.</h4>
                    <p>{{playerLimit - playersPicked.length}} players left</p>
                    <ul>
                        <li v-for="player in playersPicked" :key="player.id">
                            {{player.name}}
                        </li>
                    </ul>
                </div>
                <div v-else class="text-center my-4 bg-slate-500">
                    <h5>Your team</h5>
                    <ul>
                        <li v-for="player in playersPicked" :key="player.id">
                            {{player.name}}
                        </li>
                    </ul>
                </div>
                <div class="flex flex-wrap">
                    <div v-for="tournament in filteredTournaments" :key="tournament.id" class="p-2 w-1/2">
                        <div class="p-3 bg-slate-300 dark:bg-slate-700">
                            <h3>{{ tournament.name }}</h3>
                            <C_Tournament :tournament="tournament" :playersPicked="playersPicked" :playerLimit="playerLimit" @playerAdded="addPlayer" @playerRemoved="removePlayer"/>
                        </div>
                    </div>
                </div>
                <Transition name="slide-y-transition">
                    <span v-if="(playersPicked.length > 0)" class="fixed bottom-2 right-2 bg-white p-3 rounded-md dark:bg-sky-700">         
                        <div v-if="(playersPicked.length != playerLimit)" class="text-center mb-2">
                            <p>{{playerLimit - playersPicked.length}} players left</p>
                            <ul>
                                <li v-for="player in playersPicked" :key="player.id">
                                    {{player.name}}
                                </li>
                            </ul>
                        </div>
                        <template v-else>
                            <p v-if="!$auth.loggedIn"><nuxt-link to="/login">Login</nuxt-link> to join the tournament</p>
                            <template v-if="!joined">
                                <C_Button v-if="!joined" :primary="true" label="Join Tournament" :loading="joinLoading" @click="joinSeries"/>
                            </template>
                            <template v-else>
                                <p v-if="joinSuccess" class="text-green-500">Joined Successfully!</p>
                                <C_Button v-if="playersPickedUpdated" :primary="true" label="Update" :loading="updateLoading" @click="updatePick"/>
                                <p v-if="updateSuccess" class="text-green-500">Updated Successfully!</p>
                                <h5>Your team</h5>
                                <ul>
                                    <li v-for="player in playersPicked" :key="player.id">
                                        {{player.name}}
                                    </li>
                                </ul>
                            </template>
                        </template>
                    </span>
                </Transition>
            </template>
        </div>
    </div>
</template>
<script>
    import C_Button from '../../components/C_Button.vue'
    import C_Loading from '../../components/C_Loading.vue'
    import C_Tournament from '../../components/C_Tournament.vue'

    export default {
        name: 'SeriesDetail',
        auth: false,
        components: {
            C_Button,
            C_Loading,
            C_Tournament
        },
        data() {
            return {
                loading: true,
                serie: null,
                tournaments: [],
                filteredTournaments: [],
                playerCount: 0,
                playersPicked: [],
                playerLimit: 0,
                playersPickedUpdated: false,
                joinLoading: false,
                joined: false,
                joinSuccess: false,
                updateLoading: false,
                updateSuccess: false,
            }
        },
        computed: {
            hasStarted() {
                // return false
                return (this.$moment(this.serie.begin_at).format('x') - Date.now() < 0)
            }
        },
        async fetch() {
            this.serie = await this.$store.dispatch('serie/fetchOne', {slug: this.$route.params.slug})
            this.tournaments = await this.$store.dispatch('tournament/fetch', {serie_id: this.serie.id})
            // console.log(this.matches)
            if (this.tournaments.length > 1) {
                this.tournaments.forEach(tournament => {
                    if (!tournament.name.includes('Playoffs') &&
                        !tournament.name.includes('Knockout Stage') &&
                        !tournament.name.includes('Stage 2') &&
                        !tournament.name.includes('Stage 3') &&
                        !tournament.name.includes('Stage 4')) {
                            this.playerCount += tournament.rosters.length
                            this.filteredTournaments.push(tournament)
                            this.filteredTournaments.reverse()
                    }
                })
            } else {
                this.filteredTournaments = this.tournaments
                this.playerCount = this.filteredTournaments[0].rosters.length
            }
            this.joined = this.$auth.loggedIn && (this.$auth.user.series.findIndex(serie => serie.serie_id == this.serie.id) != -1)
            this.playerLimit = Math.ceil(this.playerCount / 5)
            this.loading = false
            console.log(this.tournaments)
        },
        methods: {
            async joinSeries() {
                try {
                    this.joinLoading = true
                    await this.$store.dispatch('user/joinSeries', {_id: this.$auth.user._id, serie_id: this.serie.id, players: this.playersPicked})
                    this.joined = true
                    this.playersPickedUpdated = false
                    this.joinLoading = false
                    this.joinSuccess = true
                } catch (e) {
                    throw e
                }
            },
            async updatePick() {
                try {
                    this.updateLoading = true
                    await this.$store.dispatch('user/joinSeries', {_id: this.$auth.user._id, serie_id: this.serie.id, players: this.playersPicked})
                    this.playersPickedUpdated = false
                    this.updateLoading = false
                    this.updateSuccess = true
                } catch (e) {
                    throw e
                }
            },
            async cancelSeries() {
                try {
                    await this.$store.dispatch('user/cancelSeries', {_id: this.$auth.user._id, serie_id: this.serie.id})
                    this.playersPicked = []
                } catch (e) {
                    throw e
                }
            },
            addPlayer(player) {
                this.playersPicked.push(player.player)
                this.playersPickedUpdated = true
            },
            removePlayer(player) {
                const idx = this.playersPicked.findIndex(p => p.id == player.id)
                this.playersPicked.splice(idx, 1)
                this.playersPickedUpdated = true
            }
        }
    }
</script>