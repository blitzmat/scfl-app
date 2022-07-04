export default {
    set(state, user) {
        state.current = user
    },

    update(state, user) {
        state.current = user
    },

    delete(state, ) {
        state.current = null
    }
}