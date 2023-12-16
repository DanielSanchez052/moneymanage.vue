import { useQuery } from "vue-query";
import AccountService from "@/services/transactions/account.service"


export default function UseAccountStatus(token, accountId) {

    return useQuery(["accountStatus", { token, accountId,  }], async ({ queryKey }) => {
        try {
            const {  
                token,
                accountId
            } = queryKey[1];

            const data = await AccountService.GetAccountById(token, accountId)

            return data.data
        } catch (error) {
            return undefined
        }
    }, {
        refetchOnWindowFocus: true,
    })
}
