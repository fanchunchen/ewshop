import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  { path: "/", redirect: "/home" },
  {
    path: "/home",
    name: "Home",
    meta: {
      title: "图书兄弟"
    },
    component: () => import("@/views/home/Home")
  },
  {
    path: "/category",
    name: "Category",
    meta: {
      title: "图书兄弟-图书分类"
    },
    component: () => import("@/views/category/Category")
  },
  {
    path: "/cart",
    name: "Cart",
    meta: {
      title: "图书兄弟-购物车"
    },
    component: () => import("@/views/cart/Cart")
  },
  {
    path: "/profile",
    name: "Profile",
    meta: {
      title: "图书兄弟-个人中心"
    },
    component: () => import("@/views/profile/Profile")
  },
  {
    path: "/detail",
    name: "Detail",
    meta: {
      title: "图书兄弟-图书详情"
    },
    component: () => import("@/views/detail/Detail")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});
router.beforeEach((to, from, next) => {
  next();
  document.title = to.meta.title;
});
export default router;
