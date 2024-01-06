import { useQuery } from "vue-query";
import BudgetTypesService from "@/services/budget/budget.service"


export default function UseBudgetTypes(token) {

    return useQuery(["budgetTypes", { token }], async ({ queryKey }) => {
        try {
            const {  
                token
            } = queryKey[1];

            const data = await BudgetTypesService.GetBudgetTypes(token)
            if(data.success){
                return data.data
            }else{
                return undefined
            }
            
        } catch (error) {
            return undefined
        }
    }, {
        refetchOnWindowFocus: false,
    })
}
