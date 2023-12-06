<template>
  <NavBar />
  <SideBar v-if="currentUser"/> 

  <router-view />
  
</template>


<script setup>
  import { initFlowbite } from "flowbite"
  import { onMounted, computed } from "vue"
  import NavBar from "@/components/NavBar.vue"
  import SideBar from "@/components/SideBar.vue"
  import { useStore } from "vuex"

  const store = useStore()

  const currentUser = computed(() => store.state.auth.user)

  onMounted(() => {
    initFlowbite()
  })

</script>
