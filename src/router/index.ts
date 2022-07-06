import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { useStore } from "../store/useStore";
import { getSession } from "../utils";
import Layout from "@/components/Layout.vue";
import { HomeFilled, Location } from "@element-plus/icons-vue";
import { markRaw } from "vue";

const routes: RouteRecordRaw[] = [
  {
    path: "/login",
    name: "Login",
    meta: {
      hidden: true,
    },
    component: () => import("../views/login/Login.vue"),
  },
  {
    path: "/",
    name: "Home",
    component: Layout,
    meta: {
      name: "首页",
      hidden: false,
      icon: markRaw(HomeFilled),
    },
    children: [
      {
        path: "/",
        name: "Home",
        meta: {
          name: "学生列表",
        },
        component: () => import("../views/students/Home.vue"),
      },
      {
        path: "/infolist",
        name: "InfoList",
        meta: {
          name: "信息列表",
        },
        component: () => import("../views/students/InfoList.vue"),
      },
      {
        path: "/worklist",
        name: "WorkList",
        meta: {
          name: "作业列表",
        },
        component: () => import("../views/students/WorkList.vue"),
      },
    ],
  },
  {
    path: "/about",
    name: "About",
    component: Layout,
    meta: {
      name: "其他",
      hidden: false,
      icon: markRaw(Location),
    },
    children: [
      {
        path: "/about",
        name: "About",
        meta: {
          name: "数据分析",
        },
        component: () => import("../views/about/About.vue"),
      },
    ],
  },
  {
    path: "/:catchAll(.*)",
    name: "NotFund",
    meta: {
      hidden: true,
    },
    component: () => import("../views/NotFund.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, form, next) => {
  const store = useStore();
  const isToken = getSession("token");
  if (to.name === "Login") {
    if (store.isLogin && isToken) {
      next("/");
    } else {
      next();
    }
  } else {
    if (!store.isLogin) {
      next({ name: "Login" });
    } else {
      if (!isToken) {
        next({ name: "Login" });
      } else {
        next();
      }
    }
  }
});

export default router;
