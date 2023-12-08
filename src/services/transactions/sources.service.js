import axios from "axios"
import settings from "../services.config"
import util from "@/libs/utilities"

class SourcesService{
    GetSources(acessToken, accountId){
      const endpoint = util.formatString(settings.moneyManageApi.get_source, [accountId])

      return axios
        .get(settings.moneyManageApi.BaseUrl + endpoint, {
          headers: { Authorization: "Bearer " + acessToken },
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

export default new SourcesService()