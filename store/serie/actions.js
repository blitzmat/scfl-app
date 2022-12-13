export default {
    async fetch(context, query) {
        const response = await this.$axios.post('/serie/fetch', query)
        context.commit('set', response.data.data.series)
        return response.data.data.series
    },
    async fetchOne(context, query) {
        const response = await this.$axios.post('/serie/fetchOne', query)
        context.commit('set', response.data.data.series)
        return response.data.data.series
    }
}