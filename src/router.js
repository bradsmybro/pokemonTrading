import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Facts from "./views/Facts.vue";
import Trading from "./views/Trading.vue";
import Profile from "./views/Profile.vue";
import Create from "./views/Create.vue";
import Login from "./views/Login.vue";
import Register from "./views/Register.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home
    },
    {
      path: "/facts",
      name: "InterestingFacts",
      component: Facts
    },
    {
      path: "/profile/:id",
      name: "Profile",
      component: Profile
    },
    {
      path: "/profile",
      name: "userProfile",
      component: Profile
    },
    {
      path: "/trading",
      name: "Trading",
      component: Trading
    },
    {
      path: "/create",
      name: "Create",
      component: Create
    },
    {
      path: "/login",
      name: "Login",
      component: Login
    },
    {
      path: "/register",
      name: "Register",
      component: Register
    },
    {
      path: "/about",
      name: "About",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    }
  ]
});
