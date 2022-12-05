<template>
	<!-- Avatar that gets the profile avatar from Discord's user API -->
	<img
		v-if="profileId"
		alt="avatar"
		class="aspect-square object-contain rounded-full bg-primary"
		:src="'https://cdn.discordapp.com/avatars/' + this.profileId + '/' + this.avatar + '.jpg'"
		id="avatar"
	/>

	<!-- Skeleton loader or empty -->
	<div v-else class="aspect-square rounded-full bg-gray-700 animate-pulse" id="noProfileId"></div>
</template>

<script>
export default {
	name: 'AvatarComponent',

	//Search props from parent
	props: {
		avatar: String,
		profileId: String,
	},
}
</script>
