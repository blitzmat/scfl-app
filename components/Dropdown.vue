<template>
    <div class="relative inline-block text-left">
        <div>
            <button
            @click.prevent.stop="toggle"
            type="button"
            :class="isActive ? 'bg-white text-sky-600' : 'bg-transparent text-white'"
            class="inline-flex justify-center w-full px-4 py-2 text-sm font-medium focus:outline-none rounded-t-md"
            id="menu-button"
            aria-expanded="true"
            aria-haspopup="true">
                <template v-if="isIcon">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </template>
                <template v-else>
                    {{label}}
                    <!-- Heroicon name: solid/chevron-down -->
                    <svg class="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                    </svg>
                </template>
            </button>
        </div>
        <Transition name="slide-y-transition">
            <div v-if="isActive" class="origin-top-right absolute right-0 w-56 rounded-md rounded-r-none shadow-lg bg-white focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
                <slot></slot>
            </div>
        </Transition>
    </div>
</template>

<script>
export default {
    name: 'Dropdown',
    props: {
        label: String,
        isIcon: Boolean
    },
    data() {
        return {
            isActive: false
        }
    },

    mounted() {
        document.addEventListener('click', this.clickOutside)
    },

    methods: {
        toggle() {
            this.isActive = !this.isActive
        },
        clickOutside() {
            if (this.isActive) this.toggle()
        }
    },

    destroyed() {
        document.removeEventListener('click', this.clickOutside)
    }
}
</script>
