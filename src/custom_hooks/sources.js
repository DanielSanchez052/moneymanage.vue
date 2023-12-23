import { useQuery } from "vue-query";
import SourcesService from "@/services/transactions/sources.service"


export default function UseSources(token, accountId, sourcesFilter) {

    return useQuery(["sources", { token, accountId, sourcesFilter }], async ({ queryKey }) => {
        try {
            const {  
                token,
                accountId,
                sourcesFilter
            } = queryKey[1];

            const data = await SourcesService.GetSources(token, accountId)

            if(data.success){
                if(sourcesFilter != 0){
                    return data.data.filter(d => d.isActive == (sourcesFilter == 1))
                    
                }else{
                    return data.data
                }
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
