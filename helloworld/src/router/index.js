import Vue from "vue";
import VueRouter from "vue-router";
import PaintJs from "@/components/PaintJs.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/cs/paint",
    name: "paintJs",
    component: PaintJs,
  },
];

const router = new VueRouter({
  mode: "history",
  // base: process.env.BASE_URL,
  routes,
});
// /**
//  * 라우팅 이전 권한 체크를 수행한다.
//  */
// router.beforeEach((to, from, next) => {
//   let token = sessionStorage.getItem('token')
//   let user_id = sessionStorage.getItem('user_id')

//   // 로그인 화면이 아니면 token 및 사용자ID가 유효한지 체크를 한다.
//   if (to.name != 'login') {
//     if (token == null || token == '' || user_id == null || user_id == '') {
//       window.location.href = '/'
//     }
//   } else {
//     // 로그인 화면에서는 token정보 및 user_id를 제거 한다.
//     sessionStorage.removeItem('token')
//     sessionStorage.removeItem('user_id')
//   }
//   next()
// })

export default router;
