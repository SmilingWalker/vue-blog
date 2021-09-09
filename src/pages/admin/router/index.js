import { createRouter, createWebHashHistory } from 'vue-router'

import store from '@/pages/admin/store/index'

const Home = () => import('../views/Home.vue')
const Index = () => import('../components/Index.vue')
const Login = () => import('../views/Login.vue')
const ArticlesAdd = () => import('../components/ArticlesAdd.vue')
const ArticlesList = () => import('../components/ArticlesList.vue')
const UsersList = () => import('../components/UsersList.vue')
const SentenceList = () => import('../components/SentenceList.vue')
const RouteList = () => import('../components/RouteList.vue')
const MessageList = () => import('../components/MessageList.vue')
const UserInfo = () => import('../components/UserInfo.vue')
const MusicList = () => import('../components/MusicList.vue')
const HomeList = () => import('../components/HomeList.vue')
const SysMessList = () => import('../components/SysMessList.vue')
const routes = [
  {
    path: '/',
    redirect: {
      name: 'Login',
    },
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    children: [
      {
        path: 'index',
        component: Index,
      },
      {
        // 当 /user/:id/profile 匹配成功，
        // UserProfile 会被渲染在 User 的 <router-view> 中
        path: 'articles/add',
        component: ArticlesAdd,
      },
      {
        path: 'articles/update/:id',
        component: ArticlesAdd,
      },
      {
        path: 'articles/list',
        component: ArticlesList,
      },
      {
        path: 'user/list',
        component: UsersList,
      },
      {
        path: 'sentence/list',
        component: SentenceList,
      },
      {
        path: 'route/list',
        component: RouteList,
      },
      {
        path: 'message/list',
        component: MessageList,
      },
      {
        path: 'user/info',
        component: UserInfo,
      },
      {
        path: 'music/list',
        component: MusicList,
      },
      {
        path: 'show/list',
        component: HomeList,
      },
      {
        path: 'sysmess/list',
        component: SysMessList,
      },
    ],
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
]

console.log(store)
const router = createRouter({
  history: createWebHashHistory(),
  scrollBehavior() {
    // return desired position
    return { top: 0 }
  },
  routes,
})

// router.beforeEach((to, from, next) => {
//   //前端拦截，查询用户是否登录，以及token是否依然有效
//   //验证当前用户是否登录，验证当前token是否失效
//   console.log(to)
//   if (to.path !== '/login' && !store.state.user.validate) {
//     console.log(store.state.user)
//     next({ path: '/login' })
//   } else {
//     next()
//   }
// })

export default router
