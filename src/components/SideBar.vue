<template>
<aside class="fixed top-0 left-0 z-40 w-64 h-screen pt-14 transition-transform -translate-x-full bg-white border-r border-gray-200 md:translate-x-0 dark:bg-gray-800 dark:border-gray-700" aria-label="Sidenav" id="drawer-navigation">
    <div class="overflow-y-auto py-5 px-3 h-full bg-white dark:bg-gray-800">
        <ul class="space-y-2">
            <li>
                <router-link to="/dashboard" class="flex items-center p-2 text-base font-medium text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                    <font-awesome-icon icon="folder-open" />
                    <span class="ml-3">Resumen</span> 
                </router-link>
            </li>
            <li>
                <router-link to="/dashboard/sources" class="flex items-center p-2 text-base font-medium text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                    <font-awesome-icon :icon="['fas','share-nodes']" />
                    <span class="ml-3">Fuentes</span>
                </router-link>
            </li>
            <li>
                <router-link to="/dashboard/transactions" class="flex items-center p-2 text-base font-medium text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                    <font-awesome-icon :icon="['fas','wallet']" />
                    <span class="ml-3">Transacciones</span>
                </router-link>
            </li>
            <li>
                <router-link to="/dashboard/budgets" class="flex items-center p-2 text-base font-medium text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                    <font-awesome-icon :icon="['fas','sack-xmark']" />
                    <span class="ml-3">Presupuestos</span>
                </router-link>
            </li>
        </ul>
    </div>
    <div class="hidden absolute bottom-0 left-0 justify-center p-4 space-x-4 w-full lg:flex bg-white dark:bg-gray-800 z-20">
    </div>
</aside>
</template>

<script setup>
import { initFlowbite } from "flowbite"
import { onMounted } from "vue"

onMounted(() => {
    initFlowbite()
  })

</script>
