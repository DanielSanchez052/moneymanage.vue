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
  import { onMounted, onBeforeUnmount, ref } from "vue"
  import 'vue3-toastify/dist/index.css';



  const store = UseAuth()
  const timer = ref(0)
  
  onMounted(() => {
    initFlowbite()
    
    timer.value = setInterval(() => {
      if(store?.status?.loggedIn){
        const res = store.refreshAccountStatus()
      }
    }, 30000)

  })

  onBeforeUnmount(() => {
    clearInterval(timer.value)
  })

</script>
