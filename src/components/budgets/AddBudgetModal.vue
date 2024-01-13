<template>
    <div ref="addBudgetModalId" tabindex="-1" aria-hidden="true" class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-modal md:h-full">
        <div class="relative p-4 w-full max-w-4xl h-full md:h-auto">
            <div class="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
                <div class="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                    <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                        Agregar Presupuesto
                    </h3>
                    <button type="button" @click="hideModal" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white">
                        <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                        </svg>
                        <span class="sr-only">Cerrar</span>
                    </button>
                </div>
                <form @submit="handleAddBudget" novalidate>
                    <div class="">
                        <div class="mb-4">
                            <label for="ammount" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Monto</label>
                            <Field type="number" name="ammount" id="ammount" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Escribe el monto de la transacción" />
                            <p name="ammount" class="mt-2 text-sm text-red-600 dark:text-red-500">{{ errors.ammount }}</p>
                        </div>
                        <div class="md:grid md:grid-cols-2 md:gap-2 mb-4">
                            <div class="w-full">
                                <label for="targetSourceId" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Fuente objetivo</label>
                                <Field id="targetSourceId" as="select" name="targetSourceId" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                    <option selected value="" disabled>seleccione una fuente</option>
                                    <option :value="source.id" v-for="source in sources">{{ source.name }}</option>
                                </Field>
                                <p name="targetSourceId" class="text-center mt-2 text-sm text-red-600 dark:text-red-500">{{ errors.targetSourceId }}</p>
                            </div>
                            <div class="w-full">
                                <label for="targetTypeId" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tipo objetivo </label>
                                <Field id="targetTypeId" as="select" name="targetTypeId" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                    <option selected value="" disabled>seleccione un tipo</option>
                                    <option :value="item.id" v-for="item in types">{{ getTypeName(item.id) }}</option>
                                </Field>
                                <p name="targetTypeId" class="mt-2 text-sm text-red-600 dark:text-red-500">{{ errors.targetTypeId }}</p>
                            </div>
                        </div>
                        <div>
                            <div class="w-full">
                                <label for="typeId" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tipo de presupuesto</label>
                                <Field id="typeId" as="select" name="typeId" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                    <option selected value="" disabled>seleccione un tipo de presupuesto</option>
                                    <option :value="bType.id" v-for="bType in budgetType">{{ getBudgetTypeName(bType.id) }}</option>
                                </Field>
                                <p name="typeId" class="text-center mt-2 text-sm text-red-600 dark:text-red-500">{{ errors.typeId }}</p>
                            </div>
                        </div>
                        <div class="mb-4">
                            <label for="startDate" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Fecha de Inicio </label>
                            <div class="relative">
                                <div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                                    <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                                    </svg>
                                </div>
                                <input 
                                    autocomplete="off"
                                    type="text" 
                                    name="startDate" 
                                    id="startDate" 
                                    class=" ps-10 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" 
                                    placeholder="Escribe la fecha de la inicio" 
                                    @changeDate="(event) => { setValue(new Date(event.detail.date).toISOString())}"
                                    @change="handleChange"
                                    @blur="handleBlur"
                                />
                            </div>
                            <p name="startDate" class="mt-2 text-sm text-red-600 dark:text-red-500">{{ errors.startDate }}</p>
                        </div>
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
        useField,
        useForm,
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
    import BudgetService from "@/services/budget/budget.service"
    import { TRANSACTION_TYPES, BUDGET_TYPES } from "@/libs/constants"
    import Datepicker from 'flowbite-datepicker/Datepicker';
    
    const authStore = UseAuth()
    
    const emit = defineEmits(["budget-created"])
    const props = defineProps(["sources", "types", "budgetType"])
    
    const schema = yup.object().shape({
        ammount: yup.number()
            .typeError("El monto debe ser un numero valido mayor a 0")
            .positive("El monto debe ser un numero mayor que 0")
            .required("El monto es obligatorio"),
        targetTypeId: yup.string().required("Debes seleccionar un tipo objetivo"),
        targetSourceId: yup.string().required("Debes seleccionar una fuente objetivo"),
        typeId: yup.string().required("Debes seleccionar un tipo de presupuesto"),
        startDate: yup.date().required("La fecha de inicio es obligatoria"),
    })
    
    const { handleSubmit, isSubmitting, errors } = useForm({
        initialValues: {
        ammount: 0,
    }, 
    validationSchema: schema
    })
    
    const addBudgetModalId = ref(null)
    let addBudgetModal;
    const button_active = "focus:outline-none text-white bg-indigo-600 hover:bg-indigo-800 focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-900"
    const button_disabled = "text-white bg-indigo-600 cursor-not-allowed font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-indigo-600"
    const error = ref(false)
    const messages = ref([])
    const sources = toRef(props, "sources")
    const types = toRef(props, "types")
    const budgetType = toRef(props, "budgetType")
    
    const { errorMessage, handleBlur, handleChange, meta, setValue } =useField ("startDate")
    
    onMounted(() => {
        addBudgetModal = new Modal(addBudgetModalId.value)
    
        const datePickerEl = document.getElementById('startDate');
        new Datepicker(datePickerEl, {
            autohide: true,
            buttons: true,
            format: "yyyy/mm/dd"
        });
    })
    
    const handleAddBudget = handleSubmit((budget, { resetForm }) =>{
        messages.value = []
        error.value = false
        return BudgetService.CreateBudget(authStore.user.token, authStore.user.accountId, budget).then(
            (res) => {
                if(!res.success){
                    error.value = true
                    messages.value.push(...e.map(e => e.errors.message))
                    return;
                }
                emit("budget-created")
                resetForm()
                hideModal()
            }, (e) => {
                console.error(e)
            })
    })
    
    function showModal() {
        addBudgetModal.show()
    }
    
    function hideModal() {
        addBudgetModal.hide()
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
    
    function getBudgetTypeName(id){
        let name
        switch(id){
            case BUDGET_TYPES.daily:
                name = "Diario"
            break;
            case BUDGET_TYPES.monthly:
                name = "Mensual"
            break;
            case BUDGET_TYPES.yearly:
                name = "Anual"
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

