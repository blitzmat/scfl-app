export default {

    async login(context, user) {
        return await this.$axios.post('/auth/login', user)
    },

    async register(context, user) {
        return await this.$axios.post('/auth/register', user)
    },
    
    async verifyEmail(context, email) {
        return await this.$axios.post('/auth/resendVerification', email)
    },

    async requestResetPassword(context, email) {
        return await this.$axios.post('/auth/requestResetPassword', email)
    },
    
    async resetPassword(context, props) {
        console.log(props.token, props.password)
        return await this.$axios.post('/auth/resetPassword', {token: props.token, password: props.password})
    },

    async update(context, user) {
        return await this.$axios.post('/user/update', user)
    },

    async delete(context, id) {
        return await this.$axios.post('/user/delete', id)
    },
    
    async joinTournament(context, query) {
        return await this.$axios.post('/user/joinTournament', query)
    },
    
    async cancelTournament(context, query) {
        return await this.$axios.post('/user/cancelTournament', query)
    },

    // async update(context, user) {
    //     try{
    //         const updatedUser = await this.$axios.post('/user/update', user)
    //         console.log(updatedUser)
    //         if (updatedUser) {
    //             context.commit('update', user)
    //             return updatedUser
    //         }
    //     } catch(error) {
    //         return error
    //     }
    // },

    updateState(context, user) {
        context.commit('set', user)
    }

}