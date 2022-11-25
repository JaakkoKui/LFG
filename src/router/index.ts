import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProfileView from '../views/ProfileView.vue'
import AboutView from '../views/AboutView.vue'
import GameView from '../views/GameView.vue'

const routes: Array<RouteRecordRaw> = [
	{
		path: '/',
		name: 'Feed',
		component: HomeView,
	},
	{
		path: '/about',
		name: 'About',
		component: AboutView,
	},
	{
		path: '/profile/:profileId',
		name: 'Profile',
		component: ProfileView,
	},
	{
		path: '/profile/:profileId/game/:gameId',
		name: 'game-view',
		component: GameView,
	},
]

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes,
})

export default router
