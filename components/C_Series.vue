<template>
    <div class="flex flex-wrap p-3">
        <C_Loading v-if="loading" />
        <div v-else v-for="serie in series" :key="serie.id" class="w-full p-2 mb-5 bg-slate-300 dark:bg-slate-700">
            <p><nuxt-link :to="`/series/${serie.slug}`">{{serie.league.name}} - {{serie.full_name}}</nuxt-link></p>
            <ul class="pl-10 list-disc">
                <li>Begins: {{ $moment(serie.begin_at).format('DD MMM YYYY') }}</li>
                <li>Ends: {{ $moment(serie.end_at).format('DD MMM YYYY')}}</li>
            </ul>
        </div>
    </div>
</template>

<script>
import C_Loading from './C_Loading.vue'
export default {
    name: 'C_Series',
    auth: false,
    components: {
        C_Loading
    },
    data() {
        return {
            loading: true,
            series: [],
        }
    },
    async fetch() {
        this.series = await this.$store.dispatch('serie/fetch')
        this.loading = false
    },
}
</script>