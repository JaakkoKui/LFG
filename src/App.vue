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
			<a
				v-if="!loggedIn"
				href="https://localhost:5001/Auth/Login"
				class="px-4 bg-sky-600 w-[68px] text-text-white rounded-l-xl hover:bg-sky-800 transition duration-200 ease-out"
			>
				<button
					class="material-symbols-outlined w-full h-full font-bold hover:scale-125 transition duration-300 ease-out"
				>
					login
				</button>
			</a>

			<RouterLink
				v-if="loggedIn"
				:to="'/profile/' + profile.profileId"
				class="flex pr-4 rounded-full h-fit my-auto bg-background-default hover:scale-105 transition duration-100 ease-out mr-4"
			>
				<AvatarHelper class="h-[40px] my-auto" :avatar="profile.avatar" :profile-id="profile.profileId" />
				<span class="text-regular my-auto ml-2">{{ profile.nickname }}</span>
			</RouterLink>

			<a
				v-if="loggedIn"
				href="https://localhost:5001/Auth/Logout"
				class="px-4 bg-red-500 w-[68px] text-text-white rounded-l-xl hover:bg-red-600 transition duration-200 ease-out"
			>
				<button
					class="material-symbols-outlined w-full h-full font-bold hover:scale-125 transition duration-300 ease-out"
				>
					logout
				</button>
			</a>
		</div>
	</nav>

	<div class="text-text-default">
		<RouterView />
	</div>
</template>

<script>
import { RouterLink, RouterView } from 'vue-router'
import AvatarHelper from '@/helpers/AvatarHelper.vue'
import { useMeStore } from '@/stores/me.ts'

export default {
	components: { AvatarHelper, RouterLink, RouterView },

	setup() {
		const meStore = useMeStore()

		return { meStore }
	},

	data() {
		return {
			navLinks: [
				{ navName: 'Feed', to: '/' },
				{ navName: 'About', to: '/about' },
			],

			profile: {},
			loggedIn: false,
		}
	},

	methods: {
		async setMe() {
			await this.meStore.setMe()
			this.profile = this.meStore.$state
		},

		async checkLogin() {
			this.loggedIn = this.profile.profileId !== undefined
		},
	},

	created() {
		this.setMe()
	},

	watch: {
		profile: {
			handler() {
				this.checkLogin()
			},
			deep: true,
		},
	},
}
</script>
