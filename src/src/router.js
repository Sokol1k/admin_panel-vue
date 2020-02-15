import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      name: "Register",
      path: "/register",
      component: () => import("@/views/pages/Register"),
      beforeEnter: (to, from, next) => {
        if (localStorage._token) next("/");
        else next();
      }
    },
    {
      name: "Login",
      path: "/login",
      component: () => import("@/views/pages/Login"),
      beforeEnter: (to, from, next) => {
        if (localStorage._token) next("/");
        else next();
      }
    },
    {
      path: "/",
      component: () => import("@/views/dashboard/Index"),
      beforeEnter: (to, from, next) => {
        if (!localStorage._token) next("/login");
        else next();
      },
      children: [
        {
          name: "Dashboard",
          path: "",
          component: () => import("@/views/dashboard/Dashboard")
        },
        {
          name: "Businesses",
          path: "businesses",
          component: () => import("@/views/dashboard/Businesses")
        },
        {
          name: "Business",
          path: "businesses/show/:business",
          component: () => import("@/views/dashboard/businesses/Business")
        },
        {
          name: "Add Business",
          path: "businesses/add",
          component: () => import("@/views/dashboard/businesses/AddBusiness")
        },
        {
          name: "Update Business",
          path: "businesses/update/:business",
          component: () => import("@/views/dashboard/businesses/UpdateBusiness")
        },
        {
          name: "Users",
          path: "users",
          component: () => import("@/views/dashboard/Users"),
          beforeEnter: (to, from, next) => {
            if (localStorage.user_role != "admin") next("/404");
            else next();
          }
        },
        {
          name: "Compare",
          path: "compare",
          component: () => import("@/views/dashboard/Compare")
        }
      ]
    },
    {
      name: "Not found",
      path: "/404",
      component: () => import("@/views/errors/NotFound")
    },
    {
      path: '*',
      beforeEnter: (to, from, next) => {
        if (localStorage._token) next("/404");
        else next('/login');
      }
    }
  ]
});
