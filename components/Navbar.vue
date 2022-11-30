<template>
  <nav class="sticky flex flex-row justify-between align-center bg-sky-600 shadow-md p-3 z-10">
    <div class="basis-4/6">
      <nuxt-link to="/">
        <img class="h-8 w-auto" src="~/assets/images/starcheese-logo.png" alt="Starcheese League" />
      </nuxt-link>
    </div>
    <div class="basis-2/6 text-right">
      <template v-if="!$auth.loggedIn">
        <div class="hidden md:block">
          <nuxt-link to="/login" class="text-white mx-3 py-2 text-sm">Login</nuxt-link>
          <nuxt-link to="/register" class="text-white mx-3 py-2 text-sm">Register</nuxt-link>
        </div>
      </template>
      <template v-else>
        <div class="hidden md:block">
          <nuxt-link to="/profile" class="text-white mx-3 py-2 text-sm">My Profile</nuxt-link>
          <a href="#" @click="$auth.logout()" class="text-white mx-3 py-2 text-sm">Sign out</a>
        </div>
      </template>
      <Dropdown label="Menu" :isIcon="true" class="md:hidden">
        <template v-if="!$auth.loggedIn">
          <div class="py-1" role="none">
            <nuxt-link to="/login" class="text-gray-700 block px-4 py-2 text-sm hover:bg-sky-200" role="menuitem" tabindex="-1" id="menu-item-0">Login</nuxt-link>
            <nuxt-link to="/register" class="text-gray-700 block px-4 py-2 text-sm hover:bg-sky-200" role="menuitem" tabindex="-1" id="menu-item-1">Register</nuxt-link>
          </div>
        </template>
        <template v-else>
          <div class="py-1" role="none">
            <nuxt-link to="/profile" class="text-gray-700 block px-4 text-sm hover:bg-sky-200" role="menuitem" tabindex="-1" id="menu-item-1">My Profile</nuxt-link>
          </div>
          <div class="py-1" role="none">
            <a href="#" @click="$auth.logout()" class="text-gray-700 block w-full text-left px-4 py-2 text-sm hover:bg-sky-200" role="menuitem" tabindex="-1" id="menu-item-3">Sign out</a>
          </div>
        </template>
      </Dropdown>
    </div>
  </nav>
</template>

<script>
import Dropdown from '~/components/Dropdown'

export default {
  name: 'Navbar',
  components: {
    Dropdown,
  },
  methods: {
    logout() {
      this.$auth.logout()
    }
  }
}
</script>