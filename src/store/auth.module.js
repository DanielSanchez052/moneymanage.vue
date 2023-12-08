import { defineStore } from "pinia"
import AuthService from "../services/users/auth.service"

const user = JSON.parse(localStorage.getItem('user'));
const initialState = user
    ? { status: { loggedIn: true }, user }
    : { status: { loggedIn: false }, user: null };

export const UseAuth = defineStore('auth', {
  state:() => {
    return initialState
  },
  actions: {
    async login(user) {
      return AuthService.login(user).then(
        user => {
          this.loginSuccess(user)
          return Promise.resolve(user);
        },
        error => {
          const service_errors = []
          if (error.code == "ECONNREFUSED")
            service_errors.push("Ha ocurrido algo malo, intentalo de nuevo mas tarde")
          else if (error.response?.status === 400) {
            service_errors.push(...error.response.data.errors)
          }          
          this.loginFailure()
          return Promise.reject(service_errors);
        }
      );
    },
    async logout() {
      AuthService.logout();
      this.status.loggedIn = false;
      this.user = null;
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
    loginSuccess(user) {
      this.status.loggedIn = true;
      this.user = user;
    },
    loginFailure() {
      this.status.loggedIn = false;
      this.user = null;
    },
  },
})

