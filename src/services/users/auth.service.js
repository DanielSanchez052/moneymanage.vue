import axios from "axios"
import settings from "@/services/services.config"

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
			}, error => {
        console.log(error)
      })
    }

    logout() {
      localStorage.removeItem('user');
      localStorage.removeItem('account');
    }

    register(user){
      return axios.post(settings.identityApi.BaseUrl+settings.identityApi.register, 
      {
          userName: user.username,
          email: user.email,
          phoneNumber: user.phone,
					password: user.password,
      }).then(response => {
				return true
			})
    }
}

export default new AuthService()