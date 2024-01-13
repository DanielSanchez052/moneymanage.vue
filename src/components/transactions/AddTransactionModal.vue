<template>
<div ref="addTransactionModalId" tabindex="-1" aria-hidden="true" class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-modal md:h-full">
    <div class="relative p-4 w-full max-w-4xl h-full md:h-auto">
        <div class="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
            <div class="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                    Agregar Transaccion
                </h3>
                <button type="button" @click="hideModal" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white">
                    <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                    </svg>
                    <span class="sr-only">Cerrar</span>
                </button>
            </div>
            <form @submit="handleAddTransaction" novalidate>
                <div class="">
                    <div class="mb-4">
                        <label for="ammount" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Monto</label>
                        <Field type="number" name="ammount" id="ammount" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Escribe el monto de la transacción" />
                        <p name="ammount" class="mt-2 text-sm text-red-600 dark:text-red-500">{{ errors.ammount }}</p>
                    </div>
                    <div class="mb-4">
                        <label for="transactionDate" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Fecha de transaccion </label>
                        
                        <div class="relative">
                            <div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                                <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                                </svg>
                            </div>
                            <input 
                                autocomplete="off"
                                type="text" 
                                name="transactionDate" 
                                id="transactionDate" 
                                class=" ps-10 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" 
                                placeholder="Escribe la fecha de la transacción" 
                                @changeDate="(event) => { setValue(new Date(event.detail.date).toISOString())}"
                                @change="handleChange"
                                @blur="handleBlur"
                            />
                        </div>
                        <p name="transactionDate" class="mt-2 text-sm text-red-600 dark:text-red-500">{{ errors.transactionDate }}</p>
                    </div>
                    <div className="md:grid md:grid-cols-2 md:gap-2 mb-4">
                        <div class="w-full">
                            <label for="sourceId" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Fuente</label>
                            <Field id="sourceId" as="select" name="sourceId" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                <option selected value="" disabled>seleccione una fuente</option>
                                <option :value="source.id" v-for="source in sources">{{ source.name }}</option>
                            </Field>
                            <p name="sourceId" class="text-center mt-2 text-sm text-red-600 dark:text-red-500">{{ errors.sourceId }}</p>
                        </div>
                        <div class="w-full">
                            <label for="typeId" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tipo</label>
                            <Field id="typeId" as="select" name="typeId" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                <option selected value="" disabled>seleccione un tipo</option>
                                <option :value="item.id" v-for="item in types">{{ getTypeName(item.id) }}</option>
                            </Field>
                            <p name="typeId" class="mt-2 text-sm text-red-600 dark:text-red-500">{{ errors.typeId }}</p>
                        </div>
                    </div>
                    <section class="my-2 box-border rounded-sm border-2 p-2">
                        <h3 class="text-md text-center text-white">Mas información</h3>
                        <div class="overflow-y-auto max-h-72">
                            <div class="grid grid-rows-1 grid-flow-col gap-2 my-2" v-for="(field, idx) in fields" :key="field.key">
                                <div>
                                    <label :for="`ext_prop[${idx}].displayName`" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre</label>
                                    <Field type="text" :name="`ext_prop[${idx}].displayName`" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Escribe el monto de la transacción" />
                                    <ErrorMessage :name="`ext_prop[${idx}].displayName`" as="p" class="mt-2 text-sm text-red-600 dark:text-red-500"/>
                                </div>
                                <div>
                                    <label :for="`ext_prop[${idx}].key`" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Identificador</label>
                                    <Field type="text" :name="`ext_prop[${idx}].key`" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Escribe el monto de la transacción" />
                                    <ErrorMessage :name="`ext_prop[${idx}].key`" as="p" class="mt-2 text-sm text-red-600 dark:text-red-500"/>
                                </div>
                                <div>
                                    <label :for="`ext_prop[${idx}].value`" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Valor</label>
                                    <Field type="text" :name="`ext_prop[${idx}].value`" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Escribe el monto de la transacción" />
                                    <ErrorMessage :name="`ext_prop[${idx}].value`" as="p" class="mt-2 text-sm text-red-600 dark:text-red-500"/>
                                </div>
                                <div class="flex items-end justify-center">
                                    <button @click="remove(idx)" type="button" class="focus:outline-none text-white bg-orange-700 hover:bg-orange-400 focus:ring-4 focus:bg-orange-100 font-medium rounded-lg text-sm px-5 py-2.5">
                                        <font-awesome-icon icon="minus" />
                                    </button>
                                </div>
                            </div>
                            <div class="flex items-center justify-end">
                                <button type="button" :class="button_active" @click="push({displayName: '', key: '', value: ''})">
                                    <font-awesome-icon icon="plus" class="w-20"></font-awesome-icon>
                                </button>
                            </div>
                        </div>
                        <p name="ext_prop" class="text-center mt-2 text-sm text-red-600 dark:text-red-500">{{ errors.ext_prop }}</p>
                    </section>
                    <div class="w-full mb-6" v-show="error">
                        <p class="mt-2 text-sm text-red-600 dark:text-red-500" v-for="error in messages">
                            {{ error }}
                        </p>
                    </div>

                </div>
                <div class="flex justify-end items-end w-full">
                    <button class="w-full" :class="[isSubmitting ? button_disabled : button_active ]" :disabled="isSubmitting">
                        <svg v-if="isSubmitting" aria-hidden="true" role="status" class="inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                        </svg>
                        Agregar nueva Transaccion
                    </button>
                </div>
            </Form>
        </div>
    </div>
</div>
</template>

    
<style>
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}
</style>     

    
<script setup>
import {
    Modal
} from "flowbite";
import {
    Form,
    Field,
    useFieldArray,
    useField,
    useForm,
    ErrorMessage
} from "vee-validate"
import {
    ref,
    onMounted,
    defineExpose,
    defineEmits,
    defineProps,
    toRef
} from "vue"
import * as yup from "yup"
import { UseAuth } from "@/store/auth.module"
import TransactionService from "@/services/transactions/transactions.service"
import { TRANSACTION_TYPES } from "@/libs/constants"
import Datepicker from 'flowbite-datepicker/Datepicker';


const authStore = UseAuth()

const emit = defineEmits(["transaction-created"])
const props = defineProps(["sources", "types"])

const schema = yup.object().shape({
    ammount: yup.number()
        .typeError("El monto debe ser un numero valido mayor a 0")
        .positive("El monto debe ser un numero mayor que 0")
        .required("El monto es obligatorio"),
    typeId: yup.string().required("Debes seleccionar un tipo"),
    sourceId: yup.string().required("Debes seleccionar una fuente"),
    transactionDate: yup.date().required("La fecha de la transaccion es obligatoria"),
    ext_prop: yup.array().of(yup.object().shape({
        displayName: yup.string().required("El nombre es obligatorio"),
        key: yup.string().required("El identificador es obligatorio"),
        value: yup.string().required("El valor es obligatorio"),
    })).test({
        message: "Debes tener al menos una propiedad",
        test: arr => arr?.length != undefined || arr?.length >= 1
    })
})

const { handleSubmit, isSubmitting, errors } = useForm({
    initialValues: {
    ammount: 0,
    ext_prop: [
        {
            displayName: "Motivo",
            key: "MOTIVO",
            value: ""
        }
    ]
}, 
validationSchema: schema
})

const addTransactionModalId = ref(null)
let addTransactionModal;
const button_active = "focus:outline-none text-white bg-indigo-600 hover:bg-indigo-800 focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-900"
const button_disabled = "text-white bg-indigo-600 cursor-not-allowed font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-indigo-600"
const error = ref(false)
const messages = ref([])
const sources = toRef(props, "sources")
const types = toRef(props, "types")

const { remove, push, fields } = useFieldArray('ext_prop');
const { errorMessage, handleBlur, handleChange, meta, setValue } =useField ("transactionDate")

onMounted(() => {
    addTransactionModal = new Modal(addTransactionModalId.value)

    const datePickerEl = document.getElementById('transactionDate');
    new Datepicker(datePickerEl, {
        autohide: true,
        buttons: true,
        format: "yyyy/mm/dd"
    });
})

const handleAddTransaction = handleSubmit((tansaction, { resetForm }) =>{
    messages.value = []
    error.value = false
    return TransactionService.CreateTransaction(authStore.user.token, authStore.user.accountId, tansaction).then(
        (res) => {
            if(!res.success){
                error.value = true
                messages.value.push(...e.map(e => e.errors.message))
                return;
            }
            emit("transaction-created")
            resetForm()
            hideModal()
        }, (e) => {
            console.error(e)
        })
})

function showModal() {
    addTransactionModal.show()
}

function hideModal() {
    addTransactionModal.hide()
}


function getTypeName(id){
    let name
    switch(id){
        case TRANSACTION_TYPES.revenue:
            name = "Ganado"
        break;
        case TRANSACTION_TYPES.spend:
            name = "Gastado"
        break;
        default:
            name = "Undefined"
    }
    return name
}

defineExpose({
    showModal,
    hideModal
})
</script>
