import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Login from '@/components/Login'
import SignUp from '@/components/SignUp'
import firebase from 'firebase'

Vue.use(Router)

let router = new Router({
  // History Mode
  mode: 'history',
  routes: [
    // ログイン画面
    {
      path: '/pwaTodoApp',
      name: 'Login',
      component: Login
    },
    // ユーザ登録
    {
      path: '/sign-up',
      name: 'SignUp',
      component: SignUp
    },
    // Todo画面
    {
      path: '/hello',
      name: 'Hello',
      component: Hello,
      meta: {
        requiresAuth: true
      }
    },
    // ログイン画面へリダイレクト
    {
      path: '*',
      redirect: '/login'
    },
    // ルートもログイン画面へリダイレクト
    {
      path: '/',
      redirect: '/login'
    },
  ]
})

// router.beforeEach((to, from, next) => {
//   let currentUser = firebase.auth().currentUser;
//   let requiresAuth = to.matched.some(record => record.meta.requiresAuth);

//   if(requiresAuth && !currentUser) next('login')
//   else if(requiresAuth && currentUser) next('hello')
//   else next()
// })
export default router