<template>
  <NavBar />
  <SideBar v-if="store.user"/> 
  <main class="relative overflow-auto no-scrollbar">
    <FloatingStatus v-if="store?.status?.loggedIn ?? false"/> 
    <router-view />
  </main> 
  <Footer />
</template>


<script setup>
  import { initFlowbite } from "flowbite"
  import NavBar from "@/components/NavBar.vue"
  import Footer from "@/components/Footer.vue"
  import SideBar from "@/components/SideBar.vue"
  import FloatingStatus from "@/components/FloatingStatus.vue"
  import { UseAuth } from "@/store/auth.module"
  import { onMounted } from "vue"
  import 'vue3-toastify/dist/index.css';
  import { UseNotificationHub } from "@/store/notification_hub.module"
  import util from "@/libs/utilities"

  const store = UseAuth()
  const notificationHub = UseNotificationHub()

  onMounted(() => {
    initFlowbite()
  })
</script>
