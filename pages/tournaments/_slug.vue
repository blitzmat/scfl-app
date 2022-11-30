<template>
    <div>
        <Loading v-if="loading" />
        <div v-else>
            <div class="flex flex-wrap">
                <div class="w-1/2">
                    <b>{{tournament.league.name}}</b>
                    <h1>{{tournament.name}}</h1>
                    <ul>
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
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import Loading from '../../components/Loading.vue'

    export default {
        name: 'Tournament',
        auth: false,
        components: [
            Loading
        ],
        data() {
            return {
                loading: true,
                tournament: null,
                activeMatch: null 
            }
        },
        async fetch() {
            this.tournament = await this.$store.dispatch('tournament/fetchOne', {slug: this.$route.params.slug})
            console.log(this.tournament)
            this.loading = false
        },

        methods: {

        }
    }
</script>