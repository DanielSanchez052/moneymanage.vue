<template>
<div class="flex flex-1 flex-col justify-start py-20">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
        <img class="mx-auto h-20 w-auto" src="/img/MoneyManageLogo.png" alt="Moneymanage" />
    </div>
    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">

        <div class="mb-4 border-b border-gray-200 dark:border-gray-700">
            <ul class="flex flex-wrap -mb-px text-sm font-medium text-center items-center justify-center" id="default-tab" data-tabs-toggle="#default-tab-content" role="tablist">
                <li class="me-2" role="presentation">
                    <button class="inline-block p-4 border-b-2 rounded-t-lg" id="login-tab" data-tabs-target="#login" type="button" role="tab" aria-controls="login" aria-selected="false">Login</button>
                </li>
                <li class="me-2" role="presentation">
                    <button class="inline-block p-4 border-b-2 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300" id="register-tab" data-tabs-target="#register" type="button" role="tab" aria-controls="register" aria-selected="false">Register</button>
                </li>
            </ul>
        </div>
        <div id="default-tab-content">
            <div class="hidden p-4" id="login" role="tabpanel" aria-labelledby="login-tab">
                <LoginForm />
            </div>
            <div class="hidden p-4" id="register" role="tabpanel" aria-labelledby="register-tab">
                <RegisterForm />
            </div>
            <p class="text-center text-xs text-red-500">
                Sitio en construcción. No ingresar datos financieros reales. Solo con fines educativos.  
            </p>
        </div>

        <p class="mt-10 text-center text-sm text-gray-500">
            Tu email aún no ha sido confirmado?
            <router-link to="/accounts/confirm-email" class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                confirmalo aquí
            </router-link>
        </p>
        <p class="mt-10 text-center text-sm text-gray-500">
            Olvidaste tu contraseña?
            <router-link to="/accounts/reset-password" class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                Resetea tu contraseña
            </router-link>
        </p>
    </div>
</div>

</template>

<script setup>
import LoginForm from "@/components/accounts/LoginForm.vue"
import RegisterForm from "@/components/accounts/RegisterForm.vue"
import { initFlowbite } from "flowbite"
import { onMounted } from "vue"
import { UseAuth } from "@/store/auth.module"
import { useRouter } from "vue-router"
import { UseNotificationHub } from "@/store/notification_hub.module"


const store = UseAuth()
const notificationHub = UseNotificationHub()
const router = useRouter();


onMounted(() => {
    initFlowbite()
    
    if(store.user){
        router.push("/dashboard")
    }
    
    notificationHub.stopSignalR()
})


</script>

<style scoped>

</style>
