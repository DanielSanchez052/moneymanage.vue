import { createWebHistory, createRouter as _createRouter, createMemoryHistory } from "vue-router"

const routes = [
    {
        path: "/",
        name: "home",
        component: () => import("@/views/Home.vue") 
    },
    {
        path: "/accounts",
        name: "accounts",
        component: () => import("@/views/accounts/Accounts.vue")
    },
    {
      path: "/accounts/confirm-email",
      name: "confirm-email",
      component: () => import("@/views/accounts/confirm-email/ConfirmEmail.vue") 
    },
    {
      path: "/accounts/confirm-email/confirmed",
      name: "confirmed-email",
      component: () => import("@/views/accounts/confirm-email/ConfirmedEmail.vue") 
    },
    {
      path: "/accounts/confirm-email/not-confirmed",
      name: "not-confirm-email",
      component: () => import("@/views/accounts/confirm-email/NotConfirmedEmail.vue") 
    },
    {
      path: "/accounts/reset-password",
      name: "reset-password",
      component: () => import("@/views/accounts/reset-password/ResetPasswordRequest.vue") 
    },
    {
      path: "/accounts/reset-password/change-password",
      name: "change-password",
      component: () => import("@/views/accounts/reset-password/change-password/ChangePassword.vue") 
    },
    {
        path: "/dashboard",
        name: "dashboard",
        component: () => import("@/views/dashboard/Dashboard.vue" ),
        meta: { requiresAuth: true },
    },
    {
        path: "/dashboard/sources",
        name: "sources",
        component: () => import("@/views/dashboard/Sources.vue"),
        meta: { requiresAuth: true },
    },
    {
      path: "/dashboard/transactions",
      name: "transactions",
      component: () => import("@/views/dashboard/Transactions.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/dashboard/budgets",
      name: "budgets",
      component: () => import("@/views/dashboard/Budget.vue"),
      meta: { requiresAuth: true },
    }
]

export const createRouter = () =>{
  const router = _createRouter({
    history: import.meta.env.SSR
      ? createMemoryHistory(import.meta.env.BASE_URL)
      : createWebHistory(import.meta.env.BASE_URL),
    routes,
  });


  router.beforeEach((to, from) => {
    const loggedIn = typeof localStorage !== 'undefined' ? localStorage.getItem('user') : undefined 

    if(to.meta.requiresAuth && !loggedIn){
      return {
        path: '/accounts',
        query: {
          redirectTo: to.fullPath
        }
      }
    }
  
    
  
  });

  return router

}



