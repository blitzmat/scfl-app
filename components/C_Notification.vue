<template>
    <Transition name="slide-y-transition">
        <div v-if="show" class="w-full p-3 shadow-lg" :class="classes">
            <div class="flex flex-row items-center">
                <svg v-if="success" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
                <svg v-if="error" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                </svg>
                <div class="grow px-4">
                    {{message}}
                </div>
                <svg @click="show = false" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
            </div>
        </div>
    </Transition>
</template>

<script>
export default {
    name: 'C_Notification',

    data() {
        return {
            show: false,
            message: "",
            success: false,
            error: false,
            timer: 0,
        }
    },
    created() {
        this.$store.subscribe((mutation, state) => {
            if (mutation.type === "toast/show") {
                this.message = state.toast.message
                this.success = state.toast.success
                this.error = state.toast.error
                this.timer = state.toast.timer
                this.show = true
                if (this.timer) this.addDestoryTimer(this.timer)
            }
        })
    },
    computed: {
        classes() {
            return {
                'bg-green-300': this.success,
                'bg-red-600 text-white': this.error
            }
        }
    },
    methods: {
        addDestoryTimer(amount) {
            setTimeout(() => this.show = false, amount)
        }
    }
}
</script>