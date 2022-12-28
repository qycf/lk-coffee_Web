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
            component: () => import("@/components/GoodsList/index.vue"),
          },
          {
            path: "",
            component: () => import("@/components/GoodsList/index.vue"),
          },
        ],
      },
      {
        path: "cart",
        component: () => import("@/pages/Cart/index.vue"),
      },
      { path: "login", component: () => import("@/pages/Login/index.vue") },
      {
        path: "account",
        component: () => import("@/pages/Account/index.vue"),
      },
    ],
  },
  {
    path: "/detail/:id",
    component: () => import("@/pages/Detail/index.vue"),
  },
  {
    path: "/search",
    component: () => import("@/pages/Search/index.vue"),
  },
  {
    path: "/account/manage/menu",
    component: () => import("@/pages/Account/Manage/Menu.vue"),
  },
  {
    path: "/account/manage/goods",
    component: () => import("@/pages/Account/Manage/Goods.vue"),
  },
  {
    path: "/account/manage/like",
    component: () => import("@/pages/Account/Manage/Like.vue"),
  },
  {
    path: "/account/manage/order",
    component: () => import("@/pages/Account/Manage/Order.vue"),

  },
  {
    path: "/account/manage/address",
    component: () => import("@/pages/Account/Manage/Address.vue"),
  },
  {
    path: "/account/profile",
    component: () => import("@/pages/Account/Profile/index.vue"),
    children: [
      {
        path: "edit",
        component: () => import("@/components/ProfileEdit/index.vue"),
      },
      {
        path: "",
        component: () => import("@/pages/Account/Profile/Profile.vue"),
      }
    ]
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
