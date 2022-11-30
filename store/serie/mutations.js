export default {
    set(state, series) {
        state.series = series
    },

    update(state, series) {
        state.series = series
    },

    delete(state) {
        state.series = null
    }
}