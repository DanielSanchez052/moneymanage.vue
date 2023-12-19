import { defineStore } from "pinia"
import AuthService from "../services/users/auth.service"
import AccountService from "@/services/transactions/account.service"

const user = JSON.parse(localStorage.getItem('user'));
const account = JSON.parse(localStorage.getItem('account'));
const initialState = user
    ? { status: { loggedIn: true }, user, account }
    : { status: { loggedIn: false }, user: null, account: null };

export const UseAuth = defineStore('auth', {
  state:() => {
    return initialState
  },
  actions: {
    async login(user) {
      try{
        const response = await AuthService.login(user)
        await this.loginSuccess(response)
        return Promise.resolve(response)
      }catch(error){
        const service_errors = []
        if (error.code == "ECONNREFUSED")
          service_errors.push("Ha ocurrido algo malo, intentalo de nuevo mas tarde")
        else if (error.response?.status === 400) {
          service_errors.push(...error.response.data.errors)
        }          
        this.loginFailure()
        return Promise.reject(service_errors);
      }
    },
    async refreshAccountStatus(){
      try {
        console.log("actualizando Estado...")
        const data = await AccountService.GetAccountById(this.user.token, this.user.accountId)
        console.log(data)
        this.account = data
        return data.data
    } catch (error) {
      console.log(error)
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
      return AuthService.register(user).then(
        user => {
          return Promise.resolve(user);
        },
        error => {
          const service_errors = []
          if (error.code == "ECONNREFUSED")
            service_errors.push("Ha ocurrido algo malo, intentalo de nuevo mas tarde")
          else if (error.response?.status === 400) {
            service_errors.push(...error.response.data.errors)
          }          
          return Promise.reject(service_errors);
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

