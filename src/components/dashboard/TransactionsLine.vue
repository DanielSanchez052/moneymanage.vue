<template>
    <Line :data="data" :options="options" class="bg-gray-800" />
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

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
)

const options = reactive({
    responsive: true,
    maintainAspectRatio: false
})

const data = {
    labels: moment.months(),
    datasets: [
        {
        label: 'Transacciones',
        backgroundColor: '#f87979',
        data: []
        }
    ]
}



</script>
