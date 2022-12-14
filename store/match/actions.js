export default {
    async fetch(context, query) {
        const response = await this.$axios.post('/match/fetch', query)
        context.commit('set', response.data.data.matches)
        return response.data.data.matches
    },
}