<template>
<Form @submit="handleRegister" :validation-schema="schema" v-slot="{ errors, isSubmitting  }">
    <section class="flex flex-col justify-center items-center">
        <div class="w-full mb-2">
            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
            <Field type="email" name="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Ingresa el email" />
            <p name="email" class="mt-2 text-sm text-red-600 dark:text-red-500" >{{ errors.email }}</p>
        </div>
        <div class="w-full mb-2">
            <label for="username" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre usuario</label>
            <Field name="username" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Ingresa el nombre de usuario" />
            <p name="email" class="mt-2 text-sm text-red-600 dark:text-red-500" >{{ errors.username }}</p>

        </div>
        <div class="w-full mb-2">
            <label for="phone" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Numero celular</label>
            <Field name="phone" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Ingresa el telefono" />
            <p name="email" class="mt-2 text-sm text-red-600 dark:text-red-500" >{{ errors.phone }}</p>
        </div>
        <div class="w-full relative mb-2">
            <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Contraseña</label>
            <Field type="password" name="password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Ingresa tu contraseña" />
            <p name="email" class="mt-2 text-sm text-red-600 dark:text-red-500" >{{ errors.password }}</p>
        </div>
        <div class="w-full relative mb-6">
            <label for="confirmPassword" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirmacion contraseña</label>
            <Field type="password" name="confirmPassword" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Ingresa tu contraseña" />
            <p name="email" class="mt-2 text-sm text-red-600 dark:text-red-500" >{{ errors.confirmPassword }}</p>

        </div>

        <div class="w-full mb-6" v-show="error">
            <p class="mt-2 text-sm text-red-600 dark:text-red-500" v-for="error in messages">
                {{ error }}
            </p>
        </div>
        
        <div class="w-full mb-6" v-show="success_message"> 
            <p class="mt-2 text-sm text-green-600 dark:text-green-500">
                {{ success_message }}
            </p>
        </div>
        <button :class="[isSubmitting ? button_disabled : button_active ]" :disabled="isSubmitting">
            <svg v-if="isSubmitting" aria-hidden="true" role="status" class="inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
            </svg>
            Registrarse
        </button>
    </section>
</Form>
</template>

<script setup>
import {
    Form,
    Field,
    ErrorMessage
} from "vee-validate"
import { ref } from "vue" 
import * as yup from "yup"
import { UseAuth } from "@/store/auth.module"

const store = UseAuth()

const schema = yup.object({
    email: yup.string().required("El email es obligatorio").email("El formato del email no es valido"),
    username: yup.string().required("El nombre de usuario es requerido").min(4, {
        message: "el nombre de usuario debe tener al menos 4 caracteres."
    }),
    phone: yup.string().required("El nombre de usuario es requerido").min(10, {
        message: "el numero de celular debe tener al menos 10 digitos."
    }),
    password: yup.string().required("la contraseña es obligatoria"),
    confirmPassword: yup.string().required("la contraseña es obligatoria")
        .oneOf([yup.ref('password'), null], 'Las contraseñas no coinciden'),
});

const button_active = "w-full focus:outline-none text-white bg-indigo-600 hover:bg-indigo-800 focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-900"
const button_disabled = "w-full text-white bg-indigo-600 cursor-not-allowed font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-indigo-600"


const error = ref(false)
const messages = ref([])
const success_message = ref("")


function handleRegister(user) {
    messages.value = []
    error.value = false
    
    store.register(user).then(
        () => {
            success_message.value = "Se ha registrado al usuario correctamente."
        }, (e) => {
            console.log(e)
            error.value = true
            messages.value.push(...e.map(e => e.message))
        })
}
</script>
