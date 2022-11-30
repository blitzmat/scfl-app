<template>
    <div>
        <h1>Tournaments</h1>
        <hr class="my-3" />
        <Loading v-if="loading" />
        <div v-else class="flex flex-wrap">
            <div class="w-1/2">
                <div class="flex flex-wrap">
                    <div v-for="tournament in tournaments" :key="tournament.id" class="w-full p-2 mb-5 bg-slate-200">
                        <p><nuxt-link :to="`/tournaments/${tournament.slug}`">{{tournament.league.name}} - {{tournament.name}}</nuxt-link></p>
                        <ul class="pl-10 list-disc">
                            <li>Begins: {{ $moment(tournament.begin_at).format('DD MMM YYYY') }}</li>
                            <li>Ends: {{ $moment(tournament.end_at).format('DD MMM YYYY')}}</li>
                            <li>Tier: {{ tournament.tier }}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>  
</template>

<script>
import Loading from '../../components/Loading.vue'
export default {
    name: 'Tournaments',
    auth: false,
    components: [
        Loading
    ],
    data() {
        return {
            loading: true,
            tournaments: [],
        }
    },
    async fetch() {
        this.tournaments = await this.$store.dispatch('tournament/fetch')
        console.log(this.tournaments, this)
        this.loading = false
    },
}
</script>
