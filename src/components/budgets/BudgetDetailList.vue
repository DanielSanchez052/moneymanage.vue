<template>
    <div class="overflow-y-hidden">
        <table class="w-full text-sm text-gray-500 dark:text-gray-400 text-center pb-2 ">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" class="px-4 py-3">Monto Presupuesto</th>
                    <th scope="col" class="px-4 py-3">Monto Actual</th>
                    <th scope="col" class="px-4 py-3">Tipo presupuesto</th>
                    <th scope="col" class="px-4 py-3">Tipo Transaccion</th>
                    <th scope="col" class="px-4 py-3">Tipo Fuente</th>
                    <th scope="col" class="px-4 py-3">Fecha de inicio</th>
                    <th scope="col" class="px-4 py-3">Fecha de fin</th>
                    <th scope="col" class="px-4 py-3">Activo</th>
                </tr>
            </thead>
            <tbody>
                <tr class="border-b dark:border-gray-700" v-for="budget in sortedDetails">
                    <th scope="row" class="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {{ util.formatMoney(budget.targetAmmount) }}
                    </th>
                    <th scope="row" class="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {{ util.formatMoney(budget.currentAmmount) }}
                    </th>
                    <td class="px-4 py-3">
                        {{ getBudgetType(budget.budgetType.id) }}
                    </td>
                    <td class="px-4 py-3">
                        <span v-if="TRANSACTION_TYPES.revenue == budget.targetType.id" class="bg-primary-100 text-zinc-300 text-xs font-medium px-2 py-0.5 rounded dark:bg-green-600 dark:text-primary-300">
                            Ganado
                        </span>
                        <span v-else class="bg-primary-100 text-zinc-300 text-xs font-medium px-2 py-0.5 rounded dark:bg-orange-600 dark:text-primary-300">
                            Gastado
                        </span>
                    </td>
                    <td class="px-4 py-3">{{ budget.targetSource.name }}</td>
                    <td class="px-4 py-3">
                        {{ formatTransactionDate(budget.startDate) }}
                    </td>
                    <td class="px-4 py-3">
                        {{ formatTransactionDate(budget.endDate) }}
                    </td>
                    <td class="px-4 py-3">
                        <font-awesome-icon :icon="['fas', 'circle-check']" v-if="budget.isActive" />
                        <font-awesome-icon :icon="['fas', 'circle-xmark']" v-else />
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
    </div>        
</template>

<script setup>
import { defineProps, toRefs, ref, computed } from "vue"
import { TRANSACTION_TYPES } from "@/libs/constants"
import util from "@/libs/utilities"

const budgetDetails = ref([])

function getBudgetType(id){
    const budgetTypes = {
        1: "Diario",
        2: "Mensual",
        3: "Anual"
    }
    return budgetTypes[id]
}

function formatTransactionDate(value){
    let date = new Date(value)
    return [
        date.getDate(),
        date.getMonth() + 1,
        date.getFullYear()
    ].join("/")
}

function showDetails(details){
    console.log()
    budgetDetails.value = details
}

const sortedDetails = computed(() => {
    let a = [...budgetDetails.value]
    a.sort((a,b) => new Date(a.startDate) - new Date(b.startDate))
    return a
})

defineExpose({
    showDetails
})
</script>
