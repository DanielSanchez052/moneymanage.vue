import axios from "axios"
import settings from "../services.config"

class AuthService{
  login(user){
      return axios.post(settings.identityApi.BaseUrl+settings.identityApi.login, 
      {
          email: user.email,
					password: user.password
      }).then(response => {
				if (response.data.token) {
					localStorage.setItem('user', JSON.stringify(response.data));
				}
				return response.data
			})
    }

    logout() {
      localStorage.removeItem('user');
    }
}

export default new AuthService()