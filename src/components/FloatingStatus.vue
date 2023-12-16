<template>
<div  
    v-if="!isLoading"
    @mouseover="hoverStatus = true"
    @mouseleave="hoverStatus = false"
    class="z-50 absolute inline-flex items-center justify-center w-16 h-8 hover:w-40 duration-500 transition-all ease-in-out text-xs font-bold text-white border-2 border-white rounded-full right-0 top-0 dark:border-gray-900 mt-16 mr-2"
    :class="getBackground"
    >
    
    <span v-if="!hoverStatus">Estado</span>
    <span v-else="!hoverStatus">{{ util.formatMoney(data.ammountBalance) }}</span>
</div>
</template>

<script setup>
import UseAccountStatus from "@/custom_hooks/account"
import { UseAuth } from "@/store/auth.module"
import util from "@/libs/utilities"
import { ref, computed } from "vue"
import { ACCOUNT_STATUS } from "@/libs/constants"


const authStore = UseAuth()
const token = authStore.user.token
const accountId = authStore.user.accountId
const hoverStatus = ref(false)

const {
    data,
    isLoading,
    refetch
} = UseAccountStatus(token, accountId)




const getBackground = computed(() => {
    console.log(data.value.status)
    let style = 'bg-red-500'
    switch (data.value.status){
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