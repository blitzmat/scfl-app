<template>
    <nuxt-link 
        v-if="link"
        :to="url"
        :class="classes"
        :disabled="disabled"
        class="py-2 px-4 border text-sm font-medium rounded-md focus:outline-none">
            {{label}}
    </nuxt-link>
    <button
        v-else
        type="button"
        @click="clickHandler"
        :class="classes"
        :disabled="disabled"
        class="relative text-center text-sm font-medium rounded-md focus:outline-none"
        >
            <template v-if="!loading">
                <slot name="icon"></slot>
                {{label}}
            </template>
            <svg v-else class="animate-spin h-5 w-5 inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-50" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-100" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
    </button>
</template>
<script>
export default {
    name: 'Button',
    props: {
        label: String,
        primary: false,
        disabled: false,
        loading: false,
        link: false,
        url: String,
        flat: false,
    },
    computed: {
        classes() {
            return {
                'border-gray-600 text-black bg-transparent hover:bg-gray-200': !this.primary,
                'border-transparent text-white bg-sky-600 hover:bg-sky-700': this.primary,
                'opacity-50 hover:bg-transparent': this.disabled && !this.primary,
                'opacity-50 hover:bg-sky-600': this.disabled && this.primary,
                'py-2 px-4 border text-white' : !this.flat,
                'underline hover:no-underline bg-transparent hover:bg-transparent border-0 p-0 ' : this.flat,
            }
        }
    },
    methods: {
        clickHandler() {
            this.$emit('click')
        }
    }
}
</script>
