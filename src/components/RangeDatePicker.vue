<template>
<div class="flex items-center" id="rangeDatePickerId">
    <div class="relative">
        <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
            </svg>
        </div>
        <input 
            @changeDate="onChangeStart"
            name="start" 
            type="text" 
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
            placeholder="Desde"
            ref="startInput"
        >
    </div>
    <span class="mx-2 text-gray-500 dark:text-gray-400">to</span>
    <div class="relative">
        <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
            </svg>
        </div>
        <input 
            @changeDate="onChangeEnd"
            name="end" 
            type="text"     
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
            placeholder="Hasta"
            ref="endInput"
            >
    </div>
</div>
</template>

<script setup>
import {
    onMounted,
    reactive,
    defineEmits,
    defineExpose,
    ref
} from "vue"
import DateRangePicker from 'flowbite-datepicker/DateRangePicker';


const emit = defineEmits(["change"])

const startInput = ref(null)
const endInput = ref(null)

onMounted(() => {
    const dateRangePickerEl = document.getElementById('rangeDatePickerId');
    new DateRangePicker(dateRangePickerEl, {
        autohide: true,
        format: "yyyy/mm/dd"
    });
})

const range = reactive({
    start: "",
    end: ""
})

function onChangeStart(event){
    range.start = new Date(event.detail.date).toISOString()
    emit("change", range)
}


function onChangeEnd(event){
    range.end = new Date(event.detail.date).toISOString()
    emit("change", range)
}

function clean(){
    startInput.value.value = ""
    endInput.value.value = ""
}


defineExpose({ range, clean})

</script>

