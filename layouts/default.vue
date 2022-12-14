<template>
  <div class="flex flex-col h-screen">
      <C_Navbar />
      <C_Notification />
      <Nuxt class="grow pt-8 px-3" />
      <C_Footer />
  </div>
</template>

<script>
import C_Navbar from '../components/C_Navbar.vue'
import C_Footer from '../components/C_Footer.vue'
import C_Notification from '../components/C_Notification.vue'

export default {
  name: 'DefaultLayout',
  components: {
    C_Navbar,
    C_Footer,
    C_Notification
  },
  middleware: ['auth']
}
</script>