<template>
<section class="sm:p-5 p-2 md:ml-64">
    <div class="mx-auto max-w-screen-xl px-2 lg:px-12">
        <h1 class="py-10 text-center text-white text-2xl">Fuentes</h1>
        <div class="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
            <div class="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                <div class="w-full md:w-1/2">
                    <button id="actionsDropdownButton" data-dropdown-toggle="actionsDropdown" class="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" type="button">
                        <svg class="-ml-1 mr-1.5 w-5 h-5" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path clip-rule="evenodd" fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                        </svg>
                        Estado
                    </button>
                    <div id="actionsDropdown" class="hidden z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
                        <div class="py-1">
                            <a @click.prevent="() => setFilterSources(0)" class="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Todos</a>
                        </div>
                        <div class="py-1">
                            <a @click.prevent="() => setFilterSources(1)" class="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Activos</a>
                            <a @click.prevent="() => setFilterSources(2)" class="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Inactivos</a>
                        </div>
                    </div>
                </div>
                <div class="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                    <button @click="addSourceModal.showModal" id="addSourceModalButton" type="button" class="flex items-center justify-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">
                        <font-awesome-icon icon="plus" class="px-1"></font-awesome-icon>
                        Agregar Fuente
                    </button>
                    <div class="flex items-center space-x-3 w-full md:w-auto">
                    </div>
                </div>
            </div>

            <SourceList :sourcesFilter="sourcesFilter" ref="sourcesListElement" />
        </div>
    </div>
</section>

<AddSourceModal ref="addSourceModal" @source-created="() => sourcesListElement.refreshSources()" />

</template>


<script setup>
import { initFlowbite } from "flowbite"
import { onMounted, ref } from "vue"
import SourceList from "@/components/sources/sourceList.vue"
import AddSourceModal from "@/components/sources/AddSourceModal.vue"

const sourcesFilter = ref(0)
const addSourceModal = ref(null)
const sourcesListElement = ref(null)


function setFilterSources(active){
    sourcesFilter.value = active
}

onMounted(() => {
    initFlowbite()
})



</script>
