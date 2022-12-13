export default {
    set(state, tournaments) {
        state.all = tournaments
    },

    update(state, tournaments) {
        state.all = tournaments
    },

    delete(state) {
        state.all = null
    }
}