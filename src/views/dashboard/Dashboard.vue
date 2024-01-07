<template>
<section class="sm:p-5  md:ml-64 h-screen relative">
    <div class="mx-auto max-w-screen-xl px-2 lg:px-12 w-full">
        <h1 class="pt-10 pb-5 text-center text-white text-2xl">Resumen </h1>
        <nav class="bg-white border-b border-gray-200 px-4 py-2.5 mb-4 dark:bg-gray-800 dark:border-gray-700">
            <div class="flex justify-between">
                <div class="flex justify-center items-center">
                    <div class="">
                        <button @click="cleanFilters" class="px-4 text-sm py-2.5 bg-indigo-600 hover:bg-indigo-400">
                            <font-awesome-icon class="text-white text-lg hover:text-gray-400" :icon="['fas','broom']"  />
                        </button>
                    </div>
                    <div class="px-4">
                        <p class="text-white text-lg">Filtros:</p>
                    </div>
                    <div class="px-4">                    
                        <RangeDatePicker @change="setRangeDate" ref="rangeDatePicker"/>
                    </div>
                    <div>
                        <input type="number" v-model="filters_selected.pageSize" id="pageNumber" placeholder="Número Transacciones" class=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                    </div>
                </div>
                <div class="flex items-center">
                    <p class="text-white text-sm">Total transacciones: {{ numberTransactions }}</p>
                </div>
            </div>
        </nav>        
        <section class="grid grid-cols-3 grid-rows-3 gap-4 mb-4">
            <div >
                <TransactionBySourceBar label="Ganado X Fuente" :sources="sourcesData" :trasactions="transactionData?.pagesPlain?.filter(t => t.type.id == TRANSACTION_TYPES.revenue) ?? []" />
            </div>
            <div >
                <TransactionBySourceBar label="Gastado X Fuente" :sources="sourcesData" :trasactions="transactionData?.pagesPlain?.filter(t => t.type.id == TRANSACTION_TYPES.spend) ?? []" />
            </div>
            <div class="col-start-3 row-start-1">
                <TransactionTypePie :types="typesData" :trasactions="transactionData ?? []"  />
            </div>
            <div class="col-start-1 row-start-2 col-span-3">
                <TransactionsMonthlyLine :transactions="transactionData?.pagesPlain"/>
            </div>
            <div class="col-start-1 row-start-3 col-span-3">
                <TransactionsDailyLine :transactions="transactionData?.pagesPlain"/>
            </div>
        </section>
    </div>
</section>
</template>

<style>
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}
</style>    

<script setup>
import { initFlowbite } from "flowbite"
import { UseAuth } from "@/store/auth.module"
import UseSources from "@/custom_hooks/sources"
import UseTypes from "@/custom_hooks/types"
import UseTransactions from "@/custom_hooks/transactions"
import { reactive, onMounted, computed, ref } from "vue"
import TransactionBySourceBar from "@/components/dashboard/TransactionBySourceBar.vue"
import TransactionTypePie from "@/components/dashboard/TransactionTypePie.vue"
import TransactionsMonthlyLine from "@/components/dashboard/TransactionsMonthlyLine.vue"
import TransactionsDailyLine from "@/components/dashboard/TransactionsDailyLine.vue"
import { TRANSACTION_TYPES } from "@/libs/constants"
import RangeDatePicker from "@/components/RangeDatePicker.vue"

const authStore = UseAuth()
const token = authStore?.user?.token
const accountId = authStore?.user?.accountId

const rangeDatePicker = ref(null)


const filters_selected = reactive({
    sourceId: 0,
    typeId: 0,
    pageSize: 100,
    dateFrom: "",
    dateTo: "" 
})

onMounted(() => {
    initFlowbite()
})

const { data: sourcesData} = UseSources(token, accountId, 0)
const { data: typesData } = UseTypes(token)
const { data: transactionData } = UseTransactions(token, accountId, filters_selected)

const numberTransactions = computed(() => transactionData?.value?.pages[transactionData?.value.pages.length - 1].totalCount)

function setRangeDate(e){
    filters_selected.dateFrom = e.start
    filters_selected.dateTo = e.end
}

function cleanFilters(){
    filters_selected.sourceId = 0
    filters_selected.typeId = 0
    filters_selected.dateFrom = ""
    filters_selected.dateTo = ""
    
    rangeDatePicker.value.clean()
}

</script>