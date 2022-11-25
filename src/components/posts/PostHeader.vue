<template>
	<header>
		<router-link
			:to="'/profile/' + profile.profileId"
			class="flex text-left mb-4 rounded-full w-fit hover:bg-background-default transition duration-150 ease-out"
		>
			<AvatarHelper class="h-12" :avatar="profile.avatar" :profile-id="profile.profileId" />
			<div class="mx-4 flex flex-col justify-around">
				<h4 class="font-semibold" id="nickname">{{ profile.nickname }}</h4>
				<p v-if="createDate" class="opacity-50 text-sm" id="date">{{ createDate }}</p>
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

	props: {
		profile: Object,
		createDate: String,
	},
}
</script>

<style scoped></style>
