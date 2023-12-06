import AuthService from "../services/users/auth.service"

const user = JSON.parse(localStorage.getItem('user'));
const initialState = user
    ? { status: { loggedIn: true }, user }
    : { status: { loggedIn: false }, user: null };

export const auth = {
    namespaced: true,
    state: initialState,
    actions: {
      login({ commit }, user) {
        return AuthService.login(user).then(
          user => {
            commit('loginSuccess', user);
            return Promise.resolve(user);
          },
          error => {
            const service_errors = []
            if (error.code == "ECONNREFUSED")
              service_errors.push("Ha ocurrido algo malo, intentalo de nuevo mas tarde")
            else if (error.response?.status === 400) {
              service_errors.push(...error.response.data.errors)
            }
            
            commit('loginFailure');
            return Promise.reject(service_errors);
          }
        );
      },
      logout({ commit }) {
        AuthService.logout();
        commit('logout');
      },
    },
    mutations: {
			loginSuccess(state, user) {
				state.status.loggedIn = true;
				state.user = user;
			},
			loginFailure(state) {
				state.status.loggedIn = false;
				state.user = null;
			},
      logout(state) {
        state.status.loggedIn = false;
        state.user = null;
      },
    }
}

