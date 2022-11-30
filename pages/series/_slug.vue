<template>
    <div>
        <Loading v-if="loading" />
        <div v-else>
            <div class="flex flex-wrap">
                <div class="w-1/2">
                    <b>{{serie.league.name}}</b>
                    <h1>{{serie.full_name}}</h1>
                    <ul class="list-disc pl-10">
                        <li v-for="tournament in serie.tournaments" :key="tournament.id">
                            <span @click="fetchTournaments(tournament.id)">{{tournament.name}}</span>
                            <div v-if="activeTournament">
                                {{activeTournament}}
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="w-1/2" v-if="serie.league.image_url">
                    <img :src="serie.league.image_url" :alt="serie.full_name" class="w-full">
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import Loading from '../../components/Loading.vue'

    export default {
        name: 'Series',
        auth: false,
        components: [
            Loading
        ],
        data() {
            return {
                loading: true,
                serie: null,
                activeTournament: null 
            }
        },
        async fetch() {
            this.serie = await this.$store.dispatch('serie/fetchOne', {slug: this.$route.params.slug})
            console.log(this.serie)
            this.loading = false
        },

        methods: {
            async fetchTournaments(id) {
                this.activeTournament = await this.$store.dispatch('tournament/findOne', {id})
                console.log(this.activeTournament)
            }
        }
    }
</script>