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
		//Load Homeview when going to empty '/'
	},
	{
		path: '/about',
		name: 'About',
		component: AboutView,
		//Load AboutView on /about
	},
	{
		path: '/profile/:profileId',
		name: 'Profile',
		component: ProfileView,
		//Load ProfileView on /profile/(profileId) and pass the profile id as a route parameter
	},
	{
		path: '/profile/:profileId/game/:gameId',
		name: 'game-view',
		component: GameView,
		//Load Game view based on profile and game id
	},
]

//History mode aka. you can route back
const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes,
})

export default router
