import { createRouter, createWebHistory } from "vue-router";
import Auth from "../views/Auth.vue";
import Home from "../views/Home.vue";
import Account from "../views/Account.vue"
import SignIn from "../components/SignIn.vue";
import SignUp from "../components/SignUp.vue";
import Timer from "../components/Timer.vue";

const routes = [
  {
    path: "/auth",
    component: Auth,
    children: [
      { path: "signup", component: SignUp },
      { path: "login", component: SignIn },
    ],
  },
  { path: "/", component: Home },
  { path: "/account", component: Account },
  { path: "/timer", component: Timer}
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;  
