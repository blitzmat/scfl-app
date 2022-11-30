export default {
    async fetch(context, query) {
        const response = await this.$axios.post('/tournament/fetch', query)
        context.commit('set', response.data.data.tournaments)
        return response.data.data.tournaments
    },
    async fetchOne(context, query) {
        const response = await this.$axios.post('/tournament/fetchOne', query)
        context.commit('set', response.data.data.tournament)
        return response.data.data.tournament
    },
    async findOne(context, id) {
        const response = await this.$axios.post('/tournament/findOne', id)
        context.commit('set', response.data.data.tournament)
        return response.data.data.tournament
    },
    async pandascore(context, query) {
        const response = await this.$axios.post('/tournament/pandascore')
        context.commit('set', response.data.data.tournaments)
        return response.data.data.tournaments
    }
}