import { defineStore } from "pinia"
import AuthService from "@/services/users/auth.service"
import AccountService from "@/services/transactions/account.service"

//TODO: review localstorage to persist authentication 

const user = undefined 
//JSON.parse(localStorage.getItem('user'));
const account = undefined
//JSON.parse(localStorage.getItem('account'));
const initialState = user
    ? { status: { loggedIn: true }, user, account }
    : { status: { loggedIn: false }, user: null, account: null };

export const UseAuth = defineStore('auth', {
  state:() => {
    return initialState
  },
  actions: {
    async login(user) {
      const service_errors = []
      try{
        const response = await AuthService.login(user)
        if(response.success){
          await this.loginSuccess(response.data)
          return Promise.resolve(response)
        }else if (!response.success && response.errors) {
          service_errors.push(...response.errors)
          this.loginFailure()
        }else{
          service_errors.push("Ha ocurrido algo malo, intentalo de nuevo mas tarde")
          this.loginFailure()
        }  

        return Promise.reject(service_errors);
      }catch(error){
        service_errors.push("Ha ocurrido algo malo, intentalo de nuevo mas tarde")
        this.loginFailure()
        return Promise.reject(service_errors);
      }
    },
    async refreshAccountStatus(){
      try {
        const response = await AccountService.GetAccountById(this.user?.token, this.user?.accountId)
        
        if(!response.success){
          this.account = null  
          return null
        }

        this.account = response.data
        return response.data
    } catch (error) {
      console.error(error)
      this.account = null  
      return null
    }
    },
    async logout() {
      AuthService.logout();
      this.status.loggedIn = false;
      this.user = null;
      this.account = null;
    },
    async register(user) {
      const service_errors = []
      return AuthService.register(user).then(
        user => {
          if(!response.success && response.errors){

            service_errors.push(...response.errors)
            return Promise.reject(service_errors);
          }else if(!response.success && !response.errors){
            
            service_errors.push("Ha ocurrido algo malo, intentalo de nuevo mas tarde")
            return Promise.reject(service_errors);
          }
          
          return Promise.resolve(user);
        }
      );
    },
    async loginSuccess(user) {
      this.status.loggedIn = true;
      this.user = user;
      await this.refreshAccountStatus()
    },
    loginFailure() {
      this.status.loggedIn = false;
      this.user = null;
      this.account = null
    },
  },
})

