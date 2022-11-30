<template>
    <div>
        <h1>Home</h1>
        <hr class="my-3" />
        <Loading v-if="loading" />
        <section v-else>
            <nav class="tabs flex flex-wrap">
                <nuxt-link to="/tournaments" class="active">Tournaments</nuxt-link>
                <nuxt-link to="/series">Series</nuxt-link>
            </nav>
            <div class="flex flex-wrap">
                <div class="w-1/2">
                    <h3>Series -  {{series.length}}</h3>
                    <hr class="my-3" />
                    <div class="flex flex-wrap">
                        <div v-for="serie in series" :key="serie.id" class="w-full p-2 mb-5 bg-slate-200">
                            <p><nuxt-link :to="`/series/${serie.slug}`">{{serie.league.name}} - {{serie.full_name}}</nuxt-link></p>
                            <ul class="pl-10 list-disc">
                                <li>Begins: {{ $moment(serie.begin_at).format('DD MMM YYYY') }}</li>
                                <li>Ends: {{ $moment(serie.end_at).format('DD MMM YYYY')}}</li>
                                <li>Tier: {{serie.tier}}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>  
</template>

<script>
import Loading from '../components/Loading.vue'
export default {
    name: 'Home',
    auth: false,
    components: [
        Loading
    ],
    data() {
        return {
            loading: true,
            series: [],
        }
    },
    async fetch() {
        this.series = await this.$store.dispatch('serie/fetch')
        console.log(this.series)
        this.loading = false
    },
}
</script>
