export default {
    async fetch(context, query) {
        const response = await this.$axios.post('/tournament/fetch', query)
        context.commit('set', response.data.data.tournaments)
        return response.data.data.tournaments
    }
}