import httpClient from "@/services/http_client"
import settings from "@/services/services.config"

class TransactionService{
    async GetTransactions(accessToken, filter){
        return httpClient.get(settings.moneyManageApi.BaseUrl + settings.moneyManageApi.transaction,
            {
                headers: { 
                    Authorization: "Bearer " + accessToken
                },
                responseType: "json",
                params: {
                    TypeId: filter.typeId,
                    SourceId: filter.sourceId,
                    AccountId: filter.accountId,
                    UserId: filter.userId,
                    TransactionDateFrom: filter.dateFrom,
                    TransactionDateTo: filter.dateTo,
                    PageIndex: filter.pageIndex,
                    PageSize: filter.pageSize,
                },
            }) 
            .then((res) => {
                return res;
            })
    }

    async CreateTransaction(accessToken, accountId, transaction){
        try {
            const res = await httpClient.post(settings.moneyManageApi.BaseUrl + settings.moneyManageApi.transaction, {
                accountId: accountId,
                ammount: transaction.ammount,
                transactionDate: transaction.transactionDate,
                type: transaction.typeId,
                sourceId: transaction.sourceId,
                transactionExtendedProperties: transaction.ext_prop,
                },{
                    headers: { Authorization: "Bearer " + accessToken},
                })
            return res
        } catch (error) {   
            console.error(error)
        }
    }
    async UpdateTransaction(accessToken, transaction){
        try {
            const res = await httpClient.put(settings.moneyManageApi.BaseUrl + settings.moneyManageApi.transaction_ammount, {
                transactionId: transaction.id,
                ammount: transaction.ammount,
                },{
                    headers: { Authorization: "Bearer " + accessToken},
                })
            return res
        } catch (error) {   
            console.error(error)
        }
    }
}

export default new TransactionService()