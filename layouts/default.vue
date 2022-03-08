<template>
  <div class="flex flex-col h-screen">
      <Navbar />
      <Notification />
      <Nuxt class="grow pt-8 px-3" />
      <Footer />
  </div>
</template>

<script>
import Navbar from '~/components/Navbar'
import Footer from '~/components/Footer'
import Notification from '~/components/Notification'

export default {
  components: {
    Navbar,
    Footer,
    Notification
  },
  middleware: ['auth']
}
</script>