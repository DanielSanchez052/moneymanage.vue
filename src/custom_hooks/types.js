import { useQuery } from "vue-query";
import TypesService from "@/services/transactions/types.service"

export default function UseTypes(token) {

    return useQuery(["types", { token }], async ({ queryKey }) => {
        try {
            const {  
                token,
                accountId,
                sourcesFilter
            } = queryKey[1];

            const data = await TypesService.GetTypes(token)
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
