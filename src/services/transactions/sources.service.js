import httpClient from "@/services/http_client"
import settings from "@/services/services.config"
import util from "@/libs/utilities"

class SourcesService{
    GetSources(accessToken, accountId){
      const endpoint = util.formatString(settings.moneyManageApi.get_source, [accountId])

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

    CreateSource(accessToken, accountId, source){
      return httpClient
        .post(settings.moneyManageApi.BaseUrl + settings.moneyManageApi.post_source, {
          accountId: accountId,
          name: source.name,
          description: source.description,
          isActive: source.active
        },{
          headers: { Authorization: "Bearer " + accessToken},
        })
        .then((res) => {
          return true
        })
    }

    UpdateSource(accessToken, source){
      return httpClient
        .put(settings.moneyManageApi.BaseUrl + settings.moneyManageApi.put_source, {
          sourceId: source.id,
          accountId: source.accountId,
          name: source.name,
          description: source.description,
          isActive: source.active
        },{
          headers: { Authorization: "Bearer " + accessToken},
        })
        .then((res) => {
          return true
        })
    }
}

export default new SourcesService()