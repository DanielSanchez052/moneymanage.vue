<template>
<div  
    @mouseover="hoverStatus = true"
    @mouseleave="hoverStatus = false"
    class="z-40 absolute inline-flex items-center justify-center w-16 h-8 hover:w-40 duration-500 transition-all ease-in-out text-xs font-bold text-white border-2 border-white rounded-full right-0 top-0 dark:border-gray-900 mt-16 mr-2"
    :class="getBackground"
    >
    <span v-if="!hoverStatus">Estado</span>
    <span v-else="!hoverStatus">{{ util.formatMoney(authStore.account?.ammountBalance) }}</span>
</div>
</template>

<script setup>
import { UseAuth } from "@/store/auth.module"
import util from "@/libs/utilities"
import { ref, computed, } from "vue"
import { ACCOUNT_STATUS } from "@/libs/constants"

const authStore = UseAuth()
const hoverStatus = ref(false)

const getBackground = computed(() => {
    let style = 'bg-red-500'
    switch (authStore.account?.status){
        case ACCOUNT_STATUS.Positive:
            style = 'bg-green-400'
            break
        case ACCOUNT_STATUS.Medium:
            style = 'bg-cyan-500'
            break
        case ACCOUNT_STATUS.Negative:
            style = 'bg-red-500'
            break
        default:
            style = 'bg-red-500'
        }
        
    return style
})
</script>