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
    name: 'C_Button',
    props: {
        label: String,
        primary: false,
        warning: false,
        disabled: false,
        loading: false,
        link: false,
        url: String,
        flat: false,
    },
    computed: {
        classes() {
            return {
                'border-gray-300 text-black bg-transparent hover:bg-gray-200': !this.primary,
                'border-transparent text-slate-200 bg-slate-700 dark:text-slate-800 dark:bg-slate-300 hover:bg-slate-500 hover:text-slate-300 dark:hover:bg-slate-500': this.primary && !this.disabled,
                'opacity-50 hover:bg-transparent': this.disabled && !this.primary,
                'opacity-50 text-slate-200 bg-slate-700 dark:text-slate-800 dark:bg-slate-300 hover:bg-slate-700 hover:text-slate-200 dark:text-slate-800 dark:bg-slate-300': this.disabled && this.primary,
                'py-2 px-4 border' : !this.flat,
                'underline hover:no-underline border-0 p-0 bg-transparent hover:bg-transparent dark:text-slate-200 dark:bg-transparent dark:hover:bg-transparent ' : this.flat,
                'border-transparent text-white bg-red-600 hover:bg-red-700': this.warning,
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
