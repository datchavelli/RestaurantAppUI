import Vue from "vue";
import Router from "vue-router";
import { store } from "./stores/store";

// import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import OrdersPage from "./pages/OrdersPage";
import AdminPage from "./pages/AdminPage";
import TablePage from "./pages/TablePage";
import Stats from "./pages/ProfileStats";
import ProfilePage from "./pages/ProfilePage";
import Error404 from "./pages/404Page";

Vue.use(Router);

const router = new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "Tables",
      component: HomePage,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/login",
      name: "Login",
      component: LoginPage,
    },
    {
      path: "/logout",
      name: "Logout",
      component: {
        beforeRouteEnter(to, from, next) {
          localStorage.removeItem("user");
          localStorage.removeItem("token");
          // window.location.reload();
          store.commit("UNAUTHORIZE");
          next("/login");
        },
      },
    },
    {
      path: "/admin",
      name: "Admin",
      component: AdminPage,
      meta: {
        requiresAuth: true,
      },
      children: [
        {
          path: "category",
          component: Stats,
        },
        {
          path: "table",
          component: Stats,
        },
        {
          path: "menuitem",
          component: Stats,
        },
      ],
    },
    {
      path: "/orders/:table?/:order?",
      name: "Orders",
      component: OrdersPage,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/table/:id?",
      name: "Table",
      component: TablePage,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/profile/:name?",
      name: "profile",
      component: ProfilePage,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "*",
      name: "404",
      component: Error404,
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    console.log(store.getters["isLoggedIn"]);
    if (!store.getters["isLoggedIn"]) {
      next({ name: "Login" });
    } else {
      next(); // go to wherever I'm going
    }
  } else {
    next(); // does not require auth, make sure to always call next()!
  }
});

export default router;
