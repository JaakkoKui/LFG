import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProfileView from '../views/ProfileView.vue'

const routes: Array<RouteRecordRaw> = [
	{
		path: '/',
		name: 'Feed',
		component: HomeView,
	},
	{
		path: '/about',
		name: 'About',
		component: () => import('../views/AboutView.vue'),
	},
	{
		path: '/profile/:profileId',
		name: 'Profile',
		component: ProfileView,
	},
	{
		path: '/profile/:profileId/edit',
		name: 'profile-edit',
		component: () => import('../views/EditProfileView.vue'),
	},
	{
		path: '/profile/:profileId/game/:gameId',
		name: 'game-view',
		component: () => import('../views/GameView.vue'),
	},
]

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes,
})

export default router
