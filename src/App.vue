<template>
	<!-- Navigation -->
	<nav class="h-[65px] flex relative font-semibold text-text-default bg-background-lighter drop-shadow-lg z-20">
		<!-- Navs from the navlist -->
		<div class="flex h-full w-fit justify-around" :class="{'sm:mx-auto max-sm:ml-2': loggedIn, 'mx-auto' : !loggedIn}">
			<RouterLink
				to="/"
				class="px-4 h-full hover:text-text-white z-20"
			>
				<button class="h-full">{{$t("nav.feed")}}</button>
			</RouterLink>
			<RouterLink
			to="/about"
			class="px-4 h-full hover:text-text-white z-20"
			>
			<button class="h-full">{{ $t("nav.about") }}</button>
			</RouterLink>
		</div>

		<div class="absolute right-0 h-[65px] flex">
			<!-- profile -->
			<RouterLink
				v-if="loggedIn"
				:to="'/profile/' + profile.profileId"
				class="flex pr-4 rounded-full h-fit my-auto bg-background-default hover:scale-105 transition duration-100 ease-out max-sm:mr-2 sm:mr-4"
			>
				<AvatarHelper class="h-[40px] my-auto" :avatar="profile.avatar" :profile-id="profile.profileId" />
				<span class="text-regular my-auto ml-2">{{ profile.nickname }}</span>
			</RouterLink>

	  	<!-- logout -->
			<a
				v-if="loggedIn"
				href="https://localhost:5001/Auth/Logout"
				class="px-4 bg-red-500 w-[48px] sm:w-[68px] text-text-white rounded-l-xl hover:bg-red-600 transition duration-200 ease-out"
			>
				<button
					class="material-symbols-outlined w-full h-full font-bold hover:scale-125 transition duration-300 ease-out"
				>
					logout
				</button>
			</a>

	  	<!-- login -->
			<a
				v-if="!loggedIn"
				href="https://localhost:5001/Auth/Login"
				class="px-4 bg-sky-600 w-[48px] sm:w-[68px] text-text-white rounded-l-xl hover:bg-sky-800 transition duration-200 ease-out"
			>
				<button
					class="material-symbols-outlined w-full h-full font-bold hover:scale-125 transition duration-300 ease-out"
				>
					login
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

	//Setup for pinia storage
	setup() {
		const meStore = useMeStore()
		return { meStore }
	},

	//Data for profile and keeping track of login
	data() {
		return {
			profile: {},
			loggedIn: false,
		}
	},

	methods: {
	  //Set the value of API @me to pinia storage on page load so it can be accessed globally
		async setMe() {
			await this.meStore.setMe()
			this.profile = this.meStore.$state
		},

		//Check is logged in profile exists and by that know if there is login
		async checkLogin() {
			this.loggedIn = this.profile.profileId !== undefined
		},
	},

	//On page created go set @me to Pinia storage
	created() {
		this.setMe()
	},

	//Check if profile logs in
	watch: {
		profile: {
			handler() {
				this.checkLogin()
				if(this.profile.locale){
		  		this.$i18n.locale = this.profile.locale
				}
			},
			deep: true,
		},
	},
}
</script>
