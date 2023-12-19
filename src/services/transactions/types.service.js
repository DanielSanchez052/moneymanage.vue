import httpClient from "@/services/http_client"
import settings from "../services.config"
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

export default new TypesService()