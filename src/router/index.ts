import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'feed',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue')
  },
  {
    path: '/profile/:userNick',
    name: 'profile',
    component: () => import('../views/ProfileView.vue')
  },
  {
    path: '/profile/:userNick/games/',
    name: 'game',
    children: [
      {
        path: '/profile/:userNick/games/:game',
        name: 'game',
        component: () => import('../views/GameView.vue')
      },
    ]
  },
  {
    path: '/auth/discord',
    name: 'auth2',
    component: () => import('../views/oAuth.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView.vue')
  },
  {
    path: '/profile/edit/:userNick',
    name: 'profile-edit',
    component: () => import('../views/EditProfileView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
