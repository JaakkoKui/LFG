<template>
	<header>
		<!-- Profile link to go to a posters profile-->
		<router-link
			id="link"
			:to="'/profile/' + profile.profileId"
			class="flex text-left mb-4 rounded-full w-fit hover:bg-background-default transition duration-150 ease-out"
		>
			<!-- Poster Avatar -->
			<AvatarHelper class="h-12" :avatar="profile.avatar" :profile-id="profile.profileId" ref="avatarHelper"/>
			<div class="mx-4 flex flex-col justify-around">
				<h4 class="font-semibold" id="nickname">{{ profile.nickname }}</h4>
				<p v-if="createDate" class="opacity-50 text-sm" id="date">{{ simpliTime }}</p>
			</div>
		</router-link>
	</header>
</template>

<script>
import AvatarHelper from '@/helpers/AvatarHelper.vue'

export default {
	name: 'PostHeader',

	components: {
		AvatarHelper,
	},

	//Props from parent to render
	props: {
		profile: Object,
		createDate: String,
	},

	computed: {
		//Simplifies time to a user friendly form
		simpliTime() {
			//Change time to the time from created to current a time above from the base time of 1.1.1970 UTC
			const currentTime = new Date((new Date().getTime() + new Date().getTimezoneOffset()) - (new Date(this.createDate).getTime() + new Date(this.createDate).getTimezoneOffset()))
			//Step down until minimum
			if (currentTime.getFullYear() - 1970) {
				return this.$tc('time.year', currentTime.getFullYear() - 1970, {amount: currentTime.getUTCFullYear() - 1970})
			} else if (currentTime.getMonth()) {
				return this.$tc('time.month', currentTime.getMonth(), {amount: currentTime.getUTCMonth()})
				//Adjust from date minimum of 1st
			} else if (currentTime.getDate() - 1) {
				return this.$tc('time.day', currentTime.getDate() - 1, {amount: currentTime.getDate() - 1})
			} else if (currentTime.getHours()) {
				return this.$tc('time.hour', currentTime.getUTCHours(), {amount: currentTime.getHours()})
			} else if (currentTime.getMinutes()) {
				return this.$tc('time.minute', currentTime.getMinutes(), {amount: currentTime.getMinutes()})
			} else if (currentTime.getSeconds()) {
				return this.$tc('time.second', currentTime.getSeconds(), {amount: currentTime.getSeconds()})
			}
		}
	}
}
</script>
