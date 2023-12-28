<template>
<section class="sm:p-5 md:ml-64 h-screen relative">
    <div class="mx-auto max-w-screen-xl lg:px-12">
        <h1 class="pt-10 text-center text-white text-2xl">Transacciones </h1>
        <div class=" bg-white mt-5 dark:bg-gray-800 shadow-md sm:rounded-lg ">
            <div class="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                <div class="flex flex-col md:flex-row gap-4 w-full md:w-1/2">
                    <div>
                        <button id="sourcesDropdownButton" data-dropdown-toggle="sourcesDropdown" class="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" type="button">
                            <svg class="-ml-1 mr-1.5 w-5 h-5" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                <path clip-rule="evenodd" fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                            </svg>
                            Sources
                        </button>
                        <div id="sourcesDropdown" class="hidden z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
                            <div class="py-1">
                                <a @click.prevent="() => setSource(0)" class="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Todos</a>
                            </div>
                            <div class="py-1">
                                <a v-for="source in sourcesData" @click.prevent="() => setSource(source.id)" class="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">{{ source.name }}</a>
                            </div>
                        </div>
                    </div>
                    <div>
                        <button id="typeDropdownButton" data-dropdown-toggle="typeDropdown" class="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" type="button">
                            <svg class="-ml-1 mr-1.5 w-5 h-5" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                <path clip-rule="evenodd" fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                            </svg>
                            Tipos
                        </button>
                        <div id="typeDropdown" class="hidden z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
                            <div class="py-1">
                                <a @click.prevent="() => setType(0)" class="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Todos</a>
                            </div>
                            <div class="py-1">
                                <a 
                                    v-for="types in typesData" 
                                    @click.prevent="() => setType(types.id)" 
                                    class="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                                    >
                                    {{ getTypeName(types.id) }}
                                </a>
                            </div>
                        </div>
                    </div>
                    <div>                    
                        <button id="dateRangeButton" 
                        data-dropdown-toggle="dateRangeDropdown" 
                        data-dropdown-ignore-click-outside-class="datepicker" 
                        type="button" class="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                            <svg class="-ml-1 mr-1.5 w-5 h-5" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                <path clip-rule="evenodd" fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                            </svg>
                            Fechas 
                        </button>
                        <div id="dateRangeDropdown" class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-80 lg:w-96 dark:bg-gray-700 dark:divide-gray-600">
                            <div class="p-3" aria-labelledby="dateRangeButton">
                                <RangeDatePicker @change="setRangeDate"/>
                            </div>
                        </div>

                    </div>
                </div>

                <div class="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                    <button @click="addTransactionModal.showModal" id="addTransactionModalButton" type="button" class="flex items-center justify-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">
                        <font-awesome-icon icon="plus" class="px-2"></font-awesome-icon>
                        Agregar Transaccion
                    </button>
                    <div class="flex items-center space-x-3 w-full md:w-auto">
                    </div>
                </div>
                
            </div>
            <TransactionList :token="token" :accountId="accountId" :filters="filters_selected" ref="transactionListElement" />
        </div>
    </div>
</section>

<AddTransactionModal ref="addTransactionModal" :sources="sourcesData" :types="typesData"  @transaction-created="() => transactionListElement.refreshTransactions()"/>
</template>

<script setup>
import {
    initFlowbite
} from "flowbite"
import {
    onMounted, ref, reactive
} from "vue"
import { UseAuth } from "@/store/auth.module"
import TransactionList from "@/components/transactions/TransactionList.vue"
import RangeDatePicker from "@/components/RangeDatePicker.vue"
import UseSources from "@/custom_hooks/sources"
import UseTypes from "@/custom_hooks/types"
import AddTransactionModal from "@/components/transactions/AddTransactionModal.vue"
import { TRANSACTION_TYPES } from "@/libs/constants"


const authStore = UseAuth()
const transactionListElement = ref(null)
const addTransactionModal = ref(null)

const token = authStore?.user?.token
const accountId = authStore?.user?.accountId

const filters_selected = reactive({
    sourceId: 0,
    typeId: 0,
    pageSize: 8,
    dateFrom: "",
    dateTo: "" 
})

const {data: sourcesData  } = UseSources(token, accountId, 0)
const {data: typesData} = UseTypes(token)

onMounted(() => {
    initFlowbite()
})

function setSource(sourceId) {
    filters_selected.sourceId = sourceId
}

function setType(typeId) {
    filters_selected.typeId = typeId
}

function setRangeDate(e){
    filters_selected.dateFrom = e.start
    filters_selected.dateTo = e.end
}

function getTypeName(id){
    let name
    switch(id){
        case TRANSACTION_TYPES.revenue:
            name = "Ganado"
        break;
        case TRANSACTION_TYPES.spend:
            name = "Gastado"
        break;
        default:
            name = "Undefined"
    }
    return name
}

</script>
