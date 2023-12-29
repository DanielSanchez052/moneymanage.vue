<template>
<div ref="budgetDetailModalId" tabindex="-1" aria-hidden="true" class="hidden overflow-y-hidden overflow-x-auto fixed top-0 right-0 left-0 z-50 justify-center items-center w-full h-full md:inset-0">
    <div class="relative p-4 w-full max-w-5xl overflow-y-auto h-full md:h-3/4">
        <div class="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5 ">
            <div class="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600 ">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                    Detalle Presupuestos
                </h3>
                <button type="button" @click="hideModal" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white">
                    <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                    </svg>
                    <span class="sr-only">Cerrar</span>
                </button>
            </div>
            <div>
                <table class="w-full text-sm text-gray-500 dark:text-gray-400 text-center pb-2">
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
                        <tr class="border-b dark:border-gray-700" v-for="budget in budgetDetails">
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
            </div>
        </div>
    </div>
</div>
</template>


<script setup>
import { Modal } from "flowbite";
import {
    ref, onMounted, defineExpose
} from "vue"
import util from "@/libs/utilities"
import { TRANSACTION_TYPES } from "@/libs/constants"


const budgetDetailModalId = ref(null)
let budgetDetailModal;
const budgetDetails = ref([])

onMounted(() => {
    budgetDetailModal = new Modal(budgetDetailModalId.value) 
})

function showModal(details){
    budgetDetails.value = details
    budgetDetailModal.show()
}

function hideModal(){
    budgetDetailModal.hide()
}


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

defineExpose({ showModal, hideModal})

</script>