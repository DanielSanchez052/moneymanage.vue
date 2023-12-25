<template>
<div v-if="isLoading" class="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-96 mb-4 flex flex-1 flex-col justify-center items-center py-20">
    <span class="dark:text-white">Loading...</span>
    <svg aria-hidden="true" role="status" class="inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
    </svg>
</div>
<table v-else class="w-full text-sm text-gray-500 dark:text-gray-400 text-center">
    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
            <th scope="col" class="px-4 py-3">Monto</th>
            <th scope="col" class="px-4 py-3">Fecha de transaccion</th>
            <th scope="col" class="px-4 py-3">Tipo</th>
            <th scope="col" class="px-4 py-3">Fuente</th>
            <th scope="col" class="px-4 py-3">Activa</th>
            <th scope="col" class="px-4 py-3">
                <span class="sr-only">Actions</span>
            </th>
        </tr>
    </thead>
    <tbody>
        <tr class="border-b dark:border-gray-700" v-for="transaction in data.pagesPlain">
            <th scope="row" class="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {{ util.formatMoney(transaction.ammount) }}
            </th>
            <td class="px-4 py-3">
                {{ formatTransactionDate(transaction.transactionDate) }}
            </td>
            <td class="px-4 py-3">
                <span v-if="TRANSACTION_TYPES.revenue == transaction.type.id" class="bg-primary-100 text-zinc-300 text-xs font-medium px-2 py-0.5 rounded dark:bg-green-600 dark:text-primary-300">
                    Ganado
                </span>
                <span v-else class="bg-primary-100 text-zinc-300 text-xs font-medium px-2 py-0.5 rounded dark:bg-orange-600 dark:text-primary-300">
                    Gastado
                </span>
            
            </td>
            <td class="px-4 py-3">{{ transaction.source.name }}</td>
            <td class="px-4 py-3">
                <font-awesome-icon :icon="['fas', 'circle-check']" v-if="transaction.isActive" />
                <font-awesome-icon :icon="['fas', 'circle-xmark']" v-else />
            </td>
            <td class="px-4 py-3 flex justify-end">
                <button @click="moreInfoModal.showModal(transaction.transactionExtendedProperties)" id="moreInfoButton" class="inline-flex items-center p-0.5 text-sm font-medium text-center text-gray-500 hover:text-gray-800 rounded-lg focus:outline-none dark:text-gray-400 dark:hover:text-gray-100" type="button">
                        <font-awesome-icon :icon="['fas', 'eye']" />
                </button>
                <button @click="updateTransactionModal.showModal(transaction)" class="inline-flex items-center p-0.5 text-sm font-medium text-center text-gray-500 hover:text-gray-800 rounded-lg focus:outline-none dark:text-gray-400 dark:hover:text-gray-100" type="button">
                    <font-awesome-icon :icon="['fas', 'pen-to-square']" />
                </button>
                <button @click="transactionDelete(transaction.id)" class="inline-flex items-center p-0.5 text-sm font-medium text-center text-gray-500 hover:text-gray-800 rounded-lg focus:outline-none dark:text-gray-400 dark:hover:text-gray-100" type="button">
                    <font-awesome-icon :icon="['fas', 'trash']" />
                </button>
            </td>
        </tr>
    </tbody>
</table>
<nav class="flex items-center flex-column flex-wrap md:flex-row justify-center py-2" aria-label="Table navigation" v-if="hasNextPage && !isLoading">
    <button :disabled="isLoading" @click="transactionNextPage">
        <span v-if="!isLoading" class="dark:text-white">Cargar mas </span>
    </button>
    <br />
</nav>
<ExtendedPropertiesModal ref="moreInfoModal"/>
<UpdateTransactionModal ref="updateTransactionModal" @transaction-updated="refreshTransactions"/>
</template>

<script setup>
import { defineProps, toRefs, ref } from "vue"
import TransactionService from "@/services/transactions/transactions.service"
import UseTransactions from "@/custom_hooks/transactions"
import { TRANSACTION_TYPES } from "@/libs/constants"
import util from "@/libs/utilities"
import ExtendedPropertiesModal from "@/components/transactions/ExtendedPropertiesModal.vue"
import UpdateTransactionModal from "@/components/transactions/UpdateTransactionModal.vue"

const props = defineProps(["token", "accountId", "filters"])
const filters = toRefs(props.filters)
const moreInfoModal = ref(0)
const updateTransactionModal = ref(0)

const token = props.token
const accountId = props.accountId

const {
    isLoading, data, isError, refetch, fetchNextPage, fetchPreviousPage, hasNextPage, hasPreviousPage
} = UseTransactions(token, accountId, filters)

function refreshTransactions() {
    refetch.value()
}

function transactionNextPage() {
    fetchNextPage.value()
}

function transactionDelete(id){
    console.log(id)
    TransactionService.DeleteTransaction(token, id).then(
        (res) => {
            console.log(res)
            refreshTransactions()
            console.log("Deleted...")
        }, (e) => {
            console.error(e)
        }
    )
}

function formatTransactionDate(value){
    let date = new Date(value)
    return [
        date.getDate(),
        date.getMonth() + 1,
        date.getFullYear()
    ].join("/")
}

defineExpose({
    refreshTransactions,
    transactionNextPage
})
</script>
