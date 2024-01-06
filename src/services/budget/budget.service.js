import httpClient from "@/services/http_client"
import settings from "@/services/services.config"
import util from "@/libs/utilities"


class BudgetService{
    async getBudgets(accessToken, filter){
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

    async GetBudgetTypes(accessToken){
        return httpClient
            .get(settings.moneyManageApi.BaseUrl + settings.moneyManageApi.budget_types, {
                headers: { 
                    Authorization: "Bearer " + accessToken
                },
                responseType: "json"
            })
                .then((res) => {
                    return res
                })
                .catch((error) => {
                    console.error(error)
                })
    }

    async CreateBudget(accessToken, accountId, budget){
        try {
            const res = await httpClient.post(settings.moneyManageApi.BaseUrl + settings.moneyManageApi.budget, {
                accountId: accountId,
                targetAmmount: budget.ammount,
                targetType: budget.targetTypeId,
                sourceId: budget.targetSourceId,
                budgetType: budget.typeId,
                startDate: budget.startDate,
                },{
                    headers: { Authorization: "Bearer " + accessToken},
                })
            return res
        } catch (error) {   
            console.error(error)
        }
    }

}

export default new BudgetService()