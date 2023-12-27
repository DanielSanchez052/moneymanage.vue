import { createWebHistory, createRouter, createMemoryHistory } from "vue-router"
import Home from "@/views/Home.vue"
import Accounts from "@/views/accounts/Accounts.vue"
import ConfirmEmail from "@/views/accounts/confirm-email/ConfirmEmail.vue"
import Dashboard from "@/views/dashboard/Dashboard.vue" 
import Sources from "@/views/dashboard/Sources.vue" 
import Transactions from "@/views/dashboard/Transactions.vue" 

const routes = [
    {
        path: "/",
        name: "home",
        component: Home 
    },
    {
        path: "/accounts",
        name: "accounts",
        component: Accounts
    },
    {
      path: "/accounts/confirm-email",
      name: "confirm-email",
      component: ConfirmEmail
    },
    {
        path: "/dashboard",
        name: "dashboard",
        component: Dashboard,
        meta: { requiresAuth: true },
    },
    {
        path: "/dashboard/sources",
        name: "sources",
        component: Sources,
        meta: { requiresAuth: true },
    },
    {
      path: "/dashboard/transactions",
      name: "transactions",
      component: Transactions,
      meta: { requiresAuth: true },
  }
]

const routerHistory = createWebHistory(import.meta.env.BASE_URL) 

const router = createRouter({
  history: routerHistory,
  routes
})

router.beforeEach((to, from) => {
  const loggedIn = localStorage.getItem('user');

  if(to.meta.requiresAuth && !loggedIn){
    return {
      path: '/accounts',
      query: {
        redirectTo: to.fullPath
      }
    }
  }

  

});

  export default router

