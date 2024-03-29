<template>
<div class="flex flex-1 flex-col justify-start py-20">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
        <img class="mx-auto h-20 w-auto" src="/img/MoneyManageLogo.png" alt="Moneymanage" />
        <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">Confirmar email?</h2>
    </div>
    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form @submit="handleConfirmEmail" novalidate>
            <div class="w-full mb-4">
                <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                <input v-model="email" v-bind="emailAttrs" type="email" name="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Ingresa el email" />
                <p class="mt-2 text-sm text-red-600 dark:text-red-500">{{ errors.email }}</p>
            </div>
            <div class="w-full mb-6" v-show="error">
                <p class="mt-2 text-sm text-red-600 dark:text-red-500" v-for="error in messages">
                    {{ error }}
                </p>
            </div>
            <div class="w-full">
                <button :class="[isSubmitting ? button_disabled : button_active ]" :disabled="isSubmitting">
                    <svg v-if="isSubmitting" aria-hidden="true" role="status" class="inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                    </svg>
                    Confirmar email
                </button>
            </div>
        </form>
        <p class="mt-10 text-center text-sm text-gray-500">
            <a href="/accounts" class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                Volver al login
            </a>
        </p>
    </div>
</div>
</template>

<script setup>
import { initFlowbite } from "flowbite"
import { useForm } from "vee-validate"
import { ref, onMounted } from "vue"
import AuthService from "@/services/users/auth.service"
import * as yup from "yup"
import { toast } from 'vue3-toastify';

const button_active = "w-full focus:outline-none text-white bg-indigo-600 hover:bg-indigo-800 focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-900"
const button_disabled = "w-full text-white bg-indigo-600 cursor-not-allowed font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-indigo-600"
const error = ref(false)
const messages = ref([])

const schema = yup.object().shape({
    email: yup.string().required("El email es obligatorio").email("El formato del email no es valido"),
});

const { handleSubmit, isSubmitting, errors, meta, defineField } = useForm({
    initialValues: {},
    validationSchema: schema
})

const [email, emailAttrs] = defineField("email")


onMounted(() => {
    initFlowbite()
})

const handleConfirmEmail = handleSubmit((confirmationRequest, { resetForm }) => {
    messages.value = []
    error.value = false
    return AuthService.confirmEmailRequest(confirmationRequest).then(
        (res) => {
            if(!res.success){
                error.value = true
                messages.value.push(...res.errors.map(e => e.message))
                toast("Ha ocurrido un error trantando de enciar el email de confirmacion", {
                    theme: "dark",
                    type: "error",
                    autoClose: 1000,
                }); // ToastOptions
            
                return;
            }
            
            toast("Se te ha enviado un email para realizar la confirmacion", {
                theme: "dark",
                type: "success",
                autoClose: 1000,
            }); // ToastOptions
            resetForm()
        }, (e) => {
            console.error(e)
        }
    )
})

</script>