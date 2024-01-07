<template>
    <Pie :data="getData()" :options="options" class="bg-gray-800" />
</template>

<script setup>
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'vue-chartjs'
import { defineProps, reactive, toRef } from "vue"
import util from "@/libs/utilities"
import { TRANSACTION_TYPES } from "@/libs/constants"

const props = defineProps(["types", "trasactions", "label"])

ChartJS.register(ArcElement, Tooltip, Legend)

const typesData = toRef(props, "types")
const transactionData = toRef(props, "trasactions")

const options = reactive({
    responsive: true,
    maintainAspectRatio: false
})

    const getData = () => {
        const types = typesData?.value ?? []
        const transactions = transactionData?.value?.pagesPlain ?? []
        const ammountSpend = transactions?.filter(t => t.type.id == TRANSACTION_TYPES.spend).reduce((n, {ammount}) => n + ammount, 0)
        const ammountRevenue = transactions.filter(t => t.type.id == TRANSACTION_TYPES.revenue).reduce((n, {ammount}) => n + ammount, 0)

        return {
            labels: [getTypeName(TRANSACTION_TYPES.revenue), getTypeName(TRANSACTION_TYPES.spend)],
            datasets: [
                {
                backgroundColor: ['#41B883', '#E46651'],
                data: [ammountRevenue, ammountSpend]
                }
            ]
        }
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
