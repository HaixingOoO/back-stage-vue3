import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/login/Login.vue"),
  },
  {
    path: "/",
    name: "Home",
    component: () => import("../views/home/Home.vue"),
  },
  {
    path: "/about",
    name: "About",
    component: () => import("../views/about/About.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;
