import { createWebHistory, createRouter, createMemoryHistory } from "vue-router"

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

