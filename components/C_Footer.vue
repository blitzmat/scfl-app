<template>
    <footer class="bg-white dark:bg-gray-800">
        <hr class="mb-4 border-gray-200 dark:border-gray-700" />
        <div class="container px-6 py-8 mx-auto">

            <div class="flex flex-col items-center sm:flex-row sm:justify-between">
                <p class="text-sm text-gray-400">© Copyright {{year}}. All Rights Reserved.</p>

                <div class="flex mt-3 -mx-2 sm:mt-0">
                    <a href="#" class="mx-2 text-sm text-gray-400 hover:text-gray-500 dark:hover:text-gray-300" aria-label="Reddit"> Teams </a>

                    <a href="#" class="mx-2 text-sm text-gray-400 hover:text-gray-500 dark:hover:text-gray-300" aria-label="Reddit"> Privacy </a>

                    <a href="#" class="mx-2 text-sm text-gray-400 hover:text-gray-500 dark:hover:text-gray-300" aria-label="Reddit"> Cookies </a>
                </div>
            </div>
        </div>
    </footer>
</template>

<script>
export default {
    name: 'C_Footer',
    computed: {
        year() {
            return new Date().getFullYear()
        }
    }
}
</script>