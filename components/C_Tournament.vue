<template>
    <div>
        <C_Loading v-if="loading" />
        <template v-else>            
            <div class="mt-2">
                <div v-for="player in tournament.rosters" :key="player.id" class="flex align-center justify-between my-2">
                    <template v-if="playersPicked.find(el => el.id == player.id) ? true : false">
                        <b class="text-green-500">{{player.name}}</b>
                        <span class="text-green-500">Picked!</span>
                        <C_Button :warning="true" label="Remove" @click="removePlayer(player)"></C_Button>
                    </template>
                    <template v-else>
                        {{player.name}}
                        <C_Button :primary="true" label="Pick" @click="addPlayer(player)" :disabled="(playersPicked.length >= playerLimit)"></C_Button>
                    </template>
                </div>
            </div>

        </template>

    </div>
</template>
<script>
    import C_Loading from './C_Loading.vue'
    import C_Button from './C_Button.vue'

    export default {
        name: 'C_Tournament',
        auth: false,
        components: {
            C_Loading,
            C_Button
        },
        props: {
            tournament: Object,
            playersPicked: Array,
            playerLimit: Number,
        },
        computed: {
            loading() {
                return this.tournament ? false : true
            },
        },
        mounted() {
            if (this.$auth.loggedIn) {
                this.mapPlayersPicked()
            }
        },

        methods: {
            mapPlayersPicked() {
                const currentSeries = this.$auth.user.series.find(serie => serie.serie_id == this.tournament.serie_id)
                this.joined = currentSeries ? true : false
                if (currentSeries && currentSeries.players.length > 0) {
                    this.tournament.rosters.forEach(roster => {
                        currentSeries.players.forEach(player => {
                            if (player.id == roster.id) this.playersPicked.push(roster)
                        })
                    })
                }
            },
            addPlayer(player) {
                this.$emit('playerAdded', {player, limit:this.playerLimit})
            },
            removePlayer(player) {
                this.$emit('playerRemoved', player)
            }
        }
    }
</script>