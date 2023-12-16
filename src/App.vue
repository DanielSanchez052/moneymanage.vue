<template>
  <NavBar />
  <SideBar v-if="store.user"/> 

  <main class="relative overflow-hidden">
    <FloatingStatus v-if="store?.status?.loggedIn ?? false"/> 
    <router-view />
  </main>
  
</template>


<script setup>

  import NavBar from "@/components/NavBar.vue"
  import SideBar from "@/components/SideBar.vue"
  import FloatingStatus from "@/components/FloatingStatus.vue"
  import { UseAuth } from "@/store/auth.module"

  const store = UseAuth()



</script>
