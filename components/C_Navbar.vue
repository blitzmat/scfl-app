<template>
  <nav class="sticky flex flex-row justify-between align-center bg-sky-700 shadow-md p-3 z-10">
    <div class="basis-4/6">
      <nuxt-link to="/">
        <img class="h-8 w-auto" src="~/assets/images/starcheese-logo.png" alt="Starcheese League" />
      </nuxt-link>
    </div>
    <div class="basis-2/6 text-right">
      <div class="flex flex-wrap justify-end">
        <div class="text-slate-200 mx-2"><label for="darkMode">Dark mode: </label><input id="darkMode" type="checkbox" checked @change="toggleDarkMode" /></div>
        <template v-if="!$auth.loggedIn">
          <div class="hidden md:block">
            <nuxt-link to="/login" class="text-white mx-3 py-2 text-sm no-underline">Login</nuxt-link>
            <nuxt-link to="/register" class="text-white mx-3 py-2 text-sm no-underline">Register</nuxt-link>
          </div>
        </template>
        <template v-else>
          <div class="hidden md:block">
            <nuxt-link to="/profile" class="text-white mx-3 py-2 text-sm no-underline">My Profile</nuxt-link>
            <a href="#" @click="$auth.logout()" class="text-white mx-3 py-2 text-sm no-underline">Sign out</a>
          </div>
        </template>
        <C_Dropdown label="Menu" :isIcon="true" class="md:hidden">
          <template v-if="!$auth.loggedIn">
            <div class="py-1" role="none">
              <nuxt-link to="/login" class="text-gray-700 block px-4 py-2 text-sm no-underline hover:bg-sky-200" role="menuitem" tabindex="-1" id="menu-item-0">Login</nuxt-link>
              <nuxt-link to="/register" class="text-gray-700 block px-4 py-2 text-sm no-underline hover:bg-sky-200" role="menuitem" tabindex="-1" id="menu-item-1">Register</nuxt-link>
            </div>
          </template>
          <template v-else>
            <div class="py-1" role="none">
              <nuxt-link to="/profile" class="text-gray-700 block px-4 text-sm no-underline hover:bg-sky-200" role="menuitem" tabindex="-1" id="menu-item-1">My Profile</nuxt-link>
            </div>
            <div class="py-1" role="none">
              <a href="#" @click="$auth.logout()" class="text-gray-700 block w-full text-left px-4 py-2 text-sm no-underline hover:bg-sky-200" role="menuitem" tabindex="-1" id="menu-item-3">Sign out</a>
            </div>
          </template>
        </C_Dropdown>
      </div>
    </div>
  </nav>
</template>

<script>
import C_Dropdown from './C_Dropdown.vue'

export default {
  name: 'C_Navbar',
  components: {
    C_Dropdown,
  },
  methods: {
    logout() {
      this.$auth.logout()
    },
    toggleDarkMode() {
      document.getElementsByTagName('html')[0].classList.toggle('dark')
    }
  }
}
</script>