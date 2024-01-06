import httpClient from "@/services/http_client"
import settings from "@/services/services.config"
import util from "@/libs/utilities"


class BudgetService{
    async getBudgets(accessToken, filter){
        console.log(filter)
        return httpClient.get(settings.moneyManageApi.BaseUrl + settings.moneyManageApi.budget, {
            headers: { 
                Authorization: "Bearer " + accessToken
            },
            responseType: "json",
            params: {
                AccountId: filter.accountId,
                TargetSourceId: filter.targetSourceId,
                TargetTypeId: filter.targetTypeId,
                PageIndex: filter.pageIndex,
                PageSize: filter.pageSize,
            },
        }).then((res) => {
            return res;
        })
    }
}

export default new BudgetService()