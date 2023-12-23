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
          return res;
        })
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
          return res
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
          return res
        })
    }
}

export default new SourcesService()