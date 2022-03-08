export default {
    show(state, payload) {
        state.message = payload.message
        state.success = payload.success
        state.error = payload.error
        state.timer = payload.timer
    }
}