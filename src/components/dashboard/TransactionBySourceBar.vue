<template>

<Bar :data="getData()" :options="options" class="bg-gray-800" />

</template>

<script setup>
    import { defineProps, reactive, toRef } from "vue"
    import { Bar } from 'vue-chartjs'
    import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
    import util from "@/libs/utilities"
    
    ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

    const props = defineProps(["sources", "trasactions", "label"])

    const sourcesData = toRef(props, "sources")
    const transactionData = toRef(props, "trasactions")

    const options = reactive({
        responsive: true,
        maintainAspectRatio: false
    })

    const getData = () => {
    const sources = sourcesData?.value ?? []
    const transactions = transactionData?.value ?? []

    return {
        labels: [
            props.label
        ],
        datasets: sources.map(s => ({
                label: s.name,
                backgroundColor: util.getRandomColor(),
                data: [transactions?.filter(t => t.source.id == s.id).reduce((n, {ammount}) => n + ammount, 0)] 
            }))
    }
}

</script>