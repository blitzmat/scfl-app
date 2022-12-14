export default {
    set(state, matches) {
        state.matches = matches
    },

    update(state, matches) {
        state.matches = matches
    },

    delete(state) {
        state.matches = null
    }
}