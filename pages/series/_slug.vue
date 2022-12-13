<template>
    <div>
        <Loading v-if="loading" />
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
            <h2>Tournaments:</h2>
            <div class="flex flex-wrap">
                <div v-for="tournament in filteredTournaments" :key="tournament.id" class="p-2 w-1/2">
                    <div class="p-3 bg-slate-300 dark:bg-slate-700">
                        <h3>{{ tournament.name }}</h3>
                        <Tournament :tournament="tournament" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import Loading from '../../components/Loading.vue'
    import Tournament from '../../components/Tournament.vue'

    export default {
        name: 'Series',
        auth: false,
        components: [
            Loading,
            Tournament
        ],
        data() {
            return {
                loading: true,
                serie: null,
                tournaments: [],
                filteredTournaments: [],
                playerCount: 0,
            }
        },
        async fetch() {
            this.serie = await this.$store.dispatch('serie/fetchOne', {slug: this.$route.params.slug})
            this.tournaments = await this.$store.dispatch('tournament/fetch', {serie_id: this.serie.id})
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
            console.log(this.serie, this.filteredTournaments, this.tournaments)
            this.loading = false
        }
    }
</script>