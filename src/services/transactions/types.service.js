import httpClient from "@/services/http_client"
import settings from "@/services/services.config"
import util from "@/libs/utilities"

class TypesService{
    GetTypes(accessToken){
      return httpClient
        .get(settings.moneyManageApi.BaseUrl + settings.moneyManageApi.get_type, {
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
}

export default new TypesService()