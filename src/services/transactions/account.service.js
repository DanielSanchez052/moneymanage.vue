import httpClient from "@/services/http_client"
import settings from "../services.config"
import util from "@/libs/utilities"

class AccountService{
    GetAccountById(accessToken, accountId){
        const endpoint = `${settings.moneyManageApi.account}/${accountId}`

        return httpClient
        .get(settings.moneyManageApi.BaseUrl + endpoint, {
          headers: { 
            Authorization: "Bearer " + accessToken
          },
          responseType: "json"
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
}

export default new AccountService()
