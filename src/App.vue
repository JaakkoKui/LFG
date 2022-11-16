<template>
	<nav class="h-[65px] flex relative font-semibold text-text-default bg-background-lighter drop-shadow-lg z-20">
		<div class="flex h-full mx-auto w-fit justify-around">
			<RouterLink
				v-for="navItem in navLinks"
				:key="navItem.navName"
				:to="navItem.to"
				class="px-4 h-full hover:text-text-white"
			>
				<button class="h-full">{{ navItem.navName }}</button>
			</RouterLink>
		</div>

		<div class="absolute right-0 h-[65px] flex">
			<a v-if="!profile" href="https://localhost:5001/Auth/Login">
				<button class="h-full px-4 h-full hover:text-text-white">Login</button>
			</a>

			<RouterLink
				v-if="profile"
				:to="'/profile/' + profile.profileId"
				class="flex pr-4 rounded-full h-fit my-auto bg-background-default hover:scale-105 transition duration-100 ease-out mr-4"
			>
				<AvatarHelper class="h-[40px] my-auto" :avatar="profile.avatar" :profile-id="profile.profileId" />
				<span class="text-regular my-auto ml-2">{{ profile.nickname }}</span>
			</RouterLink>

			<a href="https://localhost:5001/Auth/Logout">
				<button v-if="profile" class="px-4 bg-red-600 h-full text-text-white hover:bg-red-400">Logout</button>
			</a>
		</div>
	</nav>

	<div class="text-gray-300">
		<RouterView />
	</div>
</template>

<script>
import { RouterLink, RouterView } from 'vue-router'
import AvatarHelper from '@/helpers/AvatarHelper.vue'
import axios from 'axios'

export default {
	components: { AvatarHelper, RouterLink, RouterView },
	data() {
		return {
			navLinks: [
				{ navName: 'Feed', to: '/' },
				{ navName: 'About', to: '/about' },
			],

			profile: null,

			api: 'https://localhost:5001/api/',
		}
	},
	mounted() {
		axios
			.get(this.api + 'Profile/@me')
			.then((response) => {
				this.profile = response.data
			})
			.catch((error) => {
				console.log(
					error +
						' : Getting @me profile was not successful! This may be intentional, if you are not logged in and the website tried to use a resource that it could not.'
				)
			})
	},
}
</script>
