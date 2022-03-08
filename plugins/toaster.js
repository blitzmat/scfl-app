export default ({ app, store }, inject) => {
    inject("toast", {
        show({ message = "", success = "", error = "", timer = "" }) {
            store.commit("toast/show", { message, success, error, timer });
        }
    })
}