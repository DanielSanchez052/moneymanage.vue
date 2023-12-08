<template>
  <NavBar />
  <SideBar v-if="store.user"/> 

  <router-view />
  
</template>


<script setup>

  import NavBar from "@/components/NavBar.vue"
  import SideBar from "@/components/SideBar.vue"
  import { UseAuth } from "@/store/auth.module"
  import { onMounted } from "vue"
  const store = UseAuth()


</script>
