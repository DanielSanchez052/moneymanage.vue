import httpClient from "@/services/http_client"
import settings from "../services.config"

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
                return { success: true, data: res.data };
            })
            .catch((error) => {
                if (error instanceof AxiosError) {
                    let message = error.response?.data;
                    return { success: false, error: message, data: undefined };
                }
                return { success: false, error, data: undefined };
            });
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
            return { success: true, data: res.data, error: undefined }
        } catch (error) {   
            return { success: false, data: res, error: error }
        }
      }

}

export default new TransactionService()