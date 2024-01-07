<template>
    <section class="sm:p-5 p-2 md:ml-64 h-screen relative">
    <div class="mx-auto max-w-screen-xl px-2 lg:px-12 w-full">
        <h1 class="py-10 text-center text-white text-2xl">Dashboard </h1>
                
        <section class="grid grid-cols-3 grid-rows-2 gap-4 mb-4">
            <div >
                <TransactionBySourceBar label="Ganado X Fuente" :sources="sourcesData" :trasactions="transactionData.pagesPlain.filter(t => t.type.id == TRANSACTION_TYPES.revenue) ?? []" />
            </div>
            <div >
                <TransactionBySourceBar label="Gastado X Fuente" :sources="sourcesData" :trasactions="transactionData.pagesPlain.filter(t => t.type.id == TRANSACTION_TYPES.spend) ?? []" />
            </div>
            <div class="col-start-3 row-start-1">
                <TransactionTypePie :types="typesData" :trasactions="transactionData"  />
            </div>
            <div class="col-start-1 row-start-2 col-span-3">
                <TransactionsLine />
            </div>
            <!-- <div class="col-start-1 row-start-2">
            </div>
            <div class="col-start-1 row-start-3">
                <TransactionTypePie :types="typesData" :trasactions="transactionData"  />
            </div>
            <div class="col-start-2 row-start-2">
                <Bar :data="barChart.data" :options="barChart.options" />
            </div>
            <div class="col-start-2 row-start-3">
                <Bar :data="barChart.data" :options="barChart.options" />
            </div>
            <div class="col-start-3 row-start-2">
                <Bar :data="barChart.data" :options="barChart.options" />
            </div>
            <div class="col-start-3 row-start-3">
                <Bar :data="barChart.data" :options="barChart.options" />
            </div>
            <div class="col-start-1 row-start-4">
                <Bar :data="barChart.data" :options="barChart.options" />
            </div>
            <div class="col-start-2 row-start-4">
                <Bar :data="barChart.data" :options="barChart.options" />
            </div>
            <div class="col-start-3 row-start-4">
                <Bar :data="barChart.data" :options="barChart.options" />
            </div> -->
        </section>
    </div>
</section>
</template>

<script setup>
import { UseAuth } from "@/store/auth.module"
import UseSources from "@/custom_hooks/sources"
import UseTypes from "@/custom_hooks/types"
import UseTransactions from "@/custom_hooks/transactions"
import { reactive, computed } from "vue"
import TransactionBySourceBar from "@/components/dashboard/TransactionBySourceBar.vue"
import TransactionTypePie from "@/components/dashboard/TransactionTypePie.vue"
import TransactionsLine from "@/components/dashboard/TransactionsLine.vue"
import { TRANSACTION_TYPES } from "@/libs/constants"

const authStore = UseAuth()
const token = authStore?.user?.token
const accountId = authStore?.user?.accountId

const filters_selected = reactive({
    sourceId: 0,
    typeId: 0,
    pageSize: 8,
    dateFrom: "",
    dateTo: "" 
})

const { data: sourcesData} = UseSources(token, accountId, 0)
const { data: typesData } = UseTypes(token)
const { data: transactionData } = UseTransactions(token, accountId, filters_selected)



</script>