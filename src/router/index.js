import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject)
    return originalPush.call(this, location, onResolve, onReject);
  return originalPush.call(this, location).catch(err => err);
};
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
  },
  {
    path: "/register",
    name: "Register",
    meta: {
      title: "注册账号"
    },
    component: () => import("@/views/profile/Register")
  },
  {
    path: "/login",
    name: "Login",
    meta: {
      title: "登录"
    },
    component: () => import("@/views/profile/Login")
  },
  {
    path: "/address",
    name: "Address",
    meta: {
      title: "地址管理"
    },
    component: () => import("@/views/address/Address")
  },
  {
    path: "/editaddress",
    name: "EditAddress",
    meta: {
      title: "编辑地址"
    },
    component: () => import("@/views/editAddress/EditAddress")
  },
  {
    path: "/creatOrder",
    name: "CreatOrder",
    meta: {
      title: "生成订单"
    },
    component: () => import("@/views/order/CreatOrder")
  },
  {
    path: "/order",
    name: "Order",
    meta: {
      title: "我的订单"
    },
    component: () => import("@/views/order/Order")
  },
  {
    path: "/orderdetail",
    name: "OrderDetail",
    meta: {
      title: "订单详情"
    },
    component: () => import("@/views/order/OrderDetail")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");
  if (to.path === "/cart" || to.path === "/profile") {
    if (!token) {
      Vue.prototype.$toast("请先登录");
      setTimeout(() => {
        next("/login");
      }, 1000);
    }
    next();
  }

  next();
  document.title = to.meta.title;
});
export default router;
