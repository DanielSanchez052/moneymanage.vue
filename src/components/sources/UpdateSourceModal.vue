<template>
<div ref="updateSourceModalId" tabindex="-1" aria-hidden="true" class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-modal md:h-full">
    <div class="relative p-4 w-full max-w-2xl h-full md:h-auto">
        <!-- Modal content -->
        <div class="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
            <!-- Modal header -->
            <div class="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                    Actualizar Fuente
                </h3>
                <button type="button" @click="hideModal" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white">
                    <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                    </svg>
                    <span class="sr-only">Cerrar</span>
                </button>
            </div>
            <!-- Modal body -->
            <Form @submit="handleUpdateSource" :validation-schema="schema" v-slot="{ errors, isSubmitting }">
                <div class="">
                    <div class="mb-4">
                        <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre</label>
                        <Field v-model="formValues.name" type="text" name="name" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Escribe el nombre de la fuente" />
                        <p name="name" class="mt-2 text-sm text-red-600 dark:text-red-500">{{ errors.name }}</p>
                    </div>
                    <div class="mb-4">
                        <label for="description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Descripcion</label>
                        <Field  v-model="formValues.description" type="text" name="description" id="description" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Escribe una descripcion" />
                        <p name="description" class="mt-2 text-sm text-red-600 dark:text-red-500">{{ errors.description }}</p>

                    </div>
                    <div class="flex justify-center items-center mb-4">
                        <div class="h-5 items-center">
                            <Field v-model="formValues.active" 
                                type="checkbox" 
                                name="active" 
                                id="active" 
                                class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800" />
                        </div>
                        <label for="active" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Activa</label>
                        <p name="active" class="mt-2 text-sm text-red-600 dark:text-red-500">{{ errors.active }}</p>

                    </div>
                    <div class="w-full mb-6" v-show="error">
                        <p class="mt-2 text-sm text-red-600 dark:text-red-500" v-for="error in messages">
                            {{ error }}
                        </p>
                    </div>

                </div>
                <div class="flex justify-end items-end w-full">
                    <button :class="[isSubmitting ? button_disabled : button_active ]" :disabled="isSubmitting">
                        <svg v-if="isSubmitting" aria-hidden="true" role="status" class="inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                        </svg>
                        Actualizar Fuente
                    </button>
                </div>
            </Form>
        </div>
    </div>
</div>

</template>

<script setup>
import { Modal } from "flowbite";
import {
    Form,
    Field
} from "vee-validate"
import {
    ref, onMounted, defineExpose, defineEmits, reactive
} from "vue"
import * as yup from "yup"
import SourcesService from "@/services/transactions/sources.service"
import { UseAuth } from "@/store/auth.module"

const authStore = UseAuth()

const emit = defineEmits(["source-updated"])

const schema = yup.object().shape({
    name: yup.string().required("en nombre es obligatorio."),
    description: yup.string().required("la descripcion es obligatoria."),
    active: yup.string()
});

const updateSourceModalId = ref(null)
let updateSourceModal; 
const button_active = "w-full focus:outline-none text-white bg-indigo-600 hover:bg-indigo-800 focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-900"
const button_disabled = "w-full text-white bg-indigo-600 cursor-not-allowed font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-indigo-600"
const error = ref(false)
const messages = ref([])
const formValues = reactive({
    id: "",
    name: "",
    description: "",
    active: "on"
})

onMounted(() => {
    updateSourceModal = new Modal(updateSourceModalId.value) 
})

function handleUpdateSource(source, { resetForm }) {
    messages.value = []
    error.value = false

    source.active = source.active === undefined
    source.id = formValues.id

    SourcesService.UpdateSource(authStore.user.token, {
            accountId: authStore.user.accountId,
            sourceId: "",
            ...source
        }).then(
        () => {
            emit("source-updated")
            resetForm()
            hideModal()
        }, (e) => {
            error.value = true
            messages.value.push(...e.map(e => e.message))
        })
}

function showModal(source){
    updateSourceModal.show()
    formValues.id = source.id
    formValues.name = source.name
    formValues.description = source.description
    formValues.active = source.isActive ? undefined : 'on'
}

function hideModal(){
    updateSourceModal.hide()
}

defineExpose({ showModal, hideModal})

</script>
