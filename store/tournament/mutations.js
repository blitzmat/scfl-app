export default {
    set(state, tournaments) {
        state.tournaments = tournaments
    },

    update(state, tournaments) {
        state.tournaments = tournaments
    },

    delete(state) {
        state.tournaments = null
    }
}