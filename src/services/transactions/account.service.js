import httpClient from "@/services/http_client"
import settings from "@/services/services.config"

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
          if(res.success){
            localStorage.setItem('account', JSON.stringify(res.data));
          }

          return res;
        })
    }
}

export default new AccountService()
