// 导入router所需的方法
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { useUserStore } from "@/stores/user";

// 导入路由页面的配置
// import route s from '@/router'


const routes = [
  {
    path: "/",
    title: "首页",
    component: () => import("@/pages/index.vue"),
    children: [
      { path: "home", component: () => import("@/pages/Home/index.vue") },
      { path: "", component: () => import("@/pages/Home/index.vue") },
      {
        path: "menu",
        component: () => import("@/pages/Menu/index.vue"),
        children: [
          {
            path: ":id",
            component: () => import("@/pages/Menu/components/content.vue"),
          },
          {
            path: "",
            component: () => import("@/pages/Menu/components/content.vue"),
          },
        ],
      },
      {
        path: "cart",
        component: () => import("@/pages/Cart.vue"),
      },
      { path: "login", component: () => import("@/pages/Login.vue") },
      {
        path: "/account",
        component: () => import("@/pages/Account/index.vue"),
        children: [
          {
            path: "menumanage",
            component: () => import("@/pages/admin/MenuManage.vue"),
          },
          {
            path: "profile",
            component: () => import("@/pages/Account/Profile.vue"),
          },
          {
            path: "like",
            component: () => import("@/pages/Account/Like.vue"),
          },
          {
            path: "goodsmanage",
            component: () => import("@/pages/admin/GoodsManage.vue"),
          },
          {
            path: "",
            component: () => import("@/pages/Account/Panel.vue"),
          },
          {
            path: "order",
            component: () => import("@/pages/Account/Order.vue"),
          },
          {
            path: "address",
            component: () => import("@/pages/Account/Address.vue"),
          },
        ],
      },
    ],
  },
  {
    path: "/detail/:id",
    component: () => import("@/pages/components/Detail.vue"),
  },
  {
    path: "/search",
    component: () => import("@/pages/Search/index.vue"),
  },
];

// 路由参数配置
const router = createRouter({
  // 使用hash(createWebHashHistory)模式，(createWebHistory是HTML5历史模式，支持SEO)
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const userStore = useUserStore();

  if (to.path === "/login" && userStore.token) {
    next("/" + userStore.user_info.roleCode);
    return;
  }

  if (to.path === "/account") {
    if (userStore.token) {
      next();
      return;
    } else {
      next("/login");
      return;
    }
  }

  next();
});

// 全局后置钩子，这里可以加入改变页面标题等操作
router.afterEach((to, from) => {
  const _title: any = to.meta.title;
  if (_title) {
    window.document.title = _title;
  }
});

// 导出默认值
export default router;
