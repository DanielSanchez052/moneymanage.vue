<template>
    <Line :data="getData()" :options="options" class="bg-gray-800" />
</template>

<script setup>
import { defineProps, reactive, toRef } from "vue"
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js'
import { Line } from 'vue-chartjs'
import util from "@/libs/utilities"
import { TRANSACTION_TYPES } from "@/libs/constants"
import moment from "moment/moment"

const props = defineProps(["transactions"])

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
)

const transactionData = toRef(props, "transactions")

const options = reactive({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        title: {
            display: true,
            text: "Transacciones Mensual",
        },
    },
})


const getData = () => {
        const transactions = transactionData.value ?? []

        const revenued = []
        if(transactions.length > 0){
            for(let i = 1; i <= 12; i++){
                revenued.push(transactions?.filter(t => moment(t.transactionDate).format('M') == i && t.type.id == 1).reduce((n, {ammount}) => n + ammount, 0) ?? 0)
            }
        }

        const spend = []
        if(transactions.length > 0){
            for(let i = 1; i <= 12; i++){
                spend.push(transactions?.filter(t => moment(t.transactionDate).format('M') == i && t.type.id == 2).reduce((n, {ammount}) => n + ammount, 0) ?? 0)
            }
        }
        return {
            labels: moment.months(),
            datasets: [
                {
                    label: 'Ganado',
                    backgroundColor: '#41B883',
                    data: revenued
                },
                {
                    label: 'Gastado',
                    backgroundColor: '#E46651',
                    data: spend
                }
            ]
        }
    }



</script>
